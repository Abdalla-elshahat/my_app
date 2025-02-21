import Footer from '../Footer/Footer';
import AboutUs from './AboutUs';
import OurStory from './OurStory';
import JoinUs from './JoinUs';

export default function About() {

    return (

        <>
        <div className="min-h-screen bg-white">

      <main className=" max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6">

        {/* About Us Section */}

         <AboutUs/>

        {/* Our Story Section */}
        
        <section> 

            <OurStory/>

        </section>

        {/* Join Us Section */}
        
        <section className="mt-8">
        
          <JoinUs/>

        </section>

      
      </main>
      
        </div>    
        
        <Footer/>

    </>

)

}
