$(function() {

$.when(
	loadMenu())
	.done(
		function(result1, result2)
    	{
    		if($("#details"))
    		{
    			loadDetails();
    		}

    	}
    );


	function loadDetails()
	{
		var shoppingCart = $.session.get('shoppingCart');
		var total = 0;
		if(shoppingCart !== undefined)
		{
			var productsCart = JSON.parse(shoppingCart);
			for(var key in productsCart)
			{
				var product = productsCart[key];
				var currentTotal = (parseInt(product["quantity"]) * parseInt(product["price"])).toFixed(2);
				var productURL = "./product.html?productId=" + $.base64('encode', product["id"]);
				total = parseInt(currentTotal) + parseInt(total);
				$("#details").append("<tr class='first last odd'>");
					$("#details").append("<td><h3 class='product-name'>" + product["name"] + "</h3></td>");
        			$("#details").append("<td class='a-right'><span class='cart-price'> <span class='price'>$" + product["price"] + "</span> </span></td>");
        			$("#details").append("<td class='a-center'>" + product["quantity"] + "</td>");
        			$("#details").append("<td class='a-right last'><span class='cart-price'> <span class='price'>$" + currentTotal + "</span> </span></td>");
        		$("#details").append("</tr>");
			}
		}   
		$('#subtotalPrice').append(parseInt(total).toFixed(2));	
		$('#totalPrice').append(parseInt(total + 100).toFixed(2));
	}

});

function whatIsThis(){
	if($("#help-img").length == 0){
		$("#container-whatIsThis").append("<img id = 'help-img' src= 'images/cc_security_code.jpg'></img>");
	}
	return true;
}
/*
var myEl = document.getElementById('what-is-this');
myEl.addEventListener('click', function() {
    alert("Hello world");
}, false);
*/
$('#what-is-this').addEventListener('click',function(){
alert( "click" );
});


