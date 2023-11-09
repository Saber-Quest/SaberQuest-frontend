import { SessionUser } from "@lib/types";
import axios from "axios";

export default function bannerVerUpload({
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

  const handlebannerVer = async (e: any) => {
    const file = e.target.files[0];
    const fileSize = file.size / 1024 / 1024;

    if (fileSize > 5) {
      setMessage(`Horizontal banner file-size is too large!`);
      setType("error");
      setShow(true);
      e.target.value = "";
      return;
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      setMessage(`Horizontal banner is not a PNG or JPG file!`);
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

      if (img.width !== 425 || img.height !== 820) {
        setMessage(`Selected vertical banner is not 425x820px!`);
        setType("error");
        setShow(true);
        e.target.value = "";
        return;
      }

      bannerImage = reader.result as string;
    };
  };

  const saveClick = async () => {
    if (!bannerImage) {
      console.info("No banner image selected!");
      return;
    }
    await axios
      .put(`${process.env.PUBLIC_URL}/api/profile/settings/banner`, {
        ba: bannerImage,
        type: "ver",
        t: session.jwt,
      })
      .then((response) => {
        if (response.status === 302 || response.status === 200) {
          setMessage("Vertical banner updated!");
          setType("success");
          setShow(true);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setType("error");
        setShow(true);
        const input = document.getElementById(
          "bannerVerInput"
        ) as HTMLInputElement;
        input.value = "";
      });
  };

  return (
    <>
      <div className="bannerVerUpload">
        <label
          className="block mb-2 text-sm font-medium text-white"
          htmlFor="bannerVerInput"
        >
          Vertical banner - Upload file
        </label>
        <div className="flex flex-row gap-0 h-[40px]">
          <input
            className="file:hidden h-[40px] pt-[10px] pl-2 block w-full text-sm text-white rounded-l-lg cursor-pointer bg-[#131313e5]"
            onInput={handlebannerVer}
            accept=".png, .jpg, .jpeg"
            aria-describedby="bannerVerInputHelp"
            id="bannerVerInput"
            type="file"
          />
          <div
            onClick={saveClick}
            className="flex flex-row items-center px-4 text-sm font-medium text-[#131313e5] bg-sqyellowfaint hover:bg-sqyellow rounded-r-lg hover:bg-sqyellowhover focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hover:cursor-pointer"
          >
            Save
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500" id="bannerVerInputHelp">
          PNG or JPG (MIN/MAX. 425x820px, 5MB).
        </p>
      </div>
    </>
  );
}
