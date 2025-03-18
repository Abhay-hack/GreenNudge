# utils/data_processor.py
import pandas as pd
import json
df = pd.read_csv("kaggle_dataset.csv")
habits = {row["Item"].lower(): row["CO2_kg"] for _, row in df.iterrows()}
with open("data/habits.json", "w") as f:
    json.dump(habits, f)