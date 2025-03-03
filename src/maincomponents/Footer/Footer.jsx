
import { MdOutlineEmail } from "react-icons/md";

import { LuPhone } from "react-icons/lu";

import { MdOutlineLocationOn } from "react-icons/md";

export default function Footer() {

    return (
        <>
        
        <footer className="bg-gradient-to-r from-[#3362C8] via-[#193062] to-[#264995] text-white p-6 sm:p-8 rounded-lg">

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-center sm:text-left place-items-center sm:place-items-start">


  <div>
    <h2 className="font-aclonica text-xl sm:text-2xl font- mb-4">ArabDev</h2>
    <p className="text-[17px]">Let's connect with the world</p>
  </div>
  
  <div>


    <h3 className="font-montserrat text-[19px] font-bold mb-4 text-white tracking-widest">Quick Links</h3>

    <ul className="space-y-2 text-sm sm:text-base ">
      <li><li href ="" className="hover:underline text-[17px]">Home</li></li>
      <li><li href ="" className="hover:underline text-[17px]">Podcasts</li></li>
      <li><li href ="" className="hover:underline text-[17px]">Saved</li></li>
      <li><li href ="contact" className="hover:underline text-[17px]">Contact</li></li>
      <li><li href ="about" className="hover:underline text-[17px]">About</li></li>
    </ul>

  </div>

  <div>

    <h3 className="font-montserrat text-[19px] font-bold mb-4 text-white tracking-widest">Information</h3>

    <ul className="space-y-5 opacity-90 text-sm sm:text-base ">

      <li className="flex items-center space-x-2">
      <MdOutlineEmail className="text-white text-2xl" />

        <span>support@arabdev.com</span>
      </li>

      <li className="flex items-center space-x-2">
      <LuPhone className="text-white text-2xl"/>

        <span>+123-456-789</span>
      </li>

      <li className="flex items-center space-x-2">
      <MdOutlineLocationOn className="text-white text-2xl"/>

        <span>Tanta, Gharbia, Egypt</span>
      </li>

    </ul>

  </div>

</div>

<div className="mt-8 pt-8 border-t border-white/20 text-center text-xs sm:text-sm opacity-90">
  copyright2024©All Right Reserved Design by arabdev
</div>

</footer>

        </>
  )

}
