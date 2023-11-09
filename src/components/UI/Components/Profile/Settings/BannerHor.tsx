import { useState, useEffect } from "react";
import { SessionUser } from "@lib/types";
import axios from "axios";

export default function BannerHorUpload({
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
  let bannerImage: string = "";
  const [disable, setDisable] = useState<boolean>(true);

  useEffect(() => {
    if (!session || !session.user?.userInfo) return;
    if (session.user?.userInfo.patreon) {
      setDisable(false);
    }
  }, [session]);

  const handleBannerHor = async (e: any) => {
    if (!session.user?.userInfo.patreon) {
      setMessage("You must be a Patreon supporter to upload a banner!");
      setType("error");
      setShow(true);
      return;
    }
    const file = e.target.files[0];
    const fileSize = file.size / 1024 / 1024;

    if (fileSize > 10) {
      setMessage(`Horizontal banner file-size is too large!`);
      setType("error");
      setShow(true);
      return;
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      setMessage(`Horizontal banner is not a PNG or JPG file!`);
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

      if (img.width !== 800 || img.height !== 150) {
        setMessage(`Selected horizontal banner is not 800x150px!`);
        setType("error");
        setShow(true);
        return;
      }

      bannerImage = reader.result as string;
    };
  };

  const saveClick = async () => {
    if (!session.user?.userInfo.patreon) {
      setMessage("You must be a Patreon supporter to upload a banner!");
      setType("error");
      setShow(true);
      return;
    }
    if (!bannerImage) {
      console.info("No banner image selected!");
      return;
    }
    await axios
      .put(`${process.env.PUBLIC_URL}/api/profile/settings/banner`, {
        ba: bannerImage,
        type: "hor",
        t: session.jwt,
      })
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          setMessage(
            "Horizontal banner updated!\n\nReload the website if you don't see it right away! :)"
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
      <div className="bannerHorUpload">
        <label
          className="block mb-2 text-sm font-medium text-white"
          htmlFor="bannerHorInput"
        >
          Horizontal banner - Upload file *
        </label>
        <div className="flex flex-row gap-0 h-[40px]">
          <input
            className="file:hidden h-[40px] pt-[10px] pl-2 block w-full text-sm text-white rounded-l-lg cursor-pointer bg-[#131313e5]"
            onInput={handleBannerHor}
            accept=".png, .jpg, .jpeg"
            aria-describedby="bannerHorInputHelp"
            id="bannerHorInput"
            type="file"
            disabled={disable}
          />
          <button
            type="button"
            onClick={saveClick}
            className="flex flex-row items-center px-4 text-sm font-medium text-[#131313e5] bg-sqyellowfaint hover:bg-sqyellow rounded-r-lg hover:bg-sqyellowhover ring-0 smoothTran"
            disabled={disable}
          >
            Save
          </button>
        </div>
        <div className="mt-1 text-sm text-gray-500" id="bannerHorInputHelp">
          PNG or JPG (MIN/MAX. 800x150px, 10MB) -{" "}
          <a
            download={true}
            href="/assets/images/templates/bannerVer.png"
            className="hover:text-sqyellow underline"
          >
            Template
          </a>
        </div>
      </div>
    </>
  );
}
