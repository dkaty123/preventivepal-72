
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserDashboard from "@/components/UserDashboard";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-8">
        <UserDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
