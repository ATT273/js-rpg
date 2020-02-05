import { data } from './data.js';
// import Calculator from './calculate.js';
// Game board
const eventBoard = document.querySelector('.game-event');
const createBoard = document.querySelector('.create-character');
const introScreen = document.querySelector('.intro');
const lootBoard = document.querySelector('.loot');
const shopBoard = document.querySelector('.shop');
const fightBoard = document.querySelector('.fight');
const charInfo = document.querySelector('.character-info');
const alert = document.querySelector('.alert');
const alertMsg = alert.querySelector('.alert-box .message');

// Action Buttons
const buttonPlay = document.querySelector('.btn-play');
const buttonCreate = document.querySelector('.btn-create');
const heroClasses = document.querySelector('.class_select');
const actionButtons = fightBoard.querySelector('.character-action');
const closeAlert = document.querySelector('.close-alert');

// Game data
let eventType = '';
let lootIndex = '';

// Initiate character
const character = {
    name: '',
    image: 'images/character/main_char.jpg',
    gold: '',
    class: {
        name: '',
        skills: ''
    },
    stats: {
        hp: 100,
        stm: 100,
        atk: '',
        def: '',
        spd: ''
    }
}
const game_event = {
    data: ''
}

// ==============================//
//    Functions Declaration
// ==============================//
const createCharacter = () => {
    const atk = parseInt(document.querySelector('#stat_attack').value);
    const def = parseInt(document.querySelector('#stat_defense').value);
    const spd = parseInt(document.querySelector('#stat_speed').value);
    const name = document.querySelector('#character_name').value;
    const classSelect = document.getElementsByName('class_select');
    
    if (name) {
        if (atk >= 0 && def >= 0 && spd >= 0) {
            if (atk + def + spd <= 12) {
                character.name = name;
                for(let i = 0; i < classSelect.length; i++) { 
                    if(classSelect[i].checked) {
                        character.class.name = classSelect[i].value;
                        character.class.skills = data.classes[classSelect[i].value].skills;
                    }
                }
                setStats(atk, def, spd);
                console.log(character);
            } else {
                setAlert('You can not assign more than 12 points');
                throw new Error("Error: You can not assign more than 12 points");
            }
        } else {
            setAlert('stats must be entered and can not be negative number');
            throw new Error("Error: stats must be entered and can not be negative number");
        }
    } else {
        
        setAlert('Please enter your name');
        throw new Error("Error: Missing character's name");
    }
    
}

const showClassDetail = (selectedClass) => {
    const skills = data.classes[selectedClass].skills;
    const skillDetail = document.querySelector('.skill-detail');
    skillDetail.innerHTML = '';

    skills.forEach(skill => {
        const name = skill.name;
        const type = skill.type;
        const value = skill.value;
        const stamina = skill.stamina;
        const template = '<div class="skill-detail"><p class="skill-name">'+name+'</p><div class="stats-block">'+
                        '<p class="stat">Type: '+type+'</p>'+
                        '<p class="stat">Value: '+value+'</p>'+
                        '<p class="stat">Stamina: '+stamina+'</p>'+
                        '</div></div>';
        skillDetail.innerHTML += template;
    });
}

const showCharacterInfo = () => {
    const name = charInfo.querySelector('.general-info .info .name');
    const charClass = charInfo.querySelector('.general-info .info .char-class');
    const statsBlock = charInfo.querySelector('.detail .stats-block');
    const stats = character.stats;

    name.innerText = character.name;
    charClass.innerText = character.class.name;

    for (const prop in stats) {
        statsBlock.innerHTML += '<p class="stat">'+prop+': '+stats[prop]+'</p>';
    }
}

const setStats = (newAtk, newDef, newSpd) => {
    character.stats.atk = newAtk;
    character.stats.def = newDef;
    character.stats.spd = newSpd;
}

// Fight event
const setUpFightBoard = () => {
    const title = eventBoard.querySelector('.event-name');
    title.innerText = 'Fight';
    lootBoard.classList.remove('display-f');
    shopBoard.classList.remove('display-f');
    fightBoard.classList.add('display-f');
    setUpEnemy();
    setUpMainCharacter();
}

const setUpStats = () => {
    const name = character.name;
    const hp = character.stats.hp;
    const atk = character.stats.atk;
    const def = character.stats.def;
    const spd = character.stats.spd;
    const img = character.image;
    // main character
    const image = eventBoard.querySelector('.character img');
    const yourName = fightBoard.querySelector('.character .name');
    const yourStats = fightBoard.querySelector('.event-detail .your-stats');
    const yourHP = yourStats.querySelector('.hp');
    const yourATK = yourStats.querySelector('.atk');
    const yourDEF = yourStats.querySelector('.def');
    const yourSPD = yourStats.querySelector('.spd');

    yourName.innerText = name;
    yourHP.innerText = 'HP: '+hp;
    yourATK.innerText = 'ATK: '+atk;
    yourDEF.innerText = 'DEF: '+def;
    yourSPD.innerText = 'SPD: '+spd;
    image.src = img;
}

const setUpActionButton = () => {
    const actionBtnGrp = fightBoard.querySelector('.character-action') ;
    for (let i = 0; i < character.class.skills.length; i++) {
        const skill = character.class.skills[i];
        actionBtnGrp.innerHTML += '<button class="btn bg-green" id="skill-btn">'+skill.name+'</button>';
    }
}

const setUpMainCharacter = () => {
    setUpStats();
    setUpActionButton();
}

const setUpEnemy = () => {
    game_event.data = data.enemies[0];
    const enemy = game_event.data;
    console.log(enemy);
    const name = enemy.name;
    const hp = enemy.hp;
    const atk = enemy.atk;
    const def = enemy.def;
    const spd = enemy.spd;
    const img = enemy.image;
    
    // enemy
    const image = eventBoard.querySelector('.enemy img');
    const enemyName = eventBoard.querySelector('.enemy .name');
    const enemyStats = eventBoard.querySelector('.event-detail .enemy-stats');
    const enemyHP = enemyStats.querySelector('.hp');
    const enemyATK = enemyStats.querySelector('.atk');
    const enemyDEF = enemyStats.querySelector('.def');
    const enemySPD = enemyStats.querySelector('.spd');

    enemyName.innerText = name;
    enemyHP.innerText = 'HP: '+hp;
    enemyATK.innerText = 'ATK: '+atk;
    enemyDEF.innerText = 'DEF: '+def;
    enemySPD.innerText = 'SPD: '+spd;
    image.src = img;   
}

// Loot event
const setUpLoot = () => {
    randomIndex(data.loots, 'lootItem');
    const itemName = document.querySelector('.loot-item .item-detail .item-name');
    const itemPrice = document.querySelector('.loot-item .item-detail .item-price');
    itemName.innerText = data.loots[lootIndex].name;
    itemPrice.innerText = data.loots[lootIndex].price;

    lootBoard.classList.add('display-f');
    shopBoard.classList.remove('display-f');
    fightBoard.classList.remove('display-f');
}


// Shop event
const setUpShop = () => {
    const shopDiv = document.querySelector('.shop');
    const shop = data.shops[0];
    console.log(shop);
    shop.items.forEach(item => {
        shopDiv.innerHTML += '<div class="shop-item"><p class="item-name">'
                            +item.name+
                            '</p><p class="item-price">'
                            +''+
                            '</p></div>';
    });

    lootBoard.classList.remove('display-f');
    shopBoard.classList.add('display-f');
    fightBoard.classList.remove('display-f');
}

const randomIndex = (targetArray, targetName) => {
    const max = parseInt(targetArray.length - 1);
    if(targetName == 'lootItem') {
        lootIndex = Math.floor(Math.random() * (max - 0 + 1))
    } else if (targetName == 'event') {
        eventType = 0;
        // Math.floor(Math.random() * (max - 0 + 1));
    }
}

const getEvent = () => {
    randomIndex([0,1,2], 'event');
    console.log(eventType);
    const title = eventBoard.querySelector('.event-name');
    switch (eventType) {
        case 0:
            console.log('run in here');
            setUpFightBoard();
            break;
        case 1:
            title.innerText = 'loot',
            setUpLoot();
            break;
        case 2:
            title.innerText = 'shop',
            setUpShop();
            break;
        default:
            break;
    }
}

const setAlert = (msg) => {
    alertMsg.innerText = msg;
    alert.classList.add('display-b');
}

// ==============================//
//     Add events listener
// ==============================//


// Create character
buttonCreate.addEventListener('click', () => {
    createCharacter();
    showCharacterInfo();
    
    // Show event board
    createBoard.classList.add('display-n');
    introScreen.classList.add('display-b');
});

// Start the game
buttonPlay.addEventListener('click', () => {

    // Show event board
    introScreen.classList.remove('display-b');
    eventBoard.classList.add('display-b');

    // Get random event
    getEvent();
});


// view class skills set
heroClasses.addEventListener('click', e => {
    const targetClass = e.target.closest('button');
    if(!targetClass) return;

    const help = document.querySelector('.help');
    const selectedClass = document.querySelector('.selected-class');
    if(targetClass.id === 'assassin') {
        selectedClass.textContent = 'Assassin';
        showClassDetail('assassin');
    }
    if(targetClass.id === 'mage') {
        selectedClass.textContent = 'Mage';
        showClassDetail('mage');
    }
    if(targetClass.id === 'warrior') {
        selectedClass.textContent = 'Warrior';
        showClassDetail('warrior');
    }
    help.classList.add('display-b');

});

// Click action buttons
actionButtons.addEventListener('click', e => {
    const targetBtn = e.target.closest('button');
    if(!targetBtn) return;

    if (targetBtn.id == 'atk-btn') {
        alert('hahaha');
    }
});
// close alert
closeAlert.addEventListener('click', () => {
    alert.classList.remove('display-b');
})