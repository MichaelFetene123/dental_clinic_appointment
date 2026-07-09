import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Inter, Roboto, Instrument_Serif, Lato, Red_Hat_Text } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/react-query-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

const redHatText = Red_Hat_Text({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-red-hat-text",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://classicdentalclinic.com'),
  title: "Classic Dental Clinic - Best Dental Clinic in Addis Ababa",
  description: "Classic Dental Clinic offers top-notch dental care in Addis Ababa, specializing in oral health and dental services in Bole and beyond.",
  icons: './favicon.ico',
  keywords: [
    "Best dental clinic in Addis Ababa",
    "Dental clinic in Bole",
    "Oral health",
    "Dentist in Addis Ababa",
    "Dental care services",
    "Cosmetic dentistry",
    "Orthodontics",
    "Pediatric dentistry",
    "Dental implants",
    "Teeth whitening",
    "Root canal treatment",
    "Dental emergencies",
    "Preventive dentistry",
  ],
  openGraph: {
    type: "website",
    title: "Classic Dental Clinic - Best Dental Clinic in Addis Ababa",
    description: "Classic Dental Clinic offers top-notch dental care in Addis Ababa, specializing in oral health and dental services in Bole and beyond.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Classic Dental Clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Classic Dental Clinic - Best Dental Clinic in Addis Ababa",
    description: "Classic Dental Clinic offers top-notch dental care in Addis Ababa, specializing in oral health and dental services in Bole and beyond.",
    images: ["/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable} ${instrumentSerif.variable} ${lato.variable} ${redHatText.variable}`} suppressHydrationWarning>
      <body className="antialiased">
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster richColors closeButton />
            </ThemeProvider>
          </ReactQueryProvider>
      </body>
    </html>
  );
}
