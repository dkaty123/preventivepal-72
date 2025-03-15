
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t py-12 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center">
                <span className="font-bold text-white">P</span>
              </div>
              <span className="font-semibold text-xl">PreventivePal</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Take control of your preventative healthcare journey with personalized reminders and recommendations.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition">About</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition">Careers</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition">Help Center</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition">Privacy</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li><a href="mailto:hello@preventivepal.com" className="text-muted-foreground hover:text-foreground transition">hello@preventivepal.com</a></li>
              <li><a href="tel:+15555555555" className="text-muted-foreground hover:text-foreground transition">+1 (555) 555-5555</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PreventivePal. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-health-alert" /> for your health
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
