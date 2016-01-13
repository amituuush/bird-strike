var CollisionSystem = function(entities) {
    this.entities = entities;
};

CollisionSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entityA = this.entities[i];
        if (!entityA.components.collision) {
            continue;
        }

        for (var j=i+1; j<this.entities.length; j++) {
            var entityB = this.entities[j];
            if (!entityB.components.collision) {
                continue;
            }

            if (!entityA.components.collision.collidesWith(entityB)) {
                continue;
            }

            if (entityA.components.collision.onCollision) {
                entityA.components.collision.onCollision(entityB);
            }

            if (entityB.components.collision.onCollision) {
                entityB.components.collision.onCollision(entityA);
            } // this code seems like a waste of cpu since we only need to compare the first entity in the array to all the other entities. We don't need to compare pipes to pipes.
        }
    }
};

exports.CollisionSystem = CollisionSystem;