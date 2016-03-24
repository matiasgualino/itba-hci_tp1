function getHTMLProduct(product, type, first, last)
{
    var typeHTML = 1;
    var productURL = "./product.html?productId=" + $.base64('encode', product.id);
    if(type > 0) 
    {
            typeHTML = type;
    }
    else 
    {
        typeHTML = Math.floor(Math.random() * 4) + 1;
    }
    switch(typeHTML)
    {
        case 1: // PRECIO FIJO
            return "<li class='item " + ((first ? "first" : "") || (last ? "last" : "")) + "'>" +
                "<div class='top-grid-content-left'>$" + product.price + "</div>" +
                "<div class='grid-box '>" +
                "    <h2 class='product-name'> <a title='" + product.name + "' href='" + productURL + "'>" + product.name + "</a> </h2>" +
                "</div>" +
                "<a class='fa-search-btn ' href='" + product.imageUrl[0] + "'> <i class='icon-search first-bg'></i></a> " +
                "<a class='product-image' title='" + product.name + "' href='" + productURL + "'> <img src='" + product.imageUrl[0] + "'  alt='product'> </a>" +
                "<div class='actions'>" +
                "   <a class='btn-circle first-bg btn-active' href='" + productURL + "'>" +
                "   Comprar <i class='icon-shopping-cart'></i> </a> " +
                "   <a id='btnWish" + product.id + "' productId='" + product.id + "' class='btn-circle first-bg-hover'> <i class='icon-heart'></i> </a> " +
                "</div>" +
                "</li>";
            break;
        case 2: // OFERTA
            return "<li class='item " + (first ? "first" : "") + "'>" +
                "<div class='grid-box'>" +
                "<h2 class='product-name'> <a title='" + product.name + "' href='" + productURL + "'>" + product.name + "</a> </h2>" +
                "<div class='price-box'>" +
                "  <p class='old-price'> <span  class='price'> $ " + (product.price*1.25).toFixed(2) + " </span> </p>" +
                "  <p class='special-price'> <span  class='price'> $ " + product.price + " </span> </p>" +
                "</div>" +
                "</div>" +
                "<a class='fa-search-btn ' href='" + product.imageUrl[0] + "'> <i class='icon-search first-bg'></i></a> " +
                "<a class='product-image' title='" + product.name + "' href='" + productURL + "'> <img src='" + product.imageUrl[0] + "'  alt='product'> " +
                "<span class='label-product label-top-right sale-label' >OFERTA</span> </a>" +
                "<div class='actions'>" +
                "    <a class='btn-circle first-bg btn-active' href='" + productURL + "'>" +
                "        Comprar<i class='icon-shopping-cart'></i> </a> " +
                "    <a id='btnWish" + product.id + "' productId='" + product.id + "' class='btn-circle first-bg-hover'> " +
                "        <i class='icon-heart'></i> </a> " +
                "</div>" +
                "</li>";
            break;
        case 3: // NUEVO
            return "<li class='item " + (first ? "first" : "") + "'>" +
                "<div class='grid-box'>" +
                "<h2 class='product-name'> <a title='" + product.name + "' href='" + productURL + "'>" + product.name + "</a> </h2>" +
                "<h2 class='product-price'>$" + product.price + "</h2>" +
                "</div>" +
                "<a class='fa-search-btn ' href='" + product.imageUrl[0] + "'> <i class='icon-search first-bg'></i></a> " +
                "<a class='product-image' title='" + product.name + "' href='" + productURL + "'> <img src='" + product.imageUrl[0] + "'  alt='product'> " +
                "<span class='label-product label-top-left fifth-bg' >Nuevo</span> </a>" +
                "<div class='actions'>" +
                "    <a class='btn-circle first-bg btn-active' href='" + productURL + "'>" +
                "    Comprar<i class='icon-shopping-cart'></i> </a> " +
                "    <a id='btnWish" + product.id + "' productId='" + product.id + "' class='btn-circle first-bg-hover'> <i class='icon-heart'></i> </a> " +
                "</div>" +
                "</li>";
            break;
        case 4: // RATING
            var randomRating = Math.floor(Math.random() * 101).toFixed(2);
            var randomReviews = Math.floor(Math.random() * 10).toFixed(0);
            return "<li class='item " + (first ? "first" : "") + "'>" +
                "<div class='top-grid-content-left'>$" + product.price + "</div>" +
                "<div class='grid-box'>" +
                "<h2 class='product-name'> <a title='" + product.name + "' href='" + productURL + "'>" + product.name + "</a> </h2>" +
                "<div class='ratings'>" +
                "  <div class='rating-box'>" +
                "    <div style='width:" + randomRating +"%' class='rating'></div>" +
                "  </div>" +
                "  <span class='amount'><a href='#'>" + randomReviews + (randomReviews != 1 ? " Calificaciones" : " Calificacion") + " </a></span> </div>" +
                "</div>" +
                "<a class='fa-search-btn ' href='" + product.imageUrl[0] + "'> <i class='icon-search first-bg'></i></a> " +
                "<a class='product-image' title='" + product.name + "' href='" + productURL + "'> <img src='" + product.imageUrl[0] + "'  alt='product'> </a>" +
                "<div class='actions'>" +
                "<a class='btn-circle first-bg btn-active' href='" + productURL + "'>" +
                "Comprar<i class='icon-shopping-cart'></i> </a> " +
                "<a id='btnWish" + product.id + "' productId='" + product.id + "' class='btn-circle first-bg-hover'> <i class='icon-heart'></i> </a> " +
                "</li>";
            break;
    }
}

function loadProductsByCategoryId(categoryId, limit, typeHTML, htmlID)
{   
    var deferred = new jQuery.Deferred();

    $.getJSON("http://eiffel.itba.edu.ar/hci/service3/Catalog.groovy?method=GetProductsByCategoryId&id=" + categoryId + "&sort_order=desc&page_size=" + limit + "&callback=?", 
        function(result) {
            var products = result.products;
            var html = '';
            for(var i = 0; i < products.length; i++)
            {
                var p = products[i];
                $("#" + htmlID).append(getHTMLProduct(products[i], typeHTML, false));
                $("#btnWish" + p.id).click(function(p){
                    addProductToWishlist($(this).attr("productId"));
                });
            }
            deferred.resolve();
        },
        function(error){
            deferred.reject(error);
        }
    );

    return deferred.promise();
    
}

function initializeCarrousel(htmlID) {
    var WidthCarousel = $(window).width();
    if (WidthCarousel > 800) {
        $('#' + htmlID).bxSlider({
            slideWidth: 270,
            adaptiveHeight: true,
            minSlides: 4,
            maxSlides: 4,
            slideMargin: 18,
            speed: 2000
        });
    } else {
        $('#' + htmlID).bxSlider({});
    }
}