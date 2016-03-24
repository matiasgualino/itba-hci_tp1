$(function(){

	function loadData()
	{
		var user = getUser();
		if(user != undefined)
		{
			$("#names").val(user.account.lastName + ", " + user.account.firstName);	
			$("#email").val(user.account.email);
			$("#dni").val(user.account.identityCard);
			$("#genero").val(user.account.gender == "M" ? "Masculino" : "Femenino");
			$("#usernameReg").val(user.account.username);	
			var d = user.account.birthDate.split('-');
			$("#date").val(d[2] + "/" + d[1] + "/" + d[0]);	

			$.getJSON("http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=GetAllAddresses&username=" + 
			user.account.username + "&authentication_token=" + user.token + "&callback=?", function(result) {
				for(var i = 0; i < result.total; i++) {
					$("#addresses-details").append("<tr id='add" + i + "'>");
					$("#add" + i).append("<td>" + result.addresses[i].name + "</td>");
					$("#add" + i).append("<td>" + result.addresses[i].street + " " + result.addresses[i].number + " - CP: " + result.addresses[i].zipCode + "</td>");
					$("#add" + i).append("<td>" + result.addresses[i].province + "</td>");
					$("#add" + i).append("<td>" + result.addresses[i].phoneNumber + "</td>");
					$("#addresses-details").append("</tr>");
				}
			});
		}
	}

	$("#btnChangePassword").click(function(){
		if($("#changePassword-form").valid()){
			$.getJSON("http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=ChangePassword&username=" + $("#usernameCHP").val() +
				"&password=" + $("#passwordCHP").val() + "&new_password=" + $("#new_passwordCHP").val() + "&callback=?", function(result) {
					if(result.error === undefined)
					{
						$("#page").append("<div id='no_script_msg'>" + 
			    		"<p> El cambio de clave se ha completado satisfactoriamente.</p><p>Refrescando la pagina...</p></div>");
			    		window.setTimeout(function(){
			        	window.location.href = "./userAccount.html";
			    	}, 3000);
					
					}
			});
		}
	});

	$("#btnAddAddress").click(function(){
		if($("#addresses-form").valid()){
			var user = getUser();
			var address = {
				"name":$("#addressName").val(),
				"street":$("#addressStreet").val(),
				"number":$("#addressNumber").val(),
				"province":$("#region_id").val()[0],
				"zipCode":$("#zip").val(),
				"phoneNumber":$("#phone").val()
			};
			$.getJSON("http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=CreateAddress&username=" + user.account.username + 
				"&authentication_token=" + user.token + "&address=" + JSON.stringify(address) + "&callback=?", function(result) {

				if(result.error === undefined)
				{
		        	window.location.href = "./userAccount.html";
				}
			});
		}
	});

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

$("#changePassword-form").validate({
		rules: {
			usernameCHP: {
				required: true,
				minlength: 6,
				maxlength: 15
			},
			passwordCHP: {
				required: true,
				minlength: 8,
				maxlength: 15
			},
			new_passwordCHP: {
				required: true,
				minlength: 8,
				maxlength: 15
			}
		},
		messages: {
			usernameCHP: {
				required: "Requerido",
				minlength: "El nombre de usuario debe tener al menos 6 caracteres.",
				maxlength: "El nombre de usuario debe tener menos de 15 caracteres."
			},
			passwordCHP: {
				required: "Requerido",
				minlength: "La clave debe tener al menos 8 caracteres.",
				maxlength: "La clave debe tener menos de 15 caracteres."
			},
			new_passwordCHP: {
				required: "Requerido",
				minlength: "La clave debe tener al menos 8 caracteres.",
				maxlength: "La clave debe tener menos de 15 caracteres."
			}
		}
	});

$("#addresses-form").validate({
		rules: {
			addressName: {
				required: true,
				maxlength: 80
			},
			addressStreet: {
				required: true,
				maxlength: 80
			},
			addressNumber: {
				required: true,
				maxlength: 6
			},
			zip: {
				required: true,
				maxlength: 10
			},
			phone: {
				required: true,
				maxlength: 25
			}
		},
		messages: {
			addressName: {
				required: "Requerido",
				maxlength: "El nombre debe tener menos de 80 caracteres."
			},
			addressStreet: {
				required: "Requerido",
				maxlength: "La calle debe tener menos de 80 caracteres."
			},
			addressNumber: {
				required: "Requerido",
				maxlength: "El numero debe tener menos de 6 caracteres."
			},
			zip: {
				required: "Requerido",
				maxlength: "El codigo postal debe tener menos de 10 caracteres."
			},
			phone: {
				required: "Requerido",
				maxlength: "El telefono debe tener menos de 25 caracteres."
			}
		}
	});

	loadData();
	loadCountriesAndCities();

});