var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var graphicsComponent = require("../components/graphics/ground");
var flappyBird = require("../flappy_bird");

var Ground = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = -1;
    physics.position.y = 0;
    physics.velocity.x = -0.70;

    var graphics = new graphicsComponent.GroundGraphicsComponent(this);

    // var collision = new collisionComponent.RectCollisionComponent(this, graphics.size);
    // collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        graphics: graphics
    };
};

Ground.prototype.onCollision = function() {

};

exports.Ground = Ground;
