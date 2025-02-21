

export default function Footer() {

    return (
        <>
        
        <footer className="bg-gradient-to-r from-[#3362C8] via-[#193062] to-[#264995] text-white p-6 sm:p-8 rounded-lg">

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

  <div>
    <h2 className="text-xl sm:text-2xl font-bold mb-4">ArabDev</h2>
    <p className="text-sm opacity-90">Let's connect with the world</p>
  </div>
  
  <div>

    <h3 className="font-semibold mb-4">Quick Links</h3>

    <ul className="space-y-2 text-sm sm:text-base">
      <li><li href ="" className="hover:underline">Login</li></li>
      <li><li href ="" className="hover:underline">Podcasts</li></li>
      <li><li href ="" className="hover:underline">Saved</li></li>
      <li><li href ="contact" className="hover:underline">Contact</li></li>
      <li><li href ="about" className="hover:underline">About</li></li>
    </ul>

  </div>

  <div>

    <h3 className="font-semibold mb-4">Information</h3>

    <ul className="space-y-2 opacity-90 text-sm sm:text-base">

      <li className="flex items-center space-x-2">
        <span>support@arabdev.com</span>
      </li>

      <li className="flex items-center space-x-2">
        <span>+123-456-789</span>
      </li>

      <li className="flex items-center space-x-2">
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
