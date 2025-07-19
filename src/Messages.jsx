import React, { useEffect, useState } from "react";

const Messages = () => {
  const handleDelete = (id) => {
    fetch(
      `http://localhost:5000/messages/${id}?password=${encodeURIComponent(
        password
      )}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessages((msgs) => msgs.filter((msg) => msg.id !== id));
        } else {
          alert(data.error || "Failed to delete message");
        }
      })
      .catch(() => alert("Failed to delete message"));
  };
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(true);

  const fetchMessages = (pwd) => {
    setLoading(true);
    fetch(`http://localhost:5000/messages?password=${encodeURIComponent(pwd)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setMessages([]);
        } else {
          setMessages(data.messages);
          setError(null);
          setShowForm(false);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch messages");
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMessages(password);
  };

  if (showForm || error) {
    return (
      <form className="messages-box" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">View Messages</button>
        {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
      </form>
    );
  }

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="messages-box">
      <h2>Received Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>
              <strong>{msg.name}</strong> (
              <a href={`mailto:${msg.email}`}>{msg.email}</a>)<br />
              <span>{msg.message}</span>
              <button
                style={{
                  marginLeft: 12,
                  color: "#fff",
                  background: "#d32f2f",
                  border: "none",
                  borderRadius: 4,
                  padding: "4px 10px",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(msg.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Messages;
