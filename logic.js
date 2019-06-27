// ****Dependencies and global variables**** //
var inquirer = require("inquirer");
var starters = [];
var subs = [];
var playerArray = [];
var score = 0;

//Player constructor that expects a name, position, offensive score, and defensive score to be fed through when an instance is made.
function Player(name, position, offense, defense) {
    //setting name, position, offense, and defense to the object.
    this.name = name;
    this.position = position;
    this.offense = offense;
    this.defense = defense;
}

//Adding the goodGame method to the prototype for the Player constructor to lesson the amount of times it has to be created compared to if it was defined in the constructor. 
Player.prototype.goodGame = function() {
    //Conditional to see if a randomly generated number is exactly equal to 0. 
    //If the number is exactly equal to 0 then the offensive score increases by 1.
    if(Math.floor(Math.random() * 2) === 0){
        this.offense++;
        console.log(`${this.name}'s offense has gone up\n------------`);
    } 
    //If the number is not exactly equal to 0 then the defensive score increases by 1.
    else {
        this.defense++;
        console.log(`${this.name}'s defense has gone up!\n-----------`);
    }
};

//Adding the badGame method to the prototype for the Player constructor to lesson the amount of times it has to be created compared to if it was defined in the constructor.
Player.prototype.badGame = function () {
    //Conditional to see if a randomly generated number is exactly equal to 0. 
    //If the number is exactly equal to 0 then the offensive score decreases by 1.
    if(Math.floor(Math.random() * 2) === 0){
        this.offense--;
        console.log(`${this.name}'s offense has gone down!\n----------`);
    } 
    //If the number is not exactly equal to 0 then the defensive score decreases by 1.
    else {
        this.defense--;
        console.log(`${this.name}'s defense has gone down!\n----------`)
    }
}

//Adding the printStats method to the prototype for the Player constructor to lesson the amount of times it has to be created compared to if it was defined in the constructor.
//This method prints out an instance of the specified player's stats--name, position, offensive score, defensive score.
Player.prototype.printStats = function () {
    console.log(`Name: ${this.name}\nPosition: ${this.position}\nOffense: ${this.offense}\nDefense: ${this.defense}`);
}

//Function that uses inquirer to kick off the game.
var askQuestion = function() {
    //Conditional to see if the playerArray is less than 5.  If it's less than 5 indexes long we want to keep adding players until we reach 5.
    if (playerArray.length < 5) {
        //Standard inquirer syntax to get the information about a player.
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

                //Validation method from inquirer.  It's checking to make sure that the user has provided a number and that that number is between 1 and 10.  
                validate: function(value){
                    if(isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <=10){
                        return true;
                    }
                    return false;
                }
            }, {
                name: "defense",
                message: "What is this player's defensive ranking (1-10)",
                
                //Validation method from inquirer.  It's checking to make sure that the user has provided a number and that that number is between 1 and 10. 
                validate: function(value){
                    if(isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10){
                        return true;
                    }
                    return false;
                }
            }

        ])
        //Promise that runs once there are 5 players in the playerArray.  It threads through the responses from inquirer and creates a new instance from the Player constructor.
        .then(function(answers){
            var newPlayer = new Player(answers.name, answers.position, parseInt(answers.offense), parseInt(answers.defense));
    
            //If the starters' array has less than 3 players add the new Player instance to the starters' array.
            if(starters.length < 3) {
                starters.push(newPlayer);
                console.log(`${newPlayer.name} was added to the starters`);

            } 
            //If the starter's array has 3 people then add the new Player instance to the subs' array.
            else {
                subs.push(newPlayer);
                console.log(`${newPlayer.name} was added to the subs`);
            }
            
            //Regardless if the new Player instance was added to the subs' or starters' arrays add them to the playerArray.
            playerArray.push(newPlayer);

            //Recursively kick off function again
            askQuestion();

        });
    } 
    //If there are 5 players in the playerArray we no longer need to kick off the previous function and we end our recursion.  
    else {
        console.log(`\n==Starters: ==============`);

            //For each loop that prints out information for every player who is in the starters' array.
            starters.forEach(function(player){
                player.printStats();
            })
        
        console.log(`\n== Subs: ==============`);
            
            //For each loop that prints out information for every player who is in the subs' array.
            subs.forEach(function(player){
                player.printStats();
            })
        
        //calling the function that is the meat of the game portion.  Passing through a 0 to indicate this is the first round.
        playGame(0);
    }

}


