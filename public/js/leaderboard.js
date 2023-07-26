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

        const logout = document.getElementById('logout');
        logout.style.display = 'block';
        logout.onclick = () => {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/profile";
        }

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

    async function addPlayer(player, rank, image, username) {
        new Promise(async (resolve, reject) => {
            const row = document.createElement('div');
            row.classList.add('row');
            row.onclick = () => window.location.href = `/profile/${player.userId}`;

            const rankT = document.createElement('h1');
            rankT.innerText = `#${rank}`;
            rankT.classList.add('rowContent');
            rankT.id = 'rank';

            const name = document.createElement('h2');
            name.innerText = username// + " " + (makeFlagEmoji(country));
            name.classList.add('rowContent');
            name.id = 'name';

            const profileImage = document.createElement('img');
            profileImage.src = `${image}`;
            profileImage.classList.add('rowContent');
            profileImage.id = 'profileImage';

            const vcpDiv = document.createElement('div');
            vcpDiv.classList.add('rowContent');
            vcpDiv.id = 'vcpDiv';

            const cp = document.createElement('h1');
            cp.innerText = `${player.cp}`;
            cp.classList.add('rowContent');
            cp.id = 'cp';

            const value = document.createElement('h1');
            value.innerText = player.value;
            value.classList.add('rowContent');
            value.id = 'value';

            row.appendChild(rankT);
            row.appendChild(profileImage);
            row.appendChild(name);
            vcpDiv.appendChild(cp);
            vcpDiv.appendChild(value);
            row.appendChild(vcpDiv);

            leaderboard.appendChild(row);
            resolve();
        });
    }

    const leaderboard = document.getElementById('leaderboard');

    const data = await fetch(`/api/top-players?page=${window.location.href.split("/")[4]}`).then(res => res.json());

    const topPlayers = data.topPlayers;

    const legend = document.createElement('div');
    legend.classList.add('row');
    legend.id = 'legend';

    const rankL = document.createElement('h1');
    rankL.innerText = 'Rank';
    rankL.classList.add('rowContent');
    rankL.id = 'rankL';

    const cpL = document.createElement('h1');
    cpL.innerText = 'Challenges\nCompleted';
    cpL.classList.add('rowContent');
    cpL.id = 'cpL';

    const valueL = document.createElement('h1');
    valueL.innerText = 'Total\nValue';
    valueL.classList.add('rowContent');
    valueL.id = 'valueL';

    legend.appendChild(rankL);
    legend.appendChild(cpL);
    legend.appendChild(valueL);

    leaderboard.appendChild(legend);

    let done = false;
    async function MakeLeaderboard() {
        const map = new Map();

        for (let i = 0; i < topPlayers.length; i++) {
            await addPlayer(topPlayers[i], topPlayers[i].r, topPlayers[i].avatar, topPlayers[i].username);
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        done = true;
    }

    // Wait for the leaderboard to be made

    await MakeLeaderboard();

    while (done === false) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    if (location.href.split("/")[4] !== "1") {
        const back = document.createElement("a")
        back.href = `/leaderboards/${parseInt(window.location.href.split("/")[4]) - 1}`
        back.innerHTML = "Previous Page"
        back.classList.add("back")
        leaderboard.appendChild(back)
    }

    const next = document.createElement("a")
    next.href = `/leaderboards/${parseInt(window.location.href.split("/")[4]) + 1}`
    next.innerText = "Next Page"
    next.classList.add("next")
    leaderboard.appendChild(next)

    const footer = document.createElement("div")
    footer.classList.add("footer")
    footer.innerHTML = '<p>Created by the SaberQuest team | <a href="https://github.com/Saber-Quest/SaberQuest-Backend#api-endpoints">API</a> | <a href="https://github.com/Saber-Quest">Source</a> | <a href="https://discord.gg/ZRvXXqd9jM">Discord</a></p>'

    if (topPlayers.length < 10) {
        footer.style.position = "fixed"
        footer.style.bottom = "0"
        footer.style.width = "99%"
    }

    document.body.appendChild(footer)
}