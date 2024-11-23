// Function to fetch data from the backend and display it in the table
function fetchData() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            const table = document.querySelector('#data-container table');
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td id="team-${item.id}">${item.team_name}</td>
                    <td id="opposing-team-${item.id}">${item.opposing_team}</td>
                    <td id="field-${item.id}">${item.field_number}</td>
                    <td id="time-${item.id}">${item.game_time}</td>
                    <td><button onclick="editData(${item.id})">Edit</button></td>
                `;
                table.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Function to handle editing data
function editData(id) {
    const teamName = prompt("Enter new team name:", document.getElementById(`team-${id}`).textContent);
    const opposingTeam = prompt("Enter new opposing team name:", document.getElementById(`opposing-team-${id}`).textContent);
    const fieldNumber = prompt("Enter new field number:", document.getElementById(`field-${id}`).textContent);
    const gameTime = prompt("Enter new game time:", document.getElementById(`time-${id}`).textContent);

    if (teamName && opposingTeam && fieldNumber && gameTime) {
        fetch(`/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ team_name: teamName, opposing_team: opposingTeam, field_number: fieldNumber, game_time: gameTime }),
        })
        .then(response => response.json())
        .then(updatedItem => {
            document.getElementById(`team-${updatedItem.id}`).textContent = updatedItem.team_name;
            document.getElementById(`opposing-team-${updatedItem.id}`).textContent = updatedItem.opposing_team;
            document.getElementById(`field-${updatedItem.id}`).textContent = updatedItem.field_number;
            document.getElementById(`time-${updatedItem.id}`).textContent = updatedItem.game_time;
        })
        .catch(error => console.error('Error:', error));
    }
}


document.addEventListener('DOMContentLoaded', fetchData);
