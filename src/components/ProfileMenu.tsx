import '@compStyles/Profilemenu.scss'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const profileMenu = [
  {
    name: 'Profile',
    href: '#'
  },
  {
    name: 'Settings',
    href: '#'
  },
  {
    name: 'Log out',
    href: '#'
  }
]

export default function ProfileMenu() {

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className={`navProfile z-10 w-full group/menu bg-opacity-5`}>
        <p className="ml-4">NightHawk</p>
        <img src="/assets/images/PFPPlaceholder.png" className="profilePic" alt="ProfilePicture" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-in-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in-out duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="navMenu divide-gray-100 bg-[#2b2a2a] bg-opacity-50">
          <div className="navMenuDiv">
            <div className="navMenuPButton" />
            {profileMenu.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <a
                    href={item.href}
                    className={`${active ? 'bg-navButtonActive' : 'bg-navButtonBG'} menuButton bg-opacity-25`}
                  >
                    <div className="flex items-center">
                      {item.name == "Log out" && ( 
                        <img src='/assets/images/Logout.svg' className="mr-1 w-5 h-5" aria-hidden='true' alt="icon" />
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
  )
}