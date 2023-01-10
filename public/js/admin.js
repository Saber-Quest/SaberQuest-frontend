function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
    let passed = false;

    window.location.hash = "";

    if (!accessToken) {
        const cookie = getCookie("id");

        if (cookie == "") {
            return window.location.href = "https://discord.com/api/oauth2/authorize?client_id=1059529827620757504&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fwould-be-kinda-funny-if-someone-finds-this-url-by-accident&response_type=token&scope=identify";
        }

        const id = cookie.split("=")[1];

        const decrypt = await fetch('/api/decrypt/userId', {
            method: 'POST',
            headers: {
                'data': id
            }
        }).then(res => res.json());

        if (decrypt.message == "error") return window.location.href = "/";

        passed = true;
    }

    if (!passed) {
        const user = await fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${tokenType} ${accessToken}`
            }
        }).then(res => res.json());

        const encrypt = await fetch('/api/encrypt/userId?data=' + user.id).then(res => res.json());

        if (encrypt.message == "error") return window.location.href = "/";

        setCookie("id", encrypt.encrypted, 365);
    }

    const chooseChallenge = document.getElementById("challenge");
    const challenge = document.getElementById("chooseChallenge");
    const easy = document.getElementById("easy");
    const normal = document.getElementById("normal");
    const hard = document.getElementById("hard");
    const extreme = document.getElementById("extreme");
    const button = document.getElementById("button");

    chooseChallenge.onclick = () => {
        if (challenge.style.display === "none") {
            challenge.style.display = "block";
        } else {
            challenge.style.display = "none";
        }
    }

    const challenges = document.getElementsByClassName("challenge");

    for (let i = 0; i < challenges.length; i++) {
        challenges[i].onclick = () => {
            chooseChallenge.innerText = `✅ ${challenges[i].innerText} ✅`;
            challenge.style.display = "none";

            easy.style.display = "block";
            normal.style.display = "block";
            hard.style.display = "block";
            extreme.style.display = "block";
            button.style.display = "block";

            easy.innerHTML = "<h1>Easy</h1>";
            normal.innerHTML = "<h1>Normal</h1>";
            hard.innerHTML = "<h1>Hard</h1>";
            extreme.innerHTML = "<h1>Extreme</h1>";

            switch (challenges[i].id) {
                case "pp": {
                    const easyPP = document.createElement("input");
                    easyPP.type = "text";
                    easyPP.id = "Amount of PP";
                    easyPP.placeholder = "Easy PP";
                    easyPP.className = "pp";

                    const normalPP = document.createElement("input");
                    normalPP.type = "text";
                    normalPP.id = "Amount of PP";
                    normalPP.placeholder = "Normal PP";
                    normalPP.className = "pp";

                    const hardPP = document.createElement("input");
                    hardPP.type = "text";
                    hardPP.id = "hardPP";
                    hardPP.placeholder = "Amount of PP";
                    hardPP.className = "pp";

                    const extremePP = document.createElement("input");
                    extremePP.type = "text";
                    extremePP.id = "Amount of PP";
                    extremePP.placeholder = "Amount of PP";
                    extremePP.className = "pp";

                    easy.appendChild(easyPP);
                    normal.appendChild(normalPP);
                    hard.appendChild(hardPP);
                    extreme.appendChild(extremePP);
                }
                    break;
                case "FCStars": {
                    const easyFCStars = document.createElement("input");
                    easyFCStars.type = "text";
                    easyFCStars.id = "easyFCStars";
                    easyFCStars.placeholder = "Stars";
                    easyFCStars.className = "fcStars";

                    const normalFCStars = document.createElement("input");
                    normalFCStars.type = "text";
                    normalFCStars.id = "normalFCStars";
                    normalFCStars.placeholder = "Stars";
                    normalFCStars.className = "fcStars";

                    const hardFCStars = document.createElement("input");
                    hardFCStars.type = "text";
                    hardFCStars.id = "hardFCStars";
                    hardFCStars.placeholder = "Stars";
                    hardFCStars.className = "fcStars";

                    const extremeFCStars = document.createElement("input");
                    extremeFCStars.type = "text";
                    extremeFCStars.id = "extremeFCStars";
                    extremeFCStars.placeholder = "Stars";
                    extremeFCStars.className = "fcStars";

                    easy.appendChild(easyFCStars);
                    normal.appendChild(normalFCStars);
                    hard.appendChild(hardFCStars);
                    extreme.appendChild(extremeFCStars);
                }
                    break;
                case "xAccuracyStars": {
                    const easyAccuracy = document.createElement("input");
                    easyAccuracy.type = "text";
                    easyAccuracy.id = "easyAccuracy";
                    easyAccuracy.placeholder = "Accuracy";
                    easyAccuracy.className = "xAccuracyStars";

                    const easyStars = document.createElement("input");
                    easyStars.type = "text";
                    easyStars.id = "easyStars";
                    easyStars.placeholder = "Stars";
                    easyStars.className = "xAccuracyStars";

                    const normalAccuracy = document.createElement("input");
                    normalAccuracy.type = "text";
                    normalAccuracy.id = "normalAccuracy";
                    normalAccuracy.placeholder = "Accuracy";
                    normalAccuracy.className = "xAccuracyStars";

                    const normalStars = document.createElement("input");
                    normalStars.type = "text";
                    normalStars.id = "normalStars";
                    normalStars.placeholder = "Stars";
                    normalStars.className = "xAccuracyStars";

                    const hardAccuracy = document.createElement("input");
                    hardAccuracy.type = "text";
                    hardAccuracy.id = "hardAccuracy";
                    hardAccuracy.placeholder = "Accuracy";
                    hardAccuracy.className = "xAccuracyStars";

                    const hardStars = document.createElement("input");
                    hardStars.type = "text";
                    hardStars.id = "hardStars";
                    hardStars.placeholder = "Stars";
                    hardStars.className = "xAccuracyStars";

                    const extremeAccuracy = document.createElement("input");
                    extremeAccuracy.type = "text";
                    extremeAccuracy.id = "extremeAccuracy";
                    extremeAccuracy.placeholder = "Accuracy";
                    extremeAccuracy.className = "xAccuracyStars";

                    const extremeStars = document.createElement("input");
                    extremeStars.type = "text";
                    extremeStars.id = "extremeStars";
                    extremeStars.placeholder = "Stars";
                    extremeStars.className = "xAccuracyStars";

                    easy.appendChild(easyAccuracy);
                    easy.appendChild(easyStars);
                    normal.appendChild(normalAccuracy);
                    normal.appendChild(normalStars);
                    hard.appendChild(hardAccuracy);
                    hard.appendChild(hardStars);
                    extreme.appendChild(extremeAccuracy);
                    extreme.appendChild(extremeStars);
                }
                    break;
                case "xAccuracyPP": {
                    const easyAccuracy = document.createElement("input");
                    easyAccuracy.type = "text";
                    easyAccuracy.id = "easyAccuracy";
                    easyAccuracy.placeholder = "Accuracy";
                    easyAccuracy.className = "xAccuracyPP";

                    const easyPP = document.createElement("input");
                    easyPP.type = "text";
                    easyPP.id = "easyPP";
                    easyPP.placeholder = "PP";
                    easyPP.className = "xAccuracyPP";

                    const normalAccuracy = document.createElement("input");
                    normalAccuracy.type = "text";
                    normalAccuracy.id = "normalAccuracy";
                    normalAccuracy.placeholder = "Accuracy";
                    normalAccuracy.className = "xAccuracyPP";

                    const normalPP = document.createElement("input");
                    normalPP.type = "text";
                    normalPP.id = "normalPP";
                    normalPP.placeholder = "PP";
                    normalPP.className = "xAccuracyPP";

                    const hardAccuracy = document.createElement("input");
                    hardAccuracy.type = "text";
                    hardAccuracy.id = "hardAccuracy";
                    hardAccuracy.placeholder = "Accuracy";
                    hardAccuracy.className = "xAccuracyPP";

                    const hardPP = document.createElement("input");
                    hardPP.type = "text";
                    hardPP.id = "hardPP";
                    hardPP.placeholder = "PP";
                    hardPP.className = "xAccuracyPP";

                    const extremeAccuracy = document.createElement("input");
                    extremeAccuracy.type = "text";
                    extremeAccuracy.id = "extremeAccuracy";
                    extremeAccuracy.placeholder = "Accuracy";
                    extremeAccuracy.className = "xAccuracyPP";

                    const extremePP = document.createElement("input");
                    extremePP.type = "text";
                    extremePP.id = "extremePP";
                    extremePP.placeholder = "PP";
                    extremePP.className = "xAccuracyPP";

                    easy.appendChild(easyAccuracy);
                    easy.appendChild(easyPP);
                    normal.appendChild(normalAccuracy);
                    normal.appendChild(normalPP);
                    hard.appendChild(hardAccuracy);
                    hard.appendChild(hardPP);
                    extreme.appendChild(extremeAccuracy);
                    extreme.appendChild(extremePP);
                }
                    break;
                case "playXMaps": {
                    const easyMaps = document.createElement("input");
                    easyMaps.type = "text";
                    easyMaps.id = "easyMaps";
                    easyMaps.placeholder = "Amount of Maps";
                    easyMaps.className = "playXMaps";

                    const normalMaps = document.createElement("input");
                    normalMaps.type = "text";
                    normalMaps.id = "normalMaps";
                    normalMaps.placeholder = "Amount of Maps";
                    normalMaps.className = "playXMaps";

                    const hardMaps = document.createElement("input");
                    hardMaps.type = "text";
                    hardMaps.id = "hardMaps";
                    hardMaps.placeholder = "Amount of Maps";
                    hardMaps.className = "playXMaps";

                    const extremeMaps = document.createElement("input");
                    extremeMaps.type = "text";
                    extremeMaps.id = "extremeMaps";
                    extremeMaps.placeholder = "Amount of Maps";
                    extremeMaps.className = "playXMaps";

                    easy.appendChild(easyMaps);
                    normal.appendChild(normalMaps);
                    hard.appendChild(hardMaps);
                    extreme.appendChild(extremeMaps);
                }
                    break;
                case "FCNotes": {
                    const easyFCNotes = document.createElement("input");
                    easyFCNotes.type = "text";
                    easyFCNotes.id = "easyFCNotes";
                    easyFCNotes.placeholder = "Amount of Notes";
                    easyFCNotes.className = "FCNotes";

                    const normalFCNotes = document.createElement("input");
                    normalFCNotes.type = "text";
                    normalFCNotes.id = "normalFCNotes";
                    normalFCNotes.placeholder = "Amount of Notes";
                    normalFCNotes.className = "FCNotes";

                    const hardFCNotes = document.createElement("input");
                    hardFCNotes.type = "text";
                    hardFCNotes.id = "hardFCNotes";
                    hardFCNotes.placeholder = "Amount of Notes";
                    hardFCNotes.className = "FCNotes";

                    const extremeFCNotes = document.createElement("input");
                    extremeFCNotes.type = "text";
                    extremeFCNotes.id = "extremeFCNotes";
                    extremeFCNotes.placeholder = "Amount of Notes";
                    extremeFCNotes.className = "FCNotes";

                    easy.appendChild(easyFCNotes);
                    normal.appendChild(normalFCNotes);
                    hard.appendChild(hardFCNotes);
                    extreme.appendChild(extremeFCNotes);
                }
                    break;
                case "passNotes": {
                    const easyPassNotes = document.createElement("input");
                    easyPassNotes.type = "text";
                    easyPassNotes.id = "easyPassNotes";
                    easyPassNotes.placeholder = "Amount of Notes";
                    easyPassNotes.className = "passNotes";

                    const normalPassNotes = document.createElement("input");
                    normalPassNotes.type = "text";
                    normalPassNotes.id = "normalPassNotes";
                    normalPassNotes.placeholder = "Amount of Notes";
                    normalPassNotes.className = "passNotes";

                    const hardPassNotes = document.createElement("input");
                    hardPassNotes.type = "text";
                    hardPassNotes.id = "hardPassNotes";
                    hardPassNotes.placeholder = "Amount of Notes";

                    const extremePassNotes = document.createElement("input");
                    extremePassNotes.type = "text";
                    extremePassNotes.id = "extremePassNotes";
                    extremePassNotes.placeholder = "Amount of Notes";

                    easy.appendChild(easyPassNotes);
                    normal.appendChild(normalPassNotes);
                    hard.appendChild(hardPassNotes);
                    extreme.appendChild(extremePassNotes);
                }
                    break;
                case "passLength": {
                    const easyPassLength = document.createElement("input");
                    easyPassLength.type = "text";
                    easyPassLength.id = "easyPassLength";
                    easyPassLength.placeholder = "Length of the map";

                    const normalPassLength = document.createElement("input");
                    normalPassLength.type = "text";
                    normalPassLength.id = "normalPassLength";
                    normalPassLength.placeholder = "Length of the map";

                    const hardPassLength = document.createElement("input");
                    hardPassLength.type = "text";
                    hardPassLength.id = "hardPassLength";
                    hardPassLength.placeholder = "Length of the map";

                    const extremePassLength = document.createElement("input");
                    extremePassLength.type = "text";
                    extremePassLength.id = "extremePassLength";
                    extremePassLength.placeholder = "Length of the map";

                    easy.appendChild(easyPassLength);
                    normal.appendChild(normalPassLength);
                    hard.appendChild(hardPassLength);
                    extreme.appendChild(extremePassLength);
                }
                    break;
            }
        }
    }
}