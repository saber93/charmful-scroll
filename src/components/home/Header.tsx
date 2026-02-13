import { useState, useEffect } from "react";
import TopHeader from "./TopHeader";
import Navbar from "./Navbar";
import SearchDrawer from "./SearchDrawer";
import CartDrawer from "./CartDrawer";
import AccountDrawer from "./AccountDrawer";
import MobileMenuDrawer from "./MobileMenuDrawer";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeDrawer = () => setActiveDrawer(null);

  return (
    <header className="fixed top-0 left-0 w-full z-[60]">
      {/* Top Header - Hidden on scroll if desired, but here we always show or hide via sticky */}
      {!isScrolled && <TopHeader />}

      {/* Main Navbar */}
      <Navbar
        isScrolled={isScrolled}
        onOpenSearch={() => setActiveDrawer("search")}
        onOpenCart={() => setActiveDrawer("cart")}
        onOpenAccount={() => setActiveDrawer("account")}
        onOpenMobileMenu={() => setActiveDrawer("mobile-menu")}
      />


      {/* Drawers */}
      <SearchDrawer
        isOpen={activeDrawer === "search"}
        onClose={closeDrawer}
      />
      <CartDrawer
        isOpen={activeDrawer === "cart"}
        onClose={closeDrawer}
      />
      <AccountDrawer
        isOpen={activeDrawer === "account"}
        onClose={closeDrawer}
      />
      <MobileMenuDrawer
        isOpen={activeDrawer === "mobile-menu"}
        onClose={closeDrawer}
      />
    </header>
  );
}
