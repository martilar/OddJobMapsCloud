exports.getMyStoredAccessToken= function(){
	
	var seconds = new Date().getTime() / 1000 ;
	var loginTime = Ti.App.Properties.getInt('loginTime', 0);
	var expiresIn = Ti.App.Properties.getInt('expires', 0);
	if ( loginTime + expiresIn > seconds ){
		return Ti.App.Properties.getString('token', '');
	} else {
		Ti.App.Properties.removeProperty('loginTime');
		Ti.App.Properties.removeProperty('expires');
		Ti.App.Properties.removeProperty('token');
		return '';
	}
}
// 
exports.setMyStoredAccessToken = function(accToken , expiresIn ){
	  Ti.App.Properties.setString('token', accToken);
	  Ti.App.Properties.setInt('expires', expiresIn);
	  var seconds = new Date().getTime() / 1000 ;
	  Ti.App.Properties.setInt('loginTime', seconds);

 }
 
exports.unsetToken = function(){
		Ti.App.Properties.removeProperty('loginTime');
		Ti.App.Properties.removeProperty('expires');
		Ti.App.Properties.removeProperty('token');
}
