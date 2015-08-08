!function(){
jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
};
function expandMenu() {
	$("#site-menu-icon").rotate(90);
	$("#site-menu").show();
}

function collapseMenu() {
	$("#site-menu-icon").rotate(0);
	$("#site-menu").hide();
}

function addEvents() {
	$("#site-menu-container").hover(expandMenu, collapseMenu);
}
	
$(document).ready(function(){
	addEvents();
});
}();