var CounterGraphicsComponent = function(entity) {
    this.entity = entity;
    this.size = {x: 0.01, y: 1};
};

CounterGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    context.beginPath();
    context.fillStyle = "transparent";

    context.fillRect(0, 0, this.size.x, this.size.y);
    context.closePath();
    context.restore();
};

exports.CounterGraphicsComponent = CounterGraphicsComponent;
