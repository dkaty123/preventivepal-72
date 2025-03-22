
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PreventativeCareCalendar from "@/components/PreventativeCareCalendar";
import AuthCheck from "@/components/AuthCheck";

const PreventativeCarePage = () => {
  return (
    <AuthCheck>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <PreventativeCareCalendar />
        </main>
        <Footer />
      </div>
    </AuthCheck>
  );
};

export default PreventativeCarePage;
