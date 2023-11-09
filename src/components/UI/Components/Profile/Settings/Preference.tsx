import { useState, useEffect, use } from "react";
import Image from "next/image";
import axios from "axios";
import { Switch } from "@headlessui/react";
import { SessionUser } from "@lib/types";

export default function Preference({
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
  const [platform, setPlatform] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      if (!session || !session.user?.userInfo) return;
      if (session.user.userInfo.preference === "bl") {
        setPlatform(false);
      } else {
        setPlatform(true);
      }
      setLoading(false);
    }
  }, [session, loading]);

  const saveClick = async () => {
    setPlatform((prevPlatform) => !prevPlatform);
    setPlatform((prevPlatform) => {
      let usedPlatform: string;
      let usedPlatformLong: string;
      if (prevPlatform) {
        usedPlatform = "ss";
        usedPlatformLong = "ScoreSaber";
      } else {
        usedPlatform = "bl";
        usedPlatformLong = "BeatLeader";
      }
      axios
        .put(`${process.env.PUBLIC_URL}/api/profile/settings/preference`, {
          p: usedPlatform,
          t: session.jwt,
        })
        .then((response) => {
          if (response.status === 302 || response.status === 200) {
            setMessage(
              `You changed your platform preference!\n\nYou are now using ***${usedPlatformLong}*** as your main platform.`
            );
            setType("success");
            setShow(true);
            if (!session.user) return;
            const updatedSession: SessionUser = {
              ...session,
              user: {
                ...session.user,
                userInfo: {
                  ...session.user.userInfo,
                  preference: prevPlatform ? "ss" : "bl",
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
          return;
        });
      return prevPlatform;
    });
  };

  return (
    <Switch.Group
      as="div"
      className="flex items-center justify-between bg-[#0000003d] p-5"
    >
      <div className="font-medium text-white">Platform-preference</div>
      <div className="flex flex-row items-center">
        <Switch.Label as="span" className="mr-3 min-w-[82px]">
          <span className="font-medium text-white">
            {platform ? "ScoreSaber" : "BeatLeader"}
          </span>
        </Switch.Label>
        <Switch
          checked={platform}
          onChange={saveClick}
          className={`${platform ? "bg-[#feec3e]" : "bg-[#e50477]"
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
        >
          <span className="sr-only">Use setting</span>
          <span
            className={`${platform ? "translate-x-5" : "translate-x-0"
              } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
          >
            <span
              className={`${platform
                ? "opacity-0 duration-100 ease-out"
                : "opacity-100 duration-200 ease-in"
                } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
              aria-hidden="true"
            >
              <Image
                src="/assets/images/BeatLeaderLogo.png"
                alt="Profile Picture"
                width={12}
                height={12}
              />
            </span>
            <span
              className={`${platform
                ? "opacity-100 duration-200 ease-in"
                : "opacity-0 duration-100 ease-out"
                } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
              aria-hidden="true"
            >
              <Image
                src="/assets/images/ScoreSaberLogo.svg"
                alt="Profile Picture"
                width={12}
                height={12}
              />
            </span>
          </span>
        </Switch>
      </div>
    </Switch.Group>
  );
}
