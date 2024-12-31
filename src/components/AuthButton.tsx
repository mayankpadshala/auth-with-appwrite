import React from 'react'

const AuthButton = ({
    type,
    loading
}: {
    type: "login" | "signup",
    loading: boolean
}) => {
  return (
    <button
        disabled={loading}
        type='submit'
        className={`${
            loading
                ? 'bg-gray-600'
                : 'bg-blue-600'
        } rounded-md w-full px-12 py-3 text-sm font-medium text-white`}
    >
        {loading
        ? 'Loading...'
        : type === 'login'
            ? 'Sign In'
            : 'Sign Up'}
    </button>
  )
}

export default AuthButton