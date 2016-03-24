var page_size = 4;
<<<<<<< HEAD
var gridType = false;
=======
>>>>>>> 869e8affd50d25b95a6e32b3a3b1fe69ea129526
$(function() {
	var paramsMap = parseQueryString();
	var txtSearch = paramsMap.get("txtSearch");
	var categoryId = paramsMap.get("categoryId");
	var subCategoryId = paramsMap.get("subCategoryId");
	
$.when(
	loadMenu(),
	loadProducts(false, txtSearch, categoryId, subCategoryId),
	loadFilters())
	.done(
		function(result1, result2, result3)
    	{
        	$("#list").click(
        		function()
        		{
        			loadProducts(false, txtSearch, categoryId, subCategoryId);
        	});
        	$("#grid").click(
        		function()
        		{
        			loadProducts(true, txtSearch, categoryId, subCategoryId);
        	});
    	}
    );
	
$("#cantPagina").change(function(){
  			page_size = $(this).val();
  			loadProducts(gridType, txtSearch, categoryId, subCategoryId);
  		});

	function loadProducts(grid, txtSearch, categoryId, subCategoryId)
	{
<<<<<<< HEAD
		$("#breadcrumbs-two").empty();
		if(txtSearch != undefined)
		{
			var words = txtSearch.split(' ');
			$("#breadcrumbs-two").append("<li><a href='./index.html'>Inicio</a></li>");
			$("#breadcrumbs-two").append("<li><a href='#'>" + txtSearch + "</a></li>");
			$.when(cat(words)).done(function(catId){
				if(catId != undefined)
				{
					loadProductsSubCat(catId, undefined);
				}
				else
				{
					$.when(productname(words)).done(function(products){
							pushProducts(products, grid);
					});
				}
			});
		}
		else
		{
			loadProductsSubCat(categoryId, subCategoryId, grid);
		}
	}

	function productname(words)
	{
		var deferred = new jQuery.Deferred();
		for(var j = 0; j < words.length;j++) {
			$.getJSON("http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetProductsByName&name=" + words[j] + "&callback=?", 
				function(result)
				{
						deferred.resolve(result.products);
				}
			);
		}
		return deferred.promise();
	}

	function cat(words){
		var deferred = new jQuery.Deferred();
		$.getJSON("http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetAllCategories&callback=?", 
				function(result)
				{
					var exists = false;
					for(var i = 0; i < result.categories.length && !exists;i++)
					{
						for(var j = 0; j < words.length && !exists;j++)
						{
							if(result.categories[i].name.toUpperCase().indexOf(words[j].toUpperCase()) != -1)
							{
								deferred.resolve($.base64('encode', result.categories[i].id));
								exists = true;
							}
						}
					}
					if(!exists)
					{
						deferred.resolve(undefined);
					}
				}
			);
		return deferred.promise();
	}

	function loadProductsSubCat(categoryId, subCategoryId, grid)
	{
		$("#breadcrumbs-two").append("<li><a href='./index.html'>Inicio</a></li>");
=======
  		$("#cantPagina").change(function(){
  			page_size = $(this).val();
  			loadProducts(grid);

  		});

		var html = "<p class='bold big error textCenter center'>No hay productos en la API para la categoria seleccionada</p>";
		$("#toolbar-list").hide();
	    $("#pagination-list").hide();
		$("#products-list").empty();
		$("#products-list").empty();
		var queryParams = parseQueryString();
		queryParams.each(
		function(key, value, pos)
		{
			
>>>>>>> 869e8affd50d25b95a6e32b3a3b1fe69ea129526
			var url = "http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetProductsBy";
			var id = 0;
			if(subCategoryId != undefined)
			{
				id = $.base64('decode', subCategoryId);
				url += "Subc";
				$.getJSON("http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetSubcategoryById&id=" + id + "&callback=?", 
			        function(result) {
			        	if(result.error === undefined)
			        	{
							$("#breadcrumbs-two").append("<li><a href='./product-list.html?categoryId=" + $.base64('encode', result.subcategory.category.id) + "'>" + result.subcategory.category.name + "</a></li>");
			        		$("#breadcrumbs-two").append("<li><a href='./product-list.html?subCategoryId=" + $.base64('encode', result.subcategory.id) + "'>" + result.subcategory.name + "</a></li>");
			        	}
			        }
			    );
			}
			else if(categoryId != undefined)
			{
				id = $.base64('decode', categoryId);
				url += "C";
				$.getJSON("http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetCategoryById&id=" + id + "&callback=?", 
			        function(result) {
			        	if(result.error === undefined)
			        	{
			        		$("#breadcrumbs-two").append("<li><a href='./product-list.html?categoryId=" + $.base64('encode', result.category.id) + "'>" + result.category.name + "</a></li>");
			        	}
			        }
			    );
			}

			url += "ategoryId&id=" + id;

<<<<<<< HEAD
			$.getJSON(url + "&page_size=" + page_size + "&sort_order=desc&callback=?", 
=======
			$.getJSON(url +"&page=1" +"&page_size="+page_size+"&sort_order=desc&callback=?",  //Cambiar la cantidad por pagina y la pagina que estoy
>>>>>>> 869e8affd50d25b95a6e32b3a3b1fe69ea129526
		        function(result) {
		            pushProducts(result.products, grid);
		        }
		    );
	}

	function pushProducts(products, grid)
	{
		gridType = grid;
		var html = "<p class='bold big error textCenter center'>No hay productos en la API para la categoria seleccionada</p>";
		$("#toolbar-list").hide();
	    $("#pagination-list").hide();
		$("#products-list").empty();
		$("#products-grid-list").empty();
		if(products != undefined && products.length > 0) 
    	{
    		html = '';
    		$("#toolbar-list").show();
    		$("#pagination-list").show();
            for(var i = 0; i < products.length; i++)
            {
            	if(grid)
            	{
            		if((i%3) == 0)
	            	{
	            		if(i > 0) html += "</ul>";
	            		html += "<ul class='products-grid' >";
	            	}
	            	if((i%3) == 2)
	            	{
<<<<<<< HEAD
						html += getHTMLProduct(products[i], 1, false, true);
	            	}
	            	else
	            	{
						html += getHTMLProduct(products[i], 1, false, false);
=======
		            	$("#products-list").hide();
		            	$("#products-list").empty();	
		            	$("#products-grid-list").append(html);	
		            	$("#products-grid-list").show();
	            	}
	            	else
	            	{
	            		$("#products-list").empty();	
	            		$("#products-list").append("<ol class='products-list' >" + html + "</ol>");
	            		$("#products-list").show();
	            		$("#products-grid-list").hide();
>>>>>>> 869e8affd50d25b95a6e32b3a3b1fe69ea129526
	            	}
            	}
            	else
            	{
					html += "<li class='item '> <a href='product.html?productId=" + $.base64('encode', products[i].id) + "' class='product-image' > " +
            		"<img alt='product' src='" + products[i].imageUrl[0] + "'></a>" +
					"<div class='product-shop'>" + 
					"<div class='no-fix'>" +
					"<h2 class='product-name'><a href='product.html?productId=" + $.base64('encode', products[i].id) + "' >" + products[i].name + "</a></h2>" +
					"<div class='price-box'> <span class='regular-price' >" +
					"<span class='price'>" + products[i].price + "</span> </span> </div>" +
					" <div class='ratings'> " +
						" <div class='rating-box'> " +
					" <div class='rating' style='width:" + Math.floor(Math.random() * 101) + "%'></div> " +
					" </div> " + " </div> " +
					" <div class='btn-set'> " +
					" <div class='actions'><a class='btn-circle first-bg btn-active' href='./product.html?productId=" + $.base64('encode', products[i].id) + "'> " +
					"Comprar <i class='icon-shopping-cart'></i> </a> <a id='btnWish" + products[i].id + "' productId='" + products[i].id + "' class='btn-circle first-bg-hover'> " +
					" <i class='icon-heart'></i> </a>  " +
					" </div>" + " </div> " + " <br><hr> " +
					"<div class='desc std'> Los productos no tienen comentarios en la API. </div> " +
					"</div> " + " </div> " + "</li>";
            	}
            }
        }
    	if(grid)
    	{
        	$("#products-list").hide();
        	$("#products-list").empty();
        	$("#products-grid-list").append(html);	
        	$("#products-grid-list").show();
    	}
    	else
    	{
    		$("#products-grid-list").empty();
    		$("#products-grid-list").hide();
    		$("#products-list").append("<ol class='products-list' >" + html + "</ol>");
    		$("#products-list").show();
    	}
    	for(var j = 0; j < products.length; j++) {
    		var p = products[j];
			$("#btnWish" + p.id).click(function(p){
				addProductToWishlist($(this).attr("productId"));
		    });
    	}
	}

	function loadFilters(){
		$.getJSON("http://eiffel.itba.edu.ar/hci/service3/Common.groovy?method=GetAllAttributes&callback=?", 
			function(result){
				
				var attributes = result.attributes;

				for(var i = 0; i < attributes.length; i++){

					loadAttribute(attributes[i].id, attributes[i].name);/*
					if(attributes[i].name == "Color"){
						loadColors(attributes[i].id);
					}

					if(attributes[i].name == "Marca"){
						loadBrands(attributes[i].id);
					}

					if(attributes[i].name == "Genero"){
						loadGender(attributes[i].id);
					}*/
				}

			}
			);
	}

	function loadAttribute(id, name){
		$.getJSON("http://eiffel.itba.edu.ar/hci/service3/Common.groovy?method=GetAttributeById&id="+ id +"&callback=?", 
			function(result){
				
				var values = result.attribute.values;
				var text = "<label>" + name + ": </label><br/>";
				text += "<select class='required-entry validate-select' id='"+ name +"' name='"+ name +"' title='"+ name +"'>";
				text += "<option value=" + name +">Seleccionar " + name + "</option>";
				
				for(var j = 0; j < values.length; j++){
					text += "<option value=" + values[j] +">" + values[j] + "</option>";
				}

				text += "</select>";
				$("#"+name).append(text);
			}
		);
	}

});