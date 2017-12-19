/*  We load the global array proj4_data once, then use it as needed
    to retrieve product information.
    
    The Milk Chocolate handler is done the old-fashion way, with an 
    'onclick' call in the xhtml code.  The rest of the buttons have 
    handlers assigned the correct way.
    
    Yogesh Kohli
    CS545
    Fall 2017
*/    
var proj4_data;
$(document).ready(function() {
proj4_data = new Array();
 var ab =    $.get('/perl/jadrn028/proj4/getProducts.cgi', storeData);
    var cart = new shopping_cart("jadrn028");
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
            tmpString += "<input type='button' class = 'cart_button' name="+proj4_data[i][0]+
            " value='Add to Cart' /><br /><hr />";          
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
            tmpString += "<input type='button' class = 'cart_button' name="+proj4_data[i][0]+
            " value='Add to Cart' /><br /><hr />";          
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
            tmpString += "<input type='button' class = 'cart_button' name="+proj4_data[i][0]+
            " value='Add to Cart' /><br /><hr />";          
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
        });
        
$('#content').on('click',$('input[type="button"]'), function(e) {
    if($(e.target).val() != 'Add to Cart') return;
    alert("The SKU is " + $(e.target).attr("name"));
    });
        
    $(document).on('click', ".buy", function() {  
        

        var sku = this.id;
        cart.add(sku,1);
        $(this).next().fadeIn(50).fadeOut(2000);
        });                 
    });    

function storeData(response) {
    var tmpArray = explodeArray(response,';');
   
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        proj4_data[i] = innerArray;

        }
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
            tmpString += "<input type='button' class = 'cart_button' name="+proj4_data[i][0]+
            " value='Add to Cart' /><br /><hr />";
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
