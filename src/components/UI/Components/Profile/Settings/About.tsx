import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import axios from "axios";
import { SessionUser } from "@lib/types";

export default function About({
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
  const [placeholder, setPlaceholder] = useState<string>("");

  useEffect(() => {
    if (!session || !session.user?.userInfo) return;
    if (session.user.userInfo.about) {
      setPlaceholder(session.user.userInfo.about);
    }
  }, [session]);

  const saveAbout = async () => {
    const about = document.getElementById("about") as HTMLInputElement;
    if (about.value.length > 200) {
      setMessage("Your about **cannot** be longer than: **200** characters!");
      setType("error");
      setShow(true);
      return;
    }

    if (
      !about.value.match(
        /^[\x00-\x7F\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u036FA-Za-z0-9_-]*$/,
      )
    ) {
      setMessage("About did not pass sanitization!");
      setType("error");
      setShow(true);
      return;
    }

    await axios
      .put(`${process.env.PUBLIC_URL}/api/profile/settings/about`, {
        a: about.value,
        t: session.jwt,
      })
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          setMessage("About updated!");
          setType("success");
          setShow(true);
          if (!session.user) return;
          const updatedSession: SessionUser = {
            ...session,
            user: {
              ...session.user,
              userInfo: {
                ...session.user.userInfo,
                about: about.value,
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
    <Switch.Group
      as="div"
      className="flex items-center justify-between p-5 bg-[#0000003d]"
    >
      <div className="font-medium text-white">About</div>
      <div className="flex flex-row items-center">
        <div>
          <label htmlFor="about" className="sr-only">
            About
          </label>
          <div className="flex rounded-md shadow-sm">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <textarea
                wrap="false"
                rows={1}
                name="about"
                id="about"
                maxLength={200}
                className="block w-[400px] rounded-none rounded-l-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6"
                placeholder={placeholder}
              />
            </div>
            <button
              type="button"
              onClick={saveAbout}
              className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-[#131313e5] ring-0 bg-sqyellowfaint hover:bg-sqyellow smoothTran"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Switch.Group>
  );
}
