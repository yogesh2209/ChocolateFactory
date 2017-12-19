$(document).ready( function() {
    var cart = new shopping_cart("jadrn028");
    $('#count').text(cart.size());
    updateDisplay();
    isCartEmpty();

    //Deleting Item from Cart
    $('.deleteButton').on('click', function() {
        var cart = new shopping_cart("jadrn028");
        var cartArray = cart.getCartArray();
        var index = $(this).closest('td').parent()[0].sectionRowIndex-1;
        var sku = cartArray[index][0];
        cart.delete(sku);
        updateDisplay();
        location.reload();
        });

        //Updating Cart Quantity - first checking whether quantity is legal or not !
    $('.updateButton').on('click', function() {
        var newQuantity = document.getElementsByName("quantity_field")[$(this).closest('td').parent()[0].sectionRowIndex-1].value.trim();
        if (newQuantity == 0 || newQuantity > 999)
        {
            document.getElementsByName("quantity_field")[0].focus();
            document.getElementById("emptyCardBox").style.display = "block";
            document.getElementById("emptyCardBox").innerHTML = "Please Enter the Valid Quantity!! Range is 1-999!";
        }
        else
        {
            document.getElementById("emptyCardBox").style.display = "none";
            var cart = new shopping_cart("jadrn028");
            var cartArray = cart.getCartArray();
            var index = $(this).closest('td').parent()[0].sectionRowIndex-1;
            var sku = cartArray[index][0];
            cart.setQuantity(sku, newQuantity);
            updateDisplay();
            location.reload();

        }
    });     

    function isCartEmpty() {
        if (cart.size() == 0){
            $('.order_button_class').hide();
            $('#cart').html(""); 
            $('#count').text(cart.size()); 
            document.getElementById("emptyCardBox").style.display = "block";
            document.getElementById("emptyCardBox").innerHTML = "Empty Cart!";
        }
        else{
             $('.order_button_class').show();
            // console.log($('#cart').html());
        }
    }

    //Update display of the order screen
    function updateDisplay() {
        var cartArray = cart.getCartArray();
       // console.log(cartArray);
            var toWrite = "<table>";
            toWrite += "<tr><th>Product</th><th>Quantity</th><th>Action</th><th>Price per qty</th><th>Total Price</th></tr>";
            var totalAmount = 0;
            for(i=0; i < cartArray.length; i++)
            {
                var total_price = 0;
                toWrite += "<tr>";
                toWrite += "<td>"+"<img src=\"/~jadrn000/PROJ4_IMAGES/"+cartArray[i][0]+".jpg\" alt=\""+cartArray[i][0]+"\""+"width=\"120px\" />"+"</td>"; 
                toWrite += "<td class='quantity_td'>"+cartArray[i][1]+"</td>"; 
                toWrite += "<td>"+ "<input type = 'number' min='1' step='1' name='quantity_field' />"+"<input type='button' value='Update quantity' class='updateButton' />"+"<br />"+"<input type='button' value='Remove from Cart' class='deleteButton' />"+"</td>"; 
                toWrite += "<td class='price_id'>"+ "$" +cartArray[i][2]+"</td>"; 
                //calculate price for total quantity and show it in the table
                total_price += cartArray[i][2] * cartArray[i][1];
                var roundedPrice = (total_price).toFixed(2);
                totalAmount = parseFloat(totalAmount) + parseFloat(roundedPrice);
                toWrite += "<td class='price_id'>"+ "$" +roundedPrice+"</td>";
                toWrite += "</tr>";
            }
                toWrite += "</table>";  
                toWrite += "<br /><br />";
                toWrite += "<table class='price_table'>";
                toWrite += "<tr>";
                toWrite +="<td>"+"<h5>"+'Total Order'+"</h5>" +"</td>";
                var totalOrderAmount = (totalAmount).toFixed(2);
                toWrite += "<td>"+"<h6>"+"$"+totalOrderAmount+"</h6>" +"</td>";
                toWrite += "</tr>";
                toWrite += "<tr>";
                toWrite +="<td>"+"<h5>"+'Total Tax (8%)'+"</h5>" +"</td>";
                var totalTax = (totalOrderAmount * 0.08).toFixed(2);
                toWrite += "<td>"+"<h6>"+"$"+totalTax+"</h6>" +"</td>";
                toWrite += "</tr>";
                toWrite += "<tr>";
                toWrite +="<td>"+"<h5>"+'Total Shipping Charges ($2 per item)'+"</h5>" +"</td>";
                var roundedShipping = (cartArray.length * 2).toFixed(2);
                toWrite += "<td>"+"<h6>"+"$"+roundedShipping+"</h6>" +"</td>";
                toWrite += "</tr>";
                toWrite += "<tr>";
                toWrite +="<td>"+"<h5>"+'Final Order Amount'+"</h5>" +"</td>";
                var finalOrder = parseFloat(totalOrderAmount) + parseFloat(totalTax) + parseFloat(roundedShipping);
                var totalTax = (finalOrder).toFixed(2);
                toWrite += "<td>"+"<h6>"+"$"+totalTax+"</h6>" +"</td>";
                toWrite += "</tr>";
                toWrite += "</table>";
            $('#cart').html(toWrite); 
            $('#count').text(cart.size()); 
     } 

//Submit Button of dialog modal
$(':submit').on('click', function(e) {
        e.preventDefault();
        if (validateForm()){
           // alert("validation done");
            $('form').serialize();
            $('form').submit();
           // confirmationLayout();
        }
        else{
            alert("Something went wrong, please try again later");
        }
    });

//Shipping Address to be same as billing address checkmark
$('#checkbox_address').click(function() {
    if($("#checkbox_address").is(':checked')){
        addressCheckbox(true);
    }
else{
     // unchecked
    addressCheckbox(false); 
}
});

//reset button of dialog modal
$(':reset').on('click', function(e) {
         document.getElementById("errorBox").style.display = "none";
    });

//adding dashes to phone shipping
 $('#phone_s_id').on('blur', function() {
         var $this = $(this);
        if ($this.val().length != 0) {
            $('[name="phone_s"]').val($this.val().substring(0,3) + "-" + $this.val().substring(3,6) + "-" + $this.val().substring(6,10));
         }
     });

//adding dashes to phone billing
 $('#phone_b_id').on('blur', function() {
         var $this = $(this);
        if ($this.val().length != 0) {
            $('[name="phone_b"]').val($this.val().substring(0,3) + "-" + $this.val().substring(3,6) + "-" + $this.val().substring(6,10));
         }
     });



    //Setting up dialog modal    
    $( "#dialog-modal" ).dialog({
            height: 600,
            width: 800,
            modal: true,
            autoOpen: false
    });
    
    //order button click action - for opening of dialog modal
    $('#order_button').on('click', function($e) {       
            $("#dialog-modal").dialog('open');
            });                 
    });

