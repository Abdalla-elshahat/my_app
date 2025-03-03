
import googlePhot from '../../assets/google.png'

import githubPhot from '../../assets/github.png'


export default function SocialLogin() {
 
    return (

        <>
        
        <div className="mt-3">
      
      <div className="relative">
    
        <div className="absolute inset-0 bg-re-500 flex items-center">
          <div className="w-1/2 mx-auto border-t border-gray-400" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-700 text-xl">or</span>
        </div>
      </div>


      <div className="mt-3 flex gap-4 justify-center">
      
      <button className="p-2 border border-gray-100 rounded-full ">
      <img src = {googlePhot} className='w-[22px]' alt="" />
      </button>
      
      <button className="p-2 border border-gray-100 rounded-full ">
      <img src = {githubPhot}  className='w-[22px]' alt="" />
      </button>

    </div>
    
    
    </div>

        </>

  )

}
