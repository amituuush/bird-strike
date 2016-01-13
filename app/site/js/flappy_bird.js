var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipesystem');
var scoreSystem = require('./systems/scoresystem');
var groundSystem = require('./systems/groundsystem');
var backgroundSystem = require ('./systems/backgroundsystem');
var bird = require('./entities/bird');
var pipe = require('./entities/pipe');
var ceiling = require('./entities/ceiling');
var floor = require('./entities/floor');
var ground = require('./entities/ground');
var background = require('./entities/background');
var counter = require('./entities/counter');

var FlappyBird = function() {
    this.entities = [new bird.Bird(), new ceiling.Ceiling(), new floor.Floor(), new ground.Ground(), new background.Background(), new counter.Counter()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
    this.pipes = new pipeSystem.PipeSystem(this.entities);
    this.scores = new scoreSystem.ScoreSystem(this.entities, 0);
    this.ground = new groundSystem.GroundSystem(this.entities);
    this.background = new backgroundSystem.BackgroundSystem(this.entities);
    this.playing = true;
    this.highScore = 0;
};


FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.input.run();
    this.ground.run();
    this.pipes.run();
    this.background.run();
};

FlappyBird.prototype.stop = function() {
    this.ground.stop();
    this.pipes.stop();
    this.background.stop();
};

FlappyBird.prototype.updateScore = function() {
    this.scores.update();
};

FlappyBird.prototype.collision = function() {
    window.app.stop();
    document.getElementById('pipes-cleared').innerHTML = window.app.scores.realScore;
    $('#game-over-modal').removeClass('hide');
    $('#game-over-modal').velocity("fadeIn", 200);
    window.app.entities.splice(1, window.app.entities.length - 1);

    if (window.app.playing) {
        window.app.playing = false;
    }

    if(localStorage.getItem('HighScore') === null) {
        localStorage.setItem('HighScore', window.app.scores.realScore);
    } else if(window.app.scores.realScore > localStorage.getItem('HighScore')) {
        localStorage.setItem('HighScore', window.app.scores.realScore);
    }
    document.getElementById('pipes-cleared-high').innerHTML = localStorage.getItem('HighScore');


};

exports.FlappyBird = FlappyBird;