//Submit button clicked action
//Validating form
function validateForm() {
    
    /* ---------- VALIDATING BILLING ADDRESS ------------- */

    //Validating First Name
    if (document.getElementsByName("fname_b")[0].value.trim() == "" || document.getElementsByName("fname_b")[0].value.trim().length == 0)
    {
        document.getElementsByName("fname_b")[0].focus();
        document.getElementById("errorBox").style.display = "block";
        document.getElementById("errorBox").innerHTML = "Please Enter the First Name! Minimum 1 letter!";
        return false;
    }
    else
    {
        document.getElementById("errorBox").style.display = "none";
    }

    //Validating Last Name
    if (document.getElementsByName("lname_b")[0].value.trim() == "" || document.getElementsByName("lname_b")[0].value.trim().length == 0)
    {
        document.getElementsByName("lname_b")[0].focus();
        document.getElementById("errorBox").style.display = "block";
        document.getElementById("errorBox").innerHTML = "Please Enter the Last Name! Minimum 1 letter!";
        return false;
    }
    else
    {
        document.getElementById("errorBox").style.display = "none";
    }

    //Validating Address 1
    if (document.getElementsByName("address1_b")[0].value.trim() == "" || document.getElementsByName("address1_b")[0].value.trim().length < 2)
    {
        document.getElementsByName("address1_b")[0].focus();
        document.getElementById("errorBox").style.display = "block";
        document.getElementById("errorBox").innerHTML = "Please Enter the Address! Minimum 2 letter!";
        return false;
    }
    else
    {
        document.getElementById("errorBox").style.display = "none";
    }

    //Validate State
    if (document.getElementsByName("state_b")[0].value == "none") {
        document.getElementsByName("state_b")[0].focus();
        document.getElementById("errorBox").style.display = "block";
        document.getElementById("errorBox").innerHTML = "Please select a state!";
        return false;
    }

    //Validating City
   if (document.getElementsByName("city_b")[0].value.trim().length < 2) 
   {
        document.getElementsByName("city_b")[0].focus();
        document.getElementById("errorBox").style.display = "block";
        document.getElementById("errorBox").innerHTML = "Please enter a city! Minimum 2 letters!";
        return false;
    }   
   

    //Validate Zip
    if (document.getElementsByName("zip_b")[0].value.trim() == "" || document.getElementsByName("zip_b")[0].value.trim().length != 5)
    {
        document.getElementsByName("zip_b")[0].focus();
        document.getElementById("errorBox").style.display = "block";
        document.getElementById("errorBox").innerHTML = "Please Enter the Valid Zip! Exactly 5 digits!";
        return false;
    }
    else
    {
        var regexName=/^\d{5}$|^\d{5}-\d{4}$/;
        if(regexName.test(document.getElementsByName("zip_b")[0].value.trim()))
        {
            document.getElementById("errorBox").style.display = "none";     
        }
        else
        {
            document.getElementsByName("zip_b")[0].focus();
            document.getElementById("errorBox").style.display = "block";
            document.getElementById("errorBox").innerHTML = "Please Enter the Valid Zip! Only numbers allowed!";
            return false;
        }   
    }

    //Validate Phone Number
    if (document.getElementsByName("phone_b")[0].value.trim() == "" || document.getElementsByName("phone_b")[0].value.trim().length != 12)
    {
        document.getElementsByName("phone_b")[0].focus();
        document.getElementById("errorBox").style.display = "block";
        document.getElementById("errorBox").innerHTML = "Please Enter the valid Phone!";
        return false;
    }
    else
    {
        var regexName=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(regexName.test(document.getElementsByName("phone_b")[0].value.trim()))
        {
            document.getElementById("errorBox").style.display = "none";  
              
        }
        else
        {
            document.getElementsByName("phone_b")[0].value.focus();
            document.getElementById("errorBox").style.display = "block";
            document.getElementById("errorBox").innerHTML = "Please Enter the Valid Phone! Only numbers allowed!";
            return false;
        }   
    }


     /* ---------- VALIDATING SHIPPING ADDRESS ------------- */


     //Validating First Name
    if (document.getElementsByName("fname_s")[0].value.trim() == "" || document.getElementsByName("fname_s")[0].value.trim().length == 0)
    {
        document.getElementsByName("fname_s")[0].focus();
        document.getElementById("errorBox").style.display = "block";
        document.getElementById("errorBox").innerHTML = "Please Enter the First Name! Minimum 1 letter!";
        return false;
    }
    else
    {
        document.getElementById("errorBox").style.display = "none";
    }

    //Validating Last Name
    if (document.getElementsByName("lname_s")[0].value.trim() == "" || document.getElementsByName("lname_s")[0].value.trim().length == 0)
    {
        document.getElementsByName("lname_s")[0].focus();
        document.getElementById("errorBox").style.display = "block";
        document.getElementById("errorBox").innerHTML = "Please Enter the Last Name! Minimum 1 letter!";
        return false;
    }
    else
    {
        document.getElementById("errorBox").style.display = "none";
    }

    //Validating Address 1
    if (document.getElementsByName("address1_s")[0].value.trim() == "" || document.getElementsByName("address1_s")[0].value.trim().length < 2)
    {
        document.getElementsByName("address1_s")[0].focus();
        document.getElementById("errorBox").style.display = "block";
        document.getElementById("errorBox").innerHTML = "Please Enter the Address! Minimum 2 letter!";
        return false;
    }
    else
    {
        document.getElementById("errorBox").style.display = "none";
    }

    //Validate State
    if (document.getElementsByName("state_s")[0].value == "none") {
        document.getElementsByName("state_s")[0].focus();
        document.getElementById("errorBox").style.display = "block";
        document.getElementById("errorBox").innerHTML = "Please select a state!";
        return false;
    }

//Validating City
   if (document.getElementsByName("city_s")[0].value.trim().length < 2) 
   {
        document.getElementsByName("city_s")[0].focus();
        document.getElementById("errorBox").style.display = "block";
        document.getElementById("errorBox").innerHTML = "Please enter a city! Minimum 2 letters!";
        return false;
    }   
   

    //Validate Zip
    if (document.getElementsByName("zip_s")[0].value.trim() == "" || document.getElementsByName("zip_s")[0].value.trim().length != 5)
    {
        document.getElementsByName("zip_s")[0].focus();
        document.getElementById("errorBox").style.display = "block";
        document.getElementById("errorBox").innerHTML = "Please Enter the Valid Zip! Exactly 5 digits!";
        return false;
    }
    else
    {
        var regexName=/^\d{5}$|^\d{5}-\d{4}$/;
        if(regexName.test(document.getElementsByName("zip_s")[0].value.trim()))
        {
            document.getElementById("errorBox").style.display = "none";     
        }
        else
        {
            document.getElementsByName("zip_s")[0].focus();
            document.getElementById("errorBox").style.display = "block";
            document.getElementById("errorBox").innerHTML = "Please Enter the Valid Zip! Only numbers allowed!";
            return false;
        }   
    }

    // //Validate Phone Number
    if (document.getElementsByName("phone_s")[0].value.trim() == "" || document.getElementsByName("phone_s")[0].value.trim().length != 12)
    {
        document.getElementsByName("phone_s")[0].focus();
        document.getElementById("errorBox").style.display = "block";
        document.getElementById("errorBox").innerHTML = "Please Enter the valid Phone!";
        return false;
    }
    else
    {
        var regexName=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(regexName.test(document.getElementsByName("phone_s")[0].value.trim()))
        {
            document.getElementById("errorBox").style.display = "none";  
              
        }
        else
        {   

            document.getElementsByName("phone_s")[0].value.focus();
            document.getElementById("errorBox").style.display = "block";
            document.getElementById("errorBox").innerHTML = "Please Enter the Valid Phone! Only numbers allowed!";
            return false;
        }   
    }

        /* ---------- VALIDATING PAYMENT DETAILS ------------- */

//Validating Payment Type Radio Button
//Getting value of Payment type Radio Button
var radioPayment = document.getElementsByName('payment_type');
var isPaymentTypeSelected = false;
for (var i = 0, length = radioPayment.length; i < length; i++) {
    if (radioPayment[i].checked) {
      
        isPaymentTypeSelected = true;
    }
}

    if (isPaymentTypeSelected == true) {
        document.getElementById("errorBox").style.display = "none";
    }
    else {
            scrollto();
            document.getElementsByName('payment_type')[0].focus();
            document.getElementById("errorBox").style.display = "block";
            document.getElementById("errorBox").innerHTML = "Please select the payment type!";
            return false;
        }

//Validate Card Number
    if (document.getElementsByName("card_number")[0].value.trim() == "" || document.getElementsByName("card_number")[0].value.trim().length < 12)
    {
        document.getElementsByName("card_number")[0].focus();
        document.getElementById("errorBox").style.display = "block";
        document.getElementById("errorBox").innerHTML = "Please Enter the Valid Card Number! It should be more than 12 digits!";
        return false;
    }
    else
    {
        
        var regexName = /^[0-9]/;
         var resultRegex = regexName.test(document.getElementsByName("card_number")[0].value.trim());
        //console.log(resultRegex);

        if (resultRegex == true) {
            document.getElementById("errorBox").style.display = "none";
        }
        else{
            document.getElementsByName("card_number")[0].focus();
            document.getElementById("errorBox").style.display = "block";
            document.getElementById("errorBox").innerHTML = "Please Enter the Valid Card Number! It should be more than 12 digits!";
            return false;
        }



        

    }

    //Validate Expiration Month
    if (document.getElementsByName("month_card")[0].value == "none") {
        document.getElementsByName("month_card")[0].focus();
        document.getElementById("errorBox").style.display = "block";
        document.getElementById("errorBox").innerHTML = "Please select a month!";
        return false;
    }

    //Validate Expiration Year
    if (document.getElementsByName("year_card")[0].value == "none") {
        document.getElementsByName("year_card")[0].focus();
        document.getElementById("errorBox").style.display = "block";
        document.getElementById("errorBox").innerHTML = "Please select an year!";
        return false;
    }

    return true;
}

//for scrolling to top - div
function scrollto() {
    var etop = $('#errorBox').offset().top;
    $("#dialog-modal").scrollTop(etop);
} 

//For address checkbox - shipping / billing
function addressCheckbox(isChecked){
    //Checked
    if (isChecked == true){
        //Putting all the values of billing to shipping address
        $('[name="fname_s"]').val($('[name="fname_b"]').val());
        $('[name="lname_s"]').val($('[name="lname_b"]').val());
        $('[name="address1_s"]').val($('[name="address1_b"]').val());
        $('[name="address2_s"]').val($('[name="address2_b"]').val());
        $('[name="state_s"]').val($('[name="state_b"]').val());
        $('[name="city_s"]').val($('[name="city_b"]').val());
        $('[name="zip_s"]').val($('[name="zip_b"]').val());
        $('[name="phone_s"]').val($('[name="phone_b"]').val());
   }
    //Unchecked
    else{
        //Clearing all the shipping values
        $('[name="fname_s"]').val("");
        $('[name="lname_s"]').val("");
        $('[name="address1_s"]').val("");
        $('[name="address2_s"]').val("");
        $('[name="state_s"]').val("CA");
        $('[name="city_s"]').val("");
        $('[name="zip_s"]').val("");
        $('[name="phone_s"]').val("");
    }
}
