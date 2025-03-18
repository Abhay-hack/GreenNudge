import json
import random

with open('data/habits.json', 'r') as f:
    impacts = json.load(f)
with open('data/nudges.json', 'r') as f:
    nudges = json.load(f)

# Eco-friendly habits jo CO2 bachate hain
eco_friendly_habits = ["steel tumbler", "kulhad", "bicycle", "walk", "public transport"]

def generate_nudge(habit):
    habit = habit.lower()
    tokens = habit.split()
    keywords = tokens

    # Check if habit is eco-friendly
    is_eco_friendly = any(eco_habit in habit for eco_habit in eco_friendly_habits)
    
    for item, impact in impacts.items():
        if item in " ".join(keywords):
            if is_eco_friendly:
                nudge = f"Great job! Keep using {item}."
                return nudge, impact, 10, impact * 30  # Positive impact, 10 points
            else:
                nudge = random.choice(nudges.get(item, ["Try something eco-friendly!"]))
                return nudge, -impact, 0, -impact * 30  # Negative impact, 0 points
    
    # Default case
    if is_eco_friendly:
        return "Awesome eco-friendly choice!", 0.01, 10, 0.3
    return "Try something eco-friendly!", -0.01, 0, -0.3