import React, { useEffect, useState } from "react";

const Profile = () => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch("/assets/details.json")
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, []);

  if (!details) return <p>Loading profile...</p>;

  return (
    <>
      <img src="/assets/ayush.jpg" alt={details.name} className="profile-img" />
      <h2 className="profile-name">{details.name}</h2>
      <p className="profile-role">{details.role}</p>
      <p className="profile-bio">
        {details.bio ||
          "A passionate Computer Science graduate driven to solve real-world challenges and proficient in full-stack development fundamentals. Gained practical experience through an internship, academic coursework, and personal projects. Eager to contribute to a growth-oriented organization while continuously developing skills and delivering value through innovative solutions."}
      </p>
      <div className="profile-links">
        <a
          href={
            details.GitHub
              ? `https://github.com/${details.GitHub}`
              : "https://github.com/ayushchhipa1509"
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
        <a
          href={details.LinkedIn || "https://linkedin.com/in/ayushchhipa1509"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.156 1.459-2.156 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
          </svg>
        </a>
        <a href={`mailto:${details.Email || "ayushchhipa1509@gmail.com"}`}>
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12.713l-11.985-8.713h23.97l-11.985 8.713zm11.985-10.713h-23.97c-1.104 0-2.015.896-2.015 2v16c0 1.104.911 2 2.015 2h23.97c1.104 0 2.015-.896 2.015-2v-16c0-1.104-.911-2-2.015-2zm-11.985 13.287l-11.985-8.713v14.426c0 1.104.911 2 2.015 2h23.97c1.104 0 2.015-.896 2.015-2v-14.426l-11.985 8.713z" />
          </svg>
        </a>
      </div>
      <div className="profile-info">
        <p>
          Email:{" "}
          <span className="profile-info-bold">
            {details.Email || "ayushchhipa1509@gmail.com"}
          </span>
        </p>
        <p>
          Location:{" "}
          <span className="profile-info-bold">
            {details.Location || "India"}
          </span>
        </p>
        {details["Mobile Number"] && (
          <p>
            Mobile:{" "}
            <span className="profile-info-bold">
              {details["Mobile Number"]}
            </span>
          </p>
        )}
      </div>
      <div className="profile-skills">
        <strong>Skills:</strong>
        <ul>
          {(
            details.skills || [
              "C++",
              "Python",
              "JavaScript",
              "Java",
              "HTML, CSS, React, Node.js, Express, Flask",
              "MongoDB, MySQL, SQLite",
              "Git, GitHub, VS Code, Postman",
            ]
          ).map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className="profile-projects">
        <strong>My Projects:</strong>
        <ul>
          {details.Portfolio && (
            <li>
              <a
                href={details.Portfolio}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#facc15", textDecoration: "underline" }}
              >
                Portfolio Website
              </a>
            </li>
          )}
          {details["Emotion-Recognition"] && (
            <li>
              <a
                href={details["Emotion-Recognition"]}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#facc15", textDecoration: "underline" }}
              >
                Emotion Recognition Project
              </a>
            </li>
          )}
        </ul>
      </div>
      <div style={{ marginTop: "1.5rem", width: "100%", textAlign: "center" }}>
        <a
          href="/assets/Ayush_Chhipa_Resume.pdf"
          download
          className="resume-btn"
        >
          Download My Resume
        </a>
      </div>
    </>
  );
};

export default Profile;
