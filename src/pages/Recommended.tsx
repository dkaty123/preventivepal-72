
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecommendedCheckups from "@/components/RecommendedCheckups";
import AuthCheck from "@/components/AuthCheck";

const Recommended = () => {
  return (
    <AuthCheck>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <RecommendedCheckups />
        </main>
        <Footer />
      </div>
    </AuthCheck>
  );
};

export default Recommended;
