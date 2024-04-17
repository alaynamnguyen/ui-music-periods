from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, redirect, url_for
from collections import defaultdict
from random import shuffle
import json
app = Flask(__name__)

data = json.load(open('data.json'))
quiz_data = json.load(open('quiz_data.json'))
quiz_questions = quiz_data["quiz_questions"]
shuffle(quiz_questions)
userLearnInteractions = defaultdict(list)
numUserLearnInteractions = 0
score = 0

# ROUTES


@app.route('/')
def home():
    return render_template('home.html', data=data)


@app.route('/learn/<id>')
def view(id=None):
    id = int(id)
    if id < 1 or id > len(data):
        # Redirect to first learning page if out of range
        return redirect(url_for('learn', id=1))
    if id == len(data):
        # Redirect to the learning end page
        return redirect(url_for('learn_end'))
    return render_template('learn.html', id=id, data=data)


@app.route('/learn_end')
def learn_end():
    return render_template('learn_end.html')


@app.route('/restart_quiz')
def restart_quiz():
    global score
    shuffle(quiz_questions)
    score = 0
    return redirect(url_for('quiz', id=1))


@app.route('/quiz/<int:id>')
def quiz(id):

    if id < 1 or id > len(quiz_questions):
        return redirect(url_for('quiz', id=1))
    if id > len(quiz_questions):
        return render_template('quiz_end', score=score)

    question = quiz_questions[id - 1]
    question['total_questions'] = len(quiz_questions)
    question['current_id'] = id
    return render_template('quiz.html', data=question)


@app.route('/quiz_end')
def quiz_end():
    global score
    return render_template('quiz_end.html', score=score)
    # ajax for add.js


@app.route('/add_learn_interaction', methods=['GET', 'POST'])
def add_learn_interaction():
    global userLearnInteractions
    global numUserLearnInteractions

    json_data = request.get_json()

    userLearnInteractions[json_data["pageUrl"]].append(json_data["timestamp"])
    numUserLearnInteractions += 1

    # Send back ALL clients and ALL data, so the client can redisplay it
    return jsonify(length=numUserLearnInteractions)


@app.route('/update_score', methods=['POST'])
def update_score():
    global score
    json_data = request.get_json()
    is_correct = json_data['correct']
    # Assuming you have a score tracking mechanism, update it here
    # You can track score in the session or a simple global variable for simplicity
    if is_correct:
        score += 1
    return jsonify(score=score)


if __name__ == '__main__':
    app.run(debug=True)
