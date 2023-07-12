function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    const cookie = document.cookie;
    const name = cname + "=";

    if (cookie.indexOf(name) === -1) {
        return "";
    }

    const start = cookie.indexOf(name) + name.length;
    let end = cookie.indexOf(";", start);

    if (end === -1) {
        end = cookie.length;
    }

    return cookie.substring(start, end);
}

window.onload = async () => {
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
                    name: "CC Token"
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

    if (window.location.href.endsWith('/profile') || window.location.href.includes('/profile#')) {
        const token = getCookie('token');

        if (token == "") {
            if (window.location.href.split('#')[1] != undefined) {
                const hash = window.location.href.split('#')[1];
                setCookie('token', hash, 30);

                const data = await fetch(`/api/decrypt/userLogin`,
                    {
                        method: 'POST',
                        headers: {
                            "user": hash
                        }
                    }
                ).then(res => res.json());
                window.location.hash = '';
                window.location.href = `/profile/${data.decryptedToken}`;
            }

            const input = document.getElementById('register');

            input.style.display = 'block';

            const button = document.getElementById('bl');

            const steam = document.getElementById('steam');

            steam.onclick = async () => {
                return window.location.href = 'https://steamcommunity.com/openid/login?openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.realm=https%3A%2F%2Fsaberquest.xyz&openid.return_to=https%3A%2F%2Fsaberquest.xyz%2Fapi/steam-login%3Fstate%3DCfDJ8A1aOS-muHpBtm6xwT__RdlUNzhSi-Fa8yyW1JButxYzjlr0LXyISmHCBrPdp8Rn3BanRwPJQUU--GcYox0HIsA6GdparZGTtZHHIjrJsB9T1LLU5E0cQXEgHKROYAw4z87cJGVGERFzWUTjJmy592ZFxZTjNWzUnfErBEcgLw-e_DtnY61ggemoHY7bsHeYFJapIsQ3Cy4x0XURFYPZbvaPL7aq0fEO2O2ydVUP6DqDZc7Ni_dtYFGmzjpF4TT7H6UjpcG818PaPQzNUFnqDY9eX-sKitlOTIXRruc5P-ej1TGQ7KfR_guqzhzreCTGjbxSMo40ReOOd_5bN0dH2I8__BnrUNqvWpmxpwNhr2o08GdnZOJyJGal12lhiebfCQ&openid.ns.ax=http%3A%2F%2Fopenid.net%2Fsrv%2Fax%2F1.0&openid.ax.mode=fetch_request&openid.ax.type.email=http%3A%2F%2Faxschema.org%2Fcontact%2Femail&openid.ax.type.name=http%3A%2F%2Faxschema.org%2FnamePerson&openid.ax.type.first=http%3A%2F%2Faxschema.org%2FnamePerson%2Ffirst&openid.ax.type.last=http%3A%2F%2Faxschema.org%2FnamePerson%2Flast&openid.ax.type.email2=http%3A%2F%2Fschema.openid.net%2Fcontact%2Femail&openid.ax.type.name2=http%3A%2F%2Fschema.openid.net%2FnamePerson&openid.ax.type.first2=http%3A%2F%2Fschema.openid.net%2FnamePerson%2Ffirst&openid.ax.type.last2=http%3A%2F%2Fschema.openid.net%2FnamePerson%2Flast&openid.ax.required=email,name,first,last,email2,name2,first2,last2';
            }

            button.onclick = async () => {
                window.location.href = 'https://api.beatleader.xyz/oauth2/authorize?client_id=SaberQuestID&response_type=code&redirect_uri=https://saberquest.xyz/api/bl-login&scope=profile'
            }
        }

        else {
            const data = await fetch(`/api/decrypt/userLogin`, {
                method: 'POST',
                headers: {
                    "user": token
                }
            }).then(res => res.json());
            window.location.href = `/profile/${data.decryptedToken}`;
        }
    }

    else {
        const token = getCookie("token");

        if (token == "") console.log("User not logged in, token not found!")

        else {
            const user = await fetch('/api/user', {
                method: 'GET',
                headers: {
                    "user": token,
                    "type": "auth"
                }
            }).then(res => res.json())

            if (user.message == "User not found!") return window.location.href = "/profile";

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
        }

        async function DisplayPlayer() {
            const userId = window.location.href.split('/')[4];
            const token = getCookie('token')

            const decrypted = await fetch(`/api/decrypt/userLogin`, {
                method: 'POST',
                headers: {
                    "user": token
                }
            }).then(res => res.json());

            const data = await fetch(`/api/user/${userId}`, {
                method: 'GET',
                headers: {
                    "type": "no-auth"
                }
            }).then(res => res.json());

            if (data.message == "User fetched successfully!") {
                const user = data.user;

                const collectibles = data.collectibles;

                const pref = data.preference;

                let userDetails;

                const profile = document.getElementById('playerInfo');
                const name = document.getElementById('name');
                const rank = document.getElementById('rank');
                const avatar = document.getElementById('avatar');
                const challengesC = document.getElementById('challengesC');
                const completeButton = document.getElementById('update');
                const inventory = document.getElementById('inventory');
                const preference = document.getElementById('preference');
                const value = document.getElementById('value');
                const qp = document.getElementById('qp');

                function makeFlagEmoji(country) {
                    const codePoints = country.toUpperCase().split('').map(char => 127397 + char.charCodeAt());
                    return String.fromCodePoint(...codePoints);
                }

                if (pref == "ss") {
                     userDetails = await fetch(`/api/pass-cors?url=https://scoresaber.com/api/player/${user}/basic`, {
                        method: 'GET'
                    }).then(res => res.json());

                    name.innerText = userDetails.name //+ " " + makeFlagEmoji(userDetails.country);
                    avatar.src = `${userDetails.profilePicture}`;
                    rank.innerText = `Rank: #${data.rank}`;
                    qp.innerText = `QP: ${data.qp} qp`;
                    challengesC.innerText = `Challenges Completed: ${data.challengesCompleted}`;
                }

                else {
                    userDetails = await fetch(`/api/pass-cors?url=https://api.beatleader.xyz/player/${user}`, {
                        method: 'GET'
                    }).then(res => res.json());

                    name.innerText = userDetails.name //+ " " + makeFlagEmoji(userDetails.country);
                    avatar.src = `${userDetails.avatar}`;
                    rank.innerText = `Rank: #${data.rank}`;
                    qp.innerText = `QP: ${data.qp} qp`;
                    challengesC.innerText = `Challenges Completed: ${data.challengesCompleted}`;
                }

                inventory.innerHTML = "<h1>Inventory</h1>"

                if (decrypted.decryptedToken != userId) {
                    completeButton.style.display = 'none';
                    preference.style.display = 'none';
                }

                if (pref == "ss") {
                    preference.innerHTML = "Preference: BeatLeader/<span>ScoreSaber</span>";
                    preference.classList.add('bl');
                }

                else {
                    preference.innerHTML = "Preference: <span>BeatLeader</span>/ScoreSaber";
                    preference.classList.add('ss');
                }

                value.innerText = `Account Value: ${data.value}`;

                preference.onclick = async () => {
                    const token = getCookie('token');

                    const data = await fetch(`/api/change-preference?preference=${preference.className}`, {
                        method: 'POST',
                        headers: {
                            "user": token
                        }
                    }).then(res => res.json());

                    if (data.success) {
                        preference.className = "";
                        return DisplayPlayer();
                    }

                    else {
                        alert("An error occured, please try again later.")
                    }
                }

                completeButton.onclick = async () => {
                    const token = getCookie('token');

                    const data = await fetch(`/api/validate?pageId=${userId}`, {
                        method: 'POST',
                        headers: {
                            "user": token,
                            "no-auth": true,
                        },
                    }).then(res => res.json());

                    if (data.success == false && data.message == "This profile has already been updated within an hour.") {
                        return alert("You have already updated your profile within an hour.")
                    }

                    if (data.success == false && data.message == "You didn't complete any challenges.") {
                        return alert("You didn't complete any challenges.")
                    }

                    if (data.success == false && data.message == "This profile has not accepted a challenge yet.") {
                        return alert("You need to accept a challenge before trying to complete it.")
                    }

                    if (data.success == false && data.message == "This profile already completed the daily challenge.") {
                        return alert("You've already completed the daily challenge.")
                    }

                    if (data.success) {
                        const gotBack = document.createElement('div');
                        gotBack.className = 'gotBack';

                        const got = document.createElement('div');
                        got.className = 'got';

                        const gotText = document.createElement('span');
                        gotText.className = 'gotText';
                        gotText.innerText = `Challenge Completed, you got:\n\n${data.rewards.points} qp and the following collectibles:`;
                        got.appendChild(gotText);

                        const collectibleDiv = document.createElement('div');
                        collectibleDiv.className = 'collectibles';

                        for (const collectible of data.rewards.collectibles) {
                            const name = collectible;

                            const item = convertId(name);

                            const block = document.createElement('div');
                            block.className = `block ${name}`;
                            block.id = `block${i}`;

                            const image = document.createElement("img");

                            image.src = item.image
                            image.width = 150;
                            image.height = 150;
                            image.className = `collectible ${name}`;

                            block.appendChild(image);

                            collectibleDiv.appendChild(block);
                        }

                        const closeButton = document.createElement('button');
                        closeButton.className = 'closeButton';
                        closeButton.innerText = 'Close';
                        closeButton.onclick = () => {
                            got.style.display = 'none';
                            gotBack.style.display = 'none';
                            return DisplayPlayer();
                        }

                        got.appendChild(collectibleDiv);
                        got.appendChild(closeButton);

                        document.body.appendChild(gotBack);
                        document.body.appendChild(got);
                    }
                }

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