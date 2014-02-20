CanvasAPI = function(context, model){
    this.context = context;
    this.model = model;
    this.setCanvasSize(this);
    
    var self = this;
    window.onresize = function(){self.setCanvasSize(self)};
}

CanvasAPI.prototype.draw = function(){
    //reset, just in case
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.save();
    this.clearCanvas();
    
    //draw the lines
    this.drawLines(this.model.root);
    this.context.restore();
}

CanvasAPI.prototype.drawLines = function(node){
    var self = this;
    this.context.save();
    this.context.translate(node.X(), node.Y());
    node.forEachChild(function(childNode){
        //recursive
        self.drawLines(childNode);
        
        self.setLineStyle(this.context, childNode);
        self.paintLine(node, childNode);
    })
    this.context.restore();
    
}

CanvasAPI.prototype.setLineStyle = function(context, node){
    this.context.strokeStyle = node.lineColor; 
    this.context.lineWidth= node.getSize();
    this.context.lineCap='round';
}

CanvasAPI.prototype.paintLine = function(node, childNode){
    //0,0 is the position of the parent node
    this.context.beginPath();
    this.context.moveTo(0, 0);
    
    //setup control points for bezier line
    var startControlX, startControlY, endControlX, endControlY;
        startControlX = childNode.X() * 3 / 4;
        startControlY = 0;
        endControlX = childNode.X() * 1 / 4;
        endControlY = childNode.Y();
        
        //ensure line is coming out of correct side for "flow"
        startControlX = Math.abs(startControlX);
        startControlX = startControlX > 50 ? startControlX : 50;
        endControlX = Math.abs(endControlX);
        endControlX = endControlX > 50 ? endControlX : 50;
        if (node.isRoot() ? childNode.isLeft() : node.isLeft()) {
            startControlX *= -1;
        }
        if(!childNode.isLeft()){
            endControlX *= -1;
        }
    
    //actually draw line
    this.context.bezierCurveTo(startControlX, startControlY, endControlX, endControlY, childNode.X(), childNode.Y());
    this.context.stroke();
    this.context.closePath();
    this.context.save();
    this.paintLineCap(childNode);
    this.context.restore();
}

CanvasAPI.prototype.paintLineCap = function(node){
    this.context.translate(node.X(), node.Y());
    var leaf = node.isLeaf();
    var XOffset = 5
    var height = node.getSize() + 1;
    if (node.isLeft()) {
        XOffset *= -1;
        height *= -1;
    }
    
    //setup line
    this.context.strokeStyle = "white";
    this.context.fillStyle = "white";
    this.context.lineWidth= 2;
    
    //stroke
    this.context.beginPath();
    this.context.moveTo(0, -(height/2));
    this.context.lineTo(XOffset,0);
    this.context.lineTo(0, (height/2));
    if (leaf) {
        this.context.lineTo(height, (height/2));
        this.context.lineTo(height, -(height/2));
        this.context.closePath();
        this.context.fill();
    }else{
        this.context.stroke();
        this.context.closePath();
    }    
    
}

//self is required to keep the function recursive, otherwise "this" is the window
CanvasAPI.prototype.init = function(self){
    self.draw();
    setTimeout(self.init, 20, self);
}

CanvasAPI.prototype.clearCanvas = function(){
    var size = this.getCanvasSize();
    this.context.clearRect ( 0 , 0 , size[0], size[1]);
}

CanvasAPI.prototype.setCanvasSize = function(self){
    self.context.canvas.width = window.innerWidth;
    self.context.canvas.height = window.innerHeight;
}

CanvasAPI.prototype.getCanvasSize = function(){
    return [this.context.canvas.width, this.context.canvas.height];
}