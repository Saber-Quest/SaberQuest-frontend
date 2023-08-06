import "@compStyles/Profilemenu.scss";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

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

export default function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleButtonMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMenuMouseLeave = () => {
    setIsMenuOpen(false);
  };

  return (
    <Menu as="div" className="profileMenu">
      <Menu.Button
        className={`navProfile z-10 w-full bg-opacity-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-0`}
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleMenuMouseLeave}
      >
        <p className="ml-4">NightHawk</p>
        <img
          src="/assets/images/PFPPlaceholder.png"
          className="profilePic"
          alt="ProfilePicture"
        />
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
          className={`navMenu divide-gray-100 bg-[#2b2a2a] bg-opacity-50 ring-1 ring-black ring-opacity-0 focus:outline-none ${
            isMenuOpen ? "visible" : "invisible"
          }`}
        >
          <div className="navMenuDiv">
            <div className="navMenuPButton" />
            {profileMenu.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }: { active: any }) => (
                  <a
                    href={item.href}
                    className={`${
                      active ? "bg-navButtonActive" : "bg-navButtonBG"
                    } menuButton bg-opacity-25`}
                  >
                    <div className="flex items-center">
                      {item.name == "Log out" && (
                        <img
                          src="/assets/images/Logout.svg"
                          className="mr-1 w-5 h-5"
                          aria-hidden="true"
                          alt="icon"
                        />
                      )}
                      <span>{item.name}</span>
                    </div>
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
