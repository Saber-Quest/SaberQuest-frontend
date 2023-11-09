import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import axios from "axios";
import { SessionUser } from "@lib/types";

export default function Autocomplete({
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
  const [autocomplete, setAutocomplete] = useState(false);

  useEffect(() => {
    if (!session || !session.user?.userInfo) return;
    if (session.user.userInfo.autoComplete) {
      setAutocomplete(true);
    } else {
      setAutocomplete(false);
    }
  }, [session]);

  const saveClick = async () => {
    setAutocomplete((prevAuto) => !prevAuto);
    setAutocomplete((prevAuto) => {
      let autoString: string;
      if (prevAuto) {
        autoString = "on";
      } else {
        autoString = "off";
      }
      axios
        .put(`${process.env.PUBLIC_URL}/api/profile/settings/autocomplete`, {
          ac: autoString,
          t: session.jwt,
        })
        .then((response) => {
          if (response.status === 302 || response.status === 200) {
            if (prevAuto) {
              setMessage(
                `You have **enabled** autocomplete!`
              );
            } else {
              setMessage(
                `You have **disabled** autocomplete!`
              );
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
                  autoComplete: prevAuto,
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
      return prevAuto;
    });
  };

  return (
    <Switch.Group as="div" className="flex items-center justify-between p-5">
      <div className="font-medium text-white">Autocomplete</div>
      <div className="flex flex-row items-center">
        <Switch.Label as="span" className="mr-3 min-w-[82px]">
          <span className="font-medium text-white">
            {autocomplete ? "Enabled" : "Disabled"}
          </span>
        </Switch.Label>
        <Switch
          checked={autocomplete}
          onChange={saveClick}
          className={`${
            autocomplete ? "bg-green-400" : "bg-red-400"
          } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
        >
          <span className="sr-only">Use setting</span>
          <span
            className={`${
              autocomplete ? "translate-x-5" : "translate-x-0"
            } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
          >
            <span
              className={`${
                autocomplete
                  ? "opacity-0 duration-100 ease-out"
                  : "opacity-100 duration-200 ease-in"
              } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
              aria-hidden="true"
            >
              <svg
                className="h-3 w-3 text-red-400"
                fill="none"
                viewBox="0 0 12 12"
              >
                <path
                  d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              className={`${
                autocomplete
                  ? "opacity-100 duration-200 ease-in"
                  : "opacity-0 duration-100 ease-out"
              } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
              aria-hidden="true"
            >
              <svg
                className="h-3 w-3 text-green-400"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
              </svg>
            </span>
          </span>
        </Switch>
      </div>
    </Switch.Group>
  );
}
