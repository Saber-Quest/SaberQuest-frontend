import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Header from "@comp/Meta/Title";
import { User } from "@lib/types/User";
import { ItemMapping } from "@lib/types/Items";
import axios from "axios";

export default function ProfilePage({
  sessionCheck,
}: {
  sessionCheck: boolean;
}) {
  const router = useRouter();
  const { id } = router.query as unknown as { id: number };
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<User | null>(null);
  const [vertProfileBanner, setVertProfileBanner] = useState<string>("");
  const [horiProfileBanner, setHoriProfileBanner] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (router.isReady && sessionCheck) {
      axios
        .get(`${process.env.PUBLIC_URL}/api/${id}`)
        .then((response) => {
          if (response.status === 302 || response.status === 200) {
            setProfileData(response.data);
            setVertProfileBanner(
              `/assets/images/users/banners/ver/${response.data.userInfo.id}.png`
            );
            setHoriProfileBanner(
              `/assets/images/users/banners/hor/${response.data.userInfo.id}.png`
            );
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("An error occured, contact a developer!");
          console.error(error);
          router.push("/");
        });
      setUrl(window.location.href);
    }
  }, [
    isLoading,
    router,
    sessionCheck,
    id,
    vertProfileBanner,
    horiProfileBanner,
    url,
  ]);

  const bannerStyle = {
    backgroundImage: `url(${vertProfileBanner})`,
    WebkitMaskImage:
      "-webkit-gradient(linear, 0% 40%, 0% 100%, from(rgb(255 255 255 / 95%)), to(rgb(0 0 0 / 37%)))",
  };
  const bannerHoriStyle = {
    backgroundImage: `url(${horiProfileBanner})`,
    WebkitMaskImage:
      "-webkit-gradient(linear, 0% 40%, 0% 100%, from(rgb(255 255 255 / 95%)), to(rgb(0 0 0 / 37%)))",
  };

  return (
    <>
      <Header
        title={`Page`}
        link={`${process.env.PUBLIC_URL}/profile/${profileData?.userInfo.id}`}
        contents={`Fetching Profile | User-profile on ${process.env.PUBLIC_NAME}.`}
        image={`${process.env.PUBLIC_URL}/Logo.svg`}
      />
      {isLoading ? (
        <>
          <div className="flex flex-col pt-[5rem] flex-wrap justify-center items-center">
            <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-black dark:border-white drop-shadow-[0_0_1px_rgba(0,0,0,0.50)] mt-[1rem]"></div>
          </div>
        </>
      ) : (
        <>
          <Header
            title={`${profileData?.userInfo.username}'s Profile`}
            link={url}
            image={`${profileData?.userInfo.images.avatar}`}
            contents={`${profileData?.userInfo.username}'s Profile | User-profile on ${process.env.PUBLIC_NAME}.`}
          />

          <div className="max-w-[75%] 1920:max-w-[60%] mx-auto pt-10 mt-14 drop-shadow-navBarShadow select-none transition-all duration-100 ease-in-out">
            <>
              <div className="userDiv overflow-visible rounded-lg transition-all opacity-1 duration-500 flex gap-5">
                <div className="userInfo">
                  <div
                    className={`userBannerVert opacity-30 px-4 py-5 sm:px-6 rounded-lg absolute z-[-1] h-[600px] 1920:h-[700px] w-[425px] bg-cover bg-center bg-no-repeat`}
                    style={bannerStyle}
                  />
                  <Image
                    src={
                      profileData === null
                        ? "/assets/images/users/avatars/empty.png"
                        : profileData?.userInfo.images.avatar
                    }
                    alt="Profile Picture"
                    width={150}
                    height={150}
                    className="rounded-full relative mt-[-16%] ml-[33%] drop-shadow-PFPShadow"
                  />
                  <div
                    className={`px-4 py-5 sm:px-6 rounded-lg w-[425px] flex flex-col items-center font-medium`}
                  >
                    <p className="profileNameHeader w-[inherit] max-w-[inherit] p-5 text-center drop-shadow-textShadow">{`${profileData?.userInfo.username}`}</p>
                    <div className="h-[5px] w-[305px] rounded-full bg-gradient-to-r from-sqyellow mb-5" />
                    <div className="flex flex-col items-center gap-[16px] drop-shadow-textShadow text-[24px]">
                      <p>
                        Rank:{" "}
                        <span
                          className={`${
                            profileData?.stats.rank === 1 ? "text-sqyellow" : ""
                          }`}
                        >
                          #{profileData?.stats.rank}
                        </span>
                      </p>
                      <p>
                        Challenges Completed:{" "}
                        {profileData?.stats.challengesCompleted}
                      </p>
                      <p>QP: {profileData?.stats.qp}</p>
                      <p>Account Value: {profileData?.stats.value}</p>
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
                      style={bannerHoriStyle}
                    />
                  </div>
                  <div className="px-4 py-5 sm:px-6 rounded-lg bg-[#161616]">
                    <Tab.Group>
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
                          ??????
                        </Tab>
                      </Tab.List>
                      <Tab.Panels className="mt-8">
                        {/* Inventory */}
                        <Tab.Panel>
                          <div className="flex flex-col items-center">
                            <div className="flex flex-wrap justify-center gap-5">
                              {profileData && profileData?.items.length > 0 ? (
                                profileData.items.map((item, index) => {
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
                        <Tab.Panel>Completed Challenges here</Tab.Panel>
                        {/* ?????? */}
                        <Tab.Panel>??????? here</Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
                </div>
              </div>
            </>
          </div>
        </>
      )}
    </>
  );
}
