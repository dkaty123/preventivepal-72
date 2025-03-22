
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppointmentCalendar from "@/components/AppointmentCalendar";
import AuthCheck from "@/components/AuthCheck";

const CalendarPage = () => {
  return (
    <AuthCheck>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <AppointmentCalendar />
        </main>
        <Footer />
      </div>
    </AuthCheck>
  );
};

export default CalendarPage;
