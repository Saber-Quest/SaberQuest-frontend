import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Tab } from '@headlessui/react';
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
import { Animate } from "react-simple-animate";
import { Team, TeamMember } from "@lib/types";
import DividerCenter from "@ui/Dividers/DividerCenter";
import Icon from "@comp/UI/Images/Icon";
import Header from "@comp/Meta/Title";

export default function About() {
  const [team, setTeam] = useState<Team | null>(null);
  const [activeTab, setActiveTab] = useState<Number>(0);

  useEffect(() => {
    axios
      .get(
        `https://raw.githubusercontent.com/Saber-Quest/.github/main/public/team.json`,
      )
      .then((response) => {
        setTeam(response.data.Team);
      })
      .catch((error) => {
        console.error("An error occurred, contact a developer!");
        console.error(error);
      });
  }, []);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <Header
        title={`About`}
        link={`${process.env.PUBLIC_URL}/about`}
        contents={`About ${process.env.PUBLIC_NAME}.`}
        image={`${process.env.PUBLIC_URL}/assets/images/Logo.png`}
      />
      <div className="my-11">
        <Tab.Group manual>
          <Tab.List className="flex gap-5 justify-center">
            <Tab
              className={`outline-none py-2 px-4 min-h-[30px] items-center border-b-2 border-[#ffd07300] hover:border-[#FFD073] hover:bg-navHover hover:shadow-aboutHoverShadow transition-all duration-300 ${activeTab === 0 && 'border-[#FFD073] shadow-aboutHoverShadow bg-navHover'
                }`}
              onClick={() => handleTabClick(0)}
            >
              About
            </Tab>
            <span className="min-h-[30px] min-w-[2px] bg-sqyellow rounded-full" />
            <Tab
              className={`outline-none py-2 px-4 min-h-[30px] items-center border-b-2 border-[#ffd07300] hover:border-[#FFD073] hover:bg-navHover hover:shadow-aboutHoverShadow transition-all duration-300 ${activeTab === 1 && 'border-[#FFD073] shadow-aboutHoverShadow bg-navHover'
                }`}
              onClick={() => handleTabClick(1)}
            >
              Contributors
            </Tab>
          </Tab.List>

          <Tab.Panels className="mt-12 outline-none">
            <Animate
              play={activeTab === 0}
              duration={0.2}
              start={{ transform: 'translate(-100px, 0)', opacity: 0 }}
              end={{ transform: 'translate(0, 0)', opacity: 1 }}
              easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
            >
              <Tab.Panel className="outline-none">
                <div className="mx-auto max-w-7xl px-6 mb-11 lg:px-8">
                  <DividerCenter text={"What is 'SaberQuest'?"} />
                  <div className="mx-auto max-w-2xl text-base leading-7 text-white">
                    <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">A little bit about us!</h1>
                    <p className="mt-6 text-xl leading-8">
                      SaberQuest aims to add a bit of <span className="fpBodyHighlight">fun</span> back into playing Beat Saber. Whether you&apos;re a <span className="text-normalreq font-semibold">casual</span> player,
                      or a <span className="text-expertreq font-semibold">competitive</span> player, we&apos;re trying to create a fun experience for <span className="fpBodyHighlight underline italic">everyone</span>.
                    </p>
                    <div className="mt-10 max-w-2xl">
                      <p>
                        What can <span className="fpBodyHighlight">We</span>{" "}offer?
                      </p>
                      <ul role="list" className="mt-8 max-w-xl space-y-8 text-white">
                        <li className="flex gap-x-3">
                          <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-green-300" aria-hidden="true" />
                          <span>
                            <strong className="font-semibold text-sqyellow">Challenges</strong>! This is our first main feature, and
                            the core of SaberQuest.
                            Challenges are a fun way to compete with your friends and other players. <span className="text-sqyellow text-[12px]">(<Link href="/challenges" className="fpBodyHighlight underline">Challenges</Link>-page)</span>
                          </span>
                        </li>
                        <li className="flex gap-x-3">
                          <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-green-300" aria-hidden="true" />
                          <span>
                            <strong className="font-semibold text-sqyellow">Crafting</strong>! Our second main feature, and the
                            feature that adds a fun twist to challenges. Crafting allows you to craft with items won from challenges,
                            or bought from the shop. <span className="text-sqyellow text-[12px]">(<Link href="/profile/crafting" className="fpBodyHighlight underline">Crafting</Link>-page / <Link href="/shop" className="fpBodyHighlight underline">Shop</Link>-page)</span>
                          </span>
                        </li>
                        <li className="flex gap-x-3">
                          <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-green-300" aria-hidden="true" />
                          <span>
                            <strong className="font-semibold text-sqyellow">A Leaderboard</strong>. Of course we have a leaderboard,
                            as we want you to be able to track and compete with others. The leaderboard is global,
                            and is updated automatically. <span className="text-sqyellow text-[12px]">(<Link href="/leaderboard" className="fpBodyHighlight underline">Leaderboard</Link>-page)</span>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-16 max-w-2xl">
                      <h2 className="text-2xl font-bold tracking-tight text-white">So, how does it work?</h2>
                      <p className="mt-6">
                        It is very simple!
                      </p>
                    </div>
                    <div className="mt-10 max-w-2xl">
                      <ul role="list" className="mt-8 max-w-xl space-y-8 text-white">
                        <li className="flex gap-x-3">
                          <InformationCircleIcon className="mt-1 h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                          <span>
                            <strong className="font-semibold text-sqyellow">Create a user/Login!</strong> First of all, you need to either signup or login to a current profile.
                          </span>
                        </li>
                        <li className="flex gap-x-3">
                          <InformationCircleIcon className="mt-1 h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                          <span>
                            <strong className="font-semibold text-sqyellow">Pick a challenge!</strong> Second, go to the <Link href="/challenges" className="fpBodyHighlight underline">challenges</Link>-page, and pick a difficulty you want to complete.
                          </span>
                        </li>
                        <li className="flex gap-x-3">
                          <InformationCircleIcon className="mt-1 h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                          <span>
                            <strong className="font-semibold text-sqyellow">Play the game!</strong> Third, you simply play the game and try to meet the requirement for your selected difficulty.
                          </span>
                        </li>
                        <li className="flex gap-x-3">
                          <InformationCircleIcon className="mt-1 h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                          <span>
                            <strong className="font-semibold text-sqyellow">Complete the challenge!</strong> And fourth! When you&apos;ve met the requirement(s),
                            you can go back to the <Link href="/challenges" className="fpBodyHighlight underline">challenges</Link>-page,
                            and click the &quot;<span className="fpBodyHighlight">Complete Challenge</span>&quot;-button. If you&apos;ve met the requirement, a notification will congratulate you,
                            and you&apos;ll receive a small amount of <span className="fpBodyHighlight">QP</span> and one or more <span className="fpBodyHighlight">items</span>! <span className="text-sqyellow text-[12px]">(&quot;Autocomplete challenges&quot; enabled in your <Link href="/profile/settings" className="fpBodyHighlight underline">profile</Link>-settings, will automatically complete challenges for you, given you meet the requirement(s))</span>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
            </Animate>
            <Animate
              play={activeTab === 1}
              duration={0.2}
              start={{ transform: 'translate(-100px, 0)', opacity: 0 }}
              end={{ transform: 'translate(0, 0)', opacity: 1 }}
              easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
            >
              <Tab.Panel className="outline-none">
                <div className="aboutMain">
                  <div className="aboutTeamBox">
                    {team &&
                      Object.values(team).map((teamCategory: TeamMember[], index) => {
                        if (teamCategory.length > 0) {
                          return (
                            <Animate
                              play
                              key={index}
                              start={{ opacity: 0, transform: "translateX(-100px)" }}
                              end={{ opacity: 1, transform: "translateX(0px)" }}
                              easeType="ease-in-out"
                              sequenceIndex={index}
                              duration={0.2 * index}
                            >
                              <div>
                                <DividerCenter text={Object.keys(team)[index]} />
                                <div className="aboutTeamBoxInner">
                                  {teamCategory.map(
                                    (member: TeamMember, memberIndex) => (
                                      <div key={memberIndex}>
                                        <Link href={`/profile/${member.SQID}`}>
                                          <Image
                                            className="aboutPFP"
                                            width={100}
                                            height={100}
                                            src={`${process.env.API_URL}/profile/${member.SQID}/avatar`}
                                            alt={`${member.Name} Profilepicture`}
                                          />
                                          <h3 className="aboutName">{member.Name}</h3>
                                          <p className="aboutInfo">{member.Info}</p>
                                        </Link>
                                        <ul role="list" className="aboutPlatforms">
                                          {member.Discord && (
                                            <li>
                                              <Icon
                                                path="DiscordLogo.svg"
                                                open={`https://discordapp.com/users/${member.Discord}`}
                                                h={5}
                                                w={5}
                                              />
                                            </li>
                                          )}
                                          {member.GitHub && (
                                            <li>
                                              <Icon
                                                path="GitHubLogo.svg"
                                                open={`https://github.com/${member.GitHub}`}
                                                h={5}
                                                w={5}
                                              />
                                            </li>
                                          )}
                                          {member.Twitch && (
                                            <li>
                                              <Icon
                                                path="TwitchLogo.svg"
                                                open={`https://twitch.tv/${member.Twitch}`}
                                                h={5}
                                                w={5}
                                              />
                                            </li>
                                          )}
                                          {member.Twitter && (
                                            <li>
                                              <Icon
                                                path="TwitterLogo.svg"
                                                open={`https://twitter.com/${member.Twitter}`}
                                                h={5}
                                                w={5}
                                              />
                                            </li>
                                          )}
                                          {member.YouTube && (
                                            <li>
                                              <Icon
                                                path="YouTubeLogo.svg"
                                                open={`${member.YouTube}`}
                                                h={5}
                                                w={5}
                                              />
                                            </li>
                                          )}
                                        </ul>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            </Animate>
                          );
                        }
                      })}
                  </div>
                </div>

              </Tab.Panel>
            </Animate>
          </Tab.Panels>
        </Tab.Group>
      </div >
    </>
  );
}
