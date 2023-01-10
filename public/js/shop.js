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
            window.location.href = '/shop/gamble';
        }
    }
}