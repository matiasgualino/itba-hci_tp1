
$(function() {
	$("#date").mask("99/99/9999");
	$("#email").blur(function(){
		$("#usernameReg").val($("#email").val().split("@")[0]);
	});

	var checkout = parseQueryString().get("checkout");
	
	$("#btnRegister").click(function(){
		if($("#register-form").valid()){
			var date = $("#date").val().split('/');
			var account = {	
				"username":$("#usernameReg").val(),
				"password":$("#passwordReg").val(),
				"firstName":$("#firstname").val(),
				"lastName":$("#lastname").val(),
				"gender":$("#genero").val()[0],
				"identityCard":$("#dni").val(),
				"email":$("#email").val(),
				"birthDate":date[2] + "-" + date[1] + "-" + date[0]
			}; 

			$.getJSON("http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=CreateAccount&account=" + JSON.stringify(account) + "&callback=?", function(result) {
				if(result.error === undefined)
				{
					$("#page").append("<div id='no_script_msg'>" + 
			    		"<p> El registro se ha completado satisfactoriamente. <br />Será redireccionado al " + (checkout === undefined ? "inicio" : " paso siguiente") + " en 5 segundos. <br />Cuando lo desee, podrá iniciar sesión.</p> </div>");
					
					window.setTimeout(function(){
			        	window.location.href = (checkout === undefined ? "./index.html" : "./checkout-step2.html");
			    	}, 5000);
				}
			});
		}
	});

  	$.validator.addMethod("anyDate",
    	function(value, element) {
        	return value.match(/^(0?[1-9]|[12][0-9]|3[0-2])[\/](0?[1-9]|1[0-2])[\/](19|20)?\d{2}$/);
    	},
    	""
	);

  	$.validator.addMethod("anyGenero",
    	function(value, element) {
        	return value != '0'
    	},
    	""
	);

	$("#register-form").validate({
		rules: {
			firstname: {
				required: true,
				maxlength: 80
			},
			lastname: {
				required: true,
				maxlength: 80
			},
			usernameReg: {
				required: true,
				minlength: 6,
				maxlength: 15
			},
			password: {
				required: true,
				minlength: 8,
				maxlength: 15
			},
			confirm_password: {
				required: true,
				minlength: 8,
				maxlength: 15,
				equalTo: "#passwordReg"
			},
			email: {
				required: true,
				email: true,
				maxlength: 128
			},
			genero: {
				required: true,
				anyGenero: true
			},
			dni: {
				required: true,
				maxlength: 10
			},
			date: {
				required: true,
				anyDate: true
			},
		},
		messages: {
			firstname: {
				required: "Requerido",
				maxlength: "El nombre debe tener menos de 80 caracteres."
			},
			lastname: {
				required: "Requerido",
				maxlength: "El apellido debe tener menos de 80 caracteres."
			},
			usernameReg: {
				required: "Requerido",
				minlength: "El nombre de usuario debe tener al menos 6 caracteres.",
				maxlength: "El nombre de usuario debe tener menos de 15 caracteres."
			},
			password: {
				required: "Requerido",
				minlength: "La clave debe tener al menos 8 caracteres.",
				maxlength: "La clave debe tener menos de 15 caracteres."
			},
			confirm_password: {
				required: "Requerido",
				minlength: "La clave debe tener al menos 8 caracteres.",
				maxlength: "La clave debe tener menos de 15 caracteres.",
				equalTo: "Las claves no coinciden."
			},
			email: {
				required: "Requerido",
				maxlength: "El email debe tener menos de 128 caracteres.",
				email: "No es un email valido."
			},
			genero: {
				required: "Requerido"
			},
			dni: {
				required: "Requerido",
				maxlength: "El DNI debe tener menos de 10 caracteres."
			},
			date: {
				required: "Requerido",
				anyDate: "El formato de fecha no es correcto. DD/MM/AAAA"
			}
		}
	});
});