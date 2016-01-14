var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
    this.image = new Image();
    this.image.src = 'img/flappy-bird-sprite.png';
    this.width = 0.1;
    this.height = 0.1;
    this.tickCount = 0;
    this.frameIndex = 0;
    // this.ticksPerFrame = this.ticksPerFrame || 0;
    // this.numberOfFrames = this.numberOfFrames || 1;
};

BirdGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    context.scale(1, -1);
    context.translate(-0.05, -0.035);
    context.drawImage(this.image, this.frameIndex * 350, 0, 350, 350, 0, 0, this.width, this.height);
    context.restore();

    this.tickCount += 1;
    if (this.tickCount % 4 === 0) {
        this.frameIndex++;
    }
    if (this.frameIndex === 16) {
        this.frameIndex = 0;
    }


    // context.save();
    // context.translate(position.x, position.y);
    // context.scale(1, -1);
    // context.translate(-0.05, -0.05);
    // context.drawImage(this.image, 0, 0, 0.1, 0.1);
    // context.restore();

    // context.save();
    // context.translate(position.x, position.y);
    // context.beginPath();
    // context.arc(0, 0, 0.0275, 0, 2 * Math.PI);
    // context.fill();
    // context.closePath();
    // context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
