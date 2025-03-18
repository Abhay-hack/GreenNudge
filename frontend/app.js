// Reset stats on every new session (page load)
localStorage.clear();
let totalScore = 0;
let streak = 0;
let stats = { co2: 0, actions: 0 };
const audio = new Audio('assets/success.mp3');

// Initial UI update
document.getElementById('score').innerText = totalScore;
document.getElementById('streak').innerText = streak;
document.getElementById('co2').innerText = stats.co2.toFixed(3);
document.getElementById('actions').innerText = stats.actions;

async function getNudge() {
    const habit = document.getElementById('habit').value.trim();
    if (!habit) {
        document.getElementById('result').innerHTML = "Bhai, kuch toh likh!";
        return;
    }

    try {
        const response = await fetch('/nudge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ habit })
        });
        const data = await response.json();

        // Update gamification
        totalScore += data.points;  // Only increases for positive impact
        streak++;
        stats.actions++;

        // CO2 logic: only positive impact adds to savings
        if (data.impact > 0) {
            stats.co2 += data.impact;
        }

        // UI text based on impact
        const impactText = data.impact >= 0 ? `${data.impact} kg CO2 bachaya` : `${-data.impact} kg CO2 emitted`;
        const rippleText = data.ripple >= 0 ? `${data.ripple} kg CO2 bachaya` : `${-data.ripple} kg CO2 emitted`;

        // Update UI
        document.getElementById('result').innerHTML = `
            <p>${data.nudge}</p>
            <p>Impact: ${impactText}</p>
            <p>30 din mein: ${rippleText}</p>
        `;
        document.getElementById('score').innerText = totalScore;
        document.getElementById('streak').innerText = streak;
        document.getElementById('co2').innerText = stats.co2.toFixed(3);
        document.getElementById('actions').innerText = stats.actions;

        // Update avatar
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