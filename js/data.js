const data = {
    classes: {
        assassin: {
            skills:[
                {
                    name: 'Bleeding Dager',
                    type: 'atk',
                    value: 5,
                    stamina: 5
                },
                {
                    name: 'Backstab',
                    type: 'atk',
                    value: 10,
                    stamina: 8
                },
                {
                    name: 'Speed Burst',
                    type: 'spd',
                    value: 5,
                    stamina: 5
                }
            ]
        },
        mage: {
            skills:[
                {
                    name: 'Fire Bolt',
                    type: 'atk',
                    value: 5,
                    stamina: 5
                },
                {
                    name: 'Ice Shard',
                    type: 'atk',
                    value: 10,
                    stamina: 8
                },
                {
                    name: 'Curse',
                    type: 'spd',
                    value: -5,
                    stamina: 5
                }
            ]
        },
        warrior: {
            skills:[
                {
                    name: 'Battle Roar',
                    type: 'atk',
                    value: 5,
                    stamina: 5
                },
                {
                    name: 'Iron Skin',
                    type: 'def',
                    value: 10,
                    stamina: 8
                },
                {
                    name: 'Rush',
                    type: 'spd',
                    value: 5,
                    stamina: 5
                }
            ]
        }
    },

    enemies: [
        {
            name: 'tiger',
            stats: {
                hp: 10,
                atk: 10,
                def:3,
                stm: 100,
                spd: 12,    
            },
            class: {
                skills:''
            },
            image: 'images/enemies/tiger.jpg'
        }
    ],

    loots: [
        {
            name: 'small health potion',
            price: 5,
            affect: 'hp',
            amount: 10,
            image: 'images/items/potionHP.jpg'
        },
        {
            name: 'rusty sword',
            price: 10,
            affect: 'atk',
            amount: 7,
            image: 'images/items/sword.png'
        },
        {
            name: 'round shield',
            price: 9,
            affect: 'def',
            amount: 8,
            image: 'images/items/shield.jpg'
        }
    ],

    shops: [
        {
            items: [
                {
                    name: 'potion',
                },
                {
                    name: 'shield',
                },
                {
                    name: 'sword',
                }
            ]
        }
    ]
};

export { data };

