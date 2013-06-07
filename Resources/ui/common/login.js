<<<<<<< HEAD
var dat = require('/dat');

// function getMyStoredAccessToken(){
// 	
	// var seconds = new Date().getTime() / 1000 ;
	// var loginTime = Ti.App.Properties.getInt('loginTime', 0);
	// var expiresIn = Ti.App.Properties.getInt('expires', 0);
	// if ( loginTime + expiresIn < seconds ){
		// return Ti.App.Properties.getString('token', '');
	// } else {
		// return '';
	// }
// }
// // 
 // function setMyStoredAccessToken(accToken , expiresIn ){
	  // Ti.App.Properties.setString('token', accToken);
	  // Ti.App.Properties.setInt('expires', expiresIn);
	  // var seconds = new Date().getTime() / 1000 ;
	  // Ti.App.Properties.setInt('loginTime', seconds);
// 
 // }
exports.createLoginWindow = function(){


var win = Ti.UI.createWindow({
	backgroundColor : "white",
	layout : 'vertical', 
	navBarHidden : true
});
win.open;

var Cloud = require('ti.cloud');
Cloud.debug = true;
var token = dat.getMyStoredAccessToken();
// Create a user
// ACS app must be configured to use 3-legged OAuth
if (token){
	
	Cloud.accessToken = token;
	// Ti.App.fireEvent('loggedIn',{});
	
}
else{

Cloud.Users.secureLogin({
    title: 'Login to your Account'
}, function (e) {
    if (e.success) {
            dat.setMyStoredAccessToken(Cloud.accessToken, Cloud.expiresIn);
            // Ti.App.fireEvent('loggedIn',{});
           
    } else {
        // alert('Error:\\n' +
            // ((e.error && e.message) || JSON.stringify(e)));
    }
});

}

