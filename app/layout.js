import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio de Sélim",
  description: "Bienvenue sur le portfolio de Sélim - Développeur Web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="dark scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-[#121212] text-slate-900 dark:text-white transition-colors duration-300`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
