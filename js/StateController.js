function StateController(){
    this.stateStack = [];
    this.redoStack = [];
}

StateController.prototype.saveState = function(object){
    console.log(object)
    this.stateStack.push(this.cloneObject(object));
    this.redoStack = [];
}

StateController.prototype.undoState = function(){
    if (this.stateStack.length > 0) {
        var state = this.stateStack.pop();
        this.redoStack.push(this.cloneObject(state));
        return state;
    }
    return null;
}

StateController.prototype.redoState = function(){
    if (this.redoStack.length > 0) {
        var state = this.redoStack.pop();
        this.stateStack.push(this.cloneObject(state));
        return state;
    }
    return null;
}

StateController.prototype.cloneObject = function(object){
    return jQuery.extend(true, {}, object);
}