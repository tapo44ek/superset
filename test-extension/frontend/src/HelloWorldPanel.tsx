import React, { useEffect, useState } from 'react';
import { authentication } from '@apache-superset/core';

const HelloWorldPanel: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const csrfToken = await authentication.getCSRFToken();
        const response = await fetch('/extensions/my-org/test-extension/message', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken!,
          },
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();
        setMessage(data.result.message);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3>Hello World Extension</h3>
      <div
        style={{
          padding: '16px',
          backgroundColor: '#f6ffed',
          border: '1px solid #b7eb8f',
          borderRadius: '4px',
          marginBottom: '16px',
        }}
      >
        <strong>{message}</strong>
      </div>
      <p>This message was fetched from the backend API! 🎉</p>
    </div>
  );
};

export default HelloWorldPanel;