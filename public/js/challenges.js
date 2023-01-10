window.onload = async () => {
    const dailyChallenge = localStorage.getItem('dailyChallenge');
    const currentDay = new Date().getUTCDate();
    console.log(currentDay)

    async function getDailyChallenge() {
        const easyChallenge = document.getElementById('easyTask');
        const mediumChallenge = document.getElementById('mediumTask');
        const hardChallenge = document.getElementById('hardTask');
        const extremeChallenge = document.getElementById('exTask');

        if (dailyChallenge) {
            if (dailyChallenge == currentDay) {
                return window.location.href = '/inventory';
            }

            localStorage.removeItem('dailyChallenge');

            const challenges = await fetch(`/api/dailyChallenges?day=${currentDay}`, {
                method: 'GET'
            }).then(res => res.json());

            easyChallenge.innerHTML = `Today's Challenge:\n\n${challenges.dailyChallenges.easy.challenge}`;
            mediumChallenge.innerHTML = `Today's Challenge:\n\n${challenges.dailyChallenges.medium.challenge}`;
            hardChallenge.innerHTML = `Today's Challenge:\n\n${challenges.dailyChallenges.hard.challenge}`;
            extremeChallenge.innerHTML = `Today's Challenge:\n\n${challenges.dailyChallenges.extreme.challenge}`;
        }
        else {
            const challenges = await fetch(`/api/dailyChallenges?day=${currentDay}`, {
                method: 'GET'
            }).then(res => res.json());

            easyChallenge.innerText = `Today's Challenge:\n\n${challenges.dailyChallenges.easy.challenge}`;
            mediumChallenge.innerText = `Today's Challenge:\n\n${challenges.dailyChallenges.medium.challenge}`;
            hardChallenge.innerText = `Today's Challenge:\n\n${challenges.dailyChallenges.hard.challenge}`;
            extremeChallenge.innerText = `Today's Challenge:\n\n${challenges.dailyChallenges.extreme.challenge}`;
        }
    }

    await getDailyChallenge();

    const easy = document.getElementById('easy');
    const medium = document.getElementById('medium');
    const hard = document.getElementById('hard');
    const extreme = document.getElementById('extreme');

    easy.onclick = () => {
        localStorage.setItem('dailyChallenge', currentDay);
        easy.className = "picked";
        easy.classList += " noHover";
        medium.className = "notPicked";
        hard.className = "notPicked";
        extreme.className = "notPicked";

        setTimeout(() => {
            window.location.href = "/inventory";
        }, 2000);
    }

    medium.onclick = () => {
        localStorage.setItem('dailyChallenge', currentDay);
        easy.className = "notPicked";
        medium.className = "picked";
        medium.classList += " noHover";
        hard.className = "notPicked";
        extreme.className = "notPicked";

        setTimeout(() => {
            window.location.href = "/inventory";
        }, 2000);
    }

    hard.onclick = () => {
        localStorage.setItem('dailyChallenge', currentDay);
        easy.className = "notPicked";
        medium.className = "notPicked";
        hard.className = "picked";
        hard.classList += " noHover";
        extreme.className = "notPicked";

        setTimeout(() => {
            window.location.href = "/inventory";
        }, 2000);
    }

    extreme.onclick = () => {
        localStorage.setItem('dailyChallenge', currentDay);
        easy.className = "notPicked";
        medium.className = "notPicked";
        hard.className = "notPickedHardLeft";
        extreme.className = "picked";
        extreme.classList += " noHover";

        setTimeout(() => {
            window.location.href = "/inventory";
        }, 2000);
    }
}