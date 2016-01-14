var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var graphicsComponent = require("../components/graphics/background");
var flappyBird = require("../flappy_bird");

var Background = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = 0;
    physics.position.y = 0;
    physics.velocity.x = -0.05;

    var graphics = new graphicsComponent.BackgroundGraphicsComponent(this);

    // var collision = new collisionComponent.RectCollisionComponent(this, graphics.size);
    // collision.onCollision = this.onCollision.bind(this);

    this.components = {
        physics: physics,
        graphics: graphics
    };
};

Background.prototype.onCollision = function() {


};

exports.Background = Background;
