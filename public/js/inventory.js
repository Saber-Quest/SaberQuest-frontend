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
    // Crafting Checks

    function Craft(item1, item2) {
        switch (item1) {
            case "ap": {
                switch (item2) {
                    case "bp": return "bn"
                    case "rcp": return "rn"
                    case "bst": return "bsl"
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
                    case "b": return "br"
                    case "rn": return "dn"
                    case "bn": return "bst"
                    case "bs": return "bd"
                    case "rs": return "bcn"
                    default: return "none"
                }
            }
            case "bst": {
                switch (item2) {
                    case "bn": return "bto"
                    case "ap": return "bsl"
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
            case "rcp": {
                switch (item2) {
                    case "ap": return "rn"
                    default: return "none"
                }
            }
            case "rn": {
                switch (item2) {
                    case "bn": return "dn"
                    case "rn": return "rst"
                    case "b": return "br"
                    case "rs": return "rd"
                    case "bs": return "bcn"
                }
            }
            case "rst": {
                switch (item2) {
                    case "rn": return "rto"
                    case "ap": return "rsl"
                    default: return "none"
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
            case "115": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "bpp": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "rpp": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "bsl": {
                switch (item2) {
                    case "bsl": return "bpp"
                    default: return "none"
                }
            }
            case "rsl": {
                switch (item2) {
                    case "rsl": return "rpp"
                    default: return "none"
                }
            }
            case "bto": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "rto": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "bst": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "rst": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "bre": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "br": {
                switch (item2) {
                    default: return "none"
                }
            }
            case "dn": {
                switch (item2) {
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

    async function MakeInventory() {
        const user = getCookie("token");

        if (!user) return window.location.replace("/profile");

        const has = await fetch(`/api/user`, {
            method: "GET",
            headers: {
                "type": "auth",
                "user": user
            }
        }).then(res => res.json())

        const inventory = document.getElementById('inventory');

        inventory.innerHTML = ""

        const map = has.collectibles.map(item => {
            if (item.amount == 0) return;
            return item;
        })

        if (map.every(item => item == undefined)) {
            const text = document.createElement('h1');
            text.className = 'noItems';
            text.innerHTML = 'No items found.';

            inventory.appendChild(text);
            return;
        }

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
            itemName.id = `itemName${item.name}`;
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
                if (amount == 1) {
                    const block = document.getElementsByClassName(`block ${name} ${amount}`)[0];
                    block.remove();
                }

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
                    if (amount == 1) {
                        const item = convertId(target.className.split(' ')[1]);

                        const name = target.className.split(' ')[1];
                        const amount = 1;

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
                        itemName.id = `itemName${item.name}`;
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
                    const plus = document.getElementById('plus');
                    plus.remove();
                    target.remove();

                    if (secondSelected == true) {
                        const crafted = document.getElementById('crafted');
                        const secondCrafted = document.getElementById(`secondSelected`);

                        if (Number(secondCrafted.className.split(' ')[2]) == 1) {
                            const item = convertId(secondCrafted.className.split(' ')[1]);

                            const name = secondCrafted.className.split(' ')[1];
                            const amount = 1;
    
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
                            itemName.id = `itemName${item.name}`;
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
                if (amount == 1) {
                    const block = document.getElementsByClassName(`block ${name} ${amount}`)[0];
                    block.remove();
                }

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

                        const user = getCookie('token');
                        const has = await fetch(`/api/user`, {
                            method: "GET",
                            headers: {
                                "user": user,
                                "type": "auth"
                            }
                        }).then(res => res.json())

                        const firstCrafted = document.getElementById(`firstSelected`);
                        const secondCrafted = document.getElementById(`secondSelected`);
                        const plus = document.getElementById('plus');
                        const equals = document.getElementById('equals');
                        const crafted = document.getElementById('crafted');

                        const nameFirst = firstCrafted.className.split(' ')[1];

                        const nameSecond = secondCrafted.className.split(' ')[1];

                        const nameCrafted = crafted.className.split(' ')[1];

                        let got115 = false;

                        if (nameCrafted == "rd" || nameCrafted == "bd" || nameCrafted == "gd") {
                            const roll = Math.floor(Math.random() * 10) + 1;

                            if (roll == 7) got115 = true;
                        }

                        await fetch(`/api/update?item1=${nameFirst}&item2=${nameSecond}&type=remove`, {
                            method: 'PATCH',
                            headers: {
                                "user": user,
                                "type": "auth"
                            }
                        });

                        let submitted = false;
                        for (let i = 0; i < has.collectibles.length; i++) {
                            if (has.collectibles[i].name == nameCrafted) {
                                await fetch(`/api/update?item1=${nameCrafted}&item2=null&type=add`, {
                                    method: 'PATCH',
                                    headers: {
                                        "user": user,
                                        "type": "auth"
                                    }
                                });
                                submitted = true;
                            }
                        }

                        if (submitted == false) {
                            await fetch(`/api/addCollectible?item=${nameCrafted}`, {
                                method: 'PUT',
                                headers: {
                                    "user": user,
                                    "type": "auth"
                                }
                            });
                        }

                        submitted = false;

                        if (got115 == true) {

                            for (let i = 0; i < has.collectibles.length; i++) {
                                if (has.collectibles[i].name == "115") {
                                    await fetch(`/api/update?item1=115&item2=null&type=add`, {
                                        method: 'PATCH',
                                        headers: {
                                            "user": user,
                                            "type": "auth"
                                        }
                                    });
                                    submitted = true;
                                }
                            }

                            if (submitted == false) {
                                await fetch(`/api/addCollectible?item=115`, {
                                    method: 'PUT',
                                    headers: {
                                        "user": user,
                                        "type": "auth"
                                    }
                                });
                            }
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
                    const target = e.target;

                    if (amount == 1) {
                        const item = convertId(target.className.split(' ')[1]);

                        const name = target.className.split(' ')[1];
                        const amount = 1;

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
                        itemName.id = `itemName${item.name}`;
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


                    const crafted = document.getElementById('crafted');
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