
// import phot1 from '../../assets/Frame 98.png'
// import phot2 from '../../assets/Frame 99.png'
// import phot3 from '../../assets/Frame 101.png'
// import phot4 from '../../assets/Frame 100.png'

export default function AboutUs() {

    return (

        <>
        
                <section className="text-center mb-16">
        
                  <h2 className="text-4xl font-bold mb-6">About US</h2>
        
                  <p className="text-gray-600 mb-8">
                    Welcome to <span className="text-blue-600">ArabDev</span>, the ultimate social platform for programmers, developers, and tech enthusiasts! We are more than just a social network—we are a hub where coders of all skill levels come together to collaborate, share knowledge, and build the future of technology.
                  </p>
        
        
                {/* Grid layout */}
        
                <div className="grid grid-cols-12 gap-4 mb-16">
        
                  <div className="col-span-12 md:col-span-4 ">
        
                    <img 
                      src = "https://media.licdn.com/dms/image/v2/C4D0BAQGDceq5L-hdZg/company-logo_200_200/company-logo_200_200/0/1655377952271/imgs_group_logo?e=2147483647&v=beta&t=ZVurDhjjyZORPNZM8ewigaKGG4gq3o3xHeWwN37Nkt8"
                      alt="Team collaboration" 
                      className="w-full h-90 object-cover rounded-lg"
                    />
                  </div>
        
                  <div className="col-span-12 md:col-span-4">
        
                    <div className="grid grid-rows-2 gap-4 h-90">
        
                      <img 
                      src ="https://media.licdn.com/dms/image/v2/C4D0BAQGDceq5L-hdZg/company-logo_200_200/company-logo_200_200/0/1655377952271/imgs_group_logo?e=2147483647&v=beta&t=ZVurDhjjyZORPNZM8ewigaKGG4gq3o3xHeWwN37Nkt8"
                        alt="Modern office" 
                        className="w-full h-full  object-cover rounded-lg"
                      />
        
                      <img 
                     src ="https://media.licdn.com/dms/image/v2/C4D0BAQGDceq5L-hdZg/company-logo_200_200/company-logo_200_200/0/1655377952271/imgs_group_logo?e=2147483647&v=beta&t=ZVurDhjjyZORPNZM8ewigaKGG4gq3o3xHeWwN37Nkt8"
                        alt="Team meeting" 
                        className="w-full h-full object-cover rounded-lg"
                      />
        
                    </div>
        
                  </div>
        
                  <div className="col-span-12 md:col-span-4">
                    
                    <img 
                       src = "https://media.licdn.com/dms/image/v2/C4D0BAQGDceq5L-hdZg/company-logo_200_200/company-logo_200_200/0/1655377952271/imgs_group_logo?e=2147483647&v=beta&t=ZVurDhjjyZORPNZM8ewigaKGG4gq3o3xHeWwN37Nkt8"
                      alt="Collaboration" 
                      className="w-full h-90 object-cover rounded-lg"
                    />
        
                  </div>
                                
                  
                  </div>
                
                </section>

        </>
        
  )

}
