function fetchGames() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            const gameList = document.getElementById('gameList');
            gameList.innerHTML = '';
            data.forEach(game => {
                const li = document.createElement('li');
                li.textContent = `Team: ${game.team_name} vs. ${game.opposing_team}, Field: ${game.field_number}, Time: ${new Date(game.game_time).toLocaleString()}`;
                gameList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching games:', error));
}

// Handle form submission to add a new game
document.getElementById('addGameForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const teamName = document.getElementById('teamName').value;
    const opposingTeam = document.getElementById('opposingTeam').value;
    const fieldNumber = document.getElementById('fieldNumber').value;
    const gameTime = document.getElementById('gameTime').value;

    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team_name: teamName, opposing_team: opposingTeam, field_number: fieldNumber, game_time: gameTime }),
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchGames(); // Refresh the game list
        })
        .catch(error => console.error('Error adding game:', error));
});

// Initial fetch to display games
fetchGames();