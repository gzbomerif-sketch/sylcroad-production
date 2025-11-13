import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  console.log('🎨 App component rendering...');
  
  try {
    return (
      <div className="App">
        <Dashboard />
      </div>
    );
  } catch (error) {
    console.error('❌ Error in App component:', error);
    return (
      <div style={{ color: 'white', padding: '20px', background: '#ff0000' }}>
        ERROR in App: {error.message}
      </div>
    );
  }
}

export default App;
