'use client';

import React from 'react';
import './ResultCard.css';

interface ResultCardProps {
  result: {
    artworkUrl100?: string;
    trackName?: string;
    artistName?: string;
    collectionName?: string;
    collectionPrice?: number;
    trackPrice?: number;
  };
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const price = result.trackPrice || result.collectionPrice;

  return (
    <div className="result-card">
      {result.artworkUrl100 && (
        <img
          src={result.artworkUrl100}
          alt={result.trackName || 'Album art'}
          className="result-card-image"
        />
      )}
      {result.trackName && <h2 className="result-card-title">{result.trackName}</h2>}
      {result.artistName && <p className="result-card-artist">{result.artistName}</p>}
      {result.collectionName && <p className="result-card-collection">{result.collectionName}</p>}
      {price && <p className="result-card-price">${price.toFixed(2)}</p>}
    </div>
  );
};

export default ResultCard;
