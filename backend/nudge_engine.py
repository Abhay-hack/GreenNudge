import json
import random

with open('data/habits.json', 'r') as f:
    impacts = json.load(f)
with open('data/nudges.json', 'r') as f:
    nudges = json.load(f)

def generate_nudge(habit):
    habit = habit.lower()
    tokens = habit.split()
    keywords = tokens
    
    for item, impact in impacts.items():
        if item in " ".join(keywords):
            nudge = random.choice(nudges.get(item, ["Keep it green!"]))
            ripple = impact * 30
            return nudge, impact, 10, ripple
    return "Try something eco-friendly!", 0.0, 5, 0.0