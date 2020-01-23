new Vue({
  el: '#app',
  data: {
    playerHP: 100,
    monsterHP: 100,
    gameRunning: false,
    normal: 'normal',
    combatLog: [],
    damageDealt: ''
  },

  methods: {
    startTheGame: function() {
      this.gameRunning = true;
      this.playerHP = 100;
      this.monsterHP = 100;
      this.combatLog = [];
    },

    calculateDamage: function(type) {
      if (type === 'normal') {
        return Math.floor(Math.random() * 10) + 1;
      } else if (type === 'special') {
        return Math.floor(Math.random() * 20) + 5;
      } else {
        return Math.floor(Math.random() * 10) + 5;
      }
    },

    winCondition: function() {
      if (this.playerHP <= 0) {
        alert('You died!');
        this.gameRunning = false;
        return true;
      } else if (this.monsterHP <= 0) {
        alert('Congratulations! You killed the monster!');
        this.gameRunning = false;
        return true;
      } else {
        return false;
      }
    },

    normalAttack: function() {
      let damageDealt = this.calculateDamage(this.normal);
      this.monsterHP = this.monsterHP - damageDealt;
      this.combatLog.unshift(`Player attacked for ${damageDealt} damage`);
      if (this.winCondition === 'true') {
        return;
      }

      damageDealt = this.calculateDamage(this.normal);
      this.playerHP = this.playerHP - damageDealt;
      this.combatLog.unshift(`Monster attacked for ${damageDealt} damage`);
      this.winCondition();
    },

    specialAttack: function() {
      damageDealt = this.calculateDamage(this.special);
      this.monsterHP = this.monsterHP - damageDealt;
      this.combatLog.unshift(
        `Player heavily attacked for ${damageDealt} damage`
      );
      if (this.winCondition === 'true') {
        return;
      }

      damageDealt = this.calculateDamage(this.normal);
      this.playerHP = this.playerHP - damageDealt;
      this.combatLog.unshift(`Monster attacked for ${damageDealt} damage`);
      this.winCondition();
    },

    heal: function() {
      damageDealt = this.calculateDamage();
      this.playerHP = this.playerHP + damageDealt;
      this.combatLog.unshift(`Player healed for ${damageDealt} damage`);
      if (this.winCondition === 'true') {
        return;
      }

      damageDealt = this.calculateDamage(this.normal);
      this.playerHP = this.playerHP - damageDealt;
      this.combatLog.unshift(`Monster attacked for ${damageDealt} damage`);
      this.winCondition();
    },

    giveUp: function() {
      this.gameRunning = false;
    }
  }
});
