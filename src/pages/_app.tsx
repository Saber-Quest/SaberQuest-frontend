/* Styling components */
import "@style/globals.css";
import "@style/components/Navbar.css";
import "@style/components/Footer.css";
import "@style/components/Pagination.css";
import "@style/components/Profilemenu.css";
import "@style/pages/Frontpage.css";
import "@style/pages/Leaderboard.css";
import "@style/pages/Profilepage.css";

import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import axios from "axios";
import Header from "@ui/Header/Header";
import Footer from "@ui/Footer/Footer";
import { User } from "@lib/types/User";

function StasisApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  const [session, setSession] = useState<User | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  //For now, we're using a fake API to fake that the user is authed and logged in.
  useEffect(() => {
    if (!session) {
      axios
        .get(`${process.env.PUBLIC_URL}/api/profile/76561198410971373`)
        .then((response) => {
          if (response.status === 302 || response.status === 200) {
            setSession(response.data);
          } else {
            console.log("You're not logged in!");
          }
          setSessionChecked(true);
        })
        .catch((error) => {
          console.error("An error occured, contact a developer!");
          console.error(error);
          setSessionChecked(true);
        });
    }
  }, [session]);

  return (
    <>
      <ThemeProvider enableSystem={false} attribute="class">
        <Header session={session} sessionCheck={sessionChecked} />
        <Component {...pageProps} sessionCheck={sessionChecked} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default StasisApp;
