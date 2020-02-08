
class Rules {
    constructor () {}

    normalAttack(attacker, target, gameEvent) {
        const dmgDeal = attacker.stats.atk - target.stats.def;
        if (target.stats.hp < dmgDeal) {
            target.stats.hp = 0;
        } else {
            target.stats.hp -= dmgDeal;
        }
        gameEvent.combatLogs = `Damage deal is ${dmgDeal}`;
    }
    
}

export default Rules;