import React from 'react';
import { useParams } from 'react-router-dom';

const JokeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch joke details based on the id and display them

  return (
    <div>
      <h2>Joke Details</h2>
      <p>Joke ID: {id}</p>
      {/* Display joke details */}
    </div>
  );
};

export default JokeDetails;
