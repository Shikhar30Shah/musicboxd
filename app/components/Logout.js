"use client";
import { useEffect } from 'react';

export default function Logout({session}) {

    useEffect(() => {
        if(session?.error === 'RefreshAccessTokenError'){
            fetch('/api/auth/logout');
        }
    }, []);
    return <div></div>;
}