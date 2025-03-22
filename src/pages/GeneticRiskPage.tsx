
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GeneticRiskAssessment from "@/components/GeneticRiskAssessment";
import AuthCheck from "@/components/AuthCheck";

const GeneticRiskPage = () => {
  return (
    <AuthCheck>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <GeneticRiskAssessment />
        </main>
        <Footer />
      </div>
    </AuthCheck>
  );
};

export default GeneticRiskPage;
