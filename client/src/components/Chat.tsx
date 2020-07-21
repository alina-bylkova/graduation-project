import React, { useState, useEffect } from 'react';

export default function Chat() {
  const cases: Array<String> = []; // fetch from db.
  const [case: Array, setCase] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {

  }, [case])

  const handleSubmit = (event: any) => { // maybe not any?
    event.preventDefault();
    const obj: any = {
      patientId: '5f16edf1f4368bb6ea96c6ee',
      issue: message,
      messages: [],
    };
    fetch('/api/cases', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(obj),
    });
    setCase([message]);
  };

  if (cases.length === 0) {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Please describe your problem!"
          onChange={event => {
            setMessage(event.target.value);
          }}
        />
        <input type="submit" placeholder="Submit" />
      </form>
    );
  } else {
    return <div></div>;
  }
} 
