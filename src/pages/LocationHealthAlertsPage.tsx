
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationHealthAlerts from "@/components/LocationHealthAlerts";
import AuthCheck from "@/components/AuthCheck";

const LocationHealthAlertsPage = () => {
  return (
    <AuthCheck>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <LocationHealthAlerts />
        </main>
        <Footer />
      </div>
    </AuthCheck>
  );
};

export default LocationHealthAlertsPage;
