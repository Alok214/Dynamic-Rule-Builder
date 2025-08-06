from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient("mongodb://localhost:27017")
db = client["rule_builder"]
queries_collection = db["queries"]
deals_collection = db["deals"]
# print(db)
class Rule(BaseModel):
    collection: str
    key: str
    operator: str
    value: str
    nextOperator: str
    id: int

class Query(BaseModel):
    name: str
    rules: list[Rule]
    grouping: list[int]

@app.post("/queries")
async def save_query(query: Query):
    query_dict = query.dict()
    query_dict['_id'] = str(ObjectId())
    queries_collection.insert_one(query_dict)
    return {"message": "Query saved"}

@app.get("/queries")
async def get_queries():
    queries = list(queries_collection.find())
    for query in queries:
        query['_id'] = str(query['_id'])
    return queries

@app.post("/execute_query")
async def execute_query(query: Query):
    mongo_query = build_mongo_query(query.rules, query.grouping)
    results = list(deals_collection.find(mongo_query))
    for result in results:
        result['_id'] = str(result['_id'])
    return results

def build_mongo_query(rules, grouping):
    query = []
    for i, rule in enumerate(rules):
        print(i, rule)
        op = {
            "Equal_To": "$eq",
            "Not_Equal_To": "$ne",
            "Greater_Than": "$gt",
            "Less_Than": "$lt",
            "LIKE": "$regex"
        }[rule.operator]
        value = rule.value
        if rule.operator == "LIKE":
            value = re.compile(value, re.IGNORECASE)
        elif rule.key in ["total", "probability"]:
            value = float(value)
        field = rule.key if rule.key != "products_name" else "products.name"
        condition = {field: {op: value}}
        if i > 0 and rules[i-1].nextOperator != "END":
            logical_op = "$and" if rules[i-1].nextOperator == "AND" else "$or"
            if grouping and rule.id in grouping and rules[i-1].id in grouping:
                query[-1] = {logical_op: [query[-1], condition]}
            else:
                query.append(condition)
        else:
            query.append(condition)
    
    if grouping:
        grouped = {"$and": [q for i, q in enumerate(query) if rules[i].id in grouping]}
        ungrouped = [q for i, q in enumerate(query) if rules[i].id not in grouping]
        if ungrouped:
            return {"$and": [grouped, *ungrouped]}
        return grouped
    return {"$and": query} if len(query) > 1 else query[0] if query else {}