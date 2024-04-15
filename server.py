from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, redirect, url_for
from collections import defaultdict
import json
app = Flask(__name__)

data = json.load(open('data.json'))
userLearnInteractions = defaultdict(list)
numUserLearnInteractions = 0

# ROUTES

@app.route('/')
def home():
   return render_template('home.html', data=data)   

@app.route('/learn/<id>')
def view(id=None):
    return render_template('learn.html', id=id, data=data) 

# ajax for add.js
@app.route('/add_learn_interaction', methods=['GET', 'POST'])
def add_learn_interaction():
    global userLearnInteractions
    global numUserLearnInteractions

    json_data = request.get_json()   

    userLearnInteractions[json_data["pageUrl"]].append(json_data["timestamp"])
    numUserLearnInteractions += 1

    # Send back ALL clients and ALL data, so the client can redisplay it
    return jsonify(length = numUserLearnInteractions)

if __name__ == '__main__':
   app.run(debug = True)




