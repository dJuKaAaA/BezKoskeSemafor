data = {
    team1: {
        name: "Bez koske",
        score: 0
    },
    team2: {
        name: "CitRus",
        score: 0
    },
    clockMinutes: 10,   // Deprecated
    clockSeconds: 0,    // Deprecated
    quarter: 1,         // Deprecated
    period: "Period 1"
};
document.getElementById('team1-name').textContent = data.team1.name;
document.getElementById('team2-name').textContent = data.team2.name;

const SERVER_URL = "https://e655-188-2-53-44.ngrok-free.app"

async function fetchScoreboardData() {
    try {
        const response = await fetch(`${SERVER_URL}/api/fetch-score`, {
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        });
        const body = await response.json();
        console.log(body);
        data.team1.score = body.team1Score;
        data.team2.score = body.team2Score;
        data.period = body.period;
        document.getElementById('score1').textContent = data.team1.score;
        document.getElementById('score2').textContent = data.team2.score;
        document.getElementById('period').textContent = data.period;
    } catch (error) {
        console.error('Error fetching scoreboard data:', error);
    }
}

// Deprecated
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

const FETCH_INTERVAL = 5000;
setInterval(fetchScoreboardData, FETCH_INTERVAL);
fetchScoreboardData();