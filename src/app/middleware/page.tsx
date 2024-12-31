import { getLoggedInUser } from '@/actions/auth';
import React from 'react'

const Middleware = async () => {
  const user: UserDetails | null = await getLoggedInUser();
  return (
    <main className="flex flex-col h-full items-center justify-center">
      <h1 className="text-3xl">Middleware</h1>
      <p>{user?.email}</p>
    </main>
  )
}

export default Middleware