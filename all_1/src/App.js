import React, { useState, useEffect } from 'react';
import './index.css';
import bhxLogo from './assets/bhx-logo.png';

function App() {
  const [activeFrame, setActiveFrame] = useState(null);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    const savedFrame = localStorage.getItem('activeFrame');
    if (savedFrame) {
      setActiveFrame(savedFrame);
    }
  }, []);

  const openInFrame = (url) => {
    setActiveFrame(url);
    localStorage.setItem('activeFrame', url);
    setIframeKey(prev => prev + 1);
    document.title = 'BHX Portal';
  };

  const closeFrame = () => {
    setActiveFrame(null);
    localStorage.removeItem('activeFrame');
    document.title = 'BHX Portal';
  };

  const links = [
    { name: 'POS', url: 'https://bhookiepossystem.web.app/' },
    { name: 'Database', url: 'https://bhookie-maindatabase2.web.app/' },
    { name: 'Haccp', url: 'https://haccpform.web.app/' },
    { name: 'Attendance', url: 'https://attendance-bhx.web.app/' }
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
            <div className="flex space-x-2">
              <button 
                onClick={closeFrame}
                className="bg-orange-600 text-black px-4 py-2 rounded font-bold hover:bg-orange-700 transition-colors"
              >
                ← Back to Portal
              </button>
            </div>
          </div>
          <div className="iframe-container">
            <iframe 
              src={activeFrame} 
              title="BHX Portal Frame"
              className="portal-frame"
              key={iframeKey}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <header className="bg-black p-4 border-b-2 border-orange-600">
            <div className="flex justify-between items-center">
              <img 
                src={bhxLogo} 
                alt="BHX Logo" 
                className="h-12"
              />
            </div>
          </header>

          <main className="flex-grow flex flex-col items-center justify-center p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl px-4">
              {links.map((link, index) => (
                <div 
                  key={index}
                  className={`bg-orange-600 text-black p-4 rounded-lg shadow-lg cursor-pointer transition-all hover:scale-105 hover:shadow-xl text-center ${
                    link.name === 'Attendance' ? 'min-w-[150px]' : 'min-w-[200px]'
                  }`}
                  onClick={() => openInFrame(link.url)}
                >
                  <h2 className="text-xl md:text-xl">{link.name}</h2>
                </div>
              ))}
            </div>
          </main>

          <footer className="bg-black p-4 border-t-2 border-orange-600 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} BHX Portal. All rights reserved.
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;