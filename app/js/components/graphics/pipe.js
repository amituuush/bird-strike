var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
    this.size = {x: 0.1, y: 0.65};
    this.image = new Image();
    this.image.src = 'img/pipe.png';
};

PipeGraphicsComponent.prototype.draw = function(context) {
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
    // context.fillStyle = "green";
    // context.fillRect(0, 0, this.size.x, this.size.y);
    // context.closePath();
    // context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
