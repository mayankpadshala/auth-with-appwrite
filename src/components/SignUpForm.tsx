'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import AuthButton from './AuthButton'

const SignUpForm = () => {

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.target);

    const formData = new FormData(event.currentTarget);
    // TODO - create server action for sign up
    const result = null;

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/')
    }
    setLoading(false);

  }

  return (
    <div>
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
            <div>
                <label className='block text-sm font-medium text-gray-200'>
                    Username
                </label>
                <input
                    type='text'
                    placeholder='Username'
                    id='username'
                    name='username'
                    className='mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200'
                />
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-200'>
                    Email
                </label>
                <input
                    type='email'
                    placeholder='Email'
                    id='Email'
                    name='email'
                    className='mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200'
                />
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-200'>
                    Password
                </label>
                <input
                    type='password'
                    placeholder='=password'
                    id='password'
                    name='password'
                    className='mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200'
                />
            </div>
            <div className='mt4'>
                <AuthButton type='signup' loading={loading} />
            </div>
            {error && <p className='text-red-500'>{error}</p>}
        </form>
    </div>
  )
}

export default SignUpForm