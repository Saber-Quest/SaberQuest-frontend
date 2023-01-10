function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

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
        case "ht":
            return {
                image: "../images/hitbloq_token.png",
                name: "Hitbloq Token"
            }
        case "cw":
            return {
                image: "../images/crouch_wall_icon.png",
                name: "Crouch Wall"
            }
        case "ct":
            return {
                image: "../images/cube_community_token.png",
                name: "CT Token"
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
        case "115":
            return {
                image: "../images/115.png",
                name: "115"
            }
        case "bpp":
            return {
                image: "../images/blue_poodle_icon.png",
                name: "Blue Poodle"
            }
        case "bsl":
            return {
                image: "../images/blue_slider_icon.png",
                name: "Blue Slider"
            }
        case "bst":
            return {
                image: "../images/blue_stack.png",
                name: "Blue Stack"
            }
        case "bto":
            return {
                image: "../images/blue_tower.png",
                name: "Blue Tower"
            }
        case "br":
            return {
                image: "../images/bomb_reset_icon.png",
                name: "Bomb Reset"
            }
        case "dn":
            return {
                image: "../images/double_notes_icon.png",
                name: "Double Notes"
            }
        case "rpp":
            return {
                image: "../images/red_poodle_icon.png",
                name: "Red Poodle"
            }
        case "rsl":
            return {
                image: "../images/red_slider_icon.png",
                name: "Red Slider"
            }
        case "rst":
            return {
                image: "../images/red_stack.png",
                name: "Red Stack"
            }
        case "rto":
            return {
                image: "../images/red_tower.png",
                name: "Red Tower"
            }
    }
}

window.onload = async () => {
    const area = document.getElementById('area');

    const gambleText = document.createElement('p');
    const randomMessages = [
        "Bruh, imagine gambling, like honestly.",
        "You're not gonna win anything, just stop.",
        "You're wasting your time.",
        "You're wasting your points.",
        "You're going to develop a gambling addiction.",
        "Why not just buy the item you want?"
    ]
    gambleText.innerText = randomMessages[Math.floor(Math.random() * randomMessages.length)];

    const cookie = getCookie('token');

    const qp = document.createElement('p');
    qp.id = "qp"
    const user = await fetch('/api/user', {
        method: 'GET',
        headers: {
            'type': "auth",
            'user': cookie
        }
    }).then(res => res.json())
            
    qp.innerText = "QP: " + user.qp;
    
    area.appendChild(qp)

    async function PlayerQP() {
        const qp = document.getElementById('qp');
        const user = await fetch('/api/user', {
            method: 'GET',
            headers: {
                'type': "auth",
                'user': cookie
            }
        }).then(res => res.json())

        console.log(user.qp)
                
        qp.innerText = "QP: " + user.qp;
    }

    const gambleButton = document.createElement('button');
    gambleButton.innerText = "Spin";
    gambleButton.className = "spin";
    gambleButton.onclick = async () => {
        const gambleResult = await fetch('/api/gamble', {
            method: 'POST',
            headers: {
                'user': getCookie('token')
            }
        }).then(res => res.json());

        if (gambleResult.success) {
            PlayerQP();
            const dice = document.createElement('img');
            dice.src = "../images/gamble.png";
            dice.className = "dice";

            const holder = document.getElementById('holder');

            const item = convertId(gambleResult.itemWon)

            holder.appendChild(dice);

            setTimeout(() => {
                holder.removeChild(dice);

                const randomLEMessages = [
                    "You're so lucky.",
                    "You're so lucky, I'm jealous.",
                    "Don't let this get to your head.",
                    "This is your lucky day.",
                    "This was your last one.",
                    "W"
                ]

                const randomCURMessages = [
                    "I told you you wouldn't win anything that's worth the points.",
                    "Sucks to be you.",
                    "I wouldn't boast about it.",
                    "Well, at least it's something.",
                    "Why do you keep gambling? Is it worth it? Or are you just addicted?",
                    "Just stop already.",
                    "L"
                ]

                let randomMessage

                if (gambleResult.rarity == "Common" || gambleResult.rarity == "Uncommon") {
                    randomMessage = randomCURMessages[Math.floor(Math.random() * randomCURMessages.length)];
                    gambleText.innerText = randomMessage;
                } else {
                    randomMessage = randomLEMessages[Math.floor(Math.random() * randomLEMessages.length)];
                    gambleText.innerText = randomMessage;
                }

                const gotBack = document.createElement('div');
                gotBack.className = 'gotBack';

                const got = document.createElement('div');
                got.className = 'got';

                const gotText = document.createElement('span');
                gotText.className = 'gotText';
                gotText.innerText = randomMessage;
                got.appendChild(gotText);

                const collectibleDiv = document.createElement('div');
                collectibleDiv.className = 'collectibles';

                const block = document.createElement('div');
                block.className = `block ${item.name}`;
                block.id = `block`;

                const image = document.createElement("img");

                image.src = item.image
                image.width = 150;
                image.height = 150;
                image.className = `collectible ${item.name}`;

                block.appendChild(image);

                collectibleDiv.appendChild(block);

                const closeButton = document.createElement('button');
                closeButton.className = 'closeButton';
                closeButton.innerText = 'Close';
                closeButton.onclick = () => {
                    got.style.display = 'none';
                    gotBack.style.display = 'none';
                }

                got.appendChild(collectibleDiv);
                got.appendChild(closeButton);

                document.body.appendChild(gotBack);
                document.body.appendChild(got);
            }, 2000);
        } else {
            alert("You don't have enough points to gamble.")
        }
    }

    const back = document.createElement('button');
    back.innerText = "Back";
    back.className = "back";

    back.onclick = () => {
        window.location.href = "/shop";
    }

    area.appendChild(gambleText);
    area.appendChild(gambleButton);
    area.appendChild(back);

}