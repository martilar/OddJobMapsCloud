function Post() {
	var self = Ti.UI.createView({
		layout : 'vertical'
	});
	var Cloud = require('ti.cloud');
	Cloud.debug = true;

	// Get user location
	var latitude;
	var longitude;
	var loc = Ti.Geolocation.getCurrentPosition(function(e) {
		if (e.error) {
			alert('Cannot get your current location, using default..');
			latitude = 0;
			longitude = 0;
			return;
		} else {
			alert('Success getting location');
			latitude = e.coords.latitude;
			longitude = e.coords.longitude;
			return;
		}
	});

	// Form fields:
	// Description
	var description_label = Ti.UI.createLabel({
		color : '#000000',
		text : 'Job Description',
		height : 'auto',
		width : Ti.UI.FILL
	});

	var description = Ti.UI.createTextArea({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		top : 10,
		left : 10,
		width : 250,
		height : 60
	});

	// Wage
	var wage_label = Ti.UI.createLabel({
		color : '#000000',
		text : 'Offering Wage',
		height : 'auto',
		width : Ti.UI.FILL
	});

	var wage = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		top : 10,
		left : 10,
		width : 250,
		height : 60
	});

	// Time estimate
	var estimate_label = Ti.UI.createLabel({
		color : '#000000',
		text : 'Time Estimate (hours)',
		height : 'auto',
		width : Ti.UI.FILL
	});

	var estimate = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		top : 10,
		left : 10,
		width : 250,
		height : 60
	});

	// Expiration date
	var date_label = Ti.UI.createLabel({
		color : '#000000',
		text : 'Expiration date',
		height : 'auto',
		width : Ti.UI.FILL
	});

	var picker = Ti.UI.createPicker({
		type : Ti.UI.PICKER_TYPE_DATE,
		minDate : new Date(),
		value : new Date()
	});

	picker.addEventListener('change', function(e) {
		Ti.API.info("User selected date: " + e.value.toLocaleString());
	});

	self.add(description_label);
	self.add(description);
	self.add(wage_label);
	self.add(wage);
	self.add(estimate_label);
	self.add(estimate);
	self.add(date_label);
	self.add(picker);

	var label = Ti.UI.createButton({
		color : '#000000',
		title : 'Post',
		height : 60,
		width : 300,
		padding : 10
	});

	self.add(label);
	var cancel = Ti.UI.createButton({
		color : '#000000',
		title : 'Cancel',
		height : 60,
		width : 300,
		padding : 10
	});

	self.add(cancel);

	//Add behavior for UI
	label.addEventListener('click', function(e) {
		Cloud.Objects.create({
			classname : 'jobs',
			fields : {
				coordinates : [longitude, latitude], // note: these are [long, lat]
				description : description.value,
				expiration : picker.value,
				wage : wage.value,
				time_estimate : estimate.value,
				claimed : false
			}
		}, function(e) {
			if (e.success) {
				var job = e.jobs[0];
				alert('Success:\n' + 'coordinates: ' + job.coordinates + '\n' + 'description: ' + job.description + '\n' + 'expiration: ' + job.expiration + '\n' + 'wage: ' + job.wage + '\n' + 'time_estimate: ' + job.time_estimate + '\n' + 'claimed: ' + job.claimed + '\n' + 'created_at: ' + job.created_at);
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	});

	cancel.addEventListener('click', function(e) {
		Ti.UI.currentWindow.close();
	});

	return self;
}

module.exports = Post;
