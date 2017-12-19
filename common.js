/* 
    Yogesh Kohli
    CS545
    Fall 2017
    jadrn028
*/    
$(document).ready(function() {
    var cart = new shopping_cart("jadrn028");
    $('#count').text(cart.size());    
});