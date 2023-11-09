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

  const handleAvatar = async (e: any) => {
    const file = e.target.files[0];
    const fileSize = file.size / 1024 / 1024;

    if (fileSize > 5) {
      setMessage(`Avatar file-size is too large!`);
      setType("error");
      setShow(true);
      e.target.value = "";
      return;
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      setMessage(`Avatar is not a PNG or JPG file!`);
      setType("error");
      setShow(true);
      e.target.value = "";
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
        e.target.value = "";
        return;
      }

      avatarImage = reader.result as string;
    };
  };

  const saveClick = async () => {
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
          setMessage("Avatar updated!");
          setType("success");
          setShow(true);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setType("error");
        setShow(true);
        const input = document.getElementById(
          "avatarInput"
        ) as HTMLInputElement;
        input.value = "";
      });
  };

  return (
    <>
      <div className="avatarUpload">
        <label
          className="block mb-2 text-sm font-medium text-white"
          htmlFor="avatarInput"
        >
          Avatar - Upload file
        </label>
        <div className="flex flex-row gap-0 h-[40px]">
          <input
            className="file:hidden h-[40px] pt-[10px] pl-2 block w-full text-sm text-white rounded-l-lg cursor-pointer bg-[#131313e5]"
            onInput={handleAvatar}
            accept=".png, .jpg, .jpeg"
            aria-describedby="avatarInputHelp"
            id="avatarInput"
            type="file"
          />
          <div
            onClick={saveClick}
            className="flex flex-row items-center px-4 text-sm font-medium text-[#131313e5] bg-sqyellowfaint hover:bg-sqyellow rounded-r-lg hover:bg-sqyellowhover focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hover:cursor-pointer"
          >
            Save
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500" id="avatarInputHelp">
          PNG or JPG (MIN/MAX. 512x512px, 5MB).
        </p>
      </div>
    </>
  );
}
