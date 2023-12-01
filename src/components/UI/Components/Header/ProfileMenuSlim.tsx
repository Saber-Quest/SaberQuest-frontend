import { useEffect } from "react";
import {
  Cog6ToothIcon,
  InboxArrowDownIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { SessionUser } from "@lib/types";
import { useGlitch } from "react-powerglitch";

const profileMenu = [
  {
    name: "Settings",
    href: "/profile/settings",
    icon: Cog6ToothIcon,
    color: "text-sqyellowfaint",
  },
  {
    name: "Feedback",
    href: "/feedback",
    icon: InboxArrowDownIcon,
    color: "text-sqyellowfaint",
  },
  {
    name: "Log out",
    href: "/api/auth/logout",
    icon: ArrowRightOnRectangleIcon,
    color: "text-sqyellow",
  },
];

export default function ProfileMenu({ userinfo }: { userinfo: SessionUser }) {
  useEffect(() => {
    if (userinfo.user?.userInfo.images.border === "gif/glitch_border.gif") {
      glitch.startGlitch();
    } else {
      glitch.stopGlitch();
    }
  });

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
      <div className="flex flew-row gap-6 items-center">
        <div className="relative overflow-visible w-16 h-16">
          <Link href="/profile">
            <Image
              priority={true}
              loading="eager"
              ref={glitch.ref}
              src={
                !userinfo.user?.userInfo.images.avatar
                  ? "/assets/images/PFPPlaceholder.png"
                  : userinfo.user.userInfo.images.avatar
              }
              alt="Profile Picture"
              width={66}
              height={66}
              unoptimized={true}
              className="rounded-full relative drop-shadow-PFPShadow"
            />
            {userinfo.user?.userInfo.images.border && (
              <Image
                priority={true}
                loading="eager"
                src={`/assets/images/users/borders/${userinfo.user?.userInfo.images.border}`}
                alt="Border Image"
                className="absolute inset-0 object-cover scale-[145%] z-10"
                width={220}
                height={220}
                unoptimized={true}
              />
            )}
          </Link>
        </div>
        <span className="bg-sqyellow h-[24px] w-[2px] rounded-full" />
        <div className="flex flex-row gap-6">
          {profileMenu.map((item) => (
            <>
              <Link
                key={item.name}
                title={item.name}
                href={item.href}
                className={`menuButton bg-opacity-25`}
              >
                <item.icon
                  className={`flex items-center h-6 w-6 ${item.color} hover:text-sqyellow`}
                  aria-hidden="true"
                />
              </Link>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
