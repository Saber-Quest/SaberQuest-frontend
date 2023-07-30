import '@compStyles/Navbar.scss'
import ProfileMenu from './ProfileMenu';

const loggedIn = true;

const NavigationLinks = [
    {
        name: "Leaderboard",
        link: "#",
    },
    {
        name: "Shop",
        link: "#",
    },
    {
        name: "Challenges",
        link: "#",
    }
]

function Navbar() {
    return (
        <>
            <nav className="topNav">
                <div className="leftNav">
                    <a href="./" target="_blank" rel="noopener" className="navLogoContainer">
                        <img src="/assets/images/Logo.svg" className="navLogo" alt="SaberQuest logo" />
                        <p className="Saber">Saber</p><span className="Quest">Quest</span>
                    </a>
                </div>
                <div className="combNav">
                    <div className="centerNav">
                        {NavigationLinks.map((link, index) => {
                            return (
                                <a href={link.link} key={index} className="navButton">{link.name}</a>
                            )
                        }
                        )}
                    </div>
                    <div className="rightNav">
                        {!loggedIn && (
                            <><div className="loginButtons">
                                <a href="./" rel="noopener" className="loginLinkSteam">
                                    <img src="/assets/images/SteamLogo.svg" className="steamNav" alt="SteamLoginButton" />
                                </a>
                                <a href="./" rel="noopener" className="loginLinkBL">
                                    <img src="/assets/images/BeatLeaderLogo.png" className="beatLeaderNav" alt="BeatleaderLoginButton" />
                                </a>
                            </div></>
                        ) ||
                        (
                            <>
                           <ProfileMenu />
                            </>
                        )
                        }
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;