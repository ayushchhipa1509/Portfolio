import "./App.css";
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
    <>
      <div className="portfolio-main">
        <Profile />
        <section className="projects-column">
          <div className="about-section-static">
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
          </div>
          <div className="cert-section">
            <h2>🏆 Certifications & Achievements</h2>
            <ul>
              <li>
                Certificate in Cyber Security
                <a
                  href="/assets/cyber_security_certificate.pdf"
                  download
                  className="cert-link"
                >
                  (Download)
                </a>
              </li>
              <li>Hackathon Winner - 3rd Position</li>
              <li>45 Days Internship in MERN Stack</li>
            </ul>
          </div>
          <h1 className="portfolio-title">Portfolio Projects</h1>
          <Projects />
        </section>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
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
        />
        <button type="submit">Send Message</button>
      </form>
      <Messages />
    </>
  );
}

export default App;
