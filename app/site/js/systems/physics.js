var collisionSystem = require("./collision");

var PhysicsSystem = function(entities) {
    this.entities = entities;
    this.collisionSystem = new collisionSystem.CollisionSystem(entities);
};

PhysicsSystem.prototype.run = function() {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 1000 /60);
};

PhysicsSystem.prototype.tick = function() {
    for (var i = 0; i < this.entities.length; i++) {
        var entity = this.entities[i];
        if (!entity.components.physics) {
            continue;
        }

        entity.components.physics.update(1/60);

    }


    this.collisionSystem.tick();
};

exports.PhysicsSystem = PhysicsSystem;
