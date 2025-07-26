import { useState, useEffect } from "react";
import BlogManager from "./BlogManager";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showWriteBlog, setShowWriteBlog] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/blogs");
      const data = await response.json();
      setBlogs(data.blogs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseBlog = () => {
    setSelectedBlog(null);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (selectedBlog) {
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h2 style={{ color: "#0077ff", fontSize: "1.8rem", margin: 0 }}>
            {selectedBlog.emoji} {selectedBlog.title}
          </h2>
          <button
            onClick={handleCloseBlog}
            style={{
              background: "#6c757d",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            padding: "0.5rem 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <span
            style={{ fontSize: "0.9rem", color: "#888", fontStyle: "italic" }}
          >
            {selectedBlog.date}
          </span>
          <span
            style={{
              background: "#0077ff",
              color: "#fff",
              padding: "0.3rem 0.8rem",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: "500",
            }}
          >
            {selectedBlog.category}
          </span>
        </div>
        <div
          style={{
            lineHeight: "1.8",
            fontSize: "1.1rem",
            color: "#333",
            whiteSpace: "pre-wrap",
          }}
        >
          {selectedBlog.content}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h2
          style={{
            color: "#0077ff",
            fontSize: "2rem",
            margin: 0,
          }}
        >
          📝 My Blog
        </h2>
        <button
          onClick={() => setShowWriteBlog(true)}
          style={{
            background: "#0077ff",
            color: "#fff",
            border: "none",
            padding: "0.8rem 1.5rem",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          ✍️ Write Blog
        </button>
      </div>

      {showWriteBlog ? (
        <div style={{ marginTop: "2rem" }}>
          <BlogManager
            onBlogCreated={() => {
              setShowWriteBlog(false);
              fetchBlogs();
            }}
          />
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {blogs.map((blog) => (
            <div
              key={blog.id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
                border: "1px solid #e1e5e9",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              onClick={() => handleBlogClick(blog)}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-4px)";
                e.target.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 2px 12px rgba(0, 0, 0, 0.08)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "1.5rem",
                    color: "#0077ff",
                  }}
                >
                  {blog.emoji}
                </span>
                <h3
                  style={{
                    margin: 0,
                    color: "#222",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                  }}
                >
                  {blog.title}
                </h3>
              </div>
              <p
                style={{
                  color: "#666",
                  marginBottom: "1rem",
                  lineHeight: "1.6",
                }}
              >
                {blog.excerpt}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "#888",
                    fontStyle: "italic",
                  }}
                >
                  {blog.date}
                </span>
                <span
                  style={{
                    background: "#0077ff",
                    color: "#fff",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: "500",
                  }}
                >
                  {blog.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;
