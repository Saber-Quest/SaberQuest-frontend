import Link from "next/link";
import { Fragment } from "react";

const NavigationLinks = [
  {
    name: "About",
    link: "/about",
  },
  {
    name: "API",
    link: process.env.PUBLIC_API,
  },
  {
    name: "Source",
    link: process.env.PUBLIC_REPO,
  },
  {
    name: "Discord",
    link: process.env.PUBLIC_DISCORDLINK,
  },
];

function Footer() {
  return (
    <>
      <footer className="footer select-none">
        <p className="footerText mb-4 text-base text-center sm:mb-0">
          © {new Date().getFullYear()} Saber
          <span className="footerQuest">Quest</span>, Licensed under Apache 2.0
        </p>
        <div className="flex justify-center items-center flex-row">
          {NavigationLinks.map((link, index) => {
            return (
              <Fragment key={index}>
                {link.link === "/about" ? (
                  <Link href={link.link} className="footerLinks">
                    {link.name}
                  </Link>
                ) : (
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noreferrer"
                    className="footerLinks"
                  >
                    {link.name}
                  </a>
                )}
                {index !== NavigationLinks.length - 1 && (
                  <span className="navLinkDivider">|</span>
                )}
              </Fragment>
            );
          })}
          <span className="navLinkDivider">
            |{" "}
            <span className="footerLinks cursor-default">
              {process.env.PUBLIC_VERSION}
            </span>
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
