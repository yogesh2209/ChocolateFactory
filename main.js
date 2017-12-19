/* 
    Yogesh Kohli
    CS545
    Fall 2017
    jadrn028
*/    
var proj4_data;
$(document).ready(function() {
 proj4_data = new Array();
 var ab =    $.get('/perl/jadrn028/proj4/getProducts.cgi', storeData);
    var cart = new shopping_cart("jadrn028");
    $('#count').text(cart.size());
   // console.log(cart);
     $('#dark').on('click', function() {
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Dark chocolate") {
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  />";            
                 for(var j=0; j < proj4_data[i].length; j++)
                    {
                    if (j == 0 || j == 1 || j == 5) {  
                    }
                    else{
                          if (j == 2) {
                             tmpString +=  "<h2>" + proj4_data[i][j] + "</h2>";
                          }
                          else if (j == 3) {
                                tmpString +=  "<h6>" + proj4_data[i][j] + "</h6>";
                          }
                          else if (j == 4) {
                                tmpString +=  "<p>" + proj4_data[i][j] + "<p>";
                          }
                          else if (j == 6) {
                           tmpString +=  "<h4 id = 'price'>" + " $" + proj4_data[i][j] + "</h4>";
                          }
                          else{
                            tmpString += proj4_data[i][j] + "<br />";
                            }
                        }
                }  
             tmpString += "<input type='button' class = 'cart_button' value='Add to Cart'"+
                "name='" + proj4_data[i][0] + '%' + proj4_data[i][6] +"' />";
            tmpString += "<span class='cart_span'>Added to Cart</span><hr />";  

                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
        });
        
    $('#nuts').on('click', function() {   
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Nuts and chews") {  
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  />";  
                for(var j=0; j < proj4_data[i].length; j++)
                    {
                    if (j == 0 || j == 1 || j == 5) {  
                    }
                    else{
                          if (j == 2) {
                             tmpString +=  "<h2>" + proj4_data[i][j] + "</h2>";
                          }
                          else if (j == 3) {
                                tmpString +=  "<h6>" + proj4_data[i][j] + "</h6>";
                          }
                          else if (j == 4) {
                                tmpString +=  "<p>" + proj4_data[i][j] + "<p>";
                          }
                          else if (j == 6) {
                           tmpString +=  "<h4 id = 'price'>" + " $" + proj4_data[i][j] + "</h4>";
                          }
                          else{
                            tmpString += proj4_data[i][j] + "<br />";
                            }
                        }
                }  
           tmpString += "<input type='button' class = 'cart_button' value='Add to Cart'"+
                "name='" + proj4_data[i][0] + '%' + proj4_data[i][6] +"' />";
            tmpString += "<span class='cart_span'>Added to Cart</span><hr />";           
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
        });
        
    $('#brittle').on('click', function() {
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Brittles and toffies") {
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  />";            
                 for(var j=0; j < proj4_data[i].length; j++)
                    {
                    if (j == 0 || j == 1 || j == 5) {  
                    }
                    else{
                          if (j == 2) {
                             tmpString +=  "<h2>" + proj4_data[i][j] + "</h2>";
                          }
                          else if (j == 3) {
                                tmpString +=  "<h6>" + proj4_data[i][j] + "</h6>";
                          }
                          else if (j == 4) {
                                tmpString +=  "<p>" + proj4_data[i][j] + "<p>";
                          }
                          else if (j == 6) {
                           tmpString +=  "<h4 id = 'price'>" + " $" + proj4_data[i][j] + "</h4>";
                          }
                          else{
                            tmpString += proj4_data[i][j] + "<br />";
                            }
                        }
                }  
           tmpString += "<input type='button' class = 'cart_button' value='Add to Cart'"+
                "name='" + proj4_data[i][0] + '%' + proj4_data[i][6] +"' />";
            tmpString += "<span class='cart_span'>Added to Cart</span><hr />";           
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
        });


$('#gift_id').on('click', function() {
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Gifts") {
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  />";            
                 for(var j=0; j < proj4_data[i].length; j++)
                    {
                    if (j == 0 || j == 1 || j == 5) {  
                    }
                    else{
                          if (j == 2) {
                             tmpString +=  "<h2>" + proj4_data[i][j] + "</h2>";
                          }
                          else if (j == 3) {
                                tmpString +=  "<h6>" + proj4_data[i][j] + "</h6>";
                          }
                          else if (j == 4) {
                                tmpString +=  "<p>" + proj4_data[i][j] + "<p>";
                          }
                          else if (j == 6) {
                           tmpString +=  "<h4 id = 'price'>" + " $" + proj4_data[i][j] + "</h4>";
                          }
                          else{
                            tmpString += proj4_data[i][j] + "<br />";
                            }
                        }
                }  
             tmpString += "<input type='button' class = 'cart_button' value='Add to Cart'"+
                "name='" + proj4_data[i][0] + '%' + proj4_data[i][6] +"' />";
            tmpString += "<span class='cart_span'>Added to Cart</span><hr />";  

                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
        });



$('#truffle').on('click', function() {
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Truffles") {
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  />";            
                 for(var j=0; j < proj4_data[i].length; j++)
                    {
                    if (j == 0 || j == 1 || j == 5) {  
                    }
                    else{
                          if (j == 2) {
                             tmpString +=  "<h2>" + proj4_data[i][j] + "</h2>";
                          }
                          else if (j == 3) {
                                tmpString +=  "<h6>" + proj4_data[i][j] + "</h6>";
                          }
                          else if (j == 4) {
                                tmpString +=  "<p>" + proj4_data[i][j] + "<p>";
                          }
                          else if (j == 6) {
                           tmpString +=  "<h4 id = 'price'>" + " $" + proj4_data[i][j] + "</h4>";
                          }
                          else{
                            tmpString += proj4_data[i][j] + "<br />";
                            }
                        }
                }  
             tmpString += "<input type='button' class = 'cart_button' value='Add to Cart'"+
                "name='" + proj4_data[i][0] + '%' + proj4_data[i][6] +"' />";
            tmpString += "<span class='cart_span'>Added to Cart</span><hr />";  

                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
        });



$('#holiday').on('click', function() {
        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Holiday assortments") {
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  />";            
                 for(var j=0; j < proj4_data[i].length; j++)
                    {
                    if (j == 0 || j == 1 || j == 5) {  
                    }
                    else{
                          if (j == 2) {
                             tmpString +=  "<h2>" + proj4_data[i][j] + "</h2>";
                          }
                          else if (j == 3) {
                                tmpString +=  "<h6>" + proj4_data[i][j] + "</h6>";
                          }
                          else if (j == 4) {
                                tmpString +=  "<p>" + proj4_data[i][j] + "<p>";
                          }
                          else if (j == 6) {
                           tmpString +=  "<h4 id = 'price'>" + " $" + proj4_data[i][j] + "</h4>";
                          }
                          else{
                            tmpString += proj4_data[i][j] + "<br />";
                            }
                        }
                }  
             tmpString += "<input type='button' class = 'cart_button' value='Add to Cart'"+
                "name='" + proj4_data[i][0] + '%' + proj4_data[i][6] +"' />";
            tmpString += "<span class='cart_span'>Added to Cart</span><hr />";  

                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
        });

        
$('#content').on('click',$('input[type="button"]'), function(e) {
    if($(e.target).val() != 'Add to Cart') return;
  // alert("The SKU is " + $(e.target).attr("name"));
    });
    $(document).on('click', ".cart_button", function() { 
        var sku = this.name;
        cart.add(sku,1);
        $('#count').text(cart.size());
        $(this).css('display', 'inline-block');
        $(this).next().fadeIn(50).fadeOut(3000);
         });                 
    });    
function storeData(response) {
    var tmpArray = explodeArray(response,';'); 
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        proj4_data[i] = innerArray;

        }
         display_milk_chocolate();
    }

function display_milk_chocolate() {
    tmpString = "";
   
    for(var i=0; i < proj4_data.length; i++) {
        if(proj4_data[i][1] == "Milk chocolate") {
            tmpString += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  />";
            for(var j=0; j < proj4_data[i].length; j++)
                    {
                    if (j == 0 || j == 1 || j == 5) {  
                    }
                    else{
                          if (j == 2) {
                             tmpString +=  "<h2>" + proj4_data[i][j] + "</h2>";
                          }
                          else if (j == 3) {
                                tmpString +=  "<h6>" + proj4_data[i][j] + "</h6>";
                          }
                          else if (j == 4) {
                                tmpString +=  "<p>" + proj4_data[i][j] + "<p>";
                          }
                          else if (j == 6) {
                           tmpString +=  "<h4 id = 'price'>" + " $" + proj4_data[i][j] + "</h4>";
                          }
                          else{
                            tmpString += proj4_data[i][j] + "<br />";
                            }
                        }
                }  
            tmpString += "<input type='button' id = 'milk_button_id' class = 'cart_button' value='Add to Cart'"+
                "name='" + proj4_data[i][0] + '%' + proj4_data[i][6] +"' />";
            tmpString += "<span class='cart_span'>Added to Cart</span><hr />";  
        }
    var handle = document.getElementById('content');
    handle.innerHTML = tmpString;
    }
}        

function explodeArray(item,delimiter) {
tempArray=new Array(1);
var Count=0;
var tempString=new String(item);
while (tempString.indexOf(delimiter)>0) {
tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
Count=Count+1
}
tempArray[Count]=tempString;
return tempArray;
}     
