
export default function SocialLogin() {
 
    return (

        <>
        
        <div className="mt-6">
      
      <div className="relative">
    
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>


      <div className="mt-6 flex gap-4 justify-center">
      
      <button className="p-2 border border-gray-300 rounded-full hover:bg-blue-700 hover:text-white">
      <i className="fa-brands fa-google w-5 h-5"></i>
      </button>
      
      <button className="p-2 border border-gray-300 rounded-full hover:bg-blue-700 hover:text-white">
      <i className="fa-brands fa-github w-5 h-5"></i>
      </button>

    </div>
    
    
    </div>

        </>

  )

}
