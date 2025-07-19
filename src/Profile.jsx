import React, { useEffect, useState } from "react";
import ayushPhoto from "./assets/ayush.jpg";

const Profile = () => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch("src/assets/details.json")
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, []);

  if (!details) return <p>Loading profile...</p>;

  return (
    <aside className="profile-column">
      <img src={ayushPhoto} alt={details.name} className="profile-photo" />
      <h2 className="profile-name">{details.name}</h2>
      <p className="profile-role">{details.role}</p>
      <p className="profile-details">{details.description}</p>
      <div className="profile-contact">
        <p>
          <strong>Mobile:</strong> {details["Mobile Number"]}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${details.Email}`}>{details.Email}</a>
        </p>
        <p>
          <strong>LinkedIn:</strong>{" "}
          <a href={details.LinkedIn} target="_blank" rel="noopener noreferrer">
            Profile
          </a>
        </p>
        <p>
          <strong>GitHub:</strong>{" "}
          <a
            href={`https://github.com/${details.GitHub}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {details.GitHub}
          </a>
        </p>
      </div>
      <div className="profile-skills">
        <strong>Skills:</strong>
        <ul>
          {details.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className="profile-projects">
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
    </aside>
  );
};

export default Profile;
