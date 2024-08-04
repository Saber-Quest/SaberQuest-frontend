import { useState, useEffect } from "react";
import { SessionUser } from "@lib/types";
import axios from "axios";

export default function AvatarUpload({
  session,
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
  let avatarImage: string = "";
  const [disable, setDisable] = useState<boolean>(true);

  useEffect(() => {
    if (!session || !session.user?.userInfo) return;
    if (session.user?.userInfo.patreon) {
      setDisable(false);
    }
  }, [session]);

  const handleAvatar = async (e: any) => {
    if (!session.user?.userInfo.patreon) {
      setMessage("You must be a Patreon supporter to upload an avatar!");
      setType("error");
      setShow(true);
      return;
    }
    const file = e.target.files[0];
    const fileSize = file.size / 1024 / 1024;

    if (fileSize > 10) {
      setMessage(`Avatar file-size is too large!`);
      setType("error");
      setShow(true);
      return;
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      setMessage(`Avatar is not a PNG or JPG file!`);
      setType("error");
      setShow(true);
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async () => {
      const loadImage = (src: string) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });

      const img: any = await loadImage(reader.result as string);

      if (img.width !== 512 || img.height !== 512) {
        setMessage(`Avatar is not 512x512px!`);
        setType("error");
        setShow(true);
        return;
      }

      avatarImage = reader.result as string;
    };
  };

  const saveClick = async () => {
    if (!session.user?.userInfo.patreon) {
      setMessage("You must be a Patreon supporter to upload an avatar!");
      setType("error");
      setShow(true);
      return;
    }
    if (!avatarImage) {
      console.info("No avatar image selected!");
      return;
    }
    await axios
      .put(`${process.env.PUBLIC_URL}/api/profile/settings/avatar`, {
        av: avatarImage,
        t: session.jwt,
      })
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          setMessage(
            "Avatar updated!\n\nReload the website if you don't see it right away! :)",
          );
          setType("success");
          setShow(true);
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
      <div className="avatarUpload">
        <label
          className="block mb-2 text-sm font-medium text-white"
          htmlFor="avatarInput"
          title="Patreon Feature"
        >
          Avatar - Upload file{" "}
          <span className="text-sm text-sqyellow mt-2">*</span>
        </label>
        <div className="flex flex-row gap-0 h-[40px]">
          <input
            className="file:hidden h-[40px] pt-[10px] pl-2 block w-full text-sm text-white rounded-l-lg cursor-pointer bg-[#131313e5]"
            onInput={handleAvatar}
            accept=".png, .jpg, .jpeg"
            aria-describedby="avatarInputHelp"
            id="avatarInput"
            type="file"
            disabled={disable}
          />
          <button
            type="button"
            onClick={saveClick}
            className="flex flex-row items-center px-4 text-sm font-medium text-[#131313e5] bg-sqyellow hover:bg-sqyellowfaint hover:text-white rounded-r-lg hover:bg-sqyellowhover ring-0 smoothTran"
            disabled={disable}
          >
            Save
          </button>
        </div>
        <div className="mt-1 text-sm text-gray-500" id="avatarInputHelp">
          PNG or JPG (MIN/MAX. 512x512px, 10MB) -{" "}
          <a
            download={true}
            href="/assets/images/templates/avatar.png"
            className="hover:text-sqyellow underline"
          >
            Template
          </a>
        </div>
      </div>
    </>
  );
}
