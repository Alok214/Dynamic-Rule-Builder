# Dynamic Rule Builder
A full-stack web application for creating, saving, and executing dynamic queries on a MongoDB database using React, FastAPI, and MongoDB. This project fulfills the requirements of the Dynamic Rule Builder Assignment for EA-Tech Pvt. Ltd., allowing users to create rules, group them with logical operators, save queries, and display filtered results from a MongoDB database.
Prerequisites
Before setting up the application, ensure the following are installed on your system:

Node.js (v16 or higher): For running the React frontend. Download from nodejs.org.
Python (3.9 or higher): For running the FastAPI backend. Download from python.org.
MongoDB (v4.4 or higher): For storing queries and data. Download from mongodb.com.
npm or yarn: For managing frontend dependencies (npm comes with Node.js).
pip: For managing Python dependencies (included with Python).
Git: For cloning the repository (optional, if provided via a repository).

## Project Structure

/backend: Contains the FastAPI backend code (main.py).
/frontend: Contains the React frontend code (src/App.jsx, src/components/, src/styles.css, etc.).
data.txt: Sample data for the MongoDB deals collection.
README.md: This file.

## Setup Instructions
### 1. Clone the Repository 
The project is hosted in a Git repository, clone it:
git remote add origin https://github.com/Alok214/Dynamic-Rule-Builder.git
cd dynamic-rule-builder

### 2. Set Up MongoDB

Start MongoDB:

Ensure MongoDB is running on the default port 27017. Start the MongoDB server:mongod


On Windows, if using MongoDB as a service, start it with:net start MongoDB


Verify MongoDB is running by connecting via the MongoDB shell:mongo




Import Sample Data:

Import the provided data.txt into the rule_builder database, deals collection:mongoimport --db rule_builder --collection deals --file data.txt --jsonArray


Ensure data.txt is in the current directory, or provide its full path.
Verify the import in the MongoDB shell:use rule_builder
db.deals.find().pretty()

You should see 18 documents with fields like name, total, status, and products.



### 3. Set Up the Backend

Navigate to the Backend Directory:
cd backend


Create a Virtual Environment:
python -m venv venv


Activate the virtual environment:
On Windows:venv\Scripts\activate


On macOS/Linux:source venv/bin/activate






Install Backend Dependencies:
pip install fastapi uvicorn pymongo


Run the FastAPI Server:
uvicorn main:app --reload


The server will run on http://localhost:8000.
Verify by opening http://localhost:8000 in a browser (you should see a JSON response like {"message":"Hello, World!"} if a default route exists) or test the /queries endpoint with:curl -X GET http://localhost:8000/queries





### 4. Set Up the Frontend

Navigate to the Frontend Directory:
cd frontend


Install Frontend Dependencies:
npm install


Run the Vite Development Server:
npm run dev


The frontend will typically run on http://localhost:5173 or http://localhost:5174 (check the terminal output for the exact port).
If the port is not 5173, update the allow_origins in backend/main.py to include the correct port (e.g., ["http://localhost:5173", "http://localhost:5174"]), then restart the backend.



### 5. Verify Setup

Open the frontend in your browser (e.g., http://localhost:5173 or http://localhost:5174).
Ensure the backend is running (http://localhost:8000).
Test the application by creating a rule (e.g., deals.name Equal_To "Puja"), saving a query, and executing it. Results should display in a table.

## Usage

Access the Application:
Open http://localhost:5173 (or the port shown in the Vite output) in your browser.


Create Rules:
Use the Rule Form to select a collection (deals), key (name, status, etc.), operator (Equal_To, Greater_Than, etc.), value, and next operator (AND, OR, END).
Click "Add Rule" to add it to the list.


Group Rules:
Select multiple rules using checkboxes and click "Group Selected Rules" to create nested logical groups (e.g., (A AND B) OR C).


Save Queries:
Enter a query name and click "Save Query" to store it in MongoDB.


Execute Queries:
View saved queries in the "Saved Queries" section and click "Execute" to fetch and display filtered results in a table.


View Results:
Results are displayed in a table showing name, total, status, and products.



## Troubleshooting

CORS Error: If you see Access to fetch at 'http://localhost:8000/queries' has been blocked by CORS policy, ensure the frontend port (e.g., 5174) is listed in allow_origins in backend/main.py. Update and restart the backend:allow_origins=["http://localhost:5173", "http://localhost:5174"]


MongoDB Connection Error: Ensure MongoDB is running on mongodb://localhost:27017. Check with:mongo


Fetch Errors: Verify the backend is running (http://localhost:8000) and test endpoints with curl or Postman.
No Data in Results: Confirm data.txt was imported correctly into the rule_builder.deals collection.
Port Conflicts: If port 8000 or 5173 is in use, change the port in uvicorn main:app --port <new-port> or check Vite’s output for the frontend port.

