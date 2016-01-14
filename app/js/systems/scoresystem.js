var counter = require('../entities/counter');

var ScoreSystem = function(entities, score) {
    this.entities = entities;
    this.score = score;
    this.realScore = 0;
};

ScoreSystem.prototype.update = function() {
    this.score++;
    this.realScore = Math.floor(this.score / 9);
    document.getElementById("counter").innerHTML = this.realScore;

};

ScoreSystem.prototype.reset = function() {
    this.score = 0;
};

exports.ScoreSystem = ScoreSystem;
