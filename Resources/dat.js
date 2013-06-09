var Cloud = require('ti.cloud');
Cloud.debug = true;

exports.getMyStoredAccessToken= function(){
	
	var seconds = new Date().getTime() / 1000 ;
	var loginTime = Ti.App.Properties.getInt('loginTime', 0);
	var expiresIn = Ti.App.Properties.getInt('expires', 0);
	if ( loginTime + expiresIn > seconds ){
		return Ti.App.Properties.getString('token', '');
	} else {
		dat.unsetToken();
		return false;
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


exports.createWhenPossible = function(e, win){
	if( Titanium.Network.networkType != Titanium.Network.NETWORK_NONE){
		//send update the database
		createEntry(e, win);
	}
	
	setTimeout(function(){
		createWhenPossible(e, win);
	}, 1000);
}


var createEntry = function(e, win) {
		Cloud.Objects.create({
			classname : 'jobs',
			fields : e
		}, function(e) {
			if (e.success) {
				var job = e.jobs[0];
				alert('Success:\n' + 'coordinates: ' + job.coordinates + '\n' + 'description: ' + job.description + '\n' + 'expiration: ' + job.expiration + '\n' + 'wage: ' + job.wage + '\n' + 'time_estimate: ' + job.time_estimate + '\n' + 'claimed: ' + job.claimed + '\n' + 'created_at: ' + job.created_at);
				 win.close();
				// fireEvent('Success',{});
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
				login.createLoginWindow();
			}
		});
	};
	
exports.toggleClaimedWhenPossible = function(id, claimed){
	
}
