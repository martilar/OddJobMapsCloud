function clearMyStoredAccessToken() {
	Ti.App.Properties.removeProperty('lastLogin');
	Ti.App.Properties.removeProperty('accessToken');
	Ti.App.Properties.removeProperty('tokenExpiresIn');
}

function getMyStoredAccessToken() {
	// Method for accessing token
	if ((Ti.App.Properties.getInt('lastLogin')+Ti.App.Properties.getInt('tokenExpiresIn')) > new Date().now) {
		clearMyStoredAccessToken();
		return false;
	}
	return Ti.App.Properties.getString('accessToken');
}

function setMyStoredAccessToken(token, expires) {
	// Method for storing token
	Ti.App.Properties.setInt('lastLogin', new Date().now)
	Ti.App.Properties.setString('accessToken', token);
	Ti.App.Properties.setInt('tokenExpiresIn', expires);
}


var Cloud = require('ti.cloud');
Cloud.debug = true;

// Method for storing token is application-specific
var token = getMyStoredAccessToken();
if (token) {
	// restore access token
	Cloud.accessToken = token;
	// Go to main window
	alert('Token: ' + token);
} else {
	// need to log in.
	Cloud.Users.secureLogin({
		title : 'Sign In Here'
	}, function(e) {
		if (e.success) {
			setMyStoredAccessToken(Cloud.accessToken, Cloud.expiresIn);
			alert('Token: ' + Cloud.accessToken + 'Expires: ' + Cloud.expiresIn);
			// Go to main window
		} else {
			// handle error
			alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}