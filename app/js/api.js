




// Function to handle file uploads
function uploadFile(type) {
    const formData = new FormData();
    const fileInput = document.getElementById(`${type}Upload`);
    formData.append(type, fileInput.files[0]);
    
    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }
  
  // Function to fetch and display table data
  function fetchTableData() {
    fetch('/getClientsData')
      .then(response => response.json())
      .then(data => {
        const table = document.getElementById('clientsTable');
        data.forEach(client => {
          const row = table.insertRow(-1);
          row.insertCell(0).textContent = client.id;
          row.insertCell(1).textContent = client.name;
          row.insertCell(2).textContent = client.details;
        });
      });
  
    // Add fetching for property data in a similar manner
  }
  
  // Function for chatbot interaction
  function sendMessage() {
    const input = document.getElementById('chatInput').value;
    fetch('/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    })
    .then(response => response.json())
    .then(data => {
      const chatOutput = document.getElementById('chatOutput');
      const responseElement = document.createElement('div');
      responseElement.textContent = data.response;
      chatOutput.appendChild(responseElement);
    });
  }
  
  // Populate tables on page load
  document.addEventListener('DOMContentLoaded', fetchTableData);
  





































/*


// Replace 'apiEndpointUrl' with the URL of the API you want to use
const apiEndpointUrl = 'https://example.com/api/data';

// Replace 'elementId' with the ID of the element where you want to display the API data
const elementId = 'apiDataContainer';

// Function to fetch data from the API
function fetchDataFromApi() {
    fetch(apiEndpointUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API call failed: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayDataOnPage(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            displayErrorOnPage(error);
        });
}

// Function to display fetched data on the page
function displayDataOnPage(data) {
    // Assuming 'data' is an object or array. Customize this part based on the structure of your API response
    const container = document.getElementById(elementId);
    if (!container) return;

    // Example of displaying data: assuming data has a 'name' property
    // Adjust this according to the actual data structure you're working with
    container.innerHTML = `Name: ${data.name}`;
}

// Function to display an error message on the page in case of a failure
function displayErrorOnPage(error) {
    const container = document.getElementById(elementId);
    if (!container) return;

    container.innerHTML = `Failed to load data: ${error.message}`;
}

// Call the function to fetch data from the API and display it on the page
fetchDataFromApi();



*To integrate to front end:
<script src="/app/js/api"></script>




*** To inlcude in this file for ApexMatch***

Upload data (graph database)
Display tables and analytics
Coilot to talk with data - mistral
Image enhance - stability AI
Email integration
*/