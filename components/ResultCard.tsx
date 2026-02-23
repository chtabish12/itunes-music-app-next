import React from 'react';
import './ResultCard.css'; // Assume you have some styles here

const ResultCard = ({ result }) => {
    return (
        <div className="result-card">
            <img src={result.artworkUrl100} alt={result.trackName} className="result-card-image" />
            <h2 className="result-card-title">{result.trackName}</h2>
            <p className="result-card-artist">{result.artistName}</p>
            <p className="result-card-collection">{result.collectionName}</p>
            <p className="result-card-price">{result.collectionPrice ? `$${result.collectionPrice}` : 'Free'}</p>
        </div>
    );
};

export default ResultCard;