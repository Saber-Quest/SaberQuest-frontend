import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import { Animate } from "react-simple-animate";
import { ChallengeData, Team, TeamMember } from "@lib/types";
import DividerCenter from "@ui/Dividers/DividerCenter";
import Icon from "@comp/UI/Images/Icon";
import Header from "@comp/Meta/Title";
import AboutChallenges from "@comp/UI/Components/Challenges/AboutChallenges";

export default function About() {
  const [team, setTeam] = useState<Team | null>(null);
  const [challenges, setChallenges] = useState<ChallengeData[]>([]);
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
    axios
      .get(`${process.env.API_URL}/challenge/all`)
      .then((response) => {
        setChallenges(response.data.challenges);
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
      <div className="aboutWrapper">
        <Tab.Group manual>
          <Tab.List className="aboutTabMain">
            <Tab
              className={`aboutSubTab ${activeTab === 0 && "aboutSubTabAdd"}`}
              onClick={() => handleTabClick(0)}
            >
              About
            </Tab>
            <span className="min-h-[30px] min-w-[2px] bg-sqyellow rounded-full" />
            <Tab
              className={`aboutSubTab ${activeTab === 1 && "aboutSubTabAdd"}`}
              onClick={() => handleTabClick(1)}
            >
              Contributors
            </Tab>
            <span className="min-h-[30px] min-w-[2px] bg-sqyellow rounded-full" />
            <Tab
              className={`aboutSubTab ${activeTab === 2 && "aboutSubTabAdd"}`}
              onClick={() => handleTabClick(2)}
            >
              Challenges
            </Tab>
          </Tab.List>

          <Tab.Panels className="aboutTabPanels">
            <Animate
              play={activeTab === 0}
              duration={0.2}
              start={{ transform: "translate(-100px, 0)", opacity: 0 }}
              end={{ transform: "translate(0, 0)", opacity: 1 }}
              easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
            >
              <Tab.Panel className="outline-none">
                <div className="aboutTabPanelDivPrimary">
                  <DividerCenter text={"What is 'SaberQuest'?"} />
                  <div className="aboutTabPanelDivSecondary">
                    <h1 className="aboutH1">A little bit about us!</h1>
                    <p className="aboutP">
                      SaberQuest aims to add a bit of{" "}
                      <span className="fpBodyHighlight">fun</span> back into
                      playing Beat Saber. Whether you&apos;re a{" "}
                      <span className="text-normalreq font-semibold">
                        casual
                      </span>{" "}
                      player, or a{" "}
                      <span className="text-expertreq font-semibold">
                        competitive
                      </span>{" "}
                      player, we&apos;re trying to create a fun experience for{" "}
                      <span className="fpBodyHighlight underline italic">
                        everyone
                      </span>
                      .
                    </p>
                    <div className="aboutDivSecondaryInside">
                      <p>
                        What can <span className="fpBodyHighlight">We</span>{" "}
                        offer?
                      </p>
                      <ul role="list" className="aboutUL">
                        <li className="aboutFlexGap">
                          <CheckCircleIcon
                            className="aboutGreenIcon"
                            aria-hidden="true"
                          />
                          <span>
                            <strong className="aboutBoldYellow">
                              Challenges
                            </strong>
                            ! This is our first main feature, and the core of
                            SaberQuest. Challenges are a fun way to compete with
                            your friends and other players.{" "}
                            <span className="aboutYellow12PX">
                              (
                              <Link
                                href="/challenges"
                                className="fpBodyHighlight underline"
                              >
                                Challenges
                              </Link>
                              -page)
                            </span>
                          </span>
                        </li>
                        <li className="aboutFlexGap">
                          <CheckCircleIcon
                            className="aboutGreenIcon"
                            aria-hidden="true"
                          />
                          <span>
                            <strong className="aboutBoldYellow">
                              Crafting
                            </strong>
                            ! Our second main feature, and the feature that adds
                            a fun twist to challenges. Crafting allows you to
                            craft with items won from challenges, or bought from
                            the shop.{" "}
                            <span className="aboutYellow12PX">
                              (
                              <Link
                                href="/profile/crafting"
                                className="fpBodyHighlight underline"
                              >
                                Crafting
                              </Link>
                              -page /{" "}
                              <Link
                                href="/shop"
                                className="fpBodyHighlight underline"
                              >
                                Shop
                              </Link>
                              -page)
                            </span>
                          </span>
                        </li>
                        <li className="aboutFlexGap">
                          <CheckCircleIcon
                            className="aboutGreenIcon"
                            aria-hidden="true"
                          />
                          <span>
                            <strong className="aboutBoldYellow">
                              A Leaderboard
                            </strong>
                            . Of course we have a leaderboard, as we want you to
                            be able to track and compete with others. The
                            leaderboard is global, and is updated automatically.{" "}
                            <span className="aboutYellow12PX">
                              (
                              <Link
                                href="/leaderboard"
                                className="fpBodyHighlight underline"
                              >
                                Leaderboard
                              </Link>
                              -page)
                            </span>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-16 max-w-2xl">
                      <h2 className="aboutTightWhite">So, how does it work?</h2>
                      <p className="mt-6">It is very simple!</p>
                    </div>
                    <div className="mt-10 max-w-2xl">
                      <ul role="list" className="aboutMTWhite">
                        <li className="aboutFlexGap">
                          <InformationCircleIcon
                            className="aboutBlueIcon"
                            aria-hidden="true"
                          />
                          <span>
                            <strong className="aboutBoldYellow">
                              Create a user/Login!
                            </strong>{" "}
                            First of all, you need to either signup or login to
                            a current profile.
                          </span>
                        </li>
                        <li className="aboutFlexGap">
                          <InformationCircleIcon
                            className="aboutBlueIcon"
                            aria-hidden="true"
                          />
                          <span>
                            <strong className="aboutBoldYellow">
                              Pick a challenge!
                            </strong>{" "}
                            Second, go to the{" "}
                            <Link
                              href="/challenges"
                              className="fpBodyHighlight underline"
                            >
                              challenges
                            </Link>
                            -page, and pick a difficulty you want to complete.
                          </span>
                        </li>
                        <li className="aboutFlexGap">
                          <InformationCircleIcon
                            className="aboutBlueIcon"
                            aria-hidden="true"
                          />
                          <span>
                            <strong className="aboutBoldYellow">
                              Play the game!
                            </strong>{" "}
                            Third, you simply play the game and try to meet the
                            requirement for your selected difficulty.
                          </span>
                        </li>
                        <li className="aboutFlexGap">
                          <InformationCircleIcon
                            className="aboutBlueIcon"
                            aria-hidden="true"
                          />
                          <span>
                            <strong className="aboutBoldYellow">
                              Complete the challenge!
                            </strong>{" "}
                            And fourth! When you&apos;ve met the requirement(s),
                            you can go back to the{" "}
                            <Link
                              href="/challenges"
                              className="fpBodyHighlight underline"
                            >
                              challenges
                            </Link>
                            -page, and click the &quot;
                            <span className="fpBodyHighlight">
                              Complete Challenge
                            </span>
                            &quot;-button. If you&apos;ve met the requirement, a
                            notification will congratulate you, and you&apos;ll
                            receive a small amount of{" "}
                            <span className="fpBodyHighlight">QP</span> and one
                            or more{" "}
                            <span className="fpBodyHighlight">items</span>!{" "}
                            <span className="aboutYellow12PX">
                              (&quot;Autocomplete challenges&quot; enabled in
                              your{" "}
                              <Link
                                href="/profile/settings"
                                className="fpBodyHighlight underline"
                              >
                                profile
                              </Link>
                              -settings, will automatically complete challenges
                              for you, given you meet the requirement(s))
                            </span>
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
              start={{ transform: "translate(-100px, 0)", opacity: 0 }}
              end={{ transform: "translate(0, 0)", opacity: 1 }}
              easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
            >
              <Tab.Panel className="outline-none">
                <div className="aboutMain">
                  <div className="aboutTeamBox">
                    {team &&
                      Object.values(team).map(
                        (teamCategory: TeamMember[], index) => {
                          if (teamCategory.length > 0) {
                            return (
                              <Animate
                                play
                                key={index}
                                start={{
                                  opacity: 0,
                                  transform: "translateX(-100px)",
                                }}
                                end={{
                                  opacity: 1,
                                  transform: "translateX(0px)",
                                }}
                                easeType="ease-in-out"
                                sequenceIndex={index}
                                duration={0.2 * index}
                              >
                                <div>
                                  <DividerCenter
                                    text={Object.keys(team)[index]}
                                  />
                                  <div className="aboutTeamBoxInner">
                                    {teamCategory.map(
                                      (member: TeamMember, memberIndex) => (
                                        <div key={memberIndex}>
                                          <Link
                                            href={`/profile/${member.SQID}`}
                                          >
                                            <Image
                                              className="aboutPFP"
                                              width={100}
                                              height={100}
                                              src={`${process.env.API_URL}/profile/${member.SQID}/avatar`}
                                              alt={`${member.Name} Profilepicture`}
                                            />
                                            <h3 className="aboutName">
                                              {member.Name}
                                            </h3>
                                            <p className="aboutInfo">
                                              {member.Info}
                                            </p>
                                          </Link>
                                          <ul
                                            role="list"
                                            className="aboutPlatforms"
                                          >
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
                        },
                      )}
                  </div>
                </div>
              </Tab.Panel>
            </Animate>
            <Animate
              play={activeTab === 2}
              duration={0.2}
              start={{ transform: "translate(-100px, 0)", opacity: 0 }}
              end={{ transform: "translate(0, 0)", opacity: 1 }}
              easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
            >
              <Tab.Panel className="outline-none">
                <div className="aboutMain">
                  <div className="aboutChallengeHeaders mb-16">
                    <h1 className="aboutTightYellow">Available challenges</h1>
                    <h2 className="aboutTightWhite2">
                      These challenges are cycled randomly every day
                    </h2>
                  </div>
                  <div className="aboutTeamBox">
                    {challenges &&
                      Object.values(challenges).map(
                        (challenges: ChallengeData, index) => {
                          return (
                            <Animate
                              play
                              key={index}
                              start={{
                                opacity: 0,
                                transform: "translateX(-100px)",
                              }}
                              end={{
                                opacity: 1,
                                transform: "translateX(0px)",
                              }}
                              easeType="ease-in-out"
                              sequenceIndex={index}
                              duration={0.2 * index}
                            >
                              <div>
                                <DividerCenter text={challenges.name} />
                                <div className="aboutTeamDiv">
                                  <AboutChallenges
                                    challengeDatas={challenges}
                                  />
                                </div>
                              </div>
                            </Animate>
                          );
                        },
                      )}
                  </div>
                </div>
              </Tab.Panel>
            </Animate>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}
