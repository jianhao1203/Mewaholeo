 function approveOneByOne(tbl, refno){
	navigator.notification.confirm("Are you sure you want to approve this record ?", onApproveLeaveOne, "Confirmation", "Yes,No");     
	
	function onApproveLeaveOne(button) {
		if(button==2){//If User selected No, then we just do nothing
			return;
		 }else if(button==1){
			 //alert(id);
			 //alert(userid);
			 //alert('APPROVE!!');
			 loading.startLoading();
			 postapproveone(tbl, refno);
		}
	}
}


function callapproveall(){
	navigator.notification.confirm("Are you sure you want to approve all ?", onApproveLeaveAll, "Confirmation", "Yes,No");     
	
}

function onApproveLeaveAll(button) {
	if(button==2){//If User selected No, then we just do nothing
		return;
	 }else if(button==1){
		postapproveall();
	}
}





 

function rejectOneByOne(tbl, refno){
	navigator.notification.confirm("Are you sure you want to reject this record ?", onRejectLeaveOne, "Confirmation", "Yes,No");     
	
	function onRejectLeaveOne(button) {
		if(button==2){//If User selected No, then we just do nothing
			return;
		 }else if(button==1){
			 //alert('REJECT!!');
			 loading.startLoading();
			postrejectone(tbl, refno);
		}
	}
}


 







