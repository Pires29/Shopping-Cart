"use client";

import { PersistGate } from "redux-persist/integration/react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navbar />
            <main className="flex-grow">{children}</main>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
