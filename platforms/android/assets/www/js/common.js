//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//page loading

var loading = {
    
    //add loading page when calll
    startLoading:function(){
        $(".app").prepend("<div class='loadingPage'><div class='loadingFrame'><img class='loadingIcon' src='img/loading_large.gif'></img></div></div>");
    },
    
    //remove loading page when call
    endLoading:function(){
        $(".loadingPage").remove();
    }
};

//------------------------------------------------------------------------
//------------------------------------------------------------------------



function onPrompt(results) {
    if(results==2)
    {
        window.location="index.html";
    }
}

function onConfirm(button) {
	if(button==2){//If User selected No, then we just do nothing
		return;
     }else if(button==1){
		navigator.app.exitApp();// Otherwise we quit the app.
	}
}

function closeMenu(){
	navigator.notification.confirm("Are you sure you want to exit ?", onConfirm, "Confirmation", "Yes,No");     
            								   
}

function closeLeave(){
    //alert("yeah");
	//history.go(0);
	window.history.back();
}

function setcopyrighttext(){
	document.getElementById("crtext").innerHTML = "Copyright 2016-2020 Mewah Group";       								   
}



//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
var db;

var dbmanager = {
    initdb:function(){
        db = window.openDatabase("Database", "1.0", "MewahGroup", 200000);
    },
    
    createTable:function(){
        db.transaction(createTableTransaction, this.errorExecuteSQL, this.successExecuteSQL);
        
        function createTableTransaction(t){
            t.executeSql('CREATE TABLE IF NOT EXISTS userprofile (userid text, password text)');

        }
    },
    
    getProfile:function(returnData){
        db.transaction(function(tx){
            tx.executeSql('SELECT * FROM userprofile', [], function(tx, rs){
                returnData(rs);
          }, this.errorExecuteSQL);
        });
    },
    
    successExecuteSQL:function(){
        //success to executeSQL
        //alert("success get profile");
    },
    
    errorExecuteSQL:function(err){
        //fail executeSQL
        alert(err.message);
    },
};



//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
function CheckProfileExists(){
    dbmanager.getProfile(function(returnData){
       if(returnData.rows.length==0){
		   //alert('NO PROFILE');
		   window.location="main.html";
	   }
       else{
		   //alert('Gt PROFILE');
		   //alert(returnData.rows.item(0).userid);
		   // alert(returnData.rows.item(0).username);
		   window.location="menu.html";
	   }
   });
}


//-------------------------------------------------------------------

function postLogout(){
	navigator.notification.confirm("Are you sure you want to logout ?", onLogout, "Confirmation", "Yes,No");     
	
}

function onLogout(button) {
	if(button==2){//If User selected No, then we just do nothing
		return;
	 }else if(button==1){
		deleteProfile();
	}
}

function deleteProfile() {
    var db = window.openDatabase("Database", "1.0", "MewahGroup", 200000);
    db.transaction(runDeleteProfile, errorDeleteProfile, successDeleteProfile);
}

function runDeleteProfile(t){
    t.executeSql('DELETE FROM userprofile');
}

  
function errorDeleteProfile(err){
    loading.endLoading();
    navigator.notification.alert("Logout failed.", function(){}, "Mewah Group", "Ok");
}

function successDeleteProfile(){
    loading.endLoading();
    navigator.notification.alert("Logout succesfully", function(){}, "Mewah Group", "Ok");
    window.location="index.html";
}


//////////////////////////////////////////////////////////////////////////////////////

function GetDeviceInfo(regId, username, password){
	var registerID = regId;
	var devicePlatform = device.platform;
	var imei = device.uuid;
	//alert(devicePlatform);
	//alert(registerID);
	//alert(device.uuid);
	//postDevice(registerID, devicePlatform, imei);
	postLogin(username, password, registerID, devicePlatform, imei);
}


function deleteDevice() {
    var db = window.openDatabase("Database", "1.0", "MewahGroup", 200000);
    db.transaction(runDeleteDevice, errorDeleteDevice, successDeleteDevice);
}

function runDeleteDevice(t){
    t.executeSql('DELETE FROM tblDevice');
}

  
function errorDeleteDevice(err){
    navigator.notification.alert("Device table deleted failed.", function(){}, "Mewah Group", "Ok");
}

function successDeleteDevice(){
    navigator.notification.alert("Device table deleted success", function(){}, "Mewah Group", "Ok");
}





