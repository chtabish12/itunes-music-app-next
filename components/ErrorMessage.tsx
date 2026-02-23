import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div style={{ color: 'red', border: '1px solid red', padding: '10px', borderRadius: '5px' }}>
            <strong>Error:</strong> {message}
        </div>
    );
};

export default ErrorMessage;