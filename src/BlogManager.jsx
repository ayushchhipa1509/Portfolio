import { useState } from "react";

function BlogManager({ onBlogCreated }) {
  const [showForm, setShowForm] = useState(false);
  const [password, setPassword] = useState("");
  const [blogData, setBlogData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    emoji: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/blogs?password=${password}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blogData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage("Blog created successfully!");
        setBlogData({
          title: "",
          excerpt: "",
          content: "",
          category: "",
          emoji: "",
        });
        setShowForm(false);
        if (onBlogCreated) {
          onBlogCreated();
        }
      } else {
        setMessage(data.error || "Failed to create blog.");
      }
    } catch (error) {
      setMessage("Failed to create blog.");
    }
  };

  const emojiOptions = [
    "📝",
    "⚛️",
    "🐍",
    "🤖",
    "🚀",
    "🔒",
    "⚡",
    "💻",
    "🎨",
    "📱",
    "🌐",
    "🔧",
    "📊",
    "🎯",
    "💡",
    "🔥",
    "⭐",
    "🎉",
    "📚",
    "🛠️",
  ];

  const categoryOptions = [
    "Web Development",
    "Backend Development",
    "Machine Learning",
    "Technology Trends",
    "Cybersecurity",
    "Mobile Development",
    "Data Science",
    "DevOps",
    "UI/UX",
    "Programming Tips",
  ];

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
      }}
    >
      <h2
        style={{
          color: "#0077ff",
          fontSize: "1.8rem",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        ✍️ Blog Manager
      </h2>

      {!showForm ? (
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: "#0077ff",
              color: "#fff",
              border: "none",
              padding: "0.8rem 2rem",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Write New Blog
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
              }}
            >
              Admin Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "1rem",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
              }}
            >
              Emoji:
            </label>
            <select
              name="emoji"
              value={blogData.emoji}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "1rem",
              }}
            >
              <option value="">Select an emoji</option>
              {emojiOptions.map((emoji, index) => (
                <option key={index} value={emoji}>
                  {emoji}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
              }}
            >
              Category:
            </label>
            <select
              name="category"
              value={blogData.category}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "1rem",
              }}
            >
              <option value="">Select a category</option>
              {categoryOptions.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
              }}
            >
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "1rem",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
              }}
            >
              Excerpt (Short Description):
            </label>
            <textarea
              name="excerpt"
              value={blogData.excerpt}
              onChange={handleChange}
              required
              rows="3"
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "1rem",
                resize: "vertical",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
              }}
            >
              Content (Full Blog):
            </label>
            <textarea
              name="content"
              value={blogData.content}
              onChange={handleChange}
              required
              rows="10"
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "1rem",
                resize: "vertical",
              }}
            />
          </div>

          {message && (
            <div
              style={{
                padding: "0.8rem",
                borderRadius: "6px",
                background: message.includes("successfully")
                  ? "#d4edda"
                  : "#f8d7da",
                color: message.includes("successfully") ? "#155724" : "#721c24",
                border: `1px solid ${
                  message.includes("successfully") ? "#c3e6cb" : "#f5c6cb"
                }`,
              }}
            >
              {message}
            </div>
          )}

          <div
            style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
          >
            <button
              type="submit"
              style={{
                background: "#0077ff",
                color: "#fff",
                border: "none",
                padding: "0.8rem 2rem",
                borderRadius: "6px",
                fontSize: "1rem",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Publish Blog
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setMessage("");
                setBlogData({
                  title: "",
                  excerpt: "",
                  content: "",
                  category: "",
                  emoji: "",
                });
              }}
              style={{
                background: "#6c757d",
                color: "#fff",
                border: "none",
                padding: "0.8rem 2rem",
                borderRadius: "6px",
                fontSize: "1rem",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default BlogManager;
