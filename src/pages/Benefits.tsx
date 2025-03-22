
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InsuranceBenefits from "@/components/InsuranceBenefits";
import AuthCheck from "@/components/AuthCheck";

const Benefits = () => {
  return (
    <AuthCheck>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <InsuranceBenefits />
        </main>
        <Footer />
      </div>
    </AuthCheck>
  );
};

export default Benefits;
