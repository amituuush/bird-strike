var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");
var graphicsComponent = require("../components/graphics/ceiling");
var flappyBird = require("../flappy_bird");

var Ceiling = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = -0.25;
    physics.position.y = 1;

    var graphics = new graphicsComponent.CeilingGraphicsComponent(this);

    var collision = new collisionComponent.RectCollisionComponent(this, graphics.size);
    collision.onCollision = this.onCollision.bind(this);



    this.components = {
        physics: physics,
        collision: collision,
        graphics: graphics
    };
};

Ceiling.prototype.onCollision = function() {
    document.getElementById('game-over').innerHTML = "Ouch, watch your head! Try again.";
    window.app.collision();

};

exports.Ceiling = Ceiling;
