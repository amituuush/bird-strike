var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var graphicsComponent = require("../components/graphics/floor");
var flappyBird = require("../flappy_bird");

var Floor = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = -0.25;
    physics.position.y = -0.01;

    var graphics = new graphicsComponent.FloorGraphicsComponent(this);

    var collision = new collisionComponent.RectCollisionComponent(this, graphics.size);
    collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        collision: collision,
        graphics: graphics
    };
};

Floor.prototype.onCollision = function() {
    document.getElementById('game-over').innerHTML = "Crash landing. Try again!";
    window.app.collision();

};

exports.Floor = Floor;
