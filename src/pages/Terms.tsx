
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="bg-pet-cream py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-pet-dark mb-8">Terms of Service</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose max-w-none">
              <p className="mb-6">
                Last updated: April 27, 2025
              </p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-pet-dark mb-4">Agreement to Terms</h2>
                <p className="text-gray-600 mb-4">
                  By accessing or using PetCare's services, you agree to be bound by these Terms of Service. 
                  If you disagree with any part of the terms, you may not access our services.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-pet-dark mb-4">Service Description</h2>
                <p className="text-gray-600 mb-4">
                  PetCare provides veterinary services, including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Veterinary consultations and examinations</li>
                  <li>Emergency veterinary care</li>
                  <li>Pet wellness programs</li>
                  <li>Vaccinations and preventive care</li>
                  <li>Surgery and specialized treatments</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-pet-dark mb-4">Appointment Policies</h2>
                <p className="text-gray-600 mb-4">
                  We require 24-hour notice for appointment cancellations. Late cancellations or no-shows may incur a fee.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
