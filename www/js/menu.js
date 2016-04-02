
function directLeave() {
    window.location="leave.html";

}



function ValidateProfile(){
	
	loading.startLoading();
	dbmanager.getProfile(function(returnData){
	   if(returnData.rows.length==0){
			loading.endLoading();
			alert('No Profile, please relogin again');
	   }
	   else{
		  //alert('Gt PROFILE');
		   //alert(returnData.rows.item(0).userid);
		   // alert(returnData.rows.item(0).username);
		  postMenu(returnData.rows.item(0).userid, returnData.rows.item(0).password);
	   }
   });
}
