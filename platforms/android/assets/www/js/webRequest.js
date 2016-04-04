var webUrlDeviceRegister = "http://pg-portal-d2/MobileApp/DirectLogin.aspx";
var webUrl = "http://pg-portal-d2/MobileApp/DirectLogin.aspx";
var webUrlmenu = "http://pg-portal-d2/MobileApp/Menu.aspx";
var webUrlLeave = "http://pg-portal-d2/MobileApp/Leave/LeaveApprovalList.aspx";
var webUrlLeaveApproveOne = "http://pg-portal-d2/MobileApp/Leave/LeaveApprove.aspx";
var webUrlLeaveRejectOne = "http://pg-portal-d2/MobileApp/Leave/LeaveReject.aspx";
var webUrlLeaveApproveAll = "http://pg-portal-d2/MobileApp/Leave/LeaveApproveAll.aspx";

var apiTimeout=30000;
//postLogin(username, password, regId, devicePlatform, imei);
function postLogin(username, password, regId, devicePlatform, imei){
   var requestUrl=webUrl; 
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
	  data:"ID="+username+"&PW="+password+"&RID="+regId+"&IMEIID="+imei+"&PLATFORM="+devicePlatform,
		timeout: apiTimeout,    
		success: function(data){
			if(data.message == 'Logon Success')
			{
				storeProfile(username, password);
			}
			else
			{
				//alert(data.message);
				navigator.notification.alert(data.message, function(){}, "Mewah Group", "Ok");
			}
			loading.endLoading();
		},
		error: function(xhr, status, error) {
		  alert(status);
		  loading.endLoading();
		}
    });
}

function postMenu(username, password){
   var requestUrl=webUrlmenu; 
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
	  data:"ID="+username+"&PW="+password,
	  timeout: apiTimeout,    
		success: function(data){
			
			if(data.message == 'Logon Success')
			{
				//storeProfile(username, password);
			}
			else
			{
				//alert(data.message);
				navigator.notification.alert("No Profile, please relogin again.", function(){}, "Mewah Group", "Ok");
			}
			loading.endLoading();
		},
		error: function(xhr, status, error) {
		  alert(status);
		  loading.endLoading();
		}
    });
}

function storeProfile(username, password) {
    
	var db = window.openDatabase("Database", "1.0", "MewahGroup", 200000);
	 var profile = {
		values1 : [username,password]
    };
	
	  insertProfile(profile);
 
    function insertProfile(profile) {
		db.transaction(function(tx) {
			tx.executeSql('DROP TABLE IF EXISTS userprofile');
            tx.executeSql('CREATE TABLE IF NOT EXISTS userprofile (userid text, password text)');
            tx.executeSql('DELETE FROM userprofile');
            tx.executeSql(
                'INSERT INTO userprofile (userid, password) VALUES (?, ?)', 
                profile.values1,
                successLogin,
                errorLogin
            );
            //alert(username);
			//alert(password);
        });
    }
}

function errorLogin(err){
     //alert('Error insert: '+err.message);
     alert('Error insert: '+err.message);
	 loading.endLoading();
}

function successLogin(){
    //alert('insert success');
    loading.endLoading();
	window.location="menu.html";
}



//**********************************************************************************//

function loadleaverecord(){
	dbmanager.getProfile(function(returnData){
       if(returnData.rows.length==0)
	   {
		    alert('No Profile, please relogin again');
	   }
       else
	   {
		   var requestUrl=webUrlLeave; 
			$.ajax({
			  url: requestUrl,
			  method: "GET",
			  headers: {
				"Content-Type": "application/json"
			  },
			   data:"ID="+returnData.rows.item(0).userid+"&PW="+returnData.rows.item(0).password,
				timeout: apiTimeout,    
				success: function(data){
					//alert(data.length);
					for (var x = 0; x < data.length; x++) {
						$(".scrollulLV").append("<li class='scrollliLV'><table class='listviewitemframeLV' border='0'><tr><td rowspan='2'><h1 class='listviewitemtitleLV'>"+ data[x].Name +" ("+data[x].Department+") </h1><p class='listviewitemdetails1LV'>"+data[x].From_date+" ~ "+data[x].To_date+"</p><p class='listviewitemdetails2LV'>"+data[x].Leave_type+"</p><p class='listviewitemdetails3LV'>Reason : "+data[x].Reason+"</p></td><td width=10%><img class='listviewimgLV' style='vertical-align:middle;' src='img/tick.png' onclick=\"approveOneByOne('"+data[x].tbl+"', '"+data[x].refno+"');\" ></td></tr><tr><td width=10% style='vertical-align: top;'><img class='listviewimgLV' style='vertical-align:middle;' src='img/delete.png' onclick=\"rejectOneByOne('"+data[x].tbl+"', '"+data[x].refno+"');\"></td></tr></table></li>");
					}
					//loading.endLoading();
					
				},
				error: function(xhr, status, error) {
				  alert(status);
				  //$(".scrollulLV").append("<li class='scrollliLV'><table class='listviewitemframeLV' border='0'><tr><td><h1 class='listviewitemtitleLV'>LEE JIAN HAO IS A TESTER (HUMAN RESOURCES & ADMIN)</h1></td><td width=10%><img class='listviewimgLV' style='vertical-align:middle;' src='img/tick.png' onclick=\"approveOneByOne('12', '12');\" ></td></tr><tr><td><p class='listviewitemdetails1LV'>2016-04-03 ~ 2016-04-10</p><p class='listviewitemdetails2LV'>Business Trip</p><p class='listviewitemdetails3LV'>Reason : To Develop Mobile App for Android and IOS platform, Mewaholeo Industries Sdn Bhd</p></td><td width=10% style='vertical-align: top;'><img class='listviewimgLV' style='vertical-align:middle;' src='img/delete.png' onclick=\"rejectOneByOne('12', '12');\"></td></tr></table></li>");
				  //$(".scrollulLV").append("<li class='scrollliLV'><table class='listviewitemframeLV' border='0'><tr><td><h1 class='listviewitemtitleLV'>LEE JIAN HAO (IT)</h1></td><td width=10%><img class='listviewimgLV' style='vertical-align:middle;' src='img/tick.png' onclick=\"approveOneByOne('12', '12');\" ></td></tr><tr><td><p class='listviewitemdetails1LV'>2016-04-03 ~ 2016-04-10</p><p class='listviewitemdetails2LV'>Business Trip</p><p class='listviewitemdetails3LV'>Reason : To Develop Mobile App for Android and IOS platform, Mewaholeo Industries Sdn Bhd</p></td><td width=10% style='vertical-align: top;'><img class='listviewimgLV' style='vertical-align:middle;' src='img/delete.png' onclick=\"rejectOneByOne('12', '12');\"></td></tr></table></li>");
				  //$(".scrollulLV").append("<li class='scrollliLV'><table class='listviewitemframeLV' border='0'><tr><td><h1 class='listviewitemtitleLV'>LEE JIAN HAO (IT)</h1></td><td width=10%><img class='listviewimgLV' style='vertical-align:middle;' src='img/tick.png' onclick=\"approveOneByOne('12', '12');\" ></td></tr><tr><td><p class='listviewitemdetails1LV'>2016-04-03 ~ 2016-04-10</p><p class='listviewitemdetails2LV'>Business Trip</p><p class='listviewitemdetails3LV'>Reason : To Develop Mobile App for Android and IOS platform, Mewaholeo Industries Sdn Bhd</p></td><td width=10% style='vertical-align: top;'><img class='listviewimgLV' style='vertical-align:middle;' src='img/delete.png' onclick=\"rejectOneByOne('12', '12');\"></td></tr></table></li>");
				 
				  //loading.endLoading();
				}
			});
	   }
	});
}


function postapproveall(){
	dbmanager.getProfile(function(returnData){
       if(returnData.rows.length==0)
	   {
		    alert('No Profile, please relogin again');
	   }
       else
	   {
		    //alert(returnData.rows.item(0).userid);
			//alert(returnData.rows.item(0).password);
		    var requestUrl=webUrlLeaveApproveAll; 
			$.ajax({
			  url: requestUrl,
			  method: "GET",
			  headers: {
				"Content-Type": "application/json"
			  },
			   data:"ID="+returnData.rows.item(0).userid+"&PW="+returnData.rows.item(0).password,
				timeout: apiTimeout,    
				success: function(data){
					if(data.message == 'Approve All Done')
					{
						navigator.notification.alert("Approve All Successfully", function(){}, "Mewah Group", "Ok");
						window.history.back();
					}
					else
					{
						navigator.notification.alert(data.message, function(){}, "Mewah Group", "Ok");
					}
				},
				error: function(xhr, status, error) {
				  alert(status);
				}
			});
	   }
   });
}

function postapproveone(tbl, refno){
	//alert(tbl);
	//alert(refno);
	if(tbl=='PGleaveDetail'){
		tbl  = 'PGLeaveDetail';
	}
	
	if(tbl=='leaveDetail'){
		tbl  = 'LeaveDetail';
	}
	
	dbmanager.getProfile(function(returnData){
       if(returnData.rows.length==0)
	   {
		    alert('No Profile, please relogin again');
	   }
       else
	   {
		    //alert(returnData.rows.item(0).userid);
			//alert(returnData.rows.item(0).password);
		    var requestUrl=webUrlLeaveApproveOne; 
			$.ajax({
			  url: requestUrl,
			  method: "GET",
			  headers: {
				"Content-Type": "application/json"
			  },
			   data:"ID="+returnData.rows.item(0).userid+"&PW="+returnData.rows.item(0).password+"&TBL="+tbl+"&Refno="+refno,
				timeout: apiTimeout,    
				success: function(data){
					loading.endLoading();
					
					if(data.message == 'Approve Done')
					{
						navigator.notification.alert("Approve Successfully", function(){}, "Mewah Group", "Ok");
					    location.reload();
					}
					else
					{
						navigator.notification.alert(data.message, function(){}, "Mewah Group", "Ok");
					}
				},
				error: function(xhr, status, error) {
				  alert(status);
				  loading.endLoading();
				}
			});
	   }
   });
}

function postrejectone(tbl, refno){
	if(tbl=='PGleaveDetail'){
		tbl  = 'PGLeaveDetail';
	}
	
	if(tbl=='leaveDetail'){
		tbl  = 'LeaveDetail';
	}
	
	dbmanager.getProfile(function(returnData){
       if(returnData.rows.length==0)
	   {
		    alert('No Profile, please relogin again');
	   }
       else
	   {
		    //alert(returnData.rows.item(0).userid);
			//alert(returnData.rows.item(0).password);
		    var requestUrl=webUrlLeaveRejectOne; 
			$.ajax({
			  url: requestUrl,
			  method: "GET",
			  headers: {
				"Content-Type": "application/json"
			  },
			   data:"ID="+returnData.rows.item(0).userid+"&PW="+returnData.rows.item(0).password+"&TBL="+tbl+"&Refno="+refno,
				timeout: apiTimeout,    
				success: function(data){
					loading.endLoading();
					if(data.message == 'Reject Done')
					{
						navigator.notification.alert("Reject Successfully", function(){}, "Mewah Group", "Ok");
					    location.reload();
					}
					else
					{
						navigator.notification.alert(data.message, function(){}, "Mewah Group", "Ok");
					}
				},
				error: function(xhr, status, error) {
				  alert(status);
				  loading.endLoading();
				}
			});
	   }
   });
}



//************************************************************************************/


function postDevice(registerID, devicePlatform, imei){
   var requestUrl=webUrlDeviceRegister; 
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
	  data:"regID="+registerID+"&platform="+devicePlatform+"&imei="+imei,
		timeout: apiTimeout,    
		success: function(data){
			if(data.message == 'Logon Success')
			{
				storeProfile(username, password);
			}
			else
			{
				//alert(data.message);
				navigator.notification.alert(data.message, function(){}, "Mewah Group", "Ok");
			}
			loading.endLoading();
		},
		error: function(xhr, status, error) {
		  alert(status);
		  loading.endLoading();
		}
    });
}
