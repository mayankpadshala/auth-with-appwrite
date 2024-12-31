import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="border-b bg=background w-full flex items-center">
        <div className="flex w-full items-center justify-between my-4">
            <Link className="font-bold" href="/">
                Home
            </Link>
            <div className='flex items-center gap-x-5'>
                <Link href="/middleware">Middleware</Link>
                <Link href="/server">Server</Link>
            </div>
            <div className='flex items-center gap-x-5'>
                <Link href="/sign-in">
                <div className='bg-blue-600 text-white text-sm px-4 py-2 rounded-md'>
                    Sign In
                </div>
                </Link>
            </div>
        </div>
    </nav>
  )
}

export default Navbar