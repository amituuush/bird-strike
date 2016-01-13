var GroundGraphicsComponent = function(entity) {
    this.entity = entity;
    this.size = {x: 3, y: 0.15};
    this.image = new Image();
    this.image.src = 'img/ground.png';
};

GroundGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    context.scale(1, -1);
    context.translate(0, 0);
    context.imageSmoothingEnabled = false;
    context.drawImage(this.image, 0, -this.size.y, this.size.x, this.size.y);
    context.restore();




    // context.save();
    // context.translate(position.x, position.y);
    // context.beginPath();
    // context.fillStyle = "brown";
    // context.fillRect(0, 0, this.size.x, this.size.y);
    // context.closePath();
    // context.restore();
};

exports.GroundGraphicsComponent = GroundGraphicsComponent;
