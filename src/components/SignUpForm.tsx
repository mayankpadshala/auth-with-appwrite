'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import AuthButton from './AuthButton'
import { signUp } from '@/actions/auth'

// Define the SignUpForm component
const SignUpForm = () => {

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    console.log(event.target);

    const formData = new FormData(event.currentTarget);
    const result = await signUp(formData);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      router.push('/')
    }
    setLoading(false);
  }

  return (
    <div>
        {/* Render the form */}
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
            <div>
                <label className='block text-sm font-medium text-gray-200'>
                    Username
                </label>
                {/* Input for username */}
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
                {/* Input for email */}
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
                {/* Input for password */}
                <input
                    type='password'
                    placeholder='password'
                    id='password'
                    name='password'
                    className='mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200'
                />
            </div>
            <div className='mt4'>
                {/* Submit button */}
                <AuthButton type='signup' loading={loading} />
            </div>
            {error && <p className='text-red-500'>{error}</p>}
        </form>
    </div>
  )
}

// Export the SignUpForm component as the default export
export default SignUpForm