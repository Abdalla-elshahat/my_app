import ContactHeader from './ContactHeader';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

function MainContent() {


  return (

    <>
    
    <main className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6">
       
       {/* Contact Header */}

       <ContactHeader/>




       {/* Contact Content */}
       
       <div className="flex flex-col lg:flex-row justify-center gap-6 sm:gap-8">

         {/* Contact Information */}
         <ContactInfo/>


         {/* Contact Form */}
         <ContactForm/>


       </div>


     </main>


    </>

  )
}

export default MainContent