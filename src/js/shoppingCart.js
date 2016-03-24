$(function() {

$.when(
	loadMenu(),
    loadCountriesAndCities(),
	loadShoppingCart())
	.done(
		function(result1, result2)
    	{
    	}
    );

    function loadShoppingCart()
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
				$('#shoppingCart-details').append("<tr class='first last odd' id='tr" + product["id"] + "'>");
                    $("#tr" + product["id"]).append("<td><a class='product-image' href='" + product["image"] + "'><img src='" + product["image"] + "' class='shopping-cart-image' ></a></td>");
                    $("#tr" + product["id"]).append("<td><h2 class='product-name'> <a href='" + productURL + "'>" + product["name"] + "</a> </h2></td>");                      
                    $("#tr" + product["id"]).append("<td class='a-center'><span class='cart-price'> <span class='price'>$" + product["price"] + "</span> </span></td>");
                    $("#tr" + product["id"]).append("<td class='a-center'><span class='input-qty-box'> <span class='price'>" + parseInt(product["quantity"]) + "</span> </span></td>");
                    $("#tr" + product["id"]).append("<td class='a-center'><span class='cart-price'> <span class='price'>$" + currentTotal + "</span> </span></td>");
                    $("#tr" + product["id"]).append("<td class='a-center'><a href='#' productId='" + product["id"] + "' id='btnRemove" + product["id"] + "' title='Eliminar' class='btn-remove btn-remove2'><i class='icon-trash'></i></a></td>");
                $("#tr" + product["id"]).append("</tr>");
                $("#btnRemove" + product["id"]).click(function(){
                    removeItemCart($(this).attr("productId"));
                });
			}
		}   
		$('#totalPrice').append(parseInt(total).toFixed(2));
		$('#subtotalPrice').append(parseInt(total).toFixed(2));	
    }
	
function removeItemCart(productId)
{
    var shoppingCart = $.session.get('shoppingCart');
    var productsCart = JSON.parse(shoppingCart);
    var news = {};
    var i = 0;
    for(var key in productsCart)
    {
        var product = productsCart[key];
        if(product["id"] != productId)
        {
            news[i] = product;
            i++;
        }
    }
    $.session.set('shoppingCart', JSON.stringify(news));
    window.location.href = "./shopping-cart.html";
}

    function loadCountriesAndCities()
    {

        $.getJSON("http://eiffel.itba.edu.ar/hci/service3/Common.groovy?method=GetAllStates&callback=?",
            function(result) {
                var states = result.states;
                
                var texto = "<option value=''>-- Selecciona tu provincia --</option>";

                for(var i = 0; i < states.length; i++)
                {
                    texto += "<option value=" + states[i].name +">" + states[i].name + "</option>";
                }
                
                $("#region_id").append(texto);

            }
        );
    }
});