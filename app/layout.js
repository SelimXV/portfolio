import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio de Sélim",
  description: "Bienvenue sur le portfolio de Sélim - Développeur Web",
  keywords: "développeur web, portfolio, fullstack, react, nextjs, étudiant BTS SIO SLAM",
  author: "Sélim Khalfane",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.votre-domaine.fr",
    title: "Portfolio de Sélim - Développeur Web",
    description: "Portfolio professionnel de Sélim, développeur web fullstack en BTS SIO SLAM",
    images: [{ url: '/images/hero-image.jpeg' }],
  },
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
