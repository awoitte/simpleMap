ko.bindingHandlers.draggable = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        $(element).draggable({
            handle: ".text",
            drag: function(event, ui){
                var pos = $(event.target).position();
               viewModel.setPosition(pos.left, pos.top);
            }});
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        
    }
};

ko.bindingHandlers.selectable = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        $(element).click(function(e){
            bindingContext.$root.setSelected(viewModel);
            $('#colorselector2 div').css('background-color', viewModel.lineColor);
            e.preventDefault();
            return false;
        });
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        
    }
};