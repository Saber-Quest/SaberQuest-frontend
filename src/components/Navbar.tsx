
// const image = import useEffect(() => {
//   let ref = fetch("https://api.saberquest.xyz/images/logo.webp");

//   return ref;
// }, [])

function Navbar() {
    return(
    <>
        <div className="bg-slate-800 top-4">
            <div>
                <img alt="SaberQuest Logo" src="./assets/icon.png" />
                <b>SaberQuest</b>
            </div>
            <div>
                <a href="">Leaderboards</a>
                <a href="">Challenges</a>
                <a href="">Shop</a>
            </div>
            <div className="">
                <img alt="User profile image" src="./assets/raine.png"/>
            </div>
        </div>
    </>
    );
}

export default Navbar;


// <img alt="SaberQuest Logo" src={image}/>