
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SymptomChecker from "@/components/SymptomChecker";
import AuthCheck from "@/components/AuthCheck";

const SymptomCheckerPage = () => {
  return (
    <AuthCheck>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <SymptomChecker />
        </main>
        <Footer />
      </div>
    </AuthCheck>
  );
};

export default SymptomCheckerPage;
