// Sample array for the table
const array = [23, 45, 12, 67, 34, 89, 90, 22, 38, 56];

// DOM Elements
const tableBody = document.querySelector('#searchTable tbody');
const resultMessage = document.getElementById('resultMessage');
const searchValueInput = document.getElementById('searchValue');

// Generate table rows based on the array
function generateTable() {
    array.forEach((value, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index}</td>
            <td>${value}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to start the linear search
function startSearch() {
    const searchValue = parseInt(searchValueInput.value);
    if (isNaN(searchValue)) {
        alert('Please enter a valid number');
        return;
    }
    
    resultMessage.textContent = '';
    let i = 0;

    function searchStep() {
        // Highlight the current row being checked
        const rows = document.querySelectorAll('#searchTable tbody tr');
        rows.forEach(row => row.querySelectorAll('td')[1].classList.remove('highlight', 'found'));
        
        if (i < array.length) {
            const currentRow = rows[i];
            currentRow.querySelectorAll('td')[1].classList.add('highlight');

            // Check if current value matches the search value
            if (array[i] === searchValue) {
                currentRow.querySelectorAll('td')[1].classList.add('found');
                resultMessage.textContent = `Value ${searchValue} found at index ${i}`;
                return;
            }

            i++;
            setTimeout(searchStep, 500); // Delay to visualize each step
        } else {
            resultMessage.textContent = `Value ${searchValue} not found in the array.`;
        }
    }

    searchStep();
}

// Reset the search visualization
function resetSearch() {
    document.querySelectorAll('#searchTable tbody tr td').forEach(cell => {
        cell.classList.remove('highlight', 'found');
    });
    resultMessage.textContent = '';
    searchValueInput.value = '';
}

// Initialize the table on page load
generateTable();
