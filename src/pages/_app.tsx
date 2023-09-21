/* Styling components */
import "@style/globals.css";
import "@style/components/Navbar.css";
import "@style/components/Footer.css";
import "@style/components/Pagination.css";
import "@style/components/Profilemenu.css";
import "@style/pages/Frontpage.css";
import "@style/pages/Leaderboard.css";
import "@style/pages/Profilepage.css";
import "@style/pages/Challenges.css";

import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import axios from "axios";
import Header from "@ui/Header/Header";
import Footer from "@ui/Footer/Footer";
import { User } from "@lib/types/User";

function StasisApp({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<User | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    if (!session) {
      axios
        .get(`${process.env.API_URL}/profile/76561198343533017/advanced`)
        .then((response: any) => {
          if (response.status === 302 || response.status === 200) {
            setSession(response.data);
          } else {
            console.log("You're not logged in!");
          }
          setSessionChecked(true);
        })
        .catch((error: any) => {
          console.error("An error occurred, contact a developer!");
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
