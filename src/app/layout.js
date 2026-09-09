import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { FavouritesProvider } from "@/context/FavouritesContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Tandoor House | Order Online",
  description: "Fresh food, made to order. Browse the menu and get it delivered.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-body flex min-h-screen flex-col">
        <AuthProvider>
          <CartProvider>
            <FavouritesProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </FavouritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
