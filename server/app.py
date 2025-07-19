from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)
DATABASE = 'portfolio.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to Ayush Portfolio API'})

@app.route('/init_db')
def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            link TEXT
        )
    ''')
    conn.commit()
    conn.close()
    return jsonify({'message': 'Database initialized and projects table created.'})

@app.route('/add_sample_projects')
def add_sample_projects():
    conn = get_db_connection()
    projects = [
        ('Portfolio Website', 'A personal portfolio built with React and Flask.', 'https://github.com/ayush/portfolio'),
        ('Emotion Detection from Text', 'A machine learning project to detect emotions from textual data using Python.', 'https://github.com/ayush/emotion-detection'),
        ('Arduino Motor Car', 'A robotics project to control a motor car using Arduino and sensors.', 'https://github.com/ayush/arduino-motor-car')
    ]
    conn.executemany('INSERT INTO projects (title, description, link) VALUES (?, ?, ?)', projects)
    conn.commit()
    conn.close()
    return jsonify({'message': 'Sample projects added.'})

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

if __name__ == '__main__':
    app.run(debug=True)
