
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="bg-pet-cream py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-pet-dark mb-8">Privacy Policy</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose max-w-none">
              <p className="mb-6">
                Last updated: April 27, 2025
              </p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-pet-dark mb-4">Introduction</h2>
                <p className="text-gray-600 mb-4">
                  PetCare ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
                  This privacy policy explains how we collect, use, and safeguard your information when you use our services.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-pet-dark mb-4">Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Contact information (name, email, phone number)</li>
                  <li>Pet information (name, breed, age, medical history)</li>
                  <li>Appointment and booking details</li>
                  <li>Payment information</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-pet-dark mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Provide veterinary services</li>
                  <li>Process appointments and payments</li>
                  <li>Send appointment reminders</li>
                  <li>Communicate about your pet's health</li>
                  <li>Improve our services</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
