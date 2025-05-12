function getHitPower(fighter) {
  if (isNaN(fighter.power)) {
    console.error("Invalid attack value:", fighter.power);
  }
  const criticalHitChance = Math.random() + 1;
  return fighter.power * criticalHitChance;
}

function getBlockPower(fighter) {
  if (isNaN(fighter.defense)) {
    console.error("Invalid defense value:", fighter.defense);
  }
  const dodgeChance = Math.random() + 1;
  return fighter.defense * dodgeChance;
}

export function getDamage(attacker, defender) {
  const hitPower = getHitPower(attacker);
  const blockPower = getBlockPower(defender);
  const damage = Math.max(hitPower - blockPower, 0);

  console.log("Damage calculated:", damage);
  return damage;
}
