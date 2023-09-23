import Image from "next/image";
import { useGlitch } from "react-powerglitch";

export default function ImgTest() {
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

  return (
    <>
      <div className="mt-20 px-10 flex flex-col gap-20 items-center">
        <div className="flex flex-row gap-20 px-10">
          <div className="infoDiv relative overflow-visible">
            <Image
              src={`https://dev.saberquest.xyz/profile/76561198343533017/avatar`}
              alt="Profile Picture"
              width={150}
              height={150}
              unoptimized={true}
              className="rounded-full relative drop-shadow-PFPShadow"
            />
            <Image
              src="/assets/images/users/borders/gif/particles.gif"
              alt="Border Image"
              className="absolute inset-0 object-cover scale-[145%]"
              width={220}
              height={220}
              unoptimized={true}
            />
          </div>
          <div className="infoDiv relative overflow-visible">
            <Image
              src={`https://dev.saberquest.xyz/profile/76561198343533017/avatar`}
              alt="Profile Picture"
              width={150}
              height={150}
              unoptimized={true}
              className="rounded-full relative drop-shadow-PFPShadow"
            />
            <Image
              src="/assets/images/users/borders/gif/neon.gif"
              alt="Border Image"
              className="absolute inset-0 object-cover scale-[145%]"
              width={220}
              height={220}
              unoptimized={true}
            />
          </div>
          <div className="infoDiv relative overflow-visible">
            <Image
              ref={glitch.ref}
              src={`https://dev.saberquest.xyz/profile/76561198343533017/avatar`}
              alt="Profile Picture"
              width={150}
              height={150}
              unoptimized={true}
              className="rounded-full relative drop-shadow-PFPShadow"
            />
            <Image
              src="/assets/images/users/borders/gif/glitch_border.gif"
              alt="Border Image"
              className="absolute inset-0 object-cover scale-[145%] z-10"
              width={220}
              height={220}
              unoptimized={true}
            />
          </div>
        </div>
        <div className="flex flex-row gap-20">
          <div className="infoDiv relative overflow-visible">
            <Image
              src={`https://dev.saberquest.xyz/profile/76561198343533017/avatar`}
              alt="Profile Picture"
              width={150}
              height={150}
              unoptimized={true}
              className="rounded-full relative drop-shadow-PFPShadow"
            />
            <Image
              src="/assets/images/users/borders/apng/city.apng"
              alt="Border Image"
              className="absolute inset-0 object-cover scale-[145%]"
              width={220}
              height={220}
              unoptimized={true}
            />
          </div>
          <div className="infoDiv relative overflow-visible">
            <Image
              src={`https://dev.saberquest.xyz/profile/76561198343533017/avatar`}
              alt="Profile Picture"
              width={150}
              height={150}
              unoptimized={true}
              className="rounded-full relative drop-shadow-PFPShadow"
            />
            <Image
              src="/assets/images/users/borders/apng/leaves.apng"
              alt="Border Image"
              className="absolute inset-0 object-cover scale-[145%]"
              width={220}
              height={220}
              unoptimized={true}
            />
          </div>
          <div className="infoDiv relative overflow-visible">
            <Image
              src={`https://dev.saberquest.xyz/profile/76561198343533017/avatar`}
              alt="Profile Picture"
              width={150}
              height={150}
              unoptimized={true}
              className="rounded-full relative drop-shadow-PFPShadow"
            />
            <Image
              src="/assets/images/users/borders/apng/moss.apng"
              alt="Border Image"
              className="absolute inset-0 object-cover scale-[145%]"
              width={220}
              height={220}
              unoptimized={true}
            />
          </div>
          <div className="infoDiv relative overflow-visible">
            <Image
              src={`https://dev.saberquest.xyz/profile/76561198343533017/avatar`}
              alt="Profile Picture"
              width={150}
              height={150}
              unoptimized={true}
              className="rounded-full relative drop-shadow-PFPShadow"
            />
            <Image
              src="/assets/images/users/borders/apng/rainbow.apng"
              alt="Border Image"
              className="absolute inset-0 object-cover scale-[145%]"
              width={220}
              height={220}
              unoptimized={true}
            />
          </div>
        </div>
        <div className="flex flex-row gap-20">
          <div className="infoDiv relative overflow-visible">
            <Image
              src={`https://dev.saberquest.xyz/profile/76561198343533017/avatar`}
              alt="Profile Picture"
              width={150}
              height={150}
              unoptimized={true}
              className="rounded-full relative drop-shadow-PFPShadow"
            />
            <Image
              src="/assets/images/users/borders/png/gentleman.png"
              alt="Border Image"
              className="absolute inset-0 object-cover scale-[145%]"
              width={220}
              height={220}
              unoptimized={true}
            />
          </div>
          <div className="infoDiv relative overflow-visible">
            <Image
              src={`https://dev.saberquest.xyz/profile/76561198343533017/avatar`}
              alt="Profile Picture"
              width={150}
              height={150}
              unoptimized={true}
              className="rounded-full relative drop-shadow-PFPShadow"
            />
            <Image
              src="/assets/images/users/borders/png/sun_moon_star.png"
              alt="Border Image"
              className="absolute inset-0 object-cover scale-[145%]"
              width={220}
              height={220}
              unoptimized={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
