function login(regID){
	alert(regID);
	loading.startLoading();
	var username=$("#username").val();
    var password=$("#pwd").val();
    //alert("check internet");
	if(navigator.network.connection.type == Connection.NONE){
		//alert("no internet yo");
        navigator.notification.alert("No internet connection.", function(){}, "Mewah Group", "Ok");
		loading.endLoading();
	}else{
		//alert("get devicce yo");
		GetDeviceInfo(regID, username, password);
	}
}

