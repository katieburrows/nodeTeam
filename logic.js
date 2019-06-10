var inquirer = require("inquirer");
var starters = [];
var subs = [];
var playerArray = [];
var offensiveStat;
var defensiveStat;
var score = 0;
var counter = 0;

function Player(name, position, offense, defense) {
    this.name = name;
    this.position = position;
    this.offense = offense;
    this.defense = defense;
}

Player.prototype.goodGame = function() {
    if(Math.floor(Math.random() * 2) === 0){
        this.offense++;
        console.log(`${this.name}'s offense has gone up\n------------`);
    } else {
        this.defense++;
        console.log(`${this.name}'s defense has gone up!\n-----------`);
    }
};

Player.prototype.badGame = function () {
    if(Math.floor(Math.random() * 2) === 0){
        this.offense--;
        console.log(`${this.name}'s offense has gone down!\n----------`);
    } else {
        this.defense--;
        console.log(`${this.name}'s defense has gone down!\n----------`)
    }
}

Player.prototype.printStats = function () {
    console.log(`Name: ${this.name}\nPosition: ${this.position}\nOffense: ${this.offense}\nDefense: ${this.defense}`);
}

var askQuestion = function() {
    if (playerArray.length < 5) {
        inquirer.prompt([
            {
                name: "name",
                message: "What is the player's name?"
            }, {
                name: "position",
                message: "What is this player's position?"
            }, {
                name: "offense",
                message: "What is this player's offensive ranking (1-10)?",
                validate: function(value){
                    if(isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <=10){
                        return true;
                    }
                    return false;
                }
            }, {
                name: "defense",
                message: "What is this player's defensive ranking (1-10)",
                validate: function(value){
                    if(isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10){
                        return true;
                    }
                    return false;
                }
            }

        ]).then(function(answers){
            var newPlayer = new Player(answers.name, answers.position, parseInt(answers.offense), parseInt(answers.defense));

            if(starters.length < 3) {
                starters.push(newPlayer);
                console.log(`${newPlayer.name} was added to the starters`);
            } else {
                subs.push(newPlayer);
                console.log(`${newPlayer.name} was added to the subs`);
            }
            
            playerArray.push(newPlayer);
            askQuestion();

        });
    } else {
        console.log(`\n==Starters: ==============`);
            starters.forEach(function(player){
                player.printStats();
            })
        
        console.log(`\n== Subs: ==============`);
            subs.forEach(function(player){
                player.printStats();
            })

        playGame();
    }

}

askQuestion();



var playGame = function(roundNumber) {
    var num1 = Math.floor((Math.random() * 20) + 1);
    var num2 = Math.floor((Math.random() * 20) + 1);

    if (num1 < offensiveStat) {
        score++;
        counter++;
        
    } 
    if (num2 > defensiveStat) {
        score--;
        counter++
    }
}