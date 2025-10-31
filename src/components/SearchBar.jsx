import { useState } from "react";

export default function SearchBar({onSearch}) {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        onSearch(e.target.value);
    }

    return (
        <div className="px-1">
        <input type="text"
        placeholder="Search users"
        value={search}
        onChange={handleSearch}
        className="flex w-full rounded-full border border-gray-300 px-4 py-2 focus:border-sky-900 focus:outline-none"
        />
        </div>
    );
    
}