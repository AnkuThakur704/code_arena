import "./globals.css";
import { Poppins,Orbitron, Space_Grotesk,Sansita} from "next/font/google";
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

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron'
})
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})
const sansita = Sansita({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sansita",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${sansita.variable} antialiased selection:bg-purple-500/30 transition-colors duration-500`}>
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

//${poppins.className}
//${orbitron.variable} ${spaceGrotesk.variable}
