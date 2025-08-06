import { useState } from 'react';

const collections = ['deals'];
const keys = {
  deals: ['name', 'status', 'total', 'probability', 'products_name'],
};
const operators = ['Equal_To', 'Not_Equal_To', 'Greater_Than', 'Less_Than', 'LIKE'];
const nextOperators = ['AND', 'OR', 'END'];

const RuleForm = ({ addRule }) => {
  const [collection, setCollection] = useState('');
  const [key, setKey] = useState('');
  const [operator, setOperator] = useState('');
  const [value, setValue] = useState('');
  const [nextOperator, setNextOperator] = useState('END');

  const handleSubmit = () => {
    if (!collection || !key || !operator || !value) {
      alert('Please fill all fields.');
      return;
    }
    addRule({ collection, key, operator, value, nextOperator });
    setCollection('');
    setKey('');
    setOperator('');
    setValue('');
    setNextOperator('END');
  };

  return (
    <div className="form-container">
      <h2>Add Rule</h2>
      <select
        value={collection}
        onChange={(e) => setCollection(e.target.value)}
      >
        <option value="">Select Collection</option>
        {collections.map((col) => (
          <option key={col} value={col}>
            {col}
          </option>
        ))}
      </select>
      <select
        value={key}
        onChange={(e) => setKey(e.target.value)}
        disabled={!collection}
      >
        <option value="">Select Key</option>
        {collection && keys[collection].map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
      </select>
      <select
        value={operator}
        onChange={(e) => setOperator(e.target.value)}
      >
        <option value="">Select Operator</option>
        {operators.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Value"
      />
      <select
        value={nextOperator}
        onChange={(e) => setNextOperator(e.target.value)}
      >
        {nextOperators.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
      <button
        className="btn-blue"
        onClick={handleSubmit}
      >
        Add Rule
      </button>
    </div>
  );
}

export default RuleForm;