import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ProfileMenu from "./ProfileMenu";
import ProfileMenuSlim from "./ProfileMenuSlim";
import { SessionUser } from "@lib/types";

let NavigationLinks = [
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
    link: "/shop",
    needLogin: true,
  },
];

export default function NavBar({
  session,
  sessionCheck,
}: {
  session: SessionUser | null;
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
      <Disclosure as="nav" className="topNav z-10 relative">
        {({ open }) => (
          <>
            <div className="flex items-center w-full h-16">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" key="NavLink" className="navLogoContainer">
                  <Image
                    src={`${process.env.PUBLIC_URL}/assets/images/Logo.png`}
                    className="navLogo"
                    alt="SaberQuest logo"
                    width={96}
                    height={96}
                  />
                  <p className="Saber">Saber</p>
                  <span className="Quest">Quest</span>
                  <span className="relative font-extrabold text-red-600 top-[-20px] left-[-15px] overflow-visible w-2 max-w-2">
                    BETA
                  </span>
                </Link>
              </div>
              <div className="hidden lg:ml-6 lg:flex w-full">
                {NavigationLinks.map((item, index) => {
                  if (!item.needLogin || loggedIn) {
                    return (
                      <Link href={item.link} key={index} className="navButton">
                        {item.name}
                      </Link>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="hidden lg:flex flex-row gap-2 h-[42px] mx-5 items-center">
                <a
                  href={`${process.env.PUBLIC_DISCORDLINK}`}
                  title="Our Discord"
                  className="h-[42px] rounded-lg bg-none hover:bg-sqyellowfaint p-2 aspect-square flex justify-center items-center transition-all duration-100 ease-in-out"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={"/assets/images/DiscordLogo.svg"}
                    alt={"Discord Server"}
                    width={36}
                    height={36}
                  />
                </a>
                <a
                  href={`https://www.patreon.com/SaberQuest`}
                  title="Our Patreon"
                  className="h-[42px] rounded-lg bg-none hover:bg-sqyellowfaint p-2 aspect-square flex justify-center items-center transition-all duration-100 ease-in-out"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={"/assets/images/PatreonWhite.svg"}
                    alt={"Our Patreon"}
                    width={36}
                    height={36}
                  />
                </a>
                <span className=" w-[2px] rounded-full h-[30px] bg-sqyellowfaint" />
              </div>
              {(!loading && (
                <div className="hidden lg:flex">
                  <div className="rightNav">
                    {(!loggedIn && (
                      <>
                        <div className="loginButtons">
                          <a
                            href={`/api/auth/steam`}
                            rel="noopener"
                            className="loginLinkSteam"
                            title="Login with Steam"
                          >
                            <Image
                              src="/assets/images/SteamLogo.svg"
                              className="steamNav"
                              alt="SteamLoginButton"
                              width={36}
                              height={36}
                            />
                          </a>
                          <a
                            href={`/api/auth/beatleader`}
                            rel="noopener"
                            className="loginLinkBL"
                            title="Login with BeatLeader"
                          >
                            <Image
                              src="/assets/images/BeatLeaderLogo.png"
                              className="w-[50px] aspect-square"
                              alt="BeatleaderLoginButton"
                              width={50}
                              height={50}
                            />
                          </a>
                        </div>
                      </>
                    )) || <>{session && <ProfileMenu userinfo={session} />} </>}
                  </div>
                </div>
              )) ||
                null}
              <div className="flex flex-row-reverse items-end lg:hidden w-full">
                <Disclosure.Button className="navButtonDark">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden flex absolute w-[100%] bg-[#1d1d1d] flex-col transition-all duration-500 z-40 top-[-8px]">
              <div className="pt-2 pb-3 space-y-1 sticky">
                {NavigationLinks.map((item) => (
                  <Link href={item.link} key={item.name} className="navButton">
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="pt-3 pb-3 border-t border-[#3a3a3a]">
                <div className="flex items-center ml-auto flex-shrink-0 px-4 justify-between">
                  <div className="flex justify-end space-x-2">
                    {(!loading && (
                      <div className="rightNav">
                        {(!loggedIn && (
                          <>
                            <div className="loginButtons">
                              <a
                                href={`/api/auth/steam`}
                                rel="noopener"
                                className="loginLinkSteam"
                              >
                                <Image
                                  src="/assets/images/SteamLogo.svg"
                                  className="steamNav"
                                  alt="SteamLoginButton"
                                  width={36}
                                  height={36}
                                />
                              </a>
                              <a
                                href={`/api/auth/beatleader`}
                                rel="noopener"
                                className="loginLinkBL"
                              >
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
                        )) || (
                          <>
                            {session && <ProfileMenuSlim userinfo={session} />}{" "}
                          </>
                        )}
                      </div>
                    )) ||
                      null}
                  </div>
                  <Disclosure.Button className="navButtonDark">
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
