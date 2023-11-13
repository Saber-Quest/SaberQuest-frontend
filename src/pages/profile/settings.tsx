import { useCallback, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import About from "@comp/UI/Components/Profile/Settings/About";
import AvatarUpload from "@ui/Profile/Settings/Avatar";
import BannerHorUpload from "@ui/Profile/Settings/BannerHor";
import BannerVerUpload from "@ui/Profile/Settings/BannerVer";
import BorderDropdown from "@ui/Profile/Settings/BorderSelection";
import Preference from "@ui/Profile/Settings/Preference";
import Username from "@comp/UI/Components/Profile/Settings/Username";
import { Border, SessionUser } from "@lib/types";
import { borders } from "@lib/data/borders";
import { useGlitch } from "react-powerglitch";
import Header from "@comp/Meta/Title";
import Autocomplete from "@comp/UI/Components/Profile/Settings/Autocomplete";

export default function ImgTest({
  session,
  setSession,
  setMessage,
  setType,
  setShow,
}: {
  session: SessionUser;
  setSession: (session: SessionUser) => void;
  setMessage: (message: string) => void;
  setType: (type: string) => void;
  setShow: (show: boolean) => void;
}) {
  const [selectedBorder, setSelectedBorder] = useState<Border>({
    id: 0,
    name: "",
    imageUrl: "",
    type: "",
    patreon: false,
    hasGlitchEffect: false,
  });
  const [intialBorder, setInitialBorder] = useState<Border>({
    id: 0,
    name: "",
    imageUrl: "",
    type: "",
    patreon: false,
    hasGlitchEffect: false,
  });
  const [loaded, setLoaded] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

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

  const handleSelectBorder = (border: Border) => {
    setSelectedBorder(border);
    if (border.name === "Glitched") {
      glitch.startGlitch();
    } else {
      glitch.stopGlitch();
    }
  };

  const initialBorder = useCallback(() => {
    const border = borders.find(
      (border) => border.imageUrl === session.user?.userInfo.images.border,
    );
    if (border !== null && border !== undefined) {
      setSelectedBorder(border);
      setInitialBorder(border);
      if (border.name === "Glitched") {
        glitch.startGlitch();
      } else {
        glitch.stopGlitch();
      }
    }
  }, [glitch, session]);

  useEffect(() => {
    if (loaded) return;
    if (!session) return;
    initialBorder();
    setLoaded(true);
    if (session.user?.userInfo.patreon) {
      setDisabled(false);
    }
  }, [loaded, session, initialBorder]);

  return (
    <>
      <Header
        title={`Settings-page`}
        link={`/`}
        contents={`Settings-page | Settings-page on ${process.env.PUBLIC_NAME}.`}
        image={`${process.env.PUBLIC_URL}/assets/images/Logo.png`}
      />
      <div className="flex flex-col items-center justify-center px-16 pt-10 mt-14 drop-shadow-navBarShadow select-none transition-all duration-100 ease-in-out">
        <div className="LeaderboardContainer min-w-[1000px]">
          <div className="LeaderboardList">
            <h1 className="px-4 sm:px-6 lg:px-8 md:chTextHeader text-[28px] transition-all duration-75 mb-5 flex flex-col flex-start">
              <span className="text-sqyellow">Settings</span>
              <span
                className="text-sm text-white font-bold mt-2"
                title="Patreon Feature"
              >
                Patreon features <span className="text-sqyellow">*</span>
              </span>
            </h1>
            <div className="px-4 sm:px-6 lg:px-8">
              <Tab.Group>
                <div className="divide-y-[2px] divide-sqyellow">
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
                      User-settings
                    </Tab>
                    <Tab
                      disabled={disabled}
                      title={`Patreon Feature`}
                      className={({ selected }: { selected: boolean }) =>
                        `${
                          selected
                            ? "border-sqyellow text-sqyellow drop-shadow-navBarShadow"
                            : "border-transparent"
                        } ${
                          disabled
                            ? "cursor-not-allowed"
                            : "hover:text-sqyellow"
                        } py-2 px-4 w-full border-b focus:outline-none`
                      }
                    >
                      Avatar-Border <span className="text-sqyellow">*</span>
                    </Tab>
                    <Tab
                      disabled={disabled}
                      title={`Patreon Feature`}
                      className={({ selected }: { selected: boolean }) =>
                        `${
                          selected
                            ? "border-sqyellow text-sqyellow drop-shadow-navBarShadow"
                            : "border-transparent"
                        } ${
                          disabled
                            ? "cursor-not-allowed"
                            : "hover:text-sqyellow"
                        } py-2 px-4 w-full border-b focus:outline-none`
                      }
                    >
                      Images <span className="text-sqyellow">*</span>
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="my-4 focus:outline-none">
                    <Tab.Panel>
                      <Preference
                        session={session}
                        setSession={setSession}
                        setMessage={setMessage}
                        setType={setType}
                        setShow={setShow}
                      />
                      <Autocomplete
                        session={session}
                        setSession={setSession}
                        setMessage={setMessage}
                        setType={setType}
                        setShow={setShow}
                      />
                      <About
                        session={session}
                        setSession={setSession}
                        setMessage={setMessage}
                        setType={setType}
                        setShow={setShow}
                      />
                      <Username
                        session={session}
                        setSession={setSession}
                        setMessage={setMessage}
                        setType={setType}
                        setShow={setShow}
                      />
                    </Tab.Panel>
                    {!disabled && (
                      <>
                        <Tab.Panel className="my-4 focus:outline-none">
                          <div className="mt-10 px-10 flex flex-col gap-10 items-center">
                            {session && session.user && selectedBorder && (
                              <>
                                <div className="infoDiv relative overflow-visible">
                                  <>
                                    <Image
                                      ref={glitch.ref}
                                      src={session.user.userInfo.images.avatar}
                                      alt="Profile Picture"
                                      width={150}
                                      height={150}
                                      unoptimized={true}
                                      className="rounded-full relative drop-shadow-PFPShadow"
                                    />
                                    {selectedBorder.name === "Glitched"
                                      ? glitch.startGlitch()
                                      : glitch.stopGlitch()}
                                  </>
                                  {selectedBorder.id === 0 ? (
                                    ""
                                  ) : (
                                    <Image
                                      priority={true}
                                      loading="eager"
                                      src={`/assets/images/users/borders/${selectedBorder.imageUrl}`}
                                      alt={selectedBorder.name}
                                      className="absolute inset-0 object-cover scale-[145%] transition-all duration-200 ease-linear"
                                      width={220}
                                      height={220}
                                      unoptimized={true}
                                    />
                                  )}
                                </div>
                              </>
                            )}
                            <div className="flex items-center gap-5">
                              <BorderDropdown
                                session={session}
                                initialBorder={intialBorder}
                                borderSelected={selectedBorder}
                                onSelectBorder={handleSelectBorder}
                                setSession={setSession}
                                setMessage={setMessage}
                                setType={setType}
                                setShow={setShow}
                              />
                            </div>
                          </div>
                        </Tab.Panel>

                        <Tab.Panel className="my-4 focus:outline-none">
                          <div className="mt-5 px-10 flex flex-col gap-10">
                            <AvatarUpload
                              session={session}
                              setSession={setSession}
                              setMessage={setMessage}
                              setType={setType}
                              setShow={setShow}
                            />
                            <BannerHorUpload
                              session={session}
                              setSession={setSession}
                              setMessage={setMessage}
                              setType={setType}
                              setShow={setShow}
                            />
                            <BannerVerUpload
                              session={session}
                              setSession={setSession}
                              setMessage={setMessage}
                              setType={setType}
                              setShow={setShow}
                            />
                          </div>
                        </Tab.Panel>
                      </>
                    )}
                  </Tab.Panels>
                </div>
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
