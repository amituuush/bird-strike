var GraphicsSystem = function(entities) {
    this.entities = entities;
    // Canvas is where we draw
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function() {
     {
        window.requestAnimationFrame(this.tick.bind(this));
    }
};

GraphicsSystem.prototype.tick = function() {
    if(window.app.playing) {
        if (this.canvas.width != this.canvas.offsetWidth ||
            this.canvas.height != this.canvas.offsetHeight) {
            this.canvas.width = this.canvas.offsetWidth * 2;
            this.canvas.height = this.canvas.offsetHeight * 2;
        }

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.save();
        this.context.translate(this.canvas.width / 2, this.canvas.height);
        this.context.scale(this.canvas.height, -this.canvas.height);

        for (var i=0; i<this.entities.length; i++) {
            var entity = this.entities[i];
            if (!entity.components.graphics) {
                continue;
            }

            entity.components.graphics.draw(this.context);
        }

        this.context.restore();

        window.requestAnimationFrame(this.tick.bind(this));
    }
};

GraphicsSystem.prototype.stop = function() {
    window.cancelAnimationFrame(this.tick.bind(this));
};

exports.GraphicsSystem = GraphicsSystem;
