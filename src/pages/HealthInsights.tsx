
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIHealthRecommendations from "@/components/AIHealthRecommendations";
import AuthCheck from "@/components/AuthCheck";

const HealthInsights = () => {
  return (
    <AuthCheck>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <AIHealthRecommendations />
        </main>
        <Footer />
      </div>
    </AuthCheck>
  );
};

export default HealthInsights;
