import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to Media Gallery Management System</h1>
        <p>
          Manage and explore your media files with ease.
        </p>
      </header>
      <main>
        <section>
          <h2>Features</h2>
          <ul>
            <li>Upload and organize media files</li>
            <li>Search and filter your gallery</li>
            <li>Preview images and videos</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
