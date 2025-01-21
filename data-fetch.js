// Fetch Data from API
export function fetchData(type) {
  // Determine the API endpoint based on the button clicked
  let url = '';
  if (type === 'sports') {
    url = 'http://127.0.0.1:5000/fetch_sports';
  } else if (type === 'racing') {
    url = 'http://127.0.0.1:5000/fetch_racing';
  } else if (type === 'jumpouts') {
    url = 'http://127.0.0.1:5000/fetch_jumpouts';
  }

  // Clear previous table content and show loading message
  const tableContainer = document.getElementById('table-container');
  const jsonOutput = document.getElementById('json-output');
  tableContainer.innerHTML = '';
  jsonOutput.textContent = 'Loading...';

  // Fetch JSON data
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Display raw JSON for debugging
      jsonOutput.textContent = JSON.stringify(data, null, 2);

      // Render the table
      renderTable(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      jsonOutput.textContent = 'Error fetching data. Please try again.';
    });
}

// Render JSON Data as a Table
export function renderTable(data) {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; // Clear previous content

  if (!data || data.length === 0) {
    tableContainer.innerHTML = '<p>No data available to display.</p>';
    return;
  }

  // Create a table element
  const table = document.createElement('table');
  table.className = 'table table-bordered';

  // Create table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  // Dynamically get headers from the first object in the data
  const headers = Object.keys(data[0]);
  headers.forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header.toUpperCase();
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Create table body
  const tbody = document.createElement('tbody');
  data.forEach((item) => {
    const row = document.createElement('tr');
    headers.forEach((header) => {
      const td = document.createElement('td');
      td.textContent = item[header] ?? 'N/A'; // Use 'N/A' for missing values
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });

  // Append thead and tbody to the table
  table.appendChild(thead);
  table.appendChild(tbody);

  // Append the table to the container
  tableContainer.appendChild(table);
}
