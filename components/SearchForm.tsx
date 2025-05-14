"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";

const SearchForm = ({ query }: { query?: string }) => {
    const router = useRouter();

    const [search, setSearch] = useState(query || "");
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        // Show/hide buttons based on input
        setShowButtons(search.trim().length > 0);
    }, [search]);

    const handleReset = () => {
        setSearch("");
        setShowButtons(false);
        router.push("/"); // clear query param
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent page reload
        const trimmed = search.trim();
        if (!trimmed) return;

        // Navigate with query param
        router.push(`/?query=${encodeURIComponent(trimmed)}`);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                name="query"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Startups..."
                className="search-input"
            />
            {showButtons && (
                <div className="flex gap-2 ml-2">
                    <Button
                        type="button"
                        onClick={handleReset}
                        className="search-btn text-white-100"
                    >
                        <X className="size-5" />
                    </Button>
                    <Button
                        type="submit"
                        className="search-btn text-white"
                        disabled={!search.trim()}
                    >
                        <Search className="size-5" />
                    </Button>
                </div>
            )}
        </form>
    );
};

export default SearchForm;
