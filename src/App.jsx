import "./index.css";
import Projects from "./Projects";
import Profile from "./Profile";
import Messages from "./Messages";
import { useState } from "react";

function App() {
  const [contact, setContact] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Message sent!");
        setContact({ name: "", email: "", message: "" });
      } else {
        alert(data.error || "Failed to send message.");
      }
    } catch (err) {
      alert("Failed to send message.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav>
        <div className="brand">Ayush Portfolio</div>
        <ul>
          <li>
            <a href="#welcome">Home</a>
          </li>
          <li>
            <a href="#about">About Me</a>
          </li>
          <li>
            <a href="#cert">Certifications</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <a href="#messages">Admin</a>
          </li>
        </ul>
      </nav>
      {/* Hero Slide */}
      <div
        id="welcome"
        style={{
          background: "linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "3rem 1.5rem",
            maxWidth: "600px",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            Welcome to My Portfolio
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#e0e7ff",
              fontWeight: 500,
              marginBottom: "2rem",
            }}
          >
            Showcasing my journey, skills, and projects in Computer Science and
            Full-Stack Development.
          </p>
          <a
            href="#projects"
            style={{
              display: "inline-block",
              background: "#facc15",
              color: "#2563eb",
              fontWeight: 700,
              padding: "1rem 2.5rem",
              borderRadius: "2rem",
              boxShadow: "0 2px 8px #0002",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            View Projects
          </a>
        </div>
      </div>
      {/* Main Row Layout */}
      <div className="main-container">
        <aside className="profile">
          <Profile />
        </aside>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* About Section */}
          <section id="about">
            <h2>💡 About Me</h2>
            <p>
              Hi, I'm <strong>Ayush</strong>, a Computer Science graduate
              (B.Tech, 2025) passionate about full-stack web development and
              problem solving. I build scalable apps using the MERN stack,
              Python, and Flask, and love working on both frontend and backend.
              My goal is to create clean, user-friendly interfaces and
              contribute to impactful projects.
            </p>
            <ul>
              <li>Languages: C++, Python, JavaScript, Java</li>
              <li>Web: HTML, CSS, React, Node.js, Express, Flask</li>
              <li>Databases: MongoDB, MySQL, SQLite</li>
              <li>Tools: Git, GitHub, VS Code, Postman</li>
            </ul>
          </section>
          {/* Certifications Section */}
          <section id="cert">
            <h2>🏆 Certifications & Achievements</h2>
            <ul>
              <li>
                Certificate in Cyber Security
                <a
                  href="/assets/cyber_security_certificate.pdf"
                  download
                  style={{
                    marginLeft: 8,
                    color: "#2563eb",
                    textDecoration: "underline",
                  }}
                >
                  (Download)
                </a>
              </li>
              <li>Hackathon Winner - 3rd Position</li>
              <li>45 Days Internship in MERN Stack</li>
            </ul>
          </section>
          {/* Projects Section */}
          <section id="projects">
            <h1>Portfolio Projects</h1>
            <Projects />
          </section>
          {/* Contact Section */}
          <section id="contact">
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <h2>Contact Me</h2>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={contact.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={contact.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={contact.message}
                onChange={handleChange}
                required
                style={{ minHeight: 80 }}
              />
              <button type="submit">Send Message</button>
            </form>
          </section>
          {/* Admin Messages Section */}
          <section id="messages">
            <Messages />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
