import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@lib/types/User";
import { useGlitch } from "react-powerglitch";

const profileMenu = [
  {
    name: "Profile",
    href: "#",
  },
  {
    name: "Settings",
    href: "#",
  },
  {
    name: "Log out",
    href: "#",
  },
];

export default function ProfileMenuSlim({ userinfo }: { userinfo: User }) {
  const usernameLength = userinfo.userInfo.username.length;
  const calculatedWidth = `${usernameLength * 8 + 190}px`; // Adjust the multiplication factor and base width as needed

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleButtonMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMenuMouseLeave = () => {
    setIsMenuOpen(false);
  };

  if (userinfo.userInfo !== undefined) {
    profileMenu[0].href = `/profile/${userinfo.userInfo.id}`;
  }

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
      <Menu as="div" className="profileMenu">
        <Menu.Button
          className={`navProfile w-fit`}
          onMouseEnter={handleButtonMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
          style={{
            width: calculatedWidth,
          }}
        >
          <p className="ml-4 mr-2 rtl">{userinfo.userInfo.username}</p>
          <div className="relative overflow-visible">
            <Image
              priority={true}
              ref={glitch.ref}
              // ref={
              //   user.userInfo.images.border === null
              //     ? null
              //     : user.userInfo.images.border.includes(
              //       "glitch_border.gif"
              //     )
              //       ? glitch.ref
              //       : glitch.ref
              // }
              src={
                !userinfo.userInfo.images.avatar
                  ? "/assets/images/PFPPlaceholder.png" // Replace with the desired local image path
                  : userinfo.userInfo.images.avatar
              }
              alt="Profile Picture"
              width={66}
              height={66}
              unoptimized={true}
              className="profilePic rounded-full relative drop-shadow-PFPShadow"
            />
            {!userinfo.userInfo.images.border === null ? null : (
              <Image
                src="/assets/images/users/borders/gif/glitch_border.gif"
                alt="Border Image"
                className="absolute inset-0 object-cover scale-[145%] z-10"
                width={220}
                height={220}
                unoptimized={true}
              />
            )}
          </div>
        </Menu.Button>
        <Transition
          show={isMenuOpen}
          as={Fragment}
          enter="transition ease-in-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in-out duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
            style={{
              width: calculatedWidth,
            }}
            className={`navMenu ${isMenuOpen ? "visible" : "invisible"}`}
          >
            <div className="navMenuDiv">
              <div className="navMenuPButton" />
              {profileMenu.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }: { active: any }) => (
                    <Link
                      href={item.href}
                      className={`${
                        active ? "bg-navButtonActive" : "bg-navButtonBG"
                      } menuButton bg-opacity-25`}
                    >
                      <div className="flex items-center">
                        {item.name == "Log out" && (
                          <Image
                            src="/assets/images/Logout.svg"
                            className="mr-1"
                            aria-hidden="true"
                            alt="icon"
                            height={20}
                            width={20}
                          />
                        )}
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
