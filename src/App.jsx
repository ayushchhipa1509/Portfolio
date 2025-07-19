import "./App.css";
import Projects from "./Projects";
import Profile from "./Profile";
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
    </>
  );
}

export default App;
