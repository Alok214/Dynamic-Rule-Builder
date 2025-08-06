const ResultTable =  ({ results }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Results</h2>
      {results.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Total</th>
              <th>Status</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id}>
                <td>{result.name}</td>
                <td>{result.total}</td>
                <td>{result.status}</td>
                <td>
                  {result.products.map((p) => p.name).join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results to display</p>
      )}
    </div>
  );
}

export default ResultTable;