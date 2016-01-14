var CeilingGraphicsComponent = function(entity) {
    this.entity = entity;
    this.size = {x: 0.5, y: 0.05};
};

CeilingGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    context.beginPath();
    context.fillStyle = "blue";
    context.fillRect(0, 0, this.size.x, this.size.y);
    context.closePath();
    context.restore();

};

exports.CeilingGraphicsComponent = CeilingGraphicsComponent;
