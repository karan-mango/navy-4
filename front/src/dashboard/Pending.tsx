import React from 'react';

export default function Pending() {
  const colors = [
    { name: 'Navy Light 1', code: '#5A72A0' },
    { name: 'Navy Light 2', code: '#83B4FF' },
    { name: 'Navy Light 3', code: '#3FA2F6' },
    { name: 'Navy Medium 1', code: '#0E46A3' },
    { name: 'Navy Medium 2', code: '#00215E' },

    { name: 'Navy Medium 3', code: '#1A2130' },
    { name: 'Success Green', code: '#28A745' },
    { name: 'Alert Red', code: '#DC3545' },
  ];

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    // alert(`Copied ${code} to clipboard!`);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px', gap: '20px', justifyContent: 'center' }}>
      {colors.map((color) => (
        <div
          key={color.code}
          onClick={() => copyToClipboard(color.code)}
          style={{
            backgroundColor: color.code,
            width: '150px',
            height: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <div>
            <div>{color.name}</div>
            <div>{color.code}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
