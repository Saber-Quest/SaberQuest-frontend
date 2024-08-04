import "@style/globals.css";
import "@style/index.css";
import "@style/components/Navbar.css";
import "@style/components/Footer.css";
import "@style/components/Maintenance.css";
import "@style/components/Pagination.css";
import "@style/components/Profilemenu.css";
import "@style/components/ProfileComps/CompletedChallenges.css";
import "@style/components/ProfileComps/ExtendedChallengeInfo.css";
import "@style/components/Challenges/Challenges.css";
import "@style/components/Challenges/Diffs.css";
import "@style/components/Notifications/Notifications.css";
import "@style/components/Shop/Rarities.css";
import "@style/components/ErrorComps.css";
import "@style/components/Images/Icons.css";
import "@style/pages/About.css";
import "@style/pages/Frontpage.css";
import "@style/pages/Leaderboard.css";
import "@style/pages/Profilepage.css";
import "@style/pages/Challenges.css";
import "@style/pages/Shop.css";

import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import axios from "axios";
import Header from "@ui/Header/Header";
import { Notification } from "@comp/UI/Notifications";
import Footer from "@ui/Footer/Footer";
import { SessionUser } from "@lib/types";
import Maintenance from "@ui/Maintenance";

export default function StasisApp({ Component, pageProps }: AppProps) {
  const [maintenance, setMaintenance] = useState<boolean>(false);
  const [session, setSession] = useState<SessionUser | null>(null);
  const [sessionChecked, setSessionChecked] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [timer, setTimer] = useState<number>(5000);

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
  }, [session, maintenance]);

  return (
    <>
      {maintenance ? (
        /* Need to make it so if the user is admin, they don't see this page, but instead the header-component adds a "MAINTENANCE MODE"-banner */
        <Maintenance />
      ) : (
        <>
          <Header session={session} sessionCheck={sessionChecked} />
          <Component
            {...pageProps}
            session={session}
            sessionCheck={sessionChecked}
            setSession={setSession}
            setMessage={setMessage}
            setType={setType}
            setShow={setShow}
          />
          <Notification
            dataArray={{ show, message, type, timer }}
            setMessage={setMessage}
            setType={setType}
            setShow={setShow}
            setTimer={setTimer}
          />
          <Footer />
        </>
      )}
    </>
  );
}
