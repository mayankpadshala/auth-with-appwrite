'use client';

import { signOut } from '@/actions/auth';
import React, { useState } from 'react'


const Logout = () => {
    const [loading, setLoading] = useState(false);

    const handleLogout = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        await signOut();
        setLoading(false);
    }
    return (
        <div className='bg-gray-600 text-white text-sm px-4 py-2 rounded-md cursor-auto'>
            <form onSubmit={handleLogout}>
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing out...' : 'Signout'}
                </button>
            </form>
        </div>
    )
}

export default Logout