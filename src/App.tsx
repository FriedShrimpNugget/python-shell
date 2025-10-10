import './App.css'

import React, { useState, useEffect } from 'react';
import { CodeEditor } from './components/Editor';

declare global {
  interface Window {
    loadPyodide: any;
  }
}

const App: React.FC = () => {
  const [code, setCode] = useState('print("Hello, Pyodide + Monaco!")');
  const [output, setOutput] = useState('');
  const [pyodide, setPyodide] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPy = async () => {
      setLoading(true);
      const py = await window.loadPyodide({
        stdout: (text: string) => setOutput((prev) => prev + text + '\n'),
        stderr: (text: string) => setOutput((prev) => prev + text + '\n'),
      });
      setPyodide(py);
      setLoading(false);
    };
    loadPy();
  }, []);

  const runPython = async () => {
    if (!pyodide) return;
    setOutput('');
    try {
      await pyodide.runPythonAsync(code);
    } catch (err) {
      setOutput(String(err));
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Python Shell</h1>
      {loading ? (
        <p>Loading Pyodide</p>
      ) : (
        <>
          <CodeEditor code={code} setCode={setCode} />
          <button
            onClick={runPython}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Run
          </button>
          <h2>Console Output:</h2>
          <pre
            style={{
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              padding: '10px',
              borderRadius: '5px',
              height: '200px',
              overflowY: 'scroll',
            }}
          >
            {output}
          </pre>
        </>
      )}
    </div>
  );
};

export default App;
