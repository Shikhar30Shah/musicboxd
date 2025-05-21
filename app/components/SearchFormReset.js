"use client";

import { X } from "lucide-react";

const { default: Link } = require("next/link");

const SearchFormReset = () => {

    const reset = () => {
        const input = document.querySelector('.search-form');
        if(input)
            input.reset();
    }
    return (
        <button type="reset" onClick={reset}>
            <Link href='/' className="search-btn">
                <X className="size-5"/>
            </Link>
        </button>
    )
}

export default SearchFormReset;