var FloorGraphicsComponent = function(entity) {
    this.entity = entity;
    this.size = {x: 1, y: 0.15};
};

FloorGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    context.beginPath();
    context.fillStyle = "transparent";
    context.fillRect(0, 0, this.size.x, this.size.y);
    context.closePath();
    context.restore();

};

exports.FloorGraphicsComponent = FloorGraphicsComponent;
