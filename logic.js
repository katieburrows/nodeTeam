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