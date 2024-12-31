import { getLoggedInUser } from '@/actions/auth';
import { redirect } from 'next/navigation';
import React from 'react'

const Server = async () => {
  const user: UserDetails | null = await getLoggedInUser();
  if (!user) redirect('/sign-in');
  return (
    <main className="flex flex-col h-full items-center justify-center">
      <h1 className="text-3xl">Server</h1>
      <p>{user?.email}</p>
    </main>
  )
}

export default Server