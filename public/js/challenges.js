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
    let user;
    let challenge = null;

    if (token !== "") {

        user = await fetch('/api/user', {
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
    }

    else {
        user = undefined
    }

    if (user !== undefined) {
        if (user.diff !== 4) {
            const challengeDiv = document.getElementById('card');
            challenge = challengeDiv.children[user.diff];
            challenge.classList.add('active');
        }
    }

    const challenges = await fetch('/api/daily-challenges', {
        method: 'GET'
    }).then(res => res.json());

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
        if (user == undefined) return window.location.href = "/profile";
        await fetch(`/api/accept-challenge?challenge=Easy`, {
            method: "POST",
            headers: {
                "user": getCookie("token")
            }
        })
        if (challenge !== null) challenge.classList.remove("active");
        easy.classList.add("active");
        challenge = easy;
    }

    normal.onclick = async () => {
        if (user == undefined) return window.location.href = "/profile";
        await fetch(`/api/accept-challenge?challenge=Normal`, {
            method: "POST",
            headers: {
                "user": getCookie("token")
            }
        })
        if (challenge !== null) challenge.classList.remove("active");
        normal.classList.add("active");
        challenge = normal;
    }

    hard.onclick = async () => {
        if (user == undefined) return window.location.href = "/profile";
        await fetch(`/api/accept-challenge?challenge=Hard`, {
            method: "POST",
            headers: {
                "user": getCookie("token")
            }
        })
        if (challenge !== null) challenge.classList.remove("active");
        hard.classList.add("active");
        challenge = hard;
    }

    extreme.onclick = async () => {
        if (user == undefined) return window.location.href = "/profile";
        await fetch(`/api/accept-challenge?challenge=Extreme`, {
            method: "POST",
            headers: {
                "user": getCookie("token")
            }
        })
        if (challenge !== null) challenge.classList.remove("active");
        extreme.classList.add("active");
        challenge = extreme;
    }
}