let totalScore = 0;
let streak = localStorage.getItem('streak') || 0;
let stats = { co2: 0, actions: 0 };
const audio = new Audio('assets/success.wav');

async function getNudge() {
    const habit = document.getElementById('habit').value.trim();
    if (!habit) {
        document.getElementById('result').innerHTML = "Bhai, kuch toh likh!";
        return;
    }

    try {
        const response = await fetch('/nudge', {  // Changed to relative path
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ habit })
        });
        const data = await response.json();

        totalScore += data.points;
        streak++;
        stats.co2 += data.impact;
        stats.actions++;

        localStorage.setItem('streak', streak);

        document.getElementById('result').innerHTML = `
            <p>${data.nudge}</p>
            <p>Impact: ${data.impact} kg CO2 bachaya</p>
            <p>30 din mein: ${data.ripple} kg CO2</p>
        `;
        document.getElementById('score').innerText = totalScore;
        document.getElementById('streak').innerText = streak;
        document.getElementById('co2').innerText = stats.co2.toFixed(2);
        document.getElementById('actions').innerText = stats.actions;

        const avatar = document.getElementById('avatar');
        if (totalScore < 20) {
            avatar.src = 'assets/plant.png';
        } else if (totalScore < 50) {
            avatar.src = 'assets/tree.png';
        } else {
            avatar.src = 'assets/hero.png';
        }

        audio.play();
    } catch (error) {
        document.getElementById('result').innerHTML = "Bhai, server se dikkat hai!";
        console.error(error);
    }
}