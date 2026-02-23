import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchMusic } from '../redux/actions';

const SearchForm = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query) {
            dispatch(searchMusic(query));
            setQuery('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for music..."
                required
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;