var pipe = require('../entities/pipe');

var PipeSystem = function(entities) {
    this.entities = entities;
};

PipeSystem.prototype.run = function() {
    this.pipeFunction = window.setInterval(function newPipes() {
    this.entities.push(new pipe.Pipe(1, (Math.random() * 0.6) + 0.4), new pipe.Pipe(1.55, (Math.random() * -0.1) - 0));

    for (var i = 5; i < this.entities.length; i++) {
        if (this.entities[i].components.physics.position.x < -2) {
        this.entities.splice(i, 1);
        }
    }
}.bind(this), 1500);
};

PipeSystem.prototype.stop = function() {
    if (this.pipeFunction !== null) {
        window.clearInterval(this.pipeFunction);
        this.pipeFunction = null;
    }

    for (var i = 5, c = this.entities.length; i < c; i++) {
    this.entities[i].components.physics.velocity.x = 0;
    }
};


exports.PipeSystem = PipeSystem;
