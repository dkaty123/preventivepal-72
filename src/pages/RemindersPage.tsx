
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicReminders from "@/components/DynamicReminders";
import AuthCheck from "@/components/AuthCheck";

const RemindersPage = () => {
  return (
    <AuthCheck>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <DynamicReminders />
        </main>
        <Footer />
      </div>
    </AuthCheck>
  );
};

export default RemindersPage;
