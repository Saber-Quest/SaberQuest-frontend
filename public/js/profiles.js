window.onload = () => {
    function convertId(id) {
        switch (id) {
            case "ap":
                return {
                    image: "../images/arrow_pieces_icon.png",
                    name: "Arrow Pieces"
                }
            case "bcn":
                return {
                    image: "../images/badcut_notes_icon.png",
                    name: "Bad Cut Notes"
                }
            case "bp":
                return {
                    image: "../images/blue_cube_pieces_icon.png",
                    name: "Blue Note Pieces"
                }
            case "bd":
                return {
                    image: "../images/blue_debris_icon.png",
                    name: "Blue Debris"
                }
            case "bn":
                return {
                    image: "../images/blue_notes_icon.png",
                    name: "Blue Notes"
                }
            case "bs":
                return {
                    image: "../images/blue_saber_icon.png",
                    name: "Blue Saber"
                }
            case "b":
                return {
                    image: "../images/bombs_icon.png",
                    name: "Bombs"
                }
            case "bt":
                return {
                    image: "../images/bsmg_token.png",
                    name: "BSMG Token"
                }
            case "cw":
                return {
                    image: "../images/crouch_wall_icon.png",
                    name: "Crouch Wall"
                }
            case "ct":
                return {
                    image: "../images/cube_community_token.png",
                    name: "Cube Community Token"
                }
            case "gn":
                return {
                    image: "../images/golden_note_icon.png",
                    name: "Golden Note"
                }
            case "gp":
                return {
                    image: "../images/golden_pieces_icon.png",
                    name: "Golden Pieces"
                }
            case "rcp":
                return {
                    image: "../images/red_cube_pieces_icon.png",
                    name: "Red Note Pieces"
                }
            case "rd":
                return {
                    image: "../images/red_debris_icon.png",
                    name: "Red Debris"
                }
            case "rn":
                return {
                    image: "../images/red_notes_icon.png",
                    name: "Red Notes"
                }
            case "rs":
                return {
                    image: "../images/red_saber_icon.png",
                    name: "Red Saber"
                }
            case "st":
                return {
                    image: "../images/scoresaber_token.png",
                    name: "ScoreSaber Token"
                }
            case "sn":
                return {
                    image: "../images/silver_note_icon.png",
                    name: "Silver Note"
                }
            case "sp":
                return {
                    image: "../images/silver_pieces_icon.png",
                    name: "Silver Pieces"
                }
            case "w":
                return {
                    image: "../images/wall_icon.png",
                    name: "Wall"
                }
        }
    }

    if (window.location.href === 'http://localhost:3000/profile') {
        const profile = localStorage.getItem('user');

        if (profile == undefined) {
            const input = document.getElementById('register');

            input.style.display = 'block';

            const button = document.getElementById('oculus');

            button.onclick = async () => {
                const oculus = document.getElementById('oculusLogin');
                const login = document.getElementById('login');

                login.onclick = async () => {
                    const identifier = document.getElementById('identifier').value;
                }

                oculus.style.display = 'block';
            }
        }

        else {
            return window.location.href = `/profile/${profile}`;
        }
    }

    else {
        async function DisplayPlayer() {
            const userId = window.location.href.split('/')[4];

            const data = await fetch(`/api/user?userId=${userId}`).then(res => res.json());

            if (data.message == "User fetched successfully!") {
                const user = data.user;

                const collectibles = data.collectibles;

                const userDetails = await fetch(`https://scoresaber.com/api/player/${user}/basic`).then(res => res.json());

                function makeFlagEmoji(country) {
                    const codePoints = country.toUpperCase().split('').map(char => 127397 + char.charCodeAt());
                    return String.fromCodePoint(...codePoints);
                }

                const profile = document.getElementById('playerInfo');
                const name = document.getElementById('name');
                const rank = document.getElementById('rank');
                const avatar = document.getElementById('avatar');
                const challenges = document.getElementById('challenges');
                const collectibleDiv = document.getElementById('collectibles');
                const qp = document.getElementById('qp');

                name.innerText = userDetails.name + " " + makeFlagEmoji(userDetails.country);
                avatar.src = `${userDetails.profilePicture}`;
                rank.innerText = `Rank: #${data.rank}`;
                qp.innerText = `QP: ${data.qp} qp`;
                challenges.innerText = `Challenges Completed: ${data.challengesCompleted}`;

                for (i = 0; i < collectibles.length; i++) {
                    const name = collectibles[i].name;
                    const amount = collectibles[i].amount;
                    if (amount == 0) continue;

                    const item = convertId(name);

                    const block = document.createElement('div');
                    block.className = `block ${name} ${amount}`;
                    block.id = `block${i}`;

                    const tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';
                    tooltip.id = `tooltip${amount}`;
                    tooltip.style.position = 'absolute';

                    const tooltipText = document.createElement('span');
                    tooltipText.className = 'tooltiptext';
                    tooltipText.id = `tooltipText${i}`;
                    tooltipText.innerHTML = `${amount}`;

                    const itemName = document.createElement('span');
                    itemName.className = 'itemName';
                    itemName.id = `itemName${i}`;
                    itemName.innerHTML = `${item.name}`;
                    itemName.style.textAlign = 'center';
                    itemName.style.display = 'block';

                    tooltip.appendChild(tooltipText);
                    block.appendChild(tooltip);

                    const image = document.createElement("img");

                    image.src = item.image
                    image.width = 150;
                    image.height = 150;
                    image.className = `collectible ${name} ${amount}`;

                    block.appendChild(image);
                    block.appendChild(itemName);

                    inventory.appendChild(block);
                }

                profile.style.display = 'block';

            }
        }

        DisplayPlayer();
    }
}