import { Fragment } from "react";
import "@compStyles/Footer.scss";

const NavigationLinks = [
  {
    name: "API",
    link: "https://github.com/Saber-Quest/SaberQuest-Backend#api-endpoints",
  },
  {
    name: "Source",
    link: "https://github.com/Saber-Quest/SaberQuest-frontend",
  },
  {
    name: "Discord",
    link: "https://discord.gg/ZRvXXqd9jM",
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
            License 2.0
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
