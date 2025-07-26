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
    conn.execute('''
        CREATE TABLE IF NOT EXISTS blogs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            excerpt TEXT NOT NULL,
            content TEXT,
            date TEXT NOT NULL,
            category TEXT NOT NULL,
            emoji TEXT NOT NULL,
            link TEXT
        )
    ''')
    conn.execute('DELETE FROM projects')
    conn.execute('DELETE FROM blogs')
    conn.commit()
    projects = [
        ('Portfolio Website', 'A personal portfolio built with React and Flask.', 'https://github.com/ayushchhipa1509/Portfolio'),
        ('Emotion Recognition Project', 'A machine learning project to detect emotions from textual data using Python.', 'https://github.com/ayushchhipa1509/Emotion-Recognition'),
        ('Arduino Motor Car', 'A robotics project to control a motor car using Arduino and sensors.', None)
    ]
    blogs = [
        ('Getting Started with React Hooks', 'Learn the basics of React Hooks and how they revolutionized functional components in React development.', 'React Hooks are a game-changer for functional components. They allow you to use state and other React features without writing a class component. In this post, I\'ll walk you through the most commonly used hooks like useState, useEffect, and useContext.\n\nuseState Hook:\nThe useState hook is the most basic hook that allows functional components to have state. Here\'s a simple example:\n\nconst [count, setCount] = useState(0);\n\nThis creates a state variable called count with an initial value of 0, and a function setCount to update it.\n\nuseEffect Hook:\nThe useEffect hook lets you perform side effects in functional components. It runs after every render and can be used for data fetching, subscriptions, or manually changing the DOM.\n\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);\n\nThis effect runs whenever the count changes and updates the document title.', '2024-01-15', 'Web Development', '⚛️', None),
        ('Building REST APIs with Flask', 'A comprehensive guide to creating robust REST APIs using Python Flask framework.', 'Flask is a lightweight and flexible Python web framework that makes building APIs simple and elegant. In this tutorial, I\'ll show you how to create a complete REST API with proper error handling, authentication, and database integration.\n\nSetting up Flask:\nFirst, install Flask and Flask-CORS:\npip install flask flask-cors\n\nBasic Flask App:\nfrom flask import Flask, jsonify, request\nfrom flask_cors import CORS\n\napp = Flask(__name__)\nCORS(app)\n\n@app.route(\'/\')\ndef home():\n    return jsonify({\'message\': \'Welcome to my API\'})\n\nif __name__ == \'__main__\':\n    app.run(debug=True)\n\nThis creates a basic Flask application with CORS enabled for cross-origin requests.', '2024-01-10', 'Backend Development', '🐍', None),
        ('Machine Learning for Beginners', 'An introduction to machine learning concepts and practical implementation.', 'Machine learning can seem intimidating at first, but it\'s actually quite accessible once you understand the fundamentals. In this post, I\'ll break down the key concepts and show you how to build your first ML model using Python and scikit-learn.\n\nWhat is Machine Learning?\nMachine Learning is a subset of artificial intelligence that enables computers to learn and make decisions without being explicitly programmed. It uses algorithms to identify patterns in data and make predictions.\n\nTypes of Machine Learning:\n1. Supervised Learning: Learning from labeled data\n2. Unsupervised Learning: Finding patterns in unlabeled data\n3. Reinforcement Learning: Learning through interaction with environment\n\nGetting Started:\nInstall required libraries:\npip install scikit-learn pandas numpy matplotlib\n\nSimple Linear Regression Example:\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\nimport numpy as np\n\n# Generate sample data\nX = np.random.rand(100, 1)\ny = 2 * X + 1 + np.random.rand(100, 1) * 0.1\n\n# Split data\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# Train model\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\n# Make predictions\npredictions = model.predict(X_test)', '2024-01-05', 'Machine Learning', '🤖', None),
        ('The Future of Web Development', 'Exploring emerging trends and technologies shaping the future of web development.', 'Web development is constantly evolving with new frameworks, tools, and methodologies. From serverless architecture to WebAssembly, let\'s explore what\'s coming next and how to prepare for the future of web development.\n\nEmerging Trends:\n1. Serverless Architecture: No server management required\n2. WebAssembly: Near-native performance in browsers\n3. Progressive Web Apps (PWAs): App-like web experiences\n4. JAMstack: JavaScript, APIs, and Markup\n5. Micro Frontends: Breaking down frontend monoliths\n\nTechnologies to Watch:\n- Next.js and Nuxt.js for full-stack React/Vue\n- Deno as an alternative to Node.js\n- Web Components for reusable UI elements\n- GraphQL for efficient data fetching\n- WebRTC for real-time communication\n\nPreparing for the Future:\n- Learn modern JavaScript (ES6+)\n- Understand cloud platforms (AWS, Azure, GCP)\n- Master containerization (Docker, Kubernetes)\n- Stay updated with new frameworks and tools\n- Focus on performance and accessibility', '2024-01-01', 'Technology Trends', '🚀', None),
        ('Cybersecurity Best Practices', 'Essential security practices every developer should know and implement.', 'Security is crucial in today\'s digital world. In this comprehensive guide, I\'ll cover the essential cybersecurity practices that every developer should implement, from input validation to secure authentication methods.\n\nInput Validation:\nAlways validate and sanitize user inputs to prevent injection attacks:\n\n// JavaScript example\nfunction validateEmail(email) {\n    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    return emailRegex.test(email);\n}\n\nAuthentication:\n- Use strong password hashing (bcrypt, Argon2)\n- Implement multi-factor authentication\n- Use JWT tokens with proper expiration\n- Store sensitive data encrypted\n\nData Protection:\n- Use HTTPS for all communications\n- Implement proper CORS policies\n- Sanitize data before database storage\n- Use parameterized queries to prevent SQL injection\n\nSecurity Headers:\nImplement security headers in your web applications:\n- Content-Security-Policy\n- X-Frame-Options\n- X-Content-Type-Options\n- Strict-Transport-Security', '2023-12-28', 'Cybersecurity', '🔒', None),
        ('Optimizing React Performance', 'Advanced techniques to improve your React application performance.', 'Performance optimization is crucial for providing a great user experience. Learn about React.memo, useMemo, useCallback, and other techniques to make your React apps faster and more efficient.\n\nReact.memo:\nUse React.memo to prevent unnecessary re-renders of components:\n\nconst MyComponent = React.memo(({ data }) => {\n    return <div>{data}</div>;\n});\n\nuseMemo:\nMemoize expensive calculations:\n\nconst expensiveValue = useMemo(() => {\n    return computeExpensiveValue(a, b);\n}, [a, b]);\n\nuseCallback:\nMemoize functions to prevent child re-renders:\n\nconst handleClick = useCallback(() => {\n    console.log(\'Button clicked\');\n}, []);\n\nCode Splitting:\nUse React.lazy for code splitting:\n\nconst LazyComponent = React.lazy(() => import(\'./LazyComponent\'));\n\nVirtual Scrolling:\nFor large lists, implement virtual scrolling to render only visible items.\n\nPerformance Monitoring:\n- Use React DevTools Profiler\n- Monitor bundle size with webpack-bundle-analyzer\n- Implement error boundaries\n- Use performance monitoring tools', '2023-12-20', 'Web Development', '⚡', None),
        ('Building a Chatbot with Python', 'Create an intelligent chatbot using Python and natural language processing techniques.', 'Chatbots are becoming increasingly popular in modern applications. In this tutorial, I\'ll show you how to build a simple but intelligent chatbot using Python and natural language processing.\n\nWhat You\'ll Learn:\n- Basic NLP concepts\n- Text preprocessing techniques\n- Pattern matching algorithms\n- Integration with messaging platforms\n\nGetting Started:\nFirst, install the required libraries:\npip install nltk chatterbot flask\n\nBasic Chatbot Implementation:\nfrom chatterbot import ChatBot\nfrom chatterbot.trainers import ChatterBotCorpusTrainer\n\n# Create a new chatbot\nchatbot = ChatBot(\'MyBot\')\n\n# Create a new trainer\ntrainer = ChatterBotCorpusTrainer(chatbot)\n\n# Train the chatbot\ntrainer.train("chatterbot.corpus.english")\n\n# Get a response\nresponse = chatbot.get_response("Hello, how are you?")\nprint(response)\n\nAdvanced Features:\n- Intent recognition\n- Entity extraction\n- Context management\n- Multi-language support\n\nIntegration with Web:\nYou can easily integrate your chatbot with web applications using Flask or FastAPI, making it accessible through web interfaces or APIs.', '2023-12-15', 'Machine Learning', '🤖', None),
        ('The Rise of No-Code Development', 'Exploring how no-code platforms are democratizing software development.', 'No-code development platforms are revolutionizing how we build software. These tools allow people with little to no programming experience to create powerful applications. Let\'s explore this exciting trend.\n\nWhat is No-Code?\nNo-code platforms provide visual interfaces and pre-built components that allow users to create applications without writing traditional code. This democratizes software development and makes it accessible to more people.\n\nPopular No-Code Platforms:\n1. Bubble - Web application builder\n2. Webflow - Website and CMS platform\n3. Zapier - Workflow automation\n4. Airtable - Database and app builder\n5. Notion - All-in-one workspace\n\nAdvantages:\n- Faster development cycles\n- Lower costs\n- No coding knowledge required\n- Rapid prototyping\n- Visual development\n\nLimitations:\n- Limited customization\n- Vendor lock-in\n- Scalability concerns\n- Security considerations\n\nThe Future:\nAs these platforms mature, we\'ll see more sophisticated applications being built without traditional coding. This trend will continue to grow, especially for business applications and internal tools.', '2023-12-10', 'Technology Trends', '🎨', None),
        ('Mastering Git and GitHub', 'Essential Git commands and GitHub workflows for collaborative development.', 'Git and GitHub are essential tools for modern software development. Whether you\'re working solo or in a team, mastering these tools will significantly improve your development workflow.\n\nBasic Git Commands:\n# Initialize a repository\ngit init\n\n# Add files to staging\ngit add .\n\n# Commit changes\ngit commit -m "Your commit message"\n\n# Push to remote\ngit push origin main\n\n# Pull latest changes\ngit pull origin main\n\nBranching Strategy:\n- main/master: Production-ready code\n- develop: Integration branch\n- feature branches: New features\n- hotfix branches: Emergency fixes\n\nGitHub Workflows:\n1. Fork and Clone: For contributing to open source\n2. Branch and Merge: For team collaboration\n3. Pull Requests: For code review\n4. Issues and Projects: For project management\n\nAdvanced Techniques:\n- Git rebase for clean history\n- Git cherry-pick for selective commits\n- Git stash for temporary changes\n- Git hooks for automation\n\nBest Practices:\n- Write meaningful commit messages\n- Use conventional commits\n- Keep commits atomic\n- Regular pushes and pulls\n- Use .gitignore effectively', '2023-12-05', 'Programming Tips', '📚', None),
        ('Building Mobile Apps with React Native', 'Cross-platform mobile development using React Native framework.', 'React Native allows you to build native mobile applications using JavaScript and React. This powerful framework enables you to write once and run on both iOS and Android platforms.\n\nWhy React Native?\n- Cross-platform development\n- Native performance\n- Large community\n- Hot reloading\n- Reusable components\n\nGetting Started:\nInstall React Native CLI:\nnpm install -g react-native-cli\n\nCreate a new project:\nnpx react-native init MyApp\n\nBasic Component:\nimport React from \'react\';\nimport { View, Text, StyleSheet } from \'react-native\';\n\nconst App = () => {\n  return (\n    <View style={styles.container}>\n      <Text style={styles.text}>Hello React Native!</Text>\n    </View>\n  );\n};\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: \'center\',\n    alignItems: \'center\',\n  },\n  text: {\n    fontSize: 24,\n    fontWeight: \'bold\',\n  },\n});\n\nKey Features:\n- Native modules\n- Platform-specific code\n- Navigation\n- State management\n- Performance optimization\n\nDeployment:\n- iOS: App Store via Xcode\n- Android: Google Play Store\n- Testing: Expo for rapid prototyping', '2023-11-30', 'Mobile Development', '📱', None)
    ]
    conn.executemany('INSERT INTO projects (title, description, link) VALUES (?, ?, ?)', projects)
    conn.executemany('INSERT INTO blogs (title, excerpt, content, date, category, emoji, link) VALUES (?, ?, ?, ?, ?, ?, ?)', blogs)
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

