import { useState } from 'react';

const RuleList = ({ rules, deleteRule, updateGrouping }) => {
  const [selectedRules, setSelectedRules] = useState([]);

  const toggleSelect = (id) => {
    setSelectedRules((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const groupRules = () => {
    if (selectedRules.length < 2) {
      alert('Select at least two rules to group.');
      return;
    }
    updateGrouping([...selectedRules]);
    setSelectedRules([]);
  };

  return (
    <div className="list-container">
      <h2>Rules</h2>
      <button
        className="btn-yellow"
        onClick={groupRules}
        style={{ marginBottom: '10px' }}
      >
        Group Selected Rules
      </button>
      <ul>
        {rules.map((rule) => (
          <li
            key={rule.id}
            className={`rule-item ${selectedRules.includes(rule.id) ? 'selected' : ''}`}
          >
            <div>
              <input
                type="checkbox"
                checked={selectedRules.includes(rule.id)}
                onChange={() => toggleSelect(rule.id)}
                style={{ marginRight: '10px' }}
              />
              {rule.collection}.{rule.key} {rule.operator} {rule.value} {rule.nextOperator}
            </div>
            <button
              className="btn-red"
              onClick={() => deleteRule(rule.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RuleList;