var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/counter");
var graphicsComponent = require("../components/graphics/counter");
var flappyBird = require("../flappy_bird");

var Counter = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = -0.2;
    physics.position.y = 0;

    var graphics = new graphicsComponent.CounterGraphicsComponent(this);

    var collision = new collisionComponent.CounterCollisionComponent(this, graphics.size);
    collision.onCollision = function() {
        window.app.updateScore();
    };

    this.components = {
        physics: physics,
        collision: collision,
        graphics: graphics,
    };
};

// Counter.prototype.onCollision = function() {
//     this.components.counter.count();
// };

exports.Counter = Counter;
