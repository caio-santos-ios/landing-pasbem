import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; // Importando a fonte
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat", // Nome da variável CSS
});

export const metadata: Metadata = {
  title: "Pasbem | Saúde Acessível, Bem-Estar Real",
  description: "Ecossistema de Saúde Integral 360º",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}