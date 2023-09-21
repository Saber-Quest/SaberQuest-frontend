import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import { User } from "@lib/types/User";

const NavigationLinks = [
  {
    name: "Leaderboard",
    link: "/leaderboard",
    needLogin: false,
  },
  {
    name: "Challenges",
    link: "/challenges",
    needLogin: false,
  },
  {
    name: "Shop",
    link: "#",
    needLogin: true,
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
          <Link href="/" key="NavLink" className="navLogoContainer">
            <Image
              src="/assets/images/Logo.svg"
              className="navLogo"
              alt="SaberQuest logo"
              width={96}
              height={96}
            />
            <p className="Saber">Saber</p>
            <span className="Quest">Quest</span>
          </Link>
        </div>
        <div className="combNav">
          <div className="centerNav">
            {NavigationLinks.map((link, index) => {
              if (!link.needLogin || loggedIn) {
                return (
                  <Link href={link.link} key={index} className="navButton">
                    {link.name}
                  </Link>
                );
              }
              return null;
            })}
          </div>
          {(!loading && (
            <div className="rightNav">
              {(!loggedIn && (
                <>
                  <div className="loginButtons">
                    <a href="#" rel="noopener" className="loginLinkSteam">
                      <Image
                        src="/assets/images/SteamLogo.svg"
                        className="steamNav"
                        alt="SteamLoginButton"
                        width={36}
                        height={36}
                      />
                    </a>
                    <a href="#" rel="noopener" className="loginLinkBL">
                      <Image
                        src="/assets/images/BeatLeaderLogo.png"
                        className="beatLeaderNav"
                        alt="BeatleaderLoginButton"
                        width={50}
                        height={50}
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
