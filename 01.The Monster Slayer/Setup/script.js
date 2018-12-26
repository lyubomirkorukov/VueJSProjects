new Vue({
    el: '#app',
    data: {
        gameStarted: false,
        myHealth: 100,
        monsterHealth: 100,
        myHealthBarWidth: {
            width: '100%'
        },
        turns: []
    },
    methods: {
        startNewGame: function() {
            this.resetGame();
            this.gameStarted = true;
        },
        attack: function() {
            var damage = this.getDamage(1);
            this.monsterHealth -= damage;
            this.generateAttackLog("You", damage);
            if(!this.checkIfGameEnds()) {
                this.monsterAttack();
            }
        }, 
        specialAttack: function() {
            var damage = this.getDamage(1.5);
            this.monsterHealth -= damage;
            this.generateAttackLog("You", damage);
            if(!this.checkIfGameEnds()) {
                this.monsterAttack();
            }
        },
        heal: function() {
            if (this.myHealth < 100) {
                if (this.myHealth + 10 <= 100) {
                    this.generateHealLog(10);
                } else {
                    this.generateHealLog(100 - this.myHealth);
                }
                this.myHealth += 10;
                if (this.myHealth > 100) {
                    this.myHealth = 100;
                }
            }
            this.monsterAttack();
        },
        giveUp: function() {
            this.resetGame();
        },
        monsterAttack: function() {
            var damage = this.getDamage(1.1);
            this.myHealth -= damage;
            this.generateAttackLog("The monster", damage);
            this.checkIfGameEnds();   
        },
        checkIfGameEnds: function() {
            if (this.myHealth <= 0) {
                this.gameStarted = false;
                this.endGame('The monster');
                return true;
            }
        
            if (this.monsterHealth <= 0) {
                this.gameStarted = false;
                this.endGame('You');
                return true;
            }

            return false;
        },
        resetGame: function() {
            this.gameStarted = false;
            this.myHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        endGame: function(winner) {
            if (confirm(`Game Over! ${winner} won. Start new game?`)) {
                this.startNewGame();
            } else {
                this.resetGame();
            }
        },
        getDamage: function(multiplier) {
            var damage = Math.ceil(Math.random() * 15 + 1);
            return Math.floor(damage * multiplier);
        },
        generateAttackLog: function(player, damage) {
            if (player == 'You') {
                var turn = {
                    cl: 'player-turn'
                };
            } else {
                var turn = {
                    cl: 'monster-turn'
                };
            }

            turn.text = `${player} made a damage of ${damage}.`;
            this.turns.unshift(turn);
        },
        generateHealLog: function(healWith) {
            var turn = { 
                text: `You healed with ${healWith}`,
                cl: 'player-turn'
            };
            
            this.turns.unshift(turn);
        }
    }
})