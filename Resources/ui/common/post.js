function Post() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	var Cloud = require('ti.cloud');
	Cloud.debug = true;

	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color : '#000000',
		text : 'Post a Job',
		height : 'auto',
		width : 'auto'
	});

	self.add(label);

	//Add behavior for UI
	label.addEventListener('click', function(e) {
		Cloud.Users.login({
			login : 'laram5',
			password : 'ryleedog',
		}, function(e) {
			if (e.success) {

				Cloud.Objects.create({
					classname : 'jobs',
					fields : {
						latitude : 44.564566,
						longitude : -123.262043,
						description : 'First job!',
						expiration : new Date("06-18-2013"),
						wage : 15,
						time_estimate : 1,
						claimed : false
					}
				}, function(e) {
					if (e.success) {
						var job = e.jobs[0];
						alert('Success:\n' + 'latitude: ' + job.id + '\n' + 'longitude: ' + job.make + '\n' + 'description: ' + job.color + '\n' + 'expiration: ' + job.year + '\n' + 'wage: ' + job.wage + '\n' + 'time_estimate: ' + job.time_estimate + '\n' + 'claimed: ' + job.claimed + '\n' + 'created_at: ' + job.created_at);
					} else {
						alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
					}
				});
				// Cloud.Objects.create

			} else {
				alert('Login Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
		// Cloud.Users.login

	});
	// label.addEventListener

	return self;
}

module.exports = Post; 