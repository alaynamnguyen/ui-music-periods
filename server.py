from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, redirect, url_for
import json
app = Flask(__name__)

current_id = 2
data = json.load(open('data.json'))

# ROUTES

@app.route('/')
def home():
   return render_template('home.html', data=data)   


@app.route('/learn/<id>')
def view(id=None):
    return render_template('learn.html', id=id, data=data) 

if __name__ == '__main__':
   app.run(debug = True)




