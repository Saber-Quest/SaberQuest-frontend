import { LeaderboardData } from "@lib/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGlitch } from "react-powerglitch";
import axios from "axios";
import Image from "next/image";
import Header from "@comp/Meta/Title";
import Link from "next/link";
import Logo from "public/Logo.svg";

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardData>();
  const [userCount, setUserCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

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
    if (router.isReady) {
      const { page } = router.query;
      const navPage = parseInt(page as string);
      setCurrentPage(navPage);
      axios
        .get(`${process.env.API_URL}/leaderboard?page=${navPage}&limit=10`)
        .then((response) => {
          if (response.status === 302 || response.status === 200) {
            setError(false);
            setLeaderboard(response.data.leaderboard);
            setUserCount(response.data.leaderboard.length);
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
        title={`Leaderboard | ${process.env.PUBLIC_NAME}`}
        link={`${process.env.PUBLIC_URL}/leaderboard/${currentPage}`}
        contents={`Leaderboard | Leaderboard on ${process.env.PUBLIC_NAME}.`}
        image={Logo}
      />
      <div className="flex flex-col items-center justify-center px-16 pt-10 mt-14 drop-shadow-navBarShadow select-none transition-all duration-100 ease-in-out">
        <div className="LeaderboardContainer">
          <div className="LeaderboardHeader">
            <div className="LBHeaderText LBR">Rank</div>
            <div className="LBHeaderText LBU">User</div>
            <div className="LBHeaderText LBC">Challenges Completed</div>
            <div className="LBHeaderText LBS">Total Score</div>
          </div>

          <div className="mx-6 my-3 h-[1px] bg-sqyellow" />
          <div className="LeaderboardList">
            {loading ? (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="w-16 h-16 mb-2">Loading....</div>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="w-[120px] h-16 mb-2">No data found.</div>
              </div>
            ) : (
              <>
                {Array.isArray(leaderboard) &&
                  leaderboard.map((user, index) => (
                    <Link href={`/profile/${user.userInfo.id}`} key={index}>
                      <div className="LeaderboardEntry" key={index}>
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
                              ref={glitch.ref}
                              // ref={
                              //   user.userInfo.images.border === null
                              //     ? null
                              //     : user.userInfo.images.border.includes(
                              //       "glitch_border.gif"
                              //     )
                              //       ? glitch.ref
                              //       : glitch.ref
                              // }
                              src={
                                !user.userInfo.images.avatar
                                  ? "/assets/images/PFPPlaceholder.png" // Replace with the desired local image path
                                  : user.userInfo.images.avatar
                              }
                              alt="Profile Picture"
                              width={32}
                              height={32}
                              unoptimized={true}
                              key={index}
                              className="rounded-full relative drop-shadow-PFPShadow"
                            />
                            {!user.userInfo.images.border === null ? null : (
                              <Image
                                src="/assets/images/users/borders/gif/glitch_border.gif"
                                alt="Border Image"
                                className="absolute inset-0 object-cover scale-[145%] z-10"
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
                  ))}
              </>
            )}
          </div>
        </div>
        <div className="Navigation">
          <button
            className={`Backward ${
              currentPage > 1 ? "" : "cursor-not-allowed"
            }`}
            onClick={() => {
              if (currentPage > 1 && !loading) {
                const previousPage = currentPage - 1;
                router.push(`/leaderboard/${previousPage}`);
                setCurrentPage(previousPage);
              }
            }}
          >
            Back
          </button>

          <div className="PageNumber">{currentPage}</div>

          <button
            className={`Forward ${
              userCount === 10 && !loading ? "" : "cursor-not-allowed"
            }`}
            onClick={() => {
              if (userCount === 10 && !loading) {
                const nextPage = currentPage + 1;
                router.push(`/leaderboard/${nextPage}`);
                setCurrentPage(nextPage);
              }
            }}
          >
            Forward
          </button>
        </div>
      </div>
    </>
  );
}
