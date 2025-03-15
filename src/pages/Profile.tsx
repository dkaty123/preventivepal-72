
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HealthProfile from "@/components/HealthProfile";
import AuthCheck from "@/components/AuthCheck";

const Profile = () => {
  return (
    <AuthCheck>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <HealthProfile />
        </main>
        <Footer />
      </div>
    </AuthCheck>
  );
};

export default Profile;
