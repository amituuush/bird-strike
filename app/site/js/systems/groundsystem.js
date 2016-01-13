var ground = require('../entities/ground');

var GroundSystem = function(entities) {
    this.entities = entities;
};

GroundSystem.prototype.run = function() {
    this.groundFunction = window.setInterval(function scrollingGround() {
    this.entities.push(new ground.Ground());
}.bind(this), 1025);
};

GroundSystem.prototype.stop = function() {
    if (this.groundFunction !== null) {
        window.clearInterval(this.groundFunction);
        this.groundFunction = null;
    }

    for (var i = 6, c = this.entities.length; i < c; i++) {
    this.entities[i].components.physics.velocity.x = 0;
    }
};


exports.GroundSystem = GroundSystem;
