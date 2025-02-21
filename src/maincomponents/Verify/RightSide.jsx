


import { useState } from 'react';

export default function RightSide() {

    // const [phoneNum, setPhoneNum] = useState('')

    return (

    <>
    
    <div className="w-full md:w-3/5  px-4 md:px-0 mt-8  ">
          
          <div className="max-w-md mx-auto">

          <p className="text-gray-500 bg-orang-600 text-[22px]">
              Enter the OTP sent to your number
            </p>

            <form className="space-y-7 mt-12 bg--500  ">
    

             <div className="inputs flex justify-evenly mb-20">

             <div>
            
            <input
              type="text"
              id="Num"
              className="mt-1 w-[50px] h-[50px] block px-3 py-2 text-center bg-gray-200 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
        
             </div>

             <div>
            
            <input
              type="text"
              id="Num"
              className="mt-1 w-[50px] h-[50px] block px-3 py-2 text-center bg-gray-200  border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
        
             </div>

             <div>
            
            <input
              type="text"
              id="Num"
              className="mt-1 w-[50px] h-[50px] block px-3 py-2 text-center bg-gray-200  border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
        
             </div>

             <div>
            
            <input
              type="text"
              id="Num"
              className="mt-1 w-[50px] h-[50px] block px-3 py-2 text-center bg-gray-200  border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
        
             </div>


             </div>
              


              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm  font-medium text-[18px] text-white bg-[#4169E1] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
            
            </form>
            
          </div>
        </div>

    </>

  )

}