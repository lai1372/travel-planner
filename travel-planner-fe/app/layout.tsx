import { AuthContextProvider } from "./context/AuthContext";
import { Inter } from "next/font/google";
import Container from "@/components/appcontainer";
import Navbar from "@/components/navbar";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";
import AppMuiThemeProvider from "@/shared/AppMuiThemeProvider";

import { Do_Hyeon } from "next/font/google";

const hyeon = Do_Hyeon({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Ready, Jet Set, Go!",
  description:
    "Welcome to your itinerary travel planner, the ultimate companion for seamless trip organization and unforgettable adventures!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </head>
      <body
        style={{
          margin: 0,
        }}
      >
        <AuthContextProvider>
          <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
            <AppMuiThemeProvider fontFamily={hyeon.style.fontFamily}>
              <Navbar />
              <Container>{children}</Container>
            </AppMuiThemeProvider>
          </NextAppDirEmotionCacheProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
