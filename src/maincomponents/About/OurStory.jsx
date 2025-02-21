
import phot5 from '../../assets/Frame 107.png'
import phot6 from '../../assets/Frame 104.png'

export default function OurStory() {

    return (
    <>
    
              <h2 className="text-3xl text-center font-bold mb-6">Our Story</h2>
              
              <p className="text-gray-600 mb-8">
                ArabDev was created by programmers, for programmers. We saw a need for a dedicated space where coders could connect without the noise of traditional social media platforms.
              
              </p>
    
    
             <div className=" mx-auto">
    
            <div className="grid grid-cols-1 gap-18 items-center bg-red-">
    

              <div className="relative ">

                <div className="absolute -bottom-12 left-10 bg-white md:w-1/5 px-2 ">

                <h3 className="text-2xl font-bold text-gray-700 ">We believe that <br /> great ideas are born <br /> from collaboration</h3>


                </div>

              <img 
                  src = {phot6}    
                  alt="Business collaboration" 
                    className="w-full h-75 rounded-lg"
                />

              </div>

              <div className="grid grid-cols-2 gap-6 items-center">

              <img 
                  src = {phot5}
                  alt="Team meeting" 
                  className="w-full col-span-1 h-75 object-cover rounded-lg"
                />

 
          <div className='col-span-1'>
             
             <h2 className="text-4xl font-bold mb-4">What Makes Us Different?</h2>
        
             <p className="text-gray-600">
               Here, you can share your projects, Get feedback, Ask questions, Share tips, Dive 
               into the latest trends, Connect with mentors and Access resources to grow 
               your skills.
             </p>
        
           </div>



              </div>
             
            
            </div>
            
             </div>

    </>
  )

}
