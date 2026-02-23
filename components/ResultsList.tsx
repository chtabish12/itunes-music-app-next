import React, { useEffect, useState } from 'react';

const ResultsList = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchItems = async (pageNumber) => {
        setLoading(true);
        // Replace with your API endpoint
        const response = await fetch(`https://api.example.com/items?page=${pageNumber}`);
        const data = await response.json();
        setItems(prevItems => [...prevItems, ...data.items]);
        setLoading(false);
    };

    useEffect(() => {
        fetchItems(page);
    }, [page]);

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);

    return (
        <div>
            <ul>
                {items.map(item => (<li key={item.id}>{item.name}</li>))}
            </ul>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default ResultsList;