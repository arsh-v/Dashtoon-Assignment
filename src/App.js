import { useState } from 'react';
import './App.css';
import Dashboard from './pages/dashboard';

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="App">
      <Dashboard loading={loading} setLoading={setLoading} />
      {loading && <div className='loading-overlay'><span className='loader'></span><p>Generating Image...</p></div>}
    </div>
  );
}

export default App;
