
function addProductToWishlist(productId)
{
	$.getJSON("http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetProductById&id=" + productId + "&callback=?", 
        function(result) {
			var wishList = $.session.get("wishList");
			var productWish = {
				id: result.product.id,
				name: result.product.name,
				price: result.product.price,
				image: result.product.imageUrl[0]
			};
			var wishl = {};
			var exists = false;
			var j = 0;
			if(wishList !== undefined)
			{
				var productsWish = JSON.parse(wishList);
				for(var key in productsWish)
				{
					wishl[j] = productsWish[key];
					if(wishl[j].productId == productWish.id)
					{
						exists = true;
					}
					j++;
				}
				if(!exists) {
					wishl[j] = productWish;
				}
			}
			else
			{
				wishl[j] = productWish;
			}
			$.session.set("wishList", JSON.stringify(wishl));
			window.location.href = "./wishlist.html";
    });
}

function removeProductToWishlist(productId)
{
	var wishList = $.session.get("wishList");
	var wishl = {};
	var j = 0;
	if(wishList !== undefined)
	{
		var productsWish = JSON.parse(wishList);
		for(var key in productsWish)
		{
			if(productsWish[key].id != productId)
			{
				wishl[j] = productsWish[key];
				j++;
			}
		}
	}
	$.session.set("wishList", JSON.stringify(wishl));
	window.location.href = "./wishlist.html";
}

function wishListToCart()
{
	var cart = {};
	var j = 0;
	var wishList = $.session.get("wishList");
	var shoppingCart = $.session.get("shoppingCart");
	if(shoppingCart !== undefined)
	{
		var productsCart = JSON.parse(shoppingCart);
		for(var key in productsCart)
		{
			cart[j] = productsCart[key];
			j++;	
		}
	}
	
	if(wishList !== undefined)
	{
		var productsWish = JSON.parse(wishList);
		for(var key in productsWish)
		{
			var product = productsWish[key];
			var productCart = {
				id: product.id,
				name: product.name,
				price: product.price,
				image: product.image,
				quantity: 1
			};
			var exists = false;
			for(var p = 0; p < j;p++)
			{
				if(cart[p].id == productCart.id)
				{
					exists = true;
				}
			}
			if(!exists)
			{
				cart[j] = productCart;
				j++;
			}
		}
	}
	$.session.remove("wishList");
	$.session.set("shoppingCart", JSON.stringify(cart));
	window.location.href = "./shopping-cart.html";
}

function getWishList()
{
	var wishList = $.session.get('wishList');
	var total = 0;
	if(wishList !== undefined)
	{
		var productsWish = JSON.parse(wishList);
		for(var key in productsWish)
		{
			var product = productsWish[key];
			var productURL = "./product.html?productId=" + $.base64('encode', product["id"]);
			$('#wishList-details').append("<tr class='first last odd' id='tr" + product["id"] + "'>");
                $("#tr" + product["id"]).append("<td><a class='product-image' href='" + product["image"] + "'><img src='" + product["image"] + "' class='shopping-cart-image' ></a></td>");
                $("#tr" + product["id"]).append("<td><h2 class='product-name'> <a href='" + productURL + "'>" + product["name"] + "</a> </h2></td>");                      
                $("#tr" + product["id"]).append("<td class='a-center'><span class='cart-price'> <span class='price'>$" + product["price"] + "</span> </span></td>");
                $("#tr" + product["id"]).append("<td class='a-center'><a href='#' productId='" + product["id"] + "' id='btnRemove" + product["id"] + "' title='Eliminar' class='btn-remove btn-remove2'><i class='icon-trash'></i></a></td>");
            $('#wishList-details').append("</tr>");
            $("#btnRemove" + product["id"]).click(function(){
                removeProductToWishlist($(this).attr("productId"));
            });
		}
	}   
}
