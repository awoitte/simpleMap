function initUI(simpleMap){
    $(document).dblclick(".text", function(e){
        activateEditBox(e.target);
    });
    $(document).keypress(".editText", function(e){
        if(e.keyCode == 13)
        {
            $(e.target).hide();
        }
    });
    $(document).on("blur", ".editText", function(e){
        $(e.target).hide();
    });
    $(".iconListHeader").click(function(){
        $(this).parent().toggleClass("iconListOpen");
    });
    
    $('#colorselector2').ColorPicker({
        color: '#EFEFEF',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            simpleMap.setLineColor('#' + hex, $("#inherit").is(':checked'));
            $('#colorselector2 div').css('background-color', '#' + hex);
        }
    });
    
    
    function activateEditBox(text){
        var editBox = $(text).siblings(".editText");
        editBox.show();
        editBox.focus();
        editBox.select();
    }
    
    $(".clearIcon").click(function(){
        simpleMap.selectedElement.setIcon("none"); 
    });
    
    $(document).on("click", ".displayIcon div", function(){
        simpleMap.selectedElement.setIcon(this.className); 
    });
    
}