import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import { User } from "@lib/types/User";

const NavigationLinks = [
  {
    name: "Leaderboard",
    link: "#",
  },
  {
    name: "Shop",
    link: "#",
  },
  {
    name: "Challenges",
    link: "#",
  },
];

export default function NavBar({
  session,
  sessionCheck,
}: {
  session: User | null;
  sessionCheck: boolean;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (!session) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [session]);

  useEffect(() => {
    if (sessionCheck) {
      setLoading(false);
    }
  }, [sessionCheck]);

  return (
    <>
      <nav className="topNav z-10 relative">
        <div className="leftNav">
          <a href="./" className="navLogoContainer">
            <img
              src="/assets/images/Logo.svg"
              className="navLogo"
              alt="SaberQuest logo"
            />
            <p className="Saber">Saber</p>
            <span className="Quest">Quest</span>
          </a>
        </div>
        <div className="combNav">
          <div className="centerNav">
            {NavigationLinks.map((link, index) => {
              return (
                <Link href={link.link} key={index} className="navButton">
                  {link.name}
                </Link>
              );
            })}
          </div>
          {(!loading && (
            <div className="rightNav">
              {(!loggedIn && (
                <>
                  <div className="loginButtons">
                    <a href="#" rel="noopener" className="loginLinkSteam">
                      <img
                        src="/assets/images/SteamLogo.svg"
                        className="steamNav"
                        alt="SteamLoginButton"
                      />
                    </a>
                    <a href="#" rel="noopener" className="loginLinkBL">
                      <img
                        src="/assets/images/BeatLeaderLogo.png"
                        className="beatLeaderNav"
                        alt="BeatleaderLoginButton"
                      />
                    </a>
                  </div>
                </>
              )) || <>{session && <ProfileMenu userinfo={session} />} </>}
            </div>
          )) ||
            null}
        </div>
      </nav>
    </>
  );
}
