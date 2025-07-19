from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)
DATABASE = 'portfolio.db'
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'portfolio123')

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to Ayush Portfolio API'})

def init_and_seed_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            link TEXT
        )
    ''')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL
        )
    ''')
    conn.execute('DELETE FROM projects')
    conn.commit()
    projects = [
        ('Portfolio Website', 'A personal portfolio built with React and Flask.', 'https://github.com/ayushchhipa1509/Portfolio'),
        ('Emotion Recognition Project', 'A machine learning project to detect emotions from textual data using Python.', 'https://github.com/ayushchhipa1509/Emotion-Recognition'),
        ('Arduino Motor Car', 'A robotics project to control a motor car using Arduino and sensors.', None)
    ]
    conn.executemany('INSERT INTO projects (title, description, link) VALUES (?, ?, ?)', projects)
    conn.commit()
    conn.close()

@app.route('/projects')
def get_projects():
    conn = get_db_connection()
    projects = conn.execute('SELECT * FROM projects').fetchall()
    conn.close()
    projects_list = [
        {
            'id': project['id'],
            'title': project['title'],
            'description': project['description'],
            'link': project['link']
        }
        for project in projects
    ]
    return jsonify({'projects': projects_list})

@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    if not name or not email or not message:
        return jsonify({'error': 'All fields are required.'}), 400
    conn = get_db_connection()
    conn.execute('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)', (name, email, message))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Message received successfully.'})

@app.route('/messages', methods=['GET'])
def get_messages():
    password = request.args.get('password')
    if password != ADMIN_PASSWORD:
        return jsonify({'error': 'Unauthorized'}), 401
    conn = get_db_connection()
    messages = conn.execute('SELECT * FROM messages ORDER BY id DESC').fetchall()
    conn.close()
    messages_list = [
        {
            'id': msg['id'],
            'name': msg['name'],
            'email': msg['email'],
            'message': msg['message']
        }
        for msg in messages
    ]
    return jsonify({'messages': messages_list})

if __name__ == '__main__':
    init_and_seed_db()
    app.run(debug=True)
