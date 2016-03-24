function loadMenu()
{
	$.getJSON("http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllCategories&callback=?", function(result) {
		var categories = new Array();

		$("#menu").append("<li class='item'><a class='parent' href='./index.html'>Inicio</a> </li>");
		$("#menu-sf").append("<li class='item'><a class='parent' href='./index.html'>Inicio</a> </li>");
     
		$.each(result.categories, function () {
			var category = new Object();
			category.id = this.id;
			category.name = this.name;
			category.htmlid = category.id + category.name;
			var subcategories = new Array();

			$("#menu").append("<li id='" + category.htmlid + "'><a href='./product-list.html?categoryId=" + $.base64('encode', category.id) + "'>" + category.name + "</a>");
			$("#menu-sf").append("<li id='sf-" + category.htmlid + "' class='item'><a href='./product-list.html?categoryId=" + $.base64('encode', category.id) + "' class='parent'>" + category.name + "</a>");

			$.getJSON("http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllSubcategories&id=" + category.id + "&callback=?", function (result) {
			
				$("#" + category.htmlid).append("<ul id='ul" + category.htmlid + "'>");
				$("#sf-" + category.htmlid).append("<ul id='sf-ul" + category.htmlid + "'>");

			$.each(result.subcategories, function() {
				var subCategory = new Object();
				subCategory.id = this.id;
				subCategory.name = this.name;
				subcategories.push(subCategory);
				$("#ul" + category.htmlid).append("<li><a href='./product-list.html?subCategoryId=" + $.base64('encode', subCategory.id) + "'>" + subCategory.name + "</a></li>");
				$("#sf-ul" + category.htmlid).append("<li><a href='./product-list.html?subCategoryId=" + $.base64('encode', subCategory.id) + "'>" + subCategory.name + "</a></li>");
			});
				category.subcategories = subcategories;
				$("#" + category.htmlid).append("</ul>");
				$("#sf-" + category.htmlid).append("</ul>");
			});
			$("#menu").append("</li>");
			$("#menu-sf").append("</li>");
		});
	});
	$("#menu").append("<li id='menu-search'><form id='form-search' class='form-wrapper'><input type='text' id='txtSearch' placeholder='Calzado, Accesorios, Hombre, Mujer, ...' required=''><button id='btnSearch' >Buscar</button></form></li>");
	$("#menu-sf").append("<li id='menu-search'><form id='form-search-min' class='form-wrapper'><input type='text' id='txtSearchMin' placeholder='Calzado, Indumentaria, Accesorios, Hombre, Mujer ...' required=''><button id='btnSearchMin' >Buscar</button></form></li>");

	$("#form-search").submit(function (event)
	{
		event.preventDefault(); // Porque sino submitea al index (action)
		search("#txtSearch");
	});

	$("#form-search-min").submit(function (event)
	{
		event.preventDefault(); // Porque sino submitea al index (action)
		search("#txtSearchMin");
	});

	// Agregamos esto en el menu porque menu está siempre en todas las páginas. 
	// Para no tener que manejar siempre las promises

	var shoppingCart = $.session.get('shoppingCart');
	var total = 0;
	var qty = 0;
	if(shoppingCart !== undefined)
	{
		var productsCart = JSON.parse(shoppingCart);
		for(var key in productsCart)
		{
			var product = productsCart[key];
			var currentTotal = (parseInt(product["quantity"]) * parseInt(product["price"])).toFixed(2);
			qty = parseInt(qty) + parseInt(product["quantity"]);
			total = parseInt(currentTotal) + parseInt(total);
		}
	}
	$("#header-info-cart").append(qty + " item" + (qty > 1 ? "s " : " ") + " - $" + total);
	$("#shoppingCartTitle").append(" (" + qty + ")");
}