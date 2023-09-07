import { GetServerSideProps } from "next";
import { User } from "@lib/types/User";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "@comp/Meta/Title";
import { Tab } from "@headlessui/react";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    if (params && params.id) {
      const id = params.id;
      const apiUrl = `${process.env.PUBLIC_URL}/api/${id}`;

      try {
        const response = await axios.get<User>(apiUrl);

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
  user,
  notFound,
}: {
  user: User | null;
  notFound: boolean;
}) {
  const router = useRouter();

  if (router.isFallback) {
    // This is shown during the loading/fallback phase
    return (
      <>
        <div className="flex flex-col pt-[5rem] flex-wrap justify-center items-center">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-black dark:border-white drop-shadow-[0_0_1px_rgba(0,0,0,0.50)] mt-[1rem]"></div>
        </div>
      </>
    );
  }
  if (notFound && !user) {
    // Handle the case where user data is not found
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
        <div className="max-w-[100vw] 1920:max-w-[75vw] px-16 pt-10 mt-14 drop-shadow-navBarShadow select-none transition-all duration-100 ease-in-out">
          <>
            <div className="userDiv overflow-visible rounded-lg transition-all opacity-1 duration-500 flex gap-5">
              <div className="userInfo">
                <div
                  className={`userBannerVert opacity-30 px-4 py-5 sm:px-6 rounded-lg absolute z-[-1] h-[600px] 1920:h-[700px] w-[425px] bg-cover bg-center bg-no-repeat`}
                  style={{
                    backgroundImage: `url(/assets/images/users/banners/ver/${user.userInfo.id}.png)`,
                    WebkitMaskImage: `-webkit-gradient(linear, 0% 40%, 0% 100%, from(rgb(255 255 255 / 95%)), to(rgb(0 0 0 / 37%)))`,
                  }}
                />
                <Image
                  src={user.userInfo.images.avatar}
                  alt="Profile Picture"
                  width={150}
                  height={150}
                  className="rounded-full relative mt-[-16%] ml-[33%] drop-shadow-PFPShadow"
                />
                <div
                  className={`px-4 py-5 sm:px-6 rounded-lg w-[425px] flex flex-col items-center font-medium`}
                >
                  <p className="profileNameHeader w-[inherit] max-w-[inherit] p-5 text-center drop-shadow-textShadow">{`${user.userInfo.username}`}</p>
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
                <div className="relative">
                  <div className="userInfo mb-5 h-[150px] px-4 py-5 sm:px-6 rounded-lg w-full">
                    <div className="flex flex-col items-center">
                      <p className="text-[24px] font-medium text-center drop-shadow-textShadow">
                        About
                      </p>
                      <div className="h-[5px] w-full rounded-full bg-gradient-to-r from-sqyellow mb-5" />
                      <p className="text-center drop-shadow-textShadow">
                        Haha Funny
                      </p>
                    </div>
                  </div>
                  <div
                    className="absolute opacity-30 top-0 left-0 w-full h-full rounded-lg z-[-1]"
                    style={{
                      backgroundImage: `url(/assets/images/users/banners/hor/${user.userInfo.id}.png)`,
                      WebkitMaskImage: `-webkit-gradient(linear, 0% 40%, 0% 100%, from(rgb(255 255 255 / 95%)), to(rgb(0 0 0 / 37%)))`,
                    }}
                  />
                </div>
                <div className="px-4 py-5 sm:px-6 rounded-lg bg-[#161616]">
                  <Tab.Group>
                    <div className="divide-y-[2px] divide-sqyellow">
                      <Tab.List className="flex min-w-full justify-center">
                        <Tab
                          className={({ selected }: { selected: boolean }) =>
                            `${
                              selected
                                ? "border-sqyellow text-sqyellow drop-shadow-navBarShadow"
                                : "border-transparent"
                            } py-2 px-4 min-w-[250px] hover:text-sqyellow border-b focus:outline-none`
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
                            } py-2 px-4 min-w-[250px] hover:text-sqyellow border-b focus:outline-none`
                          }
                        >
                          Completed Challenges
                        </Tab>
                        <Tab
                          className={({ selected }: { selected: boolean }) =>
                            `${
                              selected
                                ? "border-sqyellow text-sqyellow drop-shadow-navBarShadow"
                                : "border-transparent"
                            } py-2 px-4 min-w-[250px] hover:text-sqyellow border-b focus:outline-none`
                          }
                        >
                          Crafting
                        </Tab>
                      </Tab.List>
                      <Tab.Panels className="mt-10">
                        {/* Inventory */}
                        <Tab.Panel className="mt-10">
                          <div className="flex flex-col items-center">
                            <div className="flex flex-wrap justify-center gap-5">
                              {user.items.length > 0 ? (
                                user.items.map((item, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="flex flex-col items-center rounded-3xl p-2 border-2 border-sqyellow border-opacity-0 drop-shadow-PFPShadow hover:border-opacity-30 transition-all duration-150 ease-in-out"
                                    >
                                      <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={150}
                                        height={150}
                                        className="rounded-full relative"
                                      />
                                      <p className="text-center drop-shadow-textShadow">
                                        {item.name}
                                      </p>
                                      <p>x{item.amount}</p>{" "}
                                      {/* Display item count */}
                                    </div>
                                  );
                                })
                              ) : (
                                <p>Inventory Empty</p>
                              )}
                            </div>
                          </div>
                        </Tab.Panel>
                        {/* Completed Challenges */}
                        <Tab.Panel className="mt-10">
                          Completed Challenges here
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
