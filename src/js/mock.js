function mock()
{

	$(function() {
		
		$.getJSON("http://hci.apiary-mock.com/hci/service3/Common.groovy?method=GetAllStates", function(result) {
				alert(result["states"][2].name);
			}
			);
		
	});

}