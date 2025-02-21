


import { useState } from 'react';
import SocialLogin from './../SignUp/SocialLogin';

export default function RightSide() {

    const [phoneNum, setPhoneNum] = useState('')

    return (

    <>
    
    <div className="w-full md:w-3/5  px-4 md:px-0 mt-8  ">
          
          <div className="max-w-md mx-auto">

          <p className="text-gray-500 bg-orang-600 text-[22px]">
              We will send you a One Time Password on this phone number
            </p>

            <form className="space-y-7 mt-12 bg--500  ">
    

              <div>
            
                <label htmlFor="phoneNum" className="block text-sm mb-3 font-medium text-gray-700">
                  Phone Number
                </label>
            
                <input
                  type="tel"
                  id="phoneNum"
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Your Phone Number"
                  required
                />
            
              </div>


              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm  font-medium text-white bg-[#4169E1] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send OTP
              </button>
            
            </form>
            
          </div>
        </div>

    </>

  )

}