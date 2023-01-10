window.onload = async () => {
    async function addPlayer(player, rank) {
        const playerInfo = await fetch(`https://scoresaber.com/api/player/${player.userId}/basic`).then(res => res.json());

        const row = document.createElement('div');
        row.classList.add('row');
        row.onclick = () => window.location.href = `/profile/${player.userId}`;

        const rankT = document.createElement('h1');
        rankT.innerText = `#${rank}`;
        rankT.classList.add('rowContent');
        rankT.id = 'rank';

        const name = document.createElement('h1');
        name.innerText = playerInfo.name;
        name.classList.add('rowContent');
        name.id = 'name';

        const profileImage = document.createElement('img');
        profileImage.src = `${playerInfo.profilePicture}`;
        profileImage.classList.add('rowContent');
        profileImage.id = 'profileImage';

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
        row.appendChild(cp);
        row.appendChild(value);

        leaderboard.appendChild(row);
    }

    const leaderboard = document.getElementById('leaderboard');

    const data = await fetch(`/api/top-players?page=${window.location.href.split("/")[4]}`).then(res => res.json());

    const topPlayers = data.topPlayers;
    let rank = 1;

    const legend = document.createElement('div');
    legend.classList.add('row');
    legend.id = 'legend';

    const rankL = document.createElement('h1');
    rankL.innerText = 'Rank';
    rankL.classList.add('rowContent');
    rankL.id = 'rankL';

    const nameL = document.createElement('h1');
    nameL.innerText = 'Player';
    nameL.classList.add('rowContent');
    nameL.id = 'name';

    const cpL = document.createElement('h1');
    cpL.innerText = 'Challenges\nCompleted';
    cpL.classList.add('rowContent');
    cpL.id = 'cpL';

    const valueL = document.createElement('h1');
    valueL.innerText = 'Total\nValue';
    valueL.classList.add('rowContent');
    valueL.id = 'value';

    legend.appendChild(rankL);
    legend.appendChild(nameL);
    legend.appendChild(cpL);
    legend.appendChild(valueL);

    leaderboard.appendChild(legend);

    async function MakeLeaderboard() {
        const leaderboardBack = document.getElementById('back');
        // Change leaderboard height depending on how many players there are

        for (let i = 0; i < topPlayers.length; i++) {
            addPlayer(topPlayers[i], rank + i);
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        if (location.href.split("/")[4] !== "1") {
            const back = document.createElement("a")
            back.href = `/leaderboards/${parseInt(window.location.href.split("/")[4]) - 1}`
            back.innerText = "Previous Page"
            back.classList.add("back")
            leaderboard.appendChild(back)
        }

        const next = document.createElement("a")
        next.href = `/leaderboards/${parseInt(window.location.href.split("/")[4]) + 1}`
        next.innerText = "Next Page"
        next.classList.add("next")
        leaderboard.appendChild(next)


        leaderboardBack.style.height = leaderboard.offsetHeight + 10 + 'px';
    }

    MakeLeaderboard();
}