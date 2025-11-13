import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('[INIT] React app starting...');
console.log('React version:', React.version);
console.log('Root element:', document.getElementById('root'));

try {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('[ERROR] Root element not found!');
    document.body.innerHTML = '<div style="color: white; padding: 20px; background: #ff0000;">ERROR: Root element not found!</div>';
  } else {
    console.log('[SUCCESS] Root element found, creating React root...');
    const root = ReactDOM.createRoot(rootElement);
    
    console.log('[SUCCESS] React root created, rendering App...');
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('[SUCCESS] App rendered successfully!');
  }
} catch (error) {
  console.error('[ERROR] Error during React initialization:', error);
  document.body.innerHTML = '<div style="color: white; padding: 20px; background: #ff0000;">ERROR: ' + error.message + '</div>';
}
