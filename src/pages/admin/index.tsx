import UserSearch from "@comp/UI/Components/Admin/UserSearch";
import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
const actions = [
  {
    title: "Set Maintenance Mode",
    href: "maintenance",
    icon: ClockIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
    description:
      "Toggle Maintenance mode for the Page, replaces App rendering with a static page.",
  },
  {
    title: "Ban a User",
    href: "ban",
    icon: CheckBadgeIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
    description: <UserSearch />,
  },
  {
    title: "Reset Challenges",
    href: "reset",
    icon: UsersIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
    description: "Something happened? Reset the challenges for a fresh slate",
  },
  {
    title: "Add Challenge Type",
    href: "challenge",
    icon: UsersIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
    description: "Can never be enough challenge types :D",
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Admin() {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-[#161616] shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 mx-96 my-20">
      {actions.map((action, actionIdx) => (
        <div
          key={action.title}
          className={classNames(
            actionIdx === 0
              ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
              : "",
            actionIdx === 1 ? "sm:rounded-tr-lg" : "",
            actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
            actionIdx === actions.length - 1
              ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
              : "",
            "group relative bg-[#272727] hover:bg-[#202020] p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500",
          )}
        >
          <div>
            <span
              className={classNames(
                action.iconBackground,
                action.iconForeground,
                "inline-flex rounded-lg p-3 ring-4 ring-white",
              )}
            >
              <action.icon className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
          <div className="my-5">
            <h3 className="text-base font-semibold leading-6">
              <Link
                href={`/admin/${action.href}`}
                className="focus:outline-none text-sqyellow"
              >
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                {action.title}
              </Link>
            </h3>
            <span className="mt-2 text-sm text-white">
              {action.description}
            </span>
          </div>
          <span
            className="pointer-events-none absolute right-6 top-6"
            aria-hidden="true"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  );
}
