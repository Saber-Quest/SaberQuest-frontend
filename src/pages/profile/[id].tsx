import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Tab } from "@headlessui/react";
import { useGlitch } from "react-powerglitch";
import axios from "axios";
import Image from "next/image";
import Header from "@comp/Meta/Title";
import { AdvancedUser, SessionUser } from "@lib/types";
import InventoryPanel from "@comp/UI/Components/Profile/InventoryPanel";
import ChallengesPanel from "@comp/UI/Components/Profile/CompletedChallenges";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    if (params && params.id) {
      const id = params.id;
      const apiUrl = `${process.env.API_URL}/profile/${id}/advanced`;

      try {
        const response = await axios.get<AdvancedUser>(apiUrl);

        if (response.status === 302 || response.status === 200) {
          const user = response.data;
          return {
            props: {
              user,
              notFound: false,
            },
          };
        }
      } catch (error) {
        if (error) {
          throw new Error("User not found");
        }
      }
    }

    return {
      props: {
        user: null,
        notFound: true,
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      props: {
        user: null,
        notFound: true,
      },
    };
  }
};

export default function Profile({
  session,
  user,
  notFound,
}: {
  session: SessionUser | null;
  user: AdvancedUser | null;
  notFound: boolean;
}) {
  const router = useRouter();

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

  if (router.isFallback) {
    return (
      <>
        <div className="flex flex-col pt-[5rem] flex-wrap justify-center items-center">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-black dark:border-white drop-shadow-[0_0_1px_rgba(0,0,0,0.50)] mt-[1rem]"></div>
        </div>
      </>
    );
  }
  if (notFound && !user) {
    return (
      <>
        <Header
          title={`User not found`}
          link={`${process.env.PUBLIC_URL}`}
          contents={`User was not found, please provide a valid user id.`}
          image={`${process.env.PUBLIC_URL}/Logo.svg`}
        />
        <div className="flex flex-col pt-[5rem] flex-wrap justify-center items-center">
          <h1 className="text-4xl font-bold">User not found</h1>
        </div>
      </>
    );
  } else if (user) {
    return (
      <>
        <Header
          title={`${user.userInfo.username}'s Profile`}
          link={`${process.env.PUBLIC_URL}/profile/${user.userInfo.id}`}
          contents={`${user.userInfo.username}'s Profile | User-profile on ${process.env.PUBLIC_NAME}.`}
          image={user.userInfo.images.avatar}
        />
        <div className="max-w-[100vw] 1920:max-w-[75vw] px-16 mt-32 drop-shadow-navBarShadow select-none transition-all duration-100 ease-in-out">
          <>
            <div className="userDiv transition-all opacity-1 duration-500 flex flex-col lg:flex-row gap-5">
              <div
                className={`userInfoVer h-[820px] rounded-lg`}
                style={{
                  backgroundImage: !user.userInfo.images.banner
                    ? `url(/assets/images/users/banners/ver/default.png)`
                    : `url(/api/${user.userInfo.id}/ver)`, //THIS NEEDS TO BE CHANGED BEFORE DEPLOYMENT!!
                  backgroundSize: "cover",
                }}
              >
                <div className="infoDiv relative overflow-visible flex justify-center w-full mt-[-70px]">
                  <Image
                    priority={true}
                    ref={
                      user.userInfo.images.border?.includes("glitch_border.gif")
                        ? glitch.ref
                        : null
                    }
                    src={
                      !user.userInfo.images.avatar
                        ? "/assets/images/PFPPlaceholder.png"
                        : user.userInfo.images.avatar
                    }
                    alt="Profile Picture"
                    width={150}
                    height={150}
                    unoptimized={true}
                    className="rounded-full relative drop-shadow-PFPShadow"
                  />
                  {user.userInfo.images.border && (
                    <Image
                      src={`/assets/images/users/borders/${user.userInfo.images.border}`}
                      alt="Border Image"
                      className="absolute top-[-35px] z-10"
                      width={220}
                      height={220}
                      unoptimized={true}
                    />
                  )}
                </div>
                <div
                  className={`rounded-lg w-[425px] flex flex-col items-center font-medium`}
                >
                  <p className="profileNameHeader max-w-[inherit] mt-8 p-5 text-center drop-shadow-textShadow">{`${user.userInfo.username}`}</p>
                  <div className="h-[5px] w-[305px] rounded-full bg-gradient-to-r from-sqyellow mb-5" />
                  <div className="flex flex-col items-center gap-[16px] drop-shadow-textShadow text-[24px]">
                    <p>
                      Rank:{" "}
                      <span
                        className={`${
                          user.stats.rank === 1 ? "text-sqyellow" : ""
                        }`}
                      >
                        #{user.stats.rank}
                      </span>
                    </p>
                    <p>
                      Challenges Completed: {user.stats.challengesCompleted}
                    </p>
                    <p>QP: {user.stats.qp}</p>
                    <p>Account Value: {user.stats.value}</p>
                  </div>
                </div>
              </div>
              <div className="profileRightContainer w-full">
                <div
                  className="userInfoHor h-[150px] px-4 py-5 sm:px-6 rounded-lg w-full"
                  style={{
                    backgroundImage: !user.userInfo.images.banner
                      ? `url(/assets/images/users/banners/hor/default.png)`
                      : `url(/api/${user.userInfo.id}/hor)`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="flex flex-col items-center">
                    <p className="text-[24px] font-medium text-center drop-shadow-textShadow">
                      About
                    </p>
                    <div className="h-[5px] w-full rounded-full bg-gradient-to-r from-sqyellow my-5" />
                    <p className="text-center drop-shadow-textShadow">
                      {user.userInfo.about
                        ? user.userInfo.about
                        : "This user has yet to write something!"}
                    </p>
                  </div>
                </div>
                <div className="mt-[17px] px-4 py-5 sm:px-6 rounded-lg bg-[#161616]">
                  <Tab.Group>
                    <div className="divide-y-[2px] divide-sqyellow min-w-[750px] max-w-[750px]">
                      <Tab.List className="flex min-w-full justify-center">
                        <Tab
                          className={({ selected }: { selected: boolean }) =>
                            `${
                              selected
                                ? "border-sqyellow text-sqyellow drop-shadow-navBarShadow"
                                : "border-transparent"
                            } py-2 px-4 w-full hover:text-sqyellow border-b focus:outline-none`
                          }
                        >
                          Inventory
                        </Tab>
                        <Tab
                          className={({ selected }: { selected: boolean }) =>
                            `${
                              selected
                                ? "border-sqyellow text-sqyellow drop-shadow-navBarShadow"
                                : "border-transparent"
                            } py-2 px-4 w-full hover:text-sqyellow border-b focus:outline-none`
                          }
                        >
                          Completed Challenges
                        </Tab>
                        {session?.id === user.userInfo.id ? (
                          <Tab
                            className={({ selected }: { selected: boolean }) =>
                              `${
                                selected
                                  ? "border-sqyellow text-sqyellow drop-shadow-navBarShadow"
                                  : "border-transparent"
                              } py-2 px-4 w-full hover:text-sqyellow border-b focus:outline-none`
                            }
                          >
                            Crafting
                          </Tab>
                        ) : null}
                      </Tab.List>
                      <Tab.Panels className="mt-10">
                        {/* Inventory */}
                        <InventoryPanel inventory={user.inventory} />
                        {/* Completed Challenges */}
                        <Tab.Panel className="mt-10">
                          <ChallengesPanel challenges={user.challengeHistory} />
                        </Tab.Panel>
                        {/* ?????? */}
                        <Tab.Panel className="mt-10">Crafting here</Tab.Panel>
                      </Tab.Panels>
                    </div>
                  </Tab.Group>
                </div>
              </div>
            </div>
          </>
        </div>
      </>
    );
  }
}
