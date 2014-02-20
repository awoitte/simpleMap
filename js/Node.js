function Node(){
    this.text = new ko.observable("New Node");
    this.offset = new Point(100,-100)
    this.children = new NodeList();
    this.parent = null;
    this.depth = 0;
    this.lineColor = "#000";
    this.selected = ko.observable(false);
    this.icon = ko.observable("none");
    
    this.cssX = ko.computed(function(){
        return this.X() + "px";
    }, this);
    
    this.cssY = ko.computed(function(){
        return this.Y() + "px";
    }, this);
    
    this.isHigher = ko.computed(function(){
        return this.offset.y() <= 0;
    }, this);
    
    this.isLeft = ko.computed(function(){
        return this.offset.x() < 0;
    }, this);
    
    this.hasIcon = ko.computed(function(){
        return this.icon() != "none";
    }, this);
}

Node.prototype.isRoot = function(){
    return this.parent === null;
}

Node.prototype.setIcon = function(icon){
    this.icon(icon);
    return this;
}

Node.prototype.getRoot = function(){
    var root = this;
    while(!root.isRoot()){
        root = root.parent;
    }
    return root;
}

Node.prototype.addChild = function(node){
    node.setParent(this);
    if (this.isRoot()) {
        node.setLineColor(this.getDefaultStyle());
    }else{
        node.setLineColor(this.lineColor);
    }
    this.children.add(node);
    return this;
}


Node.prototype.setPosition = function(x,y){
    this.offset.x(x);
    this.offset.y(y);
    return this;
}

Node.prototype.generateNew = function(){
    var newNode = new Node();
    var lowestChild = this.getLowestChild();
    if (lowestChild) {
        newNode.setPosition(lowestChild.X(), lowestChild.Y() + 25);
    }else if(this.isLeft()){
        newNode.setPosition(newNode.X() * -1, newNode.Y());
    }
    this.addChild(newNode);
    return this;
}

Node.prototype.forEachChild = function(callback){
    this.children.each(callback);
    return this;
}

Node.prototype.X = function(){
    return this.offset.x();
}

Node.prototype.Y = function(){
    return this.offset.y();
}

Node.prototype.setParent = function(node){
    this.parent = node;
    this.depth = node.depth + 1;
    return this;
}

Node.prototype.setLineColor = function(color, inherit){
    this.lineColor = color;
    if (inherit) {
        this.forEachChild(function(node){
            node.setLineColor(color, inherit);
        })
    }
    return this;
}

Node.prototype.getSize = function(){
    return this.depth < 10 ? 10 - this.depth : 1;
}

Node.prototype.isLeaf = function(){
    return this.children.getLength() == 0;
}

Node.prototype.getLowestChild = function(){
    if (this.children.getLength() > 0) {
        var lowestChild, first = true;
        this.forEachChild(function(child){
            if (first) {
                first = false;
                lowestChild = child;
            }else{
                if (child.Y() > lowestChild.Y()) {
                    lowestChild = child;
                }
            }
        });
        return lowestChild;
    }
    return null;
}

Node.prototype.getDefaultStyle = function(){
    this.defaultStyle = [
        "#66d7c4",
        "#efa670",
        "#978ee2",
        "#ead85e",
        "#9dd46a",
        "#e68782",
        "#7aa3e5",
        "#e096e9"
    ]
    
    if(!this.lastDefaultIndex || this.lastDefaultIndex >= this.defaultStyle.length)
        this.lastDefaultIndex = 0;
        
    var returnVal = this.defaultStyle[this.lastDefaultIndex]
        
    this.lastDefaultIndex++;
    
    return returnVal;
}