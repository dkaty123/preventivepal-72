
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserDashboard from "@/components/UserDashboard";
import AuthCheck from "@/components/AuthCheck";

const Dashboard = () => {
  return (
    <AuthCheck>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <UserDashboard />
        </main>
        <Footer />
      </div>
    </AuthCheck>
  );
};

export default Dashboard;
