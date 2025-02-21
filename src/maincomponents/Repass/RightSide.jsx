
import { useState } from 'react';


export default function RightSide() {

    // const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (

    <>
    
    <div className="w-full md:w-3/5 my-uto px-4 md:px-0 mt-8">
          
          <div className="max-w-md mx-auto">


          <p className="text-gray-500 bg-orang-600 text-[22px]">
              Your new password must be different from previous used password
            </p>
            
            <form className="space-y-6 mt-5">
            

            <div className='relative'>
            
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>

                <i className="fa-solid fa-lock absolute left-3 top-[38px]  text-gray-400 "></i>

            
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full pl-10 px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Your Password"
                  required
                />
            
              </div>


              <div className='relative'>
            
                <label htmlFor="conpassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>


                <i className="fa-solid fa-lock absolute left-3 top-[38px]  text-gray-400 "></i>
            
                <input
                  type="password"
                  id="conpassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full pl-10 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Your Password"
                  required
                />
            
              </div>

              


              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 mt-14 border border-transparent rounded-full shadow-sm text-sm font-medium text-[18px] text-white bg-[#4169E1] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset Password
              </button>
            
            </form>

            
          </div>
        </div>

    </>

  )

}