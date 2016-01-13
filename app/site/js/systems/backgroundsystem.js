var background = require('../entities/background');

var BackgroundSystem = function(entities) {
    this.entities = entities;
};

BackgroundSystem.prototype.run = function() {
    this.backgroundFunction = window.setInterval(function scrollingBackground() {
    this.entities.push(new background.Background());
}.bind(this), 5000);
};

BackgroundSystem.prototype.stop = function() {
    if (this.backgroundFunction !== null) {
        window.clearInterval(this.backgroundFunction);
        this.backgroundFunction = null;
    }

    for (var i = 6, c = this.entities.length; i < c; i++) {
    this.entities[i].components.physics.velocity.x = 0;
    }
};


exports.BackgroundSystem = BackgroundSystem;
