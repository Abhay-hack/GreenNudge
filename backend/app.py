from flask import Flask, request, jsonify, send_from_directory
from nudge_engine import generate_nudge
import os

app = Flask(__name__, static_folder='../frontend', template_folder='../frontend')

@app.route('/nudge', methods=['POST'])
def nudge():
    habit = request.json['habit']
    nudge, impact, points, ripple = generate_nudge(habit)
    return jsonify({"nudge": nudge, "impact": impact, "points": points, "ripple": ripple})

@app.route('/', methods=['GET'])
def home():
    return send_from_directory(app.template_folder, 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)