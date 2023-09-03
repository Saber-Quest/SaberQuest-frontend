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
  {
    name: process.env.PUBLIC_VERSION,
    link: "#",
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
                  rel="noopener"
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
        </div>
      </footer>
    </>
  );
}

export default Footer;
