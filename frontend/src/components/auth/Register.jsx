import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { regUser } from '../../api/user.api'

const Register = ({ onSuccess }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const registerMutation = useMutation({
    mutationFn: async ({ name, password, email }) => {
      const data = await regUser(name, password, email)
      return data
    },
    onSuccess: (data) => {
      console.log('Register success:', data)
      if (onSuccess) onSuccess(data.user || data)
    },
    onError: (err) => {
      const errMsg = err.response?.data?.message || err.message || 'Registration failed'
      console.error('Register error:', errMsg, err)
      setError(errMsg)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    registerMutation.mutate({ name, password, email })
  }

  const loading = registerMutation.isPending

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm animate-in fade-in slide-in-from-top-2 duration-300 flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}
      <div className="space-y-1">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-white/50 border border-[#373737]/10 rounded-full px-6 py-3.5 text-[#373737] placeholder-[#373737]/40 focus:outline-none focus:ring-1 focus:ring-[#7FAB4F] transition-all"
        />
      </div>

      <div className="space-y-1">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-white/50 border border-[#373737]/10 rounded-full px-6 py-3.5 text-[#373737] placeholder-[#373737]/40 focus:outline-none focus:ring-1 focus:ring-[#7FAB4F] transition-all"
        />
      </div>

      <div className="space-y-1">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-white/50 border border-[#373737]/10 rounded-full px-6 py-3.5 text-[#373737] placeholder-[#373737]/40 focus:outline-none focus:ring-1 focus:ring-[#7FAB4F] transition-all"
        />
      </div>

      <div className="pt-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => window.location.href = 'https://url-shortner-x857.onrender.com/auth/google'}
          className="flex-1 px-6 py-3.5 rounded-full border border-[#373737]/10 hover:bg-white/50 flex items-center justify-center gap-2 transition-all group cursor-pointer"
        >
          <svg className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4" />
            <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853" />
            <path d="M5.50253 14.3003C5.00236 12.8099 5.00236 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC05" />
            <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335" />
          </svg>
          <span className="text-sm font-medium text-[#373737]">Google</span>
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#7FAB4F] hover:bg-[#6A9140] text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-lg shadow-[#7FAB4F]/20 active:scale-95 flex items-center justify-center cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Creating...' : (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transform rotate-0">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="ml-2">Register</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default Register
