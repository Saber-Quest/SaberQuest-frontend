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

window.onload = async () => {
    const token = getCookie("token");

    if (token == "") return window.location.href = "/profile";

    const user = await fetch('/api/user', {
        method: 'GET',
        headers: {
            "user": token,
            "type": "auth"
        }
    }).then(res => res.json())

    if (user.message == "User not found!") return window.location.href = "/profile";

    const logout = document.getElementById('logout');
    logout.style.display = 'block';
    logout.onclick = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/profile";
    }

    const qp = document.getElementById('qp');
    qp.innerText = `Current QuestPoints: ${user.qp}`;

    if (user.diff == 4) {
        const challenges = await fetch('/api/daily-challenges', {
            method: 'GET'
        }).then(res => res.json())

        const div = document.getElementById('challenges');
        div.style.display = 'block';

        const easyTask = document.getElementById('EasyTask');
        const normalTask = document.getElementById('NormalTask');
        const hardTask = document.getElementById('HardTask');
        const extremeTask = document.getElementById('ExtremeTask');

        switch (challenges.type) {
            case "pp": {
                easyTask.innerHTML = `${challenges.task}<br><br>ScoreSaber: <b>${challenges.dailyChallenges[0].ppSS}</b> pp<br>BeatLeader: <b>${challenges.dailyChallenges[0].ppBL}</b> pp`;
                normalTask.innerHTML = `${challenges.task}<br><br>ScoreSaber: <b>${challenges.dailyChallenges[1].ppSS}</b> pp<br>BeatLeader: <b>${challenges.dailyChallenges[1].ppBL}</b> pp`;
                hardTask.innerHTML = `${challenges.task}<br><br>ScoreSaber: <b>${challenges.dailyChallenges[2].ppSS}</b> pp<br>BeatLeader: <b>${challenges.dailyChallenges[2].ppBL}</b> pp`;
                extremeTask.innerHTML = `${challenges.task}<br><br>ScoreSaber: <b>${challenges.dailyChallenges[3].ppSS}</b> pp<br>BeatLeader: <b>${challenges.dailyChallenges[3].ppBL}</b> pp`;
                break;
            }
            case "FCStars": {
                easyTask.innerHTML = `${challenges.task}<br><br>ScoreSaber: <b>${challenges.dailyChallenges[0].starsSS}</b> stars<br>BeatLeader: <b>${challenges.dailyChallenges[0].starsBL}</b> stars`;
                normalTask.innerHTML = `${challenges.task}<br><br>ScoreSaber: <b>${challenges.dailyChallenges[1].starsSS}</b> stars<br>BeatLeader: <b>${challenges.dailyChallenges[1].starsBL}</b> stars`;
                hardTask.innerHTML = `${challenges.task}<br><br>ScoreSaber: <b>${challenges.dailyChallenges[2].starsSS}</b> stars<br>BeatLeader: <b>${challenges.dailyChallenges[2].starsBL}</b> stars`;
                extremeTask.innerHTML = `${challenges.task}<br><br>ScoreSaber: <b>${challenges.dailyChallenges[3].starsSS}</b> stars<br>BeatLeader: <b>${challenges.dailyChallenges[3].starsBL}</b> stars`;
                break;
            }
            case "xAccuracyStars": {
                easyTask.innerHTML = `${challenges.task}<br><br>ScoreSaber: <b>${challenges.dailyChallenges[0].accuracy}%</b> on a map with <b>${challenges.dailyChallenges[0].starsSS}</b> stars<br>BeatLeader: <b>${challenges.dailyChallenges[0].accuracy}%</b> on a map with <b>${challenges.dailyChallenges[0].starsBL}</b> stars`;
                normalTask.innerHTML = `${challenges.task}<br><br>ScoreSaber: <b>${challenges.dailyChallenges[1].accuracy}%</b> on a map with <b>${challenges.dailyChallenges[1].starsSS}</b> stars<br>BeatLeader: <b>${challenges.dailyChallenges[1].accuracy}%</b> on a map with <b>${challenges.dailyChallenges[1].starsBL}</b> stars`;
                hardTask.innerHTML = `${challenges.task}<br><br>ScoreSaber: <b>${challenges.dailyChallenges[2].accuracy}%</b> on a map with <b>${challenges.dailyChallenges[2].starsSS}</b> stars<br>BeatLeader: <b>${challenges.dailyChallenges[2].accuracy}%</b> on a map with <b>${challenges.dailyChallenges[2].starsBL}</b> stars`;
                extremeTask.innerHTML = `${challenges.task}<br><br>ScoreSaber: <b>${challenges.dailyChallenges[3].accuracy}%</b> on a map with <b>${challenges.dailyChallenges[3].starsSS}</b> stars<br>BeatLeader: <b>${challenges.dailyChallenges[3].accuracy}%</b> on a map with <b>${challenges.dailyChallenges[3].starsBL}</b> stars`;
                break;
            }
            case "xAccuracyPP": {
                easyTask.innerHTML = `${challenges.task}<br><br>ScoreSaber: <b>${challenges.dailyChallenges[0].accuracy}%</b> on a map worth <b>${challenges.dailyChallenges[0].ppSS}</b> pp<br>BeatLeader: <b>${challenges.dailyChallenges[0].accuracy}%</b> on a map worth <b>${challenges.dailyChallenges[0].ppBL}</b> pp`;
                normalTask.innerHTML = `${challenges.task}<br><br>ScoreSaber: <b>${challenges.dailyChallenges[1].accuracy}%</b> on a map worth <b>${challenges.dailyChallenges[1].ppSS}</b> pp<br>BeatLeader: <b>${challenges.dailyChallenges[1].accuracy}%</b> on a map worth <b>${challenges.dailyChallenges[1].ppBL}</b> pp`;
                hardTask.innerHTML = `${challenges.task}<br><br>ScoreSaber: <b>${challenges.dailyChallenges[2].accuracy}%</b> on a map worth <b>${challenges.dailyChallenges[2].ppSS}</b> pp<br>BeatLeader: <b>${challenges.dailyChallenges[2].accuracy}%</b> on a map worth <b>${challenges.dailyChallenges[2].ppBL}</b> pp`;
                extremeTask.innerHTML = `${challenges.task}<br><br>ScoreSaber: <b>${challenges.dailyChallenges[3].accuracy}%</b> on a map worth <b>${challenges.dailyChallenges[3].ppSS}</b> pp<br>BeatLeader: <b>${challenges.dailyChallenges[3].accuracy}%</b> on a map worth <b>${challenges.dailyChallenges[3].ppBL}</b> pp`;
                break;
            }
            case "playXMaps": {
                easyTask.innerHTML = `${challenges.task}<br><br><b>${challenges.dailyChallenges[0].maps}</b>`;
                normalTask.innerHTML = `${challenges.task}<br><br><b>${challenges.dailyChallenges[1].maps}</b>`;
                hardTask.innerHTML = `${challenges.task}<br><br><b>${challenges.dailyChallenges[2].maps}</b>`;
                extremeTask.innerHTML = `${challenges.task}<br><br><b>${challenges.dailyChallenges[3].maps}</b>`;
                break;
            }
            case "FCNotes": {
                easyTask.innerHTML = `${challenges.task}<br><br><b>${challenges.dailyChallenges[0].notes}</b> notes`;
                normalTask.innerHTML = `${challenges.task}<br><br><b>${challenges.dailyChallenges[1].notes}</b> notes`;
                hardTask.innerHTML = `${challenges.task}<br><br><b>${challenges.dailyChallenges[2].notes}</b> notes`;
                extremeTask.innerHTML = `${challenges.task}<br><br><b>${challenges.dailyChallenges[3].notes}</b> notes`;
                break;
            }
            case "passNotes": {
                easyTask.innerHTML = `${challenges.task}<br><br><b>${challenges.dailyChallenges[0].notes}</b> notes`;
                normalTask.innerHTML = `${challenges.task}<br><br><b>${challenges.dailyChallenges[1].notes}</b> notes`;
                hardTask.innerHTML = `${challenges.task}<br><br><b>${challenges.dailyChallenges[2].notes}</b> notes`;
                extremeTask.innerHTML = `${challenges.task}<br><br><b>${challenges.dailyChallenges[3].notes}</b> notes`;
                break;
            }
            case "passLength": {
                easyTask.innerHTML = `${challenges.task}<br><br><b>${challenges.dailyChallenges[0].length}</b> seconds`;
                normalTask.innerHTML = `${challenges.task}<br><br><b>${challenges.dailyChallenges[1].length}</b> seconds`;
                hardTask.innerHTML = `${challenges.task}<br><br><b>${challenges.dailyChallenges[2].length}</b> seconds`;
                extremeTask.innerHTML = `${challenges.task}<br><br><b>${challenges.dailyChallenges[3].length}</b> seconds`;
                break;
            }
        }

        const easy = document.getElementById("easy");
        const normal = document.getElementById("medium");
        const hard = document.getElementById("hard");
        const extreme = document.getElementById("extreme");

        easy.onclick = async () => {
            await fetch(`/api/accept-challenge?challenge=Easy`, {
                method: "POST",
                headers: {
                    "user": getCookie("token")
                }
            })

            div.style.display = "none";
        }

        normal.onclick = async () => {
            await fetch(`/api/accept-challenge?challenge=Normal`, {
                method: "POST",
                headers: {
                    "user": getCookie("token")
                }
            })

            div.style.display = "none";
        }

        hard.onclick = async () => {
            await fetch(`/api/accept-challenge?challenge=Hard`, {
                method: "POST",
                headers: {
                    "user": getCookie("token")
                }
            })

            div.style.display = "none";
        }

        extreme.onclick = async () => {
            await fetch(`/api/accept-challenge?challenge=Extreme`, {
                method: "POST",
                headers: {
                    "user": getCookie("token")
                }
            })

            div.style.display = "none";
        }
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

    const items = await fetch('/api/current-deals', {
        method: 'GET'
    }).then(res => res.json());

    const shop = document.getElementById('items');

    for (const item of items.deals) {
        const itemData = convertId(item.id);

        const itemElement = document.createElement('div');
        itemElement.classList.add('item');

        switch (item.rarity) {
            case "Common":
                itemElement.classList.add('common');
                break;
            case "Uncommon":
                itemElement.classList.add('uncommon');
                break;
            case "Rare":
                itemElement.classList.add('rare');
                break;
            case "Epic":
                itemElement.classList.add('epic');
                break;
            case "Legendary":
                itemElement.classList.add('legendary');
                break;
        }

        const itemImage = document.createElement('img');
        itemImage.src = itemData.image;
        itemImage.classList.add('item-image');

        const itemName = document.createElement('p');
        itemName.innerText = itemData.name;
        itemName.classList.add('item-name');

        const itemPrice = document.createElement('p');
        itemPrice.innerText = `Price: ${item.price} qp`;
        itemPrice.classList.add('item-price');

        itemElement.appendChild(itemImage);
        itemElement.appendChild(itemName);
        itemElement.appendChild(itemPrice);

        shop.appendChild(itemElement);

        const gamble = document.getElementById('banner');

        gamble.onclick = async () => {
            scroll(0, 0);
            const gambleResult = await fetch('/api/gamble', {
                method: 'POST',
                headers: {
                    'user': getCookie('token')
                }
            }).then(res => res.json());
    
            if (gambleResult.success) {
                qp.innerText = `Current QuestPoints: ${gambleResult.success}`;
                const dice = document.createElement('img');
                dice.src = "../images/gamble.png";
                dice.className = "dice";
    
                const holder = document.getElementById('holder');
                holder.style.display = 'block';

                const diceHolder = document.createElement('div');
                diceHolder.className = 'diceHolder';

                const item = convertId(gambleResult.itemWon)
    
                diceHolder.appendChild(dice);
                holder.appendChild(diceHolder);
    
                setTimeout(() => {
                    holder.removeChild(diceHolder);

                    const gotText = document.createElement('p');
                    gotText.innerText = `You got ${item.name}!`;
    
                    const got = document.createElement('div');
                    got.className = 'got';
    
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
    
                    block.appendChild(gotText);
                    block.appendChild(image);
    
                    collectibleDiv.appendChild(block);
    
                    const closeButton = document.createElement('button');
                    closeButton.className = 'closeButton';
                    closeButton.innerText = 'Close';
                    closeButton.onclick = () => {
                        got.style.display = 'none';
                        holder.style.display = 'none';
                    }
    
                    got.appendChild(collectibleDiv);
                    got.appendChild(closeButton);
                    document.body.appendChild(got);
                }, 2000);
            } else {
                alert("You don't have enough points to gamble.")
            }
        }

        itemElement.onclick = async () => {
            const user = getCookie('token')
            const res = await fetch('/api/buy-item', {
                method: 'POST',
                headers: {
                    'user': user,
                    'item': item.id
                }
            }).then(res => res.json());

            if (res.success) {
                const qp = document.getElementById('qp');
                qp.innerText = `Current QuestPoints: ${res.qp}`;
                alert('Item bought successfully!');
            } else {
                alert('You do not have enough qp to buy this item!');
            }
        }
    }
}

const items = document.querySelectorAll('.item');
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    })
}, options);