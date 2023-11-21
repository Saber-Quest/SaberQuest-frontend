import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Animate, AnimateGroup } from "react-simple-animate";
import { Team, TeamMember } from "@lib/types";
import DividerCenter from "@ui/Dividers/DividerCenter";
import Icon from "@comp/UI/Images/Icon";
import Header from "@comp/Meta/Title";

export default function About() {
  const [team, setTeam] = useState<Team | null>(null);

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

  return (
    <>
      <Header
        title={`About`}
        link={`${process.env.PUBLIC_URL}/about`}
        contents={`About ${process.env.PUBLIC_NAME}.`}
        image={`${process.env.PUBLIC_URL}/assets/images/Logo.png`}
      />
      <div className="my-11">
        <div className="aboutMain">
          <div className="aboutHeader">
            <h2 className="aboutHeader h2">Contributors</h2>
          </div>
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
      </div>
    </>
  );
}
