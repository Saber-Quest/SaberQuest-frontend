import { Fragment } from "react";

const NavigationLinks = [
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
      <footer className="footer">
        <div className="leftFooter">
          <p className="footerText">
            © {new Date().getFullYear()} Saber
            <span className="footerQuest">Quest</span>, Licensed under Apache
            2.0
          </p>
        </div>
        <div className="rightNav">
          {NavigationLinks.map((link, index) => {
            return (
              <Fragment key={index}>
                <a
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                  className="footerLinks"
                >
                  {link.name}
                </a>
                {index !== NavigationLinks.length - 1 && (
                  <span className="navLinkDivider">|</span>
                )}
              </Fragment>
            );
          })}
          <span className="navLinkDivider">
            | <span className="footerLinks">{process.env.PUBLIC_VERSION}</span>
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
