import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import axios from "axios";
import { useGlitch } from "react-powerglitch";
import Header from "@comp/Meta/Title";
import { AdvancedUser, SessionUser } from "@lib/types";
import InventoryPanel from "@ui/Profile/Inventory/InventoryPanel";
import ChallengesPanel from "@ui/Profile/Challenges/CompletedChallenges";
import CraftingPanel from "@ui/Profile/Crafting/CraftingPanel";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    if (params && params.id) {
      const id = params.id;

      try {
        const apiUrl = `${process.env.API_URL}/profile/${id}/advanced`;
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
  setSession,
  setMessage,
  setType,
  setShow,
}: {
  session: SessionUser | null;
  user: AdvancedUser | null;
  notFound: boolean;
  setSession: (session: SessionUser) => void;
  setMessage: (message: string) => void;
  setType: (type: string) => void;
  setShow: (show: boolean) => void;
}) {
  const router = useRouter();
  const [userData, setUser] = useState<AdvancedUser | null>(user);

  useEffect(() => {
    if (!session || !session.user || !user) return;
    if (session.user.userInfo.id === user.userInfo.id) {
      setUser(session.user);
    }
  }, [user, session]);

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
          image={`${process.env.PUBLIC_URL}/assets/images/Logo.png`}
        />
        <div className="flex flex-col pt-[5rem] flex-wrap justify-center items-center">
          <h1 className="text-4xl font-bold">User not found</h1>
        </div>
      </>
    );
  } else if (userData) {
    return (
      <>
        <Header
          title={`${userData.userInfo.username}'s Profile`}
          link={`${process.env.PUBLIC_URL}/profile/${userData.userInfo.id}`}
          contents={`Rank: #${userData.stats.rank}
          Challenges Completed: ${userData.stats.challengesCompleted}
          QP: ${userData.stats.qp}
          Account Value: ${userData.stats.value}
          Items: ${userData.inventory.length}`}
          image={userData.userInfo.images.avatar}
        />
        <div className="max-w-[100vw] 1920:max-w-[75vw] px-16 mt-32 drop-shadow-navBarShadow select-none transition-all duration-100 ease-in-out">
          <>
            <div className="userDiv transition-all opacity-1 duration-500 flex flex-col lg:flex-row gap-5">
              <div
                className={`userInfoVer h-[820px] rounded-lg`}
                style={{
                  backgroundImage: !userData.userInfo.images.banner
                    ? `url(/assets/images/users/banners/ver/default.png)`
                    : `url(/api/${userData.userInfo.id}/ver)`,
                  backgroundSize: "cover",
                }}
              >
                <div className="infoDiv relative overflow-visible flex justify-center w-full mt-[-70px]">
                  <Image
                    priority={true}
                    ref={
                      userData.userInfo.images.border?.includes(
                        "glitch_border.gif"
                      )
                        ? glitch.ref
                        : null
                    }
                    src={
                      !userData.userInfo.images.avatar
                        ? "/assets/images/PFPPlaceholder.png"
                        : userData.userInfo.images.avatar
                    }
                    alt="Profile Picture"
                    width={150}
                    height={150}
                    unoptimized={true}
                    className="rounded-full relative drop-shadow-PFPShadow"
                  />
                  {userData.userInfo.images.border && (
                    <Image
                      src={`/assets/images/users/borders/${userData.userInfo.images.border}`}
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
                  <p className="profileNameHeader max-w-[inherit] mt-8 p-5 text-center drop-shadow-textShadow">{`${userData.userInfo.username}`}</p>
                  <div className="h-[5px] w-[305px] rounded-full bg-gradient-to-r from-sqyellow mb-5" />
                  <div className="flex flex-col items-center gap-[16px] drop-shadow-textShadow text-[24px]">
                    <p>
                      Rank:{" "}
                      <span
                        className={`${
                          userData.stats.rank === 1 ? "text-sqyellow" : ""
                        }`}
                      >
                        #{userData.stats.rank}
                      </span>
                    </p>
                    <p>
                      Challenges Completed: {userData.stats.challengesCompleted}
                    </p>
                    <p>QP: {userData.stats.qp}</p>
                    <p>Account Value: {userData.stats.value}</p>
                  </div>
                </div>
              </div>
              <div className="profileRightContainer w-full">
                <div
                  className="userInfoHor min-h-[150px] max-h-[200px] px-4 py-5 sm:px-6 rounded-lg w-full bg-origin-content"
                  style={{
                    backgroundImage: !userData.userInfo.images.banner
                      ? `url(/assets/images/users/banners/hor/default.png)`
                      : `url(/api/${userData.userInfo.id}/hor)`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="flex flex-col items-center">
                    <p className="text-[24px] font-medium text-center drop-shadow-textShadow">
                      About
                    </p>
                    <div className="h-[5px] w-full rounded-full bg-gradient-to-r from-sqyellow my-5" />
                    <p className="text-center max-w-[900px] drop-shadow-textShadow break-all">
                      {userData.userInfo.about
                        ? userData.userInfo.about
                        : "This user has yet to write something!"}
                    </p>
                  </div>
                </div>
                <div className="mt-[17px] px-4 py-2 sm:px-6 rounded-lg bg-[#161616]">
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
                        {session?.id === userData.userInfo.id ? (
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
                      <Tab.Panels className="my-4">
                        {/* Inventory */}
                        <InventoryPanel inventory={userData.inventory} />
                        {/* Completed Challenges */}
                        <Tab.Panel className="my-4">
                          <ChallengesPanel
                            challenges={userData.challengeHistory}
                          />
                        </Tab.Panel>
                        {/* Crafting */}
                        {session && (
                          <Tab.Panel className="my-4">
                            <CraftingPanel
                              session={session}
                              inventory={userData.inventory}
                              setSession={setSession}
                              setMessage={setMessage}
                              setType={setType}
                              setShow={setShow}
                            />
                          </Tab.Panel>
                        )}
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
