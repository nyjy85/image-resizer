function getImgSrc(){
	$.ajax({
		type: 'GET', 
		url: '/', 
		success: function(responseData){
			console.log(responseData)
		}
	})
}