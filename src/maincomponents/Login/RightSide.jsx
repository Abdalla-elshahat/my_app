


import { useState } from 'react';
import SocialLogin from './../SignUp/SocialLogin';

export default function RightSide() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (

    <>
    
    <div className="w-full md:w-3/5 my-auto px-4 md:px-0">
          
          <div className="max-w-md mx-auto">
            
            <form className="space-y-6 mt-5">
            
            <div className="relative">

  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    Email
  </label>

  <i className="fa-regular fa-envelope absolute left-3 top-[38px]  text-gray-400"></i>

  <input
    type="email"
    id="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="mt-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    placeholder="Enter Your Email"
    required
  />
            </div>



            <div className="relative">
  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
    Password
  </label>

  <i className="fa-solid fa-lock absolute left-3 top-[38px]  text-gray-400 "></i>

  <input
    type="password"
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    placeholder="Enter Your Password"
    required
  />
            </div>
                          

              <div className="flex items-center justify-end">
            
                <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot Password?
                </a>
            
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#4169E1] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Log in
              </button>
            
            </form>

            <SocialLogin/>
            
          </div>
        </div>

    </>

  )

}