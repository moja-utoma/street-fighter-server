import { fighterRepository } from "../repositories/fighterRepository.js";
import { fightRepository } from "../repositories/fightRepository.js";
import { getDamage } from "../utils/fightLogic.js";

class FightersService {
  async simulateFight(fighter1Id, fighter2Id) {
    const fighter1 = fighterRepository.getOne({id: fighter1Id});
    const fighter2 = fighterRepository.getOne({id: fighter2Id});

    if (!fighter1 || !fighter2) {
      console.log(fighter1, fighter2);
      throw new Error("Fighter(s) not found");
    }

    let f1Health = fighter1.health;
    let f2Health = fighter2.health;
    const log = [];

    const actions = ["attack", "block", "critical"];
    let f1Cooldown = false;
    let f2Cooldown = false;

    const simulateTurn = (attacker, defender, allowCrit) => {
      const action = actions[Math.floor(Math.random() * actions.length)];

      let damage = 0;
      if (action === "attack") {
        damage = getDamage(attacker, defender);
      }

      if (action === "critical" && allowCrit) {
        damage = attacker.power * 2;
      }

      console.log("Attacker ID:", attacker.id, "\nAttack Damage:", damage);
      return damage;
    };

    while (f1Health > 0 && f2Health > 0) {
      const f1Shot = simulateTurn(fighter1, fighter2, !f1Cooldown);
      f2Health = Math.max(f2Health - f1Shot, 0);

      const f2Shot =
        f2Health > 0 ? simulateTurn(fighter2, fighter1, !f2Cooldown) : 0;
      f1Health = Math.max(f1Health - f2Shot, 0);

      log.push({
        fighter1Shot: f1Shot,
        fighter2Shot: f2Shot,
        fighter1Health: f1Health,
        fighter2Health: f2Health,
      });

      if (f1Shot === fighter1.power * 2) f1Cooldown = true;
      if (f2Shot === fighter2.power * 2) f2Cooldown = true;

      if (f1Cooldown) setTimeout(() => (f1Cooldown = false), 10000);
      if (f2Cooldown) setTimeout(() => (f2Cooldown = false), 10000);
    }

    const winner = f1Health > 0 ? fighter1.id : fighter2.id;
    const fight = {
      fighter1: fighter1.id,
      fighter2: fighter2.id,
      log,
      winner,
    };

    fightRepository.create(fight);

    return fight;
  }

  getAllFights() {
    return fightRepository.getAll();
  }

  getFightById(id) {
    const fight = fightRepository.getOne({ id });
    if (!fight) throw new Error("Fight not found");
    return fight;
  }
}

const fightersService = new FightersService();

export { fightersService };