var playGame = function(roundNumber) {

    //If the rounds haven't exceeded 5 then increase the round number by 1.
    if (roundNumber < 5) {
        roundNumber++;
        console.log(`\n=== Round ${roundNumber}: ================`);
    
    //2 randomly calculated numbers for the opponent's offensive and defensive stats.
    var opponentOffense = Math.floor((Math.random() * 20) + 1);
    var opponentDefense = Math.floor((Math.random() * 20) + 1);

    var teamOffense = 0;
    var teamDefense = 0;

    //For each to loop through each starter and add their individual offensive and defensive stat to the team's totals for each.
    starters.forEach(function(player) {
        teamOffense += player.offense;
        teamDefense += player.defense; 
    });
    
    console.log(`\nOpponent offense: ${opponentOffense} Opponent defense: ${opponentDefense}`);

    //Conditional to see if the player's team's offense is a larger number than the randomly generated defense number of the opponent.  If it is larger then the player scores a point, otherwise no score is made.
    if (teamOffense > opponentDefense) {
        score++; 
        console.log(`\nYou scored on the opposing team!`);
        
    } else {
        console.log(`\nThey blocked your score!`);
    }

    //Conditional to see if the randomly generated offensive score is a larger number than the player's team's.  If it is larger then the player loses a point, otherwise no deduction is taken from the player.
    if (opponentOffense > teamDefense) {
        score--;
        console.log(`\nThe opposing team scored on you!`);
    } else {
        console.log(`\nYou blocked their score!`);
    }

    console.log(`\nYour current score is: ${score}\n`);
    
    //Standard inquirer syntax to ask the user if they want to swap out players from the starters' array and the subs' array.
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to sub a player?",
            name: "confirm",
            default: true
        }
    ]).then(function(makeSubstitution) {

        //If they do want to swap out players then the user is asked which player from the starters' array should go to the subs' array and which subs' array member should be moved to the starters' array.
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
                //Grabbing and storing the object of the player that is being subbed out.
                var playerObject = starters.find(function(player) {
                    return player.name === subChoices
                });

                //Grabbing and storing the object of the player that is being subbed in.
                var subObject = subs.find(function(player) {
                    return player.name === subChoices.subIn
                });

                //Determining the index of each slot.
                var playerSlot = starters.indexOf(playerObject);
                var subSlot = subs.indexOf(subObject);

                //Switching the two slots:  the sub moves into the starter slot.
                starters[playerSlot] = subObject;

                //And the starter moves into the sub slot.
                subs[subSlot] = playerObject;

                console.log(`Subbed out ${subChoices.subOut} and subbed in ${subChoices.subIn}.`);

                //Kicking off the function with the incremented round number.
                playGame(roundNumber);
            })
        } else {
            //If no sub is made then the game is kicked off again with the incremented round number.
            playGame(roundNumber);
        }
    });
} 

//If there have been 5 rounds then the game is over and the stats are printed out to the console.
else {
    console.log(`\nYour final scorew was ${score}`);
    
    //If the player won (having a score above 0) then each player in the starters' array has the goodGame method called (which increases the offensvie stat for every player in the starters' array by one).
    if (score > 0) {
        console.log(`\nYou won!`);
        starters.forEach(function(player) {
            player.goodGame();
            player.printStats();
        })
    } 
    
    //If the player lost then each player in the starters' array has the badGame method called (which decreases the offensive stat every player in the starters' array).
    else {
        console.log(`\nYou lost!!!`);
        starters.forEach(function(player) {
            player.badGame();
            player.printStats();
        })
    }

    //Standard inquirer synatx asking the player if they want to play again, if so the playGame method is called with a 0 passed through to indicate it's the first round.
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

//Kicks off the process to collect player information.
askQuestion();