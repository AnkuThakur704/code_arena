import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "../components/Navbar";
import CanvasAnimation from "../components/CanvasAnimation";

export const metadata = {
  title: "CSEC",
  description: "CSEC Website ",
};

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} antialiased selection:bg-purple-500/30 transition-colors duration-500`}>
        <div className="grain-overlay" />
        <div className="fixed top-0 left-0 w-full h-full z-[-1]">
          <CanvasAnimation />
        </div>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
