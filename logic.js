var inquirer = require("inquirer");
var starters = [];
var subs = [];
var playerArray = [];

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