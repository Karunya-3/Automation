import React from 'react';

function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 112px)', flexDirection: 'column', padding: '30px 15px 0', backgroundColor: '#ffffff' }}>
      <h1 className="fw-bold mb-4 text-center">NSTL - DRDO</h1>
      <h2 className="text-center mb-5" style={{ fontSize: '2.5rem', fontWeight: '700', color: '#276749' }}>
        IV&V Tool for Automation
      </h2>
      <div className="p-4 bg-light rounded shadow text-center" style={{ maxWidth: '650px', lineHeight: 1.6 }}>
        <p className="text-dark fs-5" style={{ color: '#276749', marginBottom: 0 }}>
          Welcome to the IV&V tool for automation, designed to streamline and enhance your verification and validation processes.
        </p>
      </div>
    </div>
  );
}

export default Home;
