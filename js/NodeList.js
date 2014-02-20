function NodeList() {
    this.nodes = new ko.observableArray();
}

NodeList.prototype.add = function(node){
    this.nodes.push(node);
}

NodeList.prototype.each = function(callback){
    for(var i = 0; i < this.nodes().length; i++){
        callback(this.nodes()[i]);
    }
}

NodeList.prototype.getLength = function(){
    return this.nodes().length;
}