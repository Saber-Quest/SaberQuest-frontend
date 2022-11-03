window.onload = async () => {
    // Crafting Checks

    function Craft(item1, item2) {
        switch (item1) {
            case "ap": {
                switch (item2) {
                    case "bp": return "bn"
                    case "rp": return "rn"
                    default: return "none"
                }
            }
            case "bcn": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "bp": {
                switch (item2) {
                    case "ap": return "bn"
                    default: return "none"
                }
            }
            case "bd": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "bn": {
                switch (item2) {
                    case "bs": return "bd"
                    case "rs": return "bcn"
                    default: return "none"
                }
            }
            case "bs": {
                switch (item2) {
                    case "bn": return "bd"
                    case "rn": return "bcn"
                    default: return "none"
                }
            }
            case "b": {
                switch (item2) {
                    case "rn": return "br"
                    case "bn": return "br"
                    default: return "none"
                }
            }
            case "bt": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "cw": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "ct": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "gn": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "gp": {
                switch (item2) {
                    case "ap": return "gn"
                    default: return "none"
                }
            }
            case "rp": {
                switch (item2) {
                    case "ap": return "rn"
                    default: return "none"
                }
            }
            case "rn": {
                switch (item2) {
                    case "bs": return "br"
                    case "rs": return "rd"
                    case "bs": return "bcn"
                }
            }
            case "st": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "sn": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "sp": {
                switch (item2) {
                    case "ap": return "sn"
                    default: return "none"
                }
            }
            case "w": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "rs": {
                switch (item2) {
                    case "rn": return "rd"
                    case "bn": return "bcn"
                    default: return "none"
                }
            }
        }
    }

    // Converting IDs to images and adding names

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
            case "rp":
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
                    name: "Silver Note Pieces"
                }
            case "w":
                return {
                    image: "../images/wall_icon.png",
                    name: "Wall"
                }
        }
    }

    async function MakeInventory() {
        const user = localStorage.getItem("user")

        const has = await fetch(`/api/user?userId=${user}`, {
            method: "GET"
        }).then(res => res.json())

        const inventory = document.getElementById('inventory');

        inventory.innerHTML = ""

        for (i = 0; i < has.collectibles.length; i++) {
            const name = has.collectibles[i].name;
            const amount = has.collectibles[i].amount;
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
    }

    MakeInventory();

    const inventory = document.getElementById('inventory');

    let firstSelected = false;
    let secondSelected = false;
    inventory.onclick = async (e) => {
        if (firstSelected == false) {
            const collectible = e.target;

            const name = collectible.className.split(' ')[1];
            const amount = collectible.className.split(' ')[2];

            if (name && amount) {
                const crafting = document.getElementById('crafting');

                const image = document.createElement("img");

                image.src = collectible.src
                image.id = "firstSelected";
                image.width = 150;
                image.height = 150;
                image.className = `collectible ${name} ${amount}`;

                const plus = document.createElement('img');
                plus.src = "../images/plus.png";
                plus.width = 150;
                plus.height = 150;
                plus.className = 'plus';
                plus.id = `plus`;

                crafting.appendChild(image);
                crafting.appendChild(plus);

                firstSelected = true;

                const firstCrafted = document.getElementById(`firstSelected`);
                firstCrafted.onclick = async (e) => {
                    const target = e.target;
                    const plus = document.getElementById('plus');
                    plus.remove();
                    target.remove();

                    if (secondSelected == true) {
                        const crafted = document.getElementById('crafted');
                        const secondCrafted = document.getElementById(`secondSelected`);
                        const equals = document.getElementById('equals');
                        equals.remove();
                        secondCrafted.remove();
                        secondSelected = false;

                        if (crafted) {
                            const craft = document.getElementById('craftButton');
                            craft.remove();
                            crafted.remove();
                        }
                    }

                    firstSelected = false;
                }
            }

        } else if (secondSelected == false) {
            const collectible = e.target;

            const name = collectible.className.split(' ')[1];
            const amount = collectible.className.split(' ')[2];

            if (name && amount) {
                const crafting = document.getElementById('crafting');
                const firstCrafted = document.getElementById(`firstSelected`);
                const firstName = firstCrafted.className.split(' ')[1];

                const image = document.createElement("img");

                image.src = collectible.src
                image.id = "secondSelected";
                image.width = 150;
                image.height = 150;
                image.className = `collectible ${name} ${amount}`;

                const equals = document.createElement('img');
                equals.src = "../images/equals.png";
                equals.className = 'equals';
                equals.id = "equals";
                equals.width = 150;
                equals.height = 150;

                crafting.appendChild(image);
                crafting.appendChild(equals);

                secondSelected = true;

                const newItem = Craft(firstName, name);

                if (newItem !== "none") {
                    const item = convertId(newItem);
                    const newImage = document.createElement("img");
                    newImage.src = item.image
                    newImage.id = "crafted";
                    newImage.width = 150;
                    newImage.height = 150;
                    newImage.className = `collectible ${newItem}`;

                    const craftButton = document.createElement('img');
                    craftButton.className = 'craftButton';
                    craftButton.id = 'craftButton';
                    craftButton.src = '../images/craft.png';
                    craftButton.width = 100;
                    craftButton.height = 100;
                    craftButton.style.marginLeft = "3%"
                    craftButton.onclick = async () => {
                        craftButton.src = '../images/crafting.png';
                        const waiting = document.getElementById('waiting');
                        waiting.style.display = 'block';

                        const user = localStorage.getItem("user")
                        const has = await fetch(`/api/user?userId=${user}`, {
                            method: "GET"
                        }).then(res => res.json())

                        const firstCrafted = document.getElementById(`firstSelected`);
                        const secondCrafted = document.getElementById(`secondSelected`);
                        const plus = document.getElementById('plus');
                        const equals = document.getElementById('equals');
                        const crafted = document.getElementById('crafted');

                        const nameFirst = firstCrafted.className.split(' ')[1];

                        const nameSecond = secondCrafted.className.split(' ')[1];

                        const nameCrafted = crafted.className.split(' ')[1];

                        await fetch(`/api/update?userId=${user}&item1=${nameFirst}&item2=${nameSecond}&type=remove`, {
                            method: 'PATCH',
                        });

                        let submitted = false;
                        for (let i = 0; i < has.collectibles.length; i++) {
                            if (has.collectibles[i].name == nameCrafted) {
                                await fetch(`/api/update?userId=${user}&item1=${nameCrafted}&item2=null&type=add`, {
                                    method: 'PATCH',
                                });
                                submitted = true;
                            }
                        }

                        if (submitted == false) {
                            await fetch(`/api/addCollectible?userId=${user}&item=${nameCrafted}`, {
                                method: 'PUT',
                            });
                        }

                        firstSelected = false;
                        secondSelected = false;

                        await MakeInventory();

                        firstCrafted.remove();
                        secondCrafted.remove();
                        plus.remove();
                        equals.remove();
                        crafted.remove();
                        craftButton.remove();

                        waiting.style.display = 'none';
                    }

                    crafting.appendChild(newImage);
                    crafting.appendChild(craftButton);
                }

                image.onclick = async (e) => {
                    const crafted = document.getElementById('crafted');
                    const target = e.target;
                    const equals = document.getElementById('equals');
                    equals.remove();
                    target.remove();

                    if (crafted) {
                        const craft = document.getElementById('craftButton');
                        craft.remove();
                        crafted.remove();
                    }

                    secondSelected = false;
                }
            }
        } else {
            alert('You can only craft 2 items at a time!');
        }
    }
}
