import React from 'react';

const EmptyState: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>No Data Available</h2>
            <p>Please check back later or try a different search.</p>
        </div>
    );
};

export default EmptyState;