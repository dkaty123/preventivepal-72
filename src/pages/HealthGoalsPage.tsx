
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HealthGoalTracking from "@/components/HealthGoalTracking";
import AuthCheck from "@/components/AuthCheck";

const HealthGoalsPage = () => {
  return (
    <AuthCheck>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <HealthGoalTracking />
        </main>
        <Footer />
      </div>
    </AuthCheck>
  );
};

export default HealthGoalsPage;
