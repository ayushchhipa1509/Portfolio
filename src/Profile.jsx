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
    <aside className="profile-column animate-slide-in">
      <img
        src="/assets/ayush.jpg"
        alt={details.name}
        className="profile-photo animate-fade-in"
        style={{ marginLeft: 0 }}
      />
      <h2 className="profile-name animate-fade-in-delay">{details.name}</h2>
      <p className="profile-role animate-fade-in-delay2">{details.role}</p>
      <p className="profile-details animate-fade-in-delay3">
        A passionate Computer Science graduate driven to solve real-world
        challenges and proficient in full-stack development fundamentals. Gained
        practical experience through an internship, academic coursework, and
        personal projects. Eager to contribute to a growth-oriented organization
        while continuously developing skills and delivering value through
        innovative solutions.
      </p>
      <div
        className="profile-contact animate-fade-in-delay4"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2.5rem",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <span>
          <a
            href={`tel:${details["Mobile Number"]}`}
            style={{
              marginRight: "6px",
              display: "inline-flex",
              alignItems: "center",
            }}
            title="Call Mobile"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0077ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "4px" }}
            >
              <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13.81.28 1.61.46 2.39a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.78.18 1.58.33 2.39.46A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <strong>Mobile:</strong>
          </a>{" "}
          {details["Mobile Number"]}
        </span>
        <span>
          <a
            href={`mailto:${details.Email}`}
            style={{
              marginRight: "6px",
              display: "inline-flex",
              alignItems: "center",
            }}
            title="Send Email"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0077ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "4px" }}
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <polyline points="3 7 12 13 21 7" />
            </svg>
            <strong>Email:</strong>
          </a>{" "}
          {details.Email}
        </span>
        <span>
          <a
            href={details.LinkedIn}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginRight: "6px",
              display: "inline-flex",
              alignItems: "center",
            }}
            title="LinkedIn Profile"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0077ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "4px" }}
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <line x1="8" y1="11" x2="8" y2="16" />
              <line x1="8" y1="8" x2="8" y2="8" />
              <line x1="12" y1="16" x2="12" y2="11" />
              <path d="M16 16v-3a2 2 0 0 0-4 0" />
            </svg>
            <strong>LinkedIn:</strong>
          </a>{" "}
          Profile
        </span>
        <span>
          <a
            href={`https://github.com/${details.GitHub}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginRight: "6px",
              display: "inline-flex",
              alignItems: "center",
            }}
            title="GitHub Profile"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0077ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: "4px" }}
            >
              <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.36 6.84 9.72.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.41-1.07-1-1.36-1-1.36-.82-.57.06-.56.06-.56.91.07 1.39.95 1.39.95.81 1.41 2.13 1 2.65.77.08-.59.32-1 .58-1.23-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.38-2.03 1-2.75-.1-.26-.44-1.3.09-2.7 0 0 .83-.27 2.73 1.02a9.18 9.18 0 0 1 2.49-.34c.85 0 1.71.12 2.49.34 1.9-1.29 2.73-1.02 2.73-1.02.53 1.4.19 2.44.09 2.7.62.72 1 1.63 1 2.75 0 3.94-2.34 4.81-4.57 5.07.33.29.62.86.62 1.73 0 1.25-.01 2.26-.01 2.57 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
            </svg>
            <strong>GitHub:</strong>
          </a>
          {details.GitHub}
        </span>
      </div>
      <div className="profile-skills animate-fade-in-delay5">
        <strong>Skills:</strong>
        <ul>
          {details.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className="profile-projects animate-fade-in-delay6">
        <strong>My Projects:</strong>
        <ul>
          <li>
            <a
              href={details.Portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio Website
            </a>
          </li>
          <li>
            <a
              href={details["Emotion-Recognition"]}
              target="_blank"
              rel="noopener noreferrer"
            >
              Emotion Recognition Project
            </a>
          </li>
        </ul>
      </div>
      <div className="profile-resume animate-fade-in-delay7">
        <a
          href="/assets/Ayush_Chhipa_Resume.pdf"
          download
          className="resume-link"
        >
          Download My Resume
        </a>
      </div>
    </aside>
  );
};

export default Profile;
