import "@style/globals.css";
import "@style/components/Navbar.css";
import "@style/components/Footer.css";
import "@style/components/Pagination.css";
import "@style/components/Profilemenu.css";
import "@style/components/ProfileComps/CompletedChallenges.css";
import "@style/components/ProfileComps/ExtendedChallengeInfo.css";
import "@style/pages/Frontpage.css";
import "@style/pages/Leaderboard.css";
import "@style/pages/Profilepage.css";
import "@style/pages/Challenges.css";

import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import axios from "axios";
import Header from "@ui/Header/Header";
import Footer from "@ui/Footer/Footer";
import { SessionUser } from "@lib/types";

export default function StasisApp({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<SessionUser | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    if (!session) {
      axios
        .get(`${process.env.PUBLIC_URL}/api/auth/cookie`)
        .then((response) => {
          if (response.status === 302 || response.status === 200) {
            const data = response.data;
            const sessionUser: SessionUser = data.sessionData;
            setSession(sessionUser);
            setSessionChecked(true);
          }
        })
        .catch(() => {
          setSessionChecked(true);
        });
    }
  }, [session]);

  return (
    <>
      <Header session={session} sessionCheck={sessionChecked} />
      <Component {...pageProps} session={session} sessionCheck={sessionChecked} />
      <Footer />
    </>
  );
}
