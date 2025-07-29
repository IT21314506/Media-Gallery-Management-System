import logo from './logo.svg';
import './App.css';
// import Login from './components/Login';

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
        {/* Uncomment the line below to use the Login component */}
        {/* <Login /> */}
      </main>
    </div>
  );
}

export default App;
