var CircleCollisionComponent = function(entity, radius) {
    this.entity = entity;
    this.radius = radius;
    this.type = 'circle';
};


CircleCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

CircleCollisionComponent.prototype.collideCircle = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var radiusA = this.radius;
    var radiusB = entity.components.collision.radius;

    var diff = {x: positionA.x - positionB.x,
                y: positionA.y - positionB.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;
    var radiusSum = radiusA + radiusB;

    return distanceSquared < radiusSum * radiusSum;
};

CircleCollisionComponent.prototype.collideRect = function(entity) {
    var clamp = function(value, low, high) {
        if (value < low) {
            return low;
        }
        if (value > high) {
            return high;
        }
        return value;
    };

    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;
    var sizeB = entity.components.collision.size;

    var closest = {
        x: clamp(positionA.x, positionB.x,
                 positionB.x + sizeB.x),
        y: clamp(positionA.y, positionB.y,
                 positionB.y + sizeB.y)
    };


    var radiusA = this.radius;

    var diff = {x: positionA.x - closest.x,
                y: positionA.y - closest.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y; // calculates a^2 + b^2. distanceSquared now represents c^2, which is the distance between the center of the circle and the closest point of the pipe to the circle.
    return distanceSquared < radiusA * radiusA;
    //we compare c^2, the distance between the center of the circle and the closest point of the pipe, to the radius^2. If the radius^2 is greater than c^2, then the center of the circle is closer to the closest point of the pipe than the distance of the radius. This means there is a collision between circle and pipe.
};

exports.CircleCollisionComponent = CircleCollisionComponent;
