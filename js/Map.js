
/*
 * Constructor
 */
function Map(context, stateController){
    this.canvasAPI = new CanvasAPI(context, this)
    this.root = new Node();
    this.setSelected(this.root);
    this.root.text("Root Node");
    var size = this.canvasAPI.getCanvasSize();
    this.root.setPosition(size[0]/2, size[1]/2);
    this.canvasAPI.init(this.canvasAPI);
    initUI(this);
    this.icons = ko.observableArray(fontAwesomeIcons);
    this.stateController = stateController;
}

Map.prototype.addNode = function(node){
    this.root.addChild(node);
}

Map.prototype.setLineColor = function(color, inherit){
    this.selectedElement.setLineColor(color, inherit);
}

Map.prototype.setSelected = function(node){
    if (this.selectedElement) {
        this.selectedElement.selected(false);
    }
    this.selectedElement = node;
    node.selected(true);
}