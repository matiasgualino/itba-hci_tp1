
	function Map() {
		this.keys = new Array();
		this.data = new Object();

		this.put = function(key, value) {
		    if(this.data[key] == null){
		        this.keys.push(key);
		    }
		    this.data[key] = value;
		};

		this.get = function(key) {
		    return this.data[key];
		};

		this.remove = function(key) {
		    this.keys.remove(key);
		    this.data[key] = null;
		};

		this.each = function(fn){
		    if(typeof fn != 'function'){
		        return;
		    }
		    var len = this.keys.length;
		    for(var i=0;i<len;i++){
		        var k = this.keys[i];
		        fn(k,this.data[k],i);
		    }
		};

		this.entrys = function() {
		    var len = this.keys.length;
		    var entrys = new Array(len);
		    for (var i = 0; i < len; i++) {
		        entrys[i] = {
		            key : this.keys[i],
		            value : this.data[i]
		        };
		    }
		    return entrys;
		};

		this.isEmpty = function() {
		    return this.keys.length == 0;
		};

		this.size = function(){
		    return this.keys.length;
		};
	}

	function parseQueryString() {
	    var query = (window.location.search || '?').substr(1),
	    map = new Map();
	    query.replace(/([^&=]+)=?([^&]*)(?:&+|$)/g, function(match, key, value) {
	        map.put(key, value);
	    });
	    return map;
	}

function toIndex() {
	window.location.href = "./index.html";
}

function toCheckout(step) {

	if(step == 2){
		if(document.getElementById('login:usuario').checked){
			window.location.href = "./register.html?checkout=true";
		}
	}

	else if(step == 7)
	{
		alert("Felicitaciones, realizaste la compra correctamente.");
		$.session.remove("shoppingCart");
		window.location.href = "./index.html";
	}
	else
	{
		window.location.href = "./checkout-step" + step + ".html";
	}
}


function search(id)
{
	window.location.href = "./product-list.html?txtSearch=" + $(id).val();
}