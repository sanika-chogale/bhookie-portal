import React, { useState } from 'react';
import './index.css';
import bhxLogo from './assets/bhx-logo.png';

function App() {
  const [activeFrame, setActiveFrame] = useState(null);
  const [user] = useState({ name: 'Raj' });
  const currentDate = new Date().toLocaleString();

  const openInFrame = (url) => {
    setActiveFrame(url);
    document.title = 'BHX Portal | ' + url.replace('https://', '');
  };

  const closeFrame = () => {
    setActiveFrame(null);
    document.title = 'BHX Portal';
  };

  const links = [
    { name: 'POS', url: 'https://bhookiepossystem.web.app/' },
    { name: 'Database', url: 'https://bhookie-maindatabase2.web.app/' },
    { name: 'Haccp', url: 'https://haccp-form.web.app/' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {activeFrame ? (
        <div className="flex flex-col h-screen">
          <div className="bg-black p-4 border-b-2 border-orange-600 flex justify-between items-center">
            <img 
              src={bhxLogo} 
              alt="BHX Logo" 
              className="h-10"
            />
            <button 
              onClick={closeFrame}
              className="bg-orange-600 text-black px-4 py-2 rounded font-bold hover:bg-orange-700 transition-colors"
            >
              ← Back to Portal
            </button>
          </div>
          <div className="iframe-container">
            <iframe 
              src={activeFrame} 
              title="BHX Portal Frame"
              className="portal-frame"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          {/* Header with Logo */}
          <header className="bg-black p-4 border-b-2 border-orange-600">
            <div className="flex justify-between items-center">
              <img 
                src={bhxLogo} 
                alt="BHX Logo" 
                className="h-12"
              />
              <div className="flex items-center space-x-4">
                <div className="text-xl text-white">
                  Hi {user.name}!
                </div>
                <div className="text-sm text-gray-400">
                  {currentDate}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-8">Bhookie Portal</h1>
            
            <div className="w-full max-w-md space-y-4">
              {links.map((link, index) => (
                <div 
                  key={index}
                  className="bg-orange-600 text-black p-6 rounded-lg shadow-lg cursor-pointer transition-all hover:scale-105 hover:shadow-xl text-center"
                  onClick={() => openInFrame(link.url)}
                >
                  <h2 className="text-xl md:text-2xl font-bold">{link.name}</h2>
                </div>
              ))}
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-black p-4 border-t-2 border-orange-600 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} BHX Portal. All rights reserved.
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;