function userLogged()
{
	return $.session.get("user") != undefined;
}

function getUser()
{
	if(userLogged())
	{
		return JSON.parse($.session.get("user"));		
	}
	return undefined;
}

$(function() {

	function logIn(result)
	{
		var user = {
			token: result.authenticationToken,
			account: result.account
		}
		$.session.set("user", JSON.stringify(user));
		changeHeader();
	}

	function logOut()
	{
		var user = JSON.parse($.session.get("user"));
		$.getJSON("http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=SignOut&username=" + 
			user.account.username + "&authentication_token=" + user.token + "&callback=?", function(result) {
				if(result.error === undefined)
				{
					$.session.clear();
					changeHeader();
				}
		});
	}

	function changeHeader()
	{
		var u = $.session.get("user");
		if(u === undefined)
		{
			$("#li-registro").removeClass("invisible");
			$("#li-login").removeClass("invisible");	
			$("#li-user").addClass("invisible");
			$("#li-logout").addClass("invisible");
		}
		else
		{
			$("#li-registro").addClass("invisible");
			$("#li-login").addClass("invisible");
			$("#li-user").removeClass("invisible");
			$("#li-logout").removeClass("invisible");
			$("#usernameDesc").html(JSON.parse(u).account.username.toUpperCase());
		}
	}

	$("#li-logout").click(function(){
		logOut();
	});

	$("#btnLogin").click(function(){
		if($("#login-form-header").valid()){
			$.getJSON("http://eiffel.itba.edu.ar/hci/service3/Account.groovy?method=SignIn&username=" + $("#username").val() + "&password=" + $("#password").val() + "&callback=?", function(result) {
				if(result.error === undefined)
				{
					logIn(result);
				}
				else
				{
					alert("ERROR");
				}
			});
		}
	});

	$("#login-form-header").validate({
		rules: {username: {
				required: true,
				minlength: 6,
				maxlength: 15
			},
			password: {
				required: true,
				minlength: 8,
				maxlength: 15
			}
		},
		messages: {
			username: {
				required: "Requerido",
				minlength: "El nombre de usuario debe tener al menos 6 caracteres.",
				maxlength: "El nombre de usuario debe tener menos de 15 caracteres."
			},
			password: {
				required: "Requerido",
				minlength: "La clave debe tener al menos 8 caracteres.",
				maxlength: "La clave debe tener menos de 15 caracteres."
			}
		}
	});

	changeHeader();
});