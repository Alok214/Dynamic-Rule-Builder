const QueryPreview =  ({ rules, grouping }) => {
  const generateQuery = () => {
    let query = '';
    rules.forEach((rule, index) => {
      if (grouping.includes(rule.id)) {
        if (index === 0 || !grouping.includes(rules[index - 1].id)) {
          query += '(';
        }
        query += `${rule.collection}.${rule.key} ${rule.operator} ${rule.value}`;
        if (index < rules.length - 1 && rule.nextOperator !== 'END') {
          query += ` ${rule.nextOperator} `;
        }
        if (index === rules.length - 1 || !grouping.includes(rules[index + 1]?.id)) {
          query += ')';
        }
      } else {
        query += `${rule.collection}.${rule.key} ${rule.operator} ${rule.value}`;
        if (index < rules.length - 1 && rule.nextOperator !== 'END') {
          query += ` ${rule.nextOperator} `;
        }
      }
    });
    return query;
  };

  return (
    <div className="preview-container">
      <h2>Query Preview</h2>
      <p style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
        {generateQuery() || 'No query generated'}
      </p>
    </div>
  );
}

export default QueryPreview;