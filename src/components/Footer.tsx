import '../styles/components/Footer.scss'

const NavigationLinks = [
    {
        name: "API",
        link: "#",
    },
    {
        name: "Source",
        link: "#",
    },
    {
        name: "Discord",
        link: "#",
    }
]

const currentYear = new Date().getFullYear();

function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="leftFooter">
                    <p className="footerText">© {currentYear} Saber<span className="footerQuest">Quest</span>, Licensed under Apache License 2.0</p>
                </div>
                <div className="rightNav">
                    {NavigationLinks.map((link, index) => {
                        return (
                            <>
                                <a href={link.link} target="_blank" rel="noopener" className="footerLinks">
                                    {link.name}
                                </a>
                                {index !== NavigationLinks.length - 1 && (<span className="navLinkDivider">|</span>)}
                            </>
                        )
                    })}
                </div>
            </footer>
        </>
    );
}

export default Footer;