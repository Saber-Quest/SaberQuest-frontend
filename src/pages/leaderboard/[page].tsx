import { LeaderboardData, User } from "@lib/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGlitch } from "react-powerglitch";
import { Animate } from "react-simple-animate";
import axios from "axios";
import Image from "next/image";
import Header from "@comp/Meta/Title";
import Link from "next/link";

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardData>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [previousPage, setPreviousPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const glitch = useGlitch({
    playMode: "always",
    createContainers: true,
    hideOverflow: false,
    timing: {
      duration: 4000,
      easing: "ease-in-out",
    },
    glitchTimeSpan: {
      start: 0.5,
      end: 0.7,
    },
    shake: {
      velocity: 15,
      amplitudeX: 0.05,
      amplitudeY: 0.05,
    },
    slice: {
      count: 6,
      velocity: 15,
      minHeight: 0.02,
      maxHeight: 0.15,
      hueRotate: true,
    },
    pulse: false,
  });

  useEffect(() => {
    axios
      .get(
        `${process.env.API_URL
        }/stats`,
      )
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          setTotalPages(Math.ceil(response.data.users.total / 10));
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("An error occurred, contact a developer!");
        console.error(error);
        setError(true);
      });
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const { page } = router.query;
      const navPage = parseInt(page as string);

      setLoading(true);
      setLeaderboard(undefined);
      axios
        .get(
          `${process.env.API_URL
          }/leaderboard?page=${navPage}&limit=10&_=${new Date().getTime()}`,
        )
        .then((response) => {
          if (response.status === 302 || response.status === 200) {
            setError(false);
            if (response.data.leaderboard.length > 0) {
              setLeaderboard(response.data.leaderboard);
              setCurrentPage(navPage);
            }
          } else {
            setError(true);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("An error occurred, contact a developer!");
          console.error(error);
          setError(true);
        });
    }
  }, [router]);

  return (
    <>
      <Header
        title={`Leaderboard`}
        link={`${process.env.PUBLIC_URL}/leaderboard/${currentPage}`}
        contents={`Leaderboard | Leaderboard on ${process.env.PUBLIC_NAME}.`}
        image={`${process.env.PUBLIC_URL}/assets/images/Logo.png`}
      />
      <div className="allDiv flex flex-col items-center justify-center px-16 pt-10 drop-shadow-navBarShadow select-none transition-all duration-100 ease-in-out">
        <div className="LeaderboardContainer">
          <div className="LeaderboardHeader">
            <div className="LBHeaderText LBR text-[16px]">Rank</div>
            <div className="LBHeaderText LBU text-[16px]">User</div>
            <div className="LBHeaderText LBC text-[16px]">Challenges Completed</div>
            <div className="LBHeaderText LBS text-[16px]">Total Score</div>
          </div>
          <div className="border-y-[1px] border-sqyellowfaint">
            {loading ? (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="w-16 h-16 my-2">Loading...</div>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="w-[120px] h-16 mb-2">No data found.</div>
              </div>
            ) : (
              <>
                  {Array.isArray(leaderboard) &&
                    leaderboard.map((user: User, index: number) => (
                      <Animate
                        key={index}
                        play={true}
                        start={{ opacity: 0, transform: "translateX(-100px)" }}
                        end={{ opacity: 1, transform: "translateX(0px)" }}
                        easeType="ease-in-out"
                        duration={(0.25 + (index / 15))}>
                        <Link href={`/profile/${user.userInfo.id}`}>
                          <div
                            className={`LeaderboardEntry ${(index + 1) % 2 === 0 ? undefined : "bg-[#0000003d]"} border-b border-[#0000003d]`}
                            style={{
                              backgroundImage: !user.userInfo.images.banner
                                ? ``
                                : `url(/api/${user.userInfo.id}/hor)`,
                              backgroundSize: "cover",
                            }}
                          >
                            <div className="LBEntryText LBR">
                              {user.stats.rank === 1 ? (
                                <span className="text-sqyellow drop-shadow-rank1Shadow">
                                  #{user.stats.rank}
                                </span>
                              ) : user.stats.rank === 2 ? (
                                <span className="text-sqsilver drop-shadow-rank2Shadow">
                                  #{user.stats.rank}
                                </span>
                              ) : user.stats.rank === 3 ? (
                                <span className="text-sqbronze drop-shadow-rank3Shadow">
                                  #{user.stats.rank}
                                </span>
                              ) : (
                                `#${user.stats.rank}`
                              )}
                            </div>
                            <div className="LBEntryText LBU">
                              <div className="relative overflow-visible mr-5">
                                <Image
                                  priority={true}
                                  loading="eager"
                                  ref={!user.userInfo.images.border?.includes("glitch_border.gif") ? undefined : glitch.ref}
                                  src={
                                    !user.userInfo.images.avatar
                                      ? "/assets/images/PFPPlaceholder.png"
                                      : user.userInfo.images.avatar
                                  }
                                  alt="Profile Picture"
                                  width={32}
                                  height={32}
                                  unoptimized={true}
                                  key={index}
                                  className="LBPFP"
                                />
                                {user.userInfo.images.border && (
                                  <Image
                                    loading="eager"
                                    priority={true}
                                    src={`/assets/images/users/borders/${user.userInfo.images.border}`}
                                    alt="Border Image"
                                    className="LBBorder"
                                    width={220}
                                    height={220}
                                    unoptimized={true}
                                  />
                                )}
                              </div>
                              {user.userInfo.username}
                            </div>
                            <div className="LBEntryText LBC">
                              {user.stats.challengesCompleted}
                            </div>
                            <div className="LBEntryText LBS">
                              {user.stats.value}
                            </div>
                          </div>
                        </Link>
                      </Animate>
                    ))}
              </>
            )}
          </div>
          <div className="w-full flex flex-row justify-evenly rounded-b-2xl overflow-hidden">
            <div className="bg-[#00000033] w-full flex items-center justify-center h-12">
              <button
                className={`${currentPage > 1 ? "" : "cursor-not-allowed"} w-full h-full`}
                onClick={() => {
                  if (currentPage > 1 && !loading) {
                    const previousPage = currentPage - 1;
                    router.push(`/leaderboard/${previousPage}`);
                    setPreviousPage(currentPage);
                    setCurrentPage(previousPage);
                  }
                }}
              >
                Back
              </button>
            </div>
            <div className="bg-[#00000033] flex items-center justify-center w-full h-12 border-x border-sqyellowfaint">{currentPage}</div>
            <div className="bg-[#00000033] w-full flex items-center justify-center h-12">
              <button
                className={`${currentPage !== totalPages && !loading ? "" : "cursor-not-allowed"} w-full h-full`}
                onClick={() => {
                  if (currentPage !== totalPages && !loading) {
                    const nextPage = currentPage + 1;
                    router.push(`/leaderboard/${nextPage}`);
                    setPreviousPage(currentPage);
                    setCurrentPage(nextPage);
                  }
                }}
              >
                Forward
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
