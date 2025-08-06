import { useState, useEffect } from 'react';
import RuleForm from './components/RuleForm';
import RuleList from './components/RuleList';
import QueryPreview from './components/QueryPreview';
import ResultTable from './components/ResultTable';
import './styles.css';

function App() {
  const [rules, setRules] = useState([]);
  const [queryName, setQueryName] = useState('');
  const [savedQueries, setSavedQueries] = useState([]);
  const [results, setResults] = useState([]);
  const [grouping, setGrouping] = useState([]);

  const addRule = (rule) => {
    setRules([...rules, { ...rule, id: Date.now() }]);
  };

  const deleteRule = (id) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  const updateGrouping = (newGrouping) => {
    setGrouping(newGrouping);
  };

  const saveQuery = async () => {
    if (!queryName || rules.length === 0) {
      alert('Please provide a query name and at least one rule.');
      return;
    }
    console.log('Saving query:', { name: queryName, rules, grouping });
    try {
      const response = await fetch('http://localhost:8000/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: queryName, rules, grouping }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert('Query saved successfully!');
      fetchSavedQueries();
    } catch (error) {
      console.error('Error saving query:', error.message, error.stack);
      alert(`Failed to save query: ${error.message}`);
    }
  };

  const fetchSavedQueries = async () => {
    try {
      const response = await fetch('http://localhost:8000/queries');
      const data = await response.json();
      setSavedQueries(data);
    } catch (error) {
      console.error('Error fetching queries:', error);
    }
  };

  const executeQuery = async (query) => {
    try {
      const response = await fetch('http://localhost:8000/execute_query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error executing query:', error);
    }
  };

  useEffect(() => {
    fetchSavedQueries();
  }, []);

  return (
    <div className="container">
      <h1>Dynamic Rule Builder</h1>
      <RuleForm addRule={addRule} />
      <RuleList rules={rules} deleteRule={deleteRule} updateGrouping={updateGrouping} />
      <QueryPreview rules={rules} grouping={grouping} />
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Query Name"
          style={{ padding: '8px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          value={queryName}
          onChange={(e) => setQueryName(e.target.value)}
        />
        <button
          className="btn-blue"
          onClick={saveQuery}
        >
          Save Query
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Saved Queries</h2>
        <ul>
          {savedQueries.map((query) => (
            <li key={query._id} style={{ marginTop: '10px' }}>
              <span>{query.name}</span>
              <button
                className="btn-green"
                style={{ marginLeft: '10px', padding: '5px 10px' }}
                onClick={() => executeQuery(query)}
              >
                Execute
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ResultTable results={results} />
    </div>
  );
}

export default App;