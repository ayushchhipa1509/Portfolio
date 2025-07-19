import "./App.css";
import Projects from "./Projects";
import Profile from "./Profile";

function App() {
  return (
    <div className="portfolio-main">
      <Profile />
      <section className="projects-column">
        <h1 className="portfolio-title">Portfolio Projects</h1>
        <Projects />
      </section>
    </div>
  );
}

export default App;
