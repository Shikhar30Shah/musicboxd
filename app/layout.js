import { Montserrat } from "next/font/google";
import "./globals.css";
import { SearchParamsProvider } from "./(root)/searchParamsContext";

const monteserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ['latin'],
  weight: '500'
})

export const metadata = {
  title: "MusicBoxd",
  description: "To share the music you like.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${monteserratSans.variable}`}
      >
        <SearchParamsProvider>{children}</SearchParamsProvider>
      </body>
    </html>
  );
}
