import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search by user, title, or tags" }) => {
    const [query, setQuery] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <form className="mt-2 mb-2" onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
            <input
                className="input mr-2"
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder={placeholder}
            />
            <button className="button is-primary" type="submit">Search</button>
        </form>
    );
};

export default SearchBar;