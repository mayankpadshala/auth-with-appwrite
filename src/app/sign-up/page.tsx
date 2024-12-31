import { getLoggedInUser } from '@/actions/auth';
import SignUpForm from '@/components/SignUpForm'
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'

const SignUp = async () => {
  const user: UserDetails | null = await getLoggedInUser();
  if (user) redirect('/');
  return (
    <div className='w-full flex mt-20 justify-center'>
        <section className='flex flex-col w-[400px]'>
            <h1 className='text-3xl w-full text-center font-bold mb-6'>
                Sign Up
            </h1>
            <SignUpForm />
            <div className='mt-2 flex items-center'>
                <h1>Already have an account?</h1>
                <Link className='font-bold ml-2' href="/sign-in">
                    Sign In
                </Link>

            </div>
        </section>
    </div>
  )
}

export default SignUp