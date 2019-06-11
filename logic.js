var inquirer = require("inquirer");
var starters = [];
var subs = [];
var playerArray = [];
var score = 0;




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
    
            console.log(typeof(answers.offense), typeof(answers.defense));
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

        playGame(0);
    }

}


var playGame = function(roundNumber) {
    if (roundNumber < 5) {
        roundNumber++;
        console.log(`\n=== Round ${roundNumber}: ================`);
    }
    var opponentOffense = Math.floor((Math.random() * 20) + 1);
    var opponentDefense = Math.floor((Math.random() * 20) + 1);

    var teamOffense = 0;
    var teamDefense = 0;

    starters.forEach(function(player){
        teamOffense += player.offense;
        teamDefense += player.defense; 
    });
    
    console.log(`\nOpponent offense: ${opponentOffense} Opponent defense: ${opponentDefense}`);

    if (teamOffense > opponentDefense) {
        score++;
        console.log(`\nYou scored on the opposing team!`);
        
    } else {
        console.log(`\nThey blocked your score!`);
    }

    if (opponentOffense > teamDefense) {
        score--;
        console.log(`\nThe opposing team scored on you!`);
    } else {
        console.log(`\nYou blocked their score!`);
    }

    console.log(`\nYour current score is: ${score}\n`);
    
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to sub a player?",
            name: "confirm",
            default: true
        }
    ]).then(function(makeSubstitution) {
        if (makeSubstitution.confirm) {
            inquirer.prompt([
            {
                type: "list",
                message: "Which player would you like to sub out?",
                choices: starters,
                name: "subOut"
            },
            {
                type: "list", 
                message: "Which player would you like to sub in?",
                choices: subs,
                name: "subIn"
            }
            ]).then(function(subChoices) {
                //grab and store the object of the player that is being subbed out.
                var playerObject = starters.find(function(player) {
                    return player.name === subChoices
                });

                //grab and store the object of the player that is being subbed in.
                var subObject = subs.find(function(player) {
                    return player.name === subChoices.subIn
                });

                //determine the index of each slot
                var playerSlot = starter.indexOf(playerObject);
                var subSlot = subs.indexOf(subObject);

                //switch the two slots:  the sub moves into the starter slot.
                starters[playerSlot] = subObject;

                //the starter moves into the sub slot.
                subs[subSlot] = playerObject;

                console.log(`Subbed out ${subChoices.subOut} and subbed in ${subChoices.subIn}.`);

                playGame(roundNumber);
            })
        } else {
            playGame(roundNumber);
        }
    })
} else {
    console.log(`\nYour final scorew was ${score}`);
    if (score > 0) {
        console.log(`\nYou won!`);
        starters.forEach(function(player) {
            player.goodGame();
            player.printStats();
        })
    } else {
        console.log(`\nYou lost!!!`);
        starters.forEach(function(player) {
            player.badGame();
            player.printStats();
        })
    }

    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like ot play again?",
            name: "confirm"
        }
    ]).then(function(playAgain) {
        if (playAgain.confirm) {
            playGame(0);
        } else {
            return false
        }
    })
}
}


askQuestion();