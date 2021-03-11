import React from 'react';
import logo from './logo.svg';
import './App.css';
import Captcha from './Captcha';

function App() {
  const testObject = {
    testName: 'name',
    testNumber: 2,
    testOther: 'other',
    testFunction: () => { },
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
    </a>
        <Captcha
          name="Hi"
          sampleAsObject={testObject}
        />
      </header>
    </div>
  );
}

export default App;
