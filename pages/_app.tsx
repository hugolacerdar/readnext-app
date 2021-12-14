import "../styles/globals.css";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import Navbar from "../components/Navbar";

import { UserContext } from "../lib/userContext";
import { auth, firestore } from "../lib/firebase";
import { useUserData } from "../lib/hooks";

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
