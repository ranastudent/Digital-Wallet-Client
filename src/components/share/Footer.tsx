import { Link } from "react-router-dom";

export default function Footer() {
  return (
     <footer className="bg-primary text-primary-foreground py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} DigitalWallet. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:underline">
              About
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
            <Link to="/faq" className="hover:underline">
              FAQ
            </Link>
          </div>
        </div>
      </footer>
  );
}
