$(function() {

$.when(
	loadMenu(),
	loadProductsByCategoryId(1, 8, -1, 'productos-destacados'),
    loadProductsByCategoryId(2, 8, -1, 'ofertas-novedades'))
	.done(
		function(result1, result2, result3)
    	{
        	initializeCarrousel('productos-destacados');
        	initializeCarrousel('ofertas-novedades');
        	$(".fa-search-btn").prettyPhoto();
            $("#femenino").append("<h3><a href='./product-list.html?subCategoryId=" + $.base64('encode', '10') + "'>&gt;Femenino&lt;</a></h3>");
            $("#masculino").append("<h3><a href='./product-list.html?subCategoryId=" + $.base64('encode', '19') + "'>&gt;Masculino&lt;</a></h3>");
            $("#moda").append("<h3><a href='./product-list.html?categoryId=" + $.base64('encode', '3') + "'>&gt;Moda & Accesorios&lt;</a></h3>");


    	}
    );
});