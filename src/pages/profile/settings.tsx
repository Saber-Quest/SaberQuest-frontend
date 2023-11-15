import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import BorderDropdown from "@ui/Profile/Settings/BorderSelection";
import { Border, SessionUser } from "@lib/types";
import { borders } from "@lib/data/borders";
import axios from "axios";
import { useGlitch } from "react-powerglitch";
import Header from "@comp/Meta/Title";

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
  const [loaded, setLoaded] = useState<boolean>(false);

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
      (border) => border.imageUrl === session.user?.userInfo.images.border
    );
    if (border !== null && border !== undefined) {
      setSelectedBorder(border);
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
  }, [loaded, session, initialBorder]);

  const saveClick = async () => {
    console.log(selectedBorder);
    if (selectedBorder.patreon && !session.user?.userInfo.patreon) {
      setMessage(
        `You're not allowed to use this border!\n Subscribe to the ${process.env.PUBLIC_NAME} Patreon to unlock it!`
      );
      setType("error");
      setShow(true);
      return;
    }

    await axios
      .put(`${process.env.PUBLIC_URL}/api/profile/settings`, {
        a: "",
        av: "",
        ba: "",
        bo: selectedBorder,
        p: "",
        u: "",
        t: session.jwt,
      })
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          if (selectedBorder.name === "None") {
            setMessage(`You removed your border!`);
          } else {
            setMessage(`You applied ${selectedBorder.name}.`);
          }
          setType("success");
          setShow(true);
          if (!session.user) return;
          const updatedSession: SessionUser = {
            ...session,
            user: {
              ...session.user,
              userInfo: {
                ...session.user.userInfo,
                images: {
                  ...session.user.userInfo.images,
                  border: selectedBorder.imageUrl,
                },
              },
            },
          };
          setSession(updatedSession);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setType("error");
        setShow(true);
      });
  };

  return (
    <>
      <Header
        title={`Settings-page`}
        link={`/`}
        contents={`Settings-page | Settings-page on ${process.env.PUBLIC_NAME}.`}
        image={`/assets/images/Logo.png`}
      />
      {session && session.user && (
        <div className="flex flex-col items-center justify-center px-16 pt-10 mt-14 drop-shadow-navBarShadow select-none transition-all duration-100 ease-in-out">
          <div className="LeaderboardContainer min-w-[1000px]">
            <div className="LeaderboardList">
              <div className="mt-20 px-10 flex flex-col gap-20 items-center">
                {selectedBorder && (
                  <>
                    <div className="infoDiv relative overflow-visible">
                      <Image
                        ref={glitch.ref}
                        src={session.user.userInfo.images.avatar}
                        alt="Profile Picture"
                        width={150}
                        height={150}
                        unoptimized={true}
                        className="rounded-full relative drop-shadow-PFPShadow"
                      />
                      {selectedBorder.id === 0 ? (
                        ""
                      ) : (
                        <Image
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
                    borderSelected={selectedBorder}
                    onSelectBorder={handleSelectBorder}
                  />
                  <span className="isolate inline-flex rounded-md shadow-sm relative top-[16px]">
                    <button
                      onClick={initialBorder}
                      type="button"
                      className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={saveClick}
                      className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                    >
                      Save
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
