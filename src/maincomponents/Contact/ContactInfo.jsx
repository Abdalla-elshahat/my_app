
export default function ContactInfo() {

    return (

        <>
        
         {/* Contact Information */}

         <div className="w-full lg:w-1/3 space-y-6 sm:space-y-9 p-4 sm:p-6 rounded-lg">
         
           <div className="flex items-center space-x-2 sm:space-x-3">
             <div className="bg-[#4169E1] rounded-full w-10 h-10 flex items-center justify-center shrink-0">
               <i className="fa-regular fa-envelope text-white text-lg"></i>
             </div>
             <span className="text-gray-600 font-bold text-sm sm:text-base">support@arabdev.com</span>
           </div>

           <div className="flex items-center space-x-2 sm:space-x-3">
             <div className="bg-[#4169E1] rounded-full w-10 h-10 flex items-center justify-center shrink-0">
               <i className="fa-solid fa-phone text-white text-lg"></i>
             </div>
             <span className="text-gray-600 font-bold text-sm sm:text-base">+123-456-789</span>
           </div>

           <div className="flex items-center space-x-2 sm:space-x-3">
             <div className="bg-[#4169E1] rounded-full w-10 h-10 flex items-center justify-center shrink-0">
               <i className="fa-solid fa-location-dot text-white text-lg"></i>
             </div>
             <span className="text-gray-600 font-bold text-sm sm:text-base">Tanta, Gharbia, Egypt</span>
           </div>
         </div>


        
        </>

  )

}
