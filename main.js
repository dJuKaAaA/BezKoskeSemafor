data = {
    team1: {
        name: "Bez koske",
        score: 0
    },
    team2: {
        name: "CitRus",
        score: 0
    },
    clockMinutes: 10,
    clockSeconds: 0,
    quarter: 1
};
document.getElementById('team1-name').textContent = data.team1.name;
document.getElementById('team2-name').textContent = data.team2.name;

const SERVER_URL = "https://2445-188-2-53-44.ngrok-free.app"

async function fetchScoreboardData() {
    try {
        const response = await fetch(`${SERVER_URL}/api/fetch-score`, {
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        });
        console.log(await response.json());

        if (Math.random() < 0.5) {
            if (Math.random() < 0.5) {
                data.team1.score += 2;
            } else {
                data.team1.score += 3;
            }
        } else {
            if (Math.random() < 0.5) {
                data.team2.score += 2;
            } else {
                data.team2.score += 3;
            }
        }
        document.getElementById('score1').textContent = data.team1.score;
        document.getElementById('score2').textContent = data.team2.score;
    } catch (error) {
        console.error('Error fetching scoreboard data:', error);
    }
}

function moveClock() {
    data.clockSeconds--;
    if (data.clockSeconds < 0) {
        data.clockMinutes--;
        data.clockSeconds = 59;
        if (data.clockMinutes < 0) {
            data.quarter++;
            data.clockMinutes = 10;
            data.clockSeconds = 0;
            if (data.quarter > 4) {
                data.clockMinutes = 0;
                data.clockSeconds = 0;
                data.quarter = 4;
            }
        }
    }
    const minutesDisplay = data.clockMinutes;
    const secondsDisplay = (data.clockSeconds < 10) ? ("0" + data.clockSeconds) : (data.clockSeconds);
    document.getElementById('clock').textContent = `${minutesDisplay}:${secondsDisplay}`;
    document.getElementById('quarter').textContent = `Q${data.quarter}`;
}

setInterval(fetchScoreboardData, 5000); // Fetch data every 5 seconds
setInterval(moveClock, 1000)
fetchScoreboardData(); // Initial fetch