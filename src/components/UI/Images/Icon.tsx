import Image from "next/image";
export default function Icon({
  path,
  open,
  h,
  w,
}: {
  path: string;
  open: string | URL | undefined;
  h: number;
  w: number;
}) {
  return (
    <>
      <Image
        src={`/assets/images/${path}`}
        onClick={() => window.open(open)}
        alt="Icon"
        width={w}
        height={h}
        className={`w-[${w * 4}px] h-[${h * 4}px] iconStyle`}
      />
    </>
  );
}