@app.route('/blogs')
def get_blogs():
    conn = get_db_connection()
    blogs = conn.execute('SELECT * FROM blogs ORDER BY date DESC').fetchall()
    conn.close()
    blogs_list = [
        {
            'id': blog['id'],
            'title': blog['title'],
            'excerpt': blog['excerpt'],
            'content': blog['content'],
            'date': blog['date'],
            'category': blog['category'],
            'emoji': blog['emoji'],
            'link': blog['link']
        }
        for blog in blogs
    ]
    return jsonify({'blogs': blogs_list})

@app.route('/blogs', methods=['POST'])
def create_blog():
    password = request.args.get('password')
    if password != ADMIN_PASSWORD:
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.get_json()
    title = data.get('title')
    excerpt = data.get('excerpt')
    content = data.get('content')
    category = data.get('category')
    emoji = data.get('emoji')
    
    if not title or not excerpt or not content or not category or not emoji:
        return jsonify({'error': 'All fields are required.'}), 400
    
    from datetime import datetime
    current_date = datetime.now().strftime('%Y-%m-%d')
    
    conn = get_db_connection()
    conn.execute('INSERT INTO blogs (title, excerpt, content, date, category, emoji) VALUES (?, ?, ?, ?, ?, ?)', 
                 (title, excerpt, content, current_date, category, emoji))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Blog created successfully.'})

@app.route('/blogs/<int:blog_id>', methods=['DELETE'])
def delete_blog(blog_id):
    password = request.args.get('password')
    if password != ADMIN_PASSWORD:
        return jsonify({'error': 'Unauthorized'}), 401
    
    conn = get_db_connection()
    conn.execute('DELETE FROM blogs WHERE id = ?', (blog_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Blog deleted successfully.'})

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
