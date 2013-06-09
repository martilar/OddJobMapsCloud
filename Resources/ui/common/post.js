var dat = require('/dat');
var login = require('/ui/common/login');



exports.createPostWindow = function() {
	var Cloud = require('ti.cloud');
	Cloud.debug = true;
	var token = dat.getMyStoredAccessToken();
	if (token) {

		Cloud.accessToken = token;
		// Ti.App.fireEvent('loggedIn',{});

	} else {

		Cloud.Users.secureLogin({
			title : 'Login to your Account'
		}, function(e) {
			if (e.success) {
				dat.setMyStoredAccessToken(Cloud.accessToken, Cloud.expiresIn);
				// Ti.App.fireEvent('loggedIn',{});

			} else {
				// alert('Error:\\n' +
				// ((e.error && e.message) || JSON.stringify(e)));
			}
		});

	}
	var osname = Ti.Platform.osname;
	
	var win = Ti.UI.createWindow({
		backgroundColor : "white",
		layout : 'vertical',
		navBarHidden : true
	});
var createWhenPossible = function(e){
	if( Titanium.Network.networkType != Titanium.Network.NETWORK_NONE){
		//send update the database
		createEntry(e);
	}else{
	
	setTimeout(function(){
		createWhenPossible(e);
	}, 1000);
	}
}


var createEntry = function(e) {
		var Cloud = require('ti.cloud');
		Cloud.debug = true;
		Cloud.Objects.create({
			classname : 'jobs',
			fields : e
		}, function(e) {
			if (e.success) {
				var job = e.jobs[0];
				alert('Success:\n' + 'coordinates: ' + job.coordinates + '\n' + 'description: ' + job.description + '\n' + 'expiration: ' + job.expiration + '\n' + 'wage: ' + job.wage + '\n' + 'time_estimate: ' + job.time_estimate + '\n' + 'claimed: ' + job.claimed + '\n' + 'created_at: ' + job.created_at);
				// fireEvent('Success',{});
				Ti.API.info(Titanium.UI.currentWindow);
				win.close();
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
				login.createLoginWindow();
			}
		});
	};





	var self = Ti.UI.createScrollView({
		layout : 'vertical',
		height : '90%'
	});
	var Cloud = require('ti.cloud');
	Cloud.debug = true;

	// Get user location
	var latitude;
	var longitude;
	
	Ti.Geolocation.purpose = Ti.Geolocation.ACTIVITYTYPE_OTHER;
	
	var loc = Ti.Geolocation.getCurrentPosition(function(e) {
		if (e.error) {
			alert('Cannot get your current location, please manually set your location.');
			latitude = 0;
			longitude = 0;
			return;
		} else {
			alert('Success getting location ');
			latitude = e.coords.latitude;
			longitude = e.coords.longitude;
			return;
		}
	});
		Ti.API.info('latitude '+latitude);
	Ti.API.info('longitude '+longitude);
	// Manual location button
	var loc_button = Ti.UI.createButton({
		color : '#000000',
		title : 'Manually set location..',
		width : Ti.UI.FILL,
		padding : 10
	});

	loc_button.addEventListener('click', function(e) {
		var mapWindow = Ti.UI.createWindow({
			backgroundColor : "white",
			layout : 'vertical',
			navBarHidden : true
		});

		if (osname == 'android') {
			var MapModule = require('ti.map');
			
			// android specific code
			var locPin = MapModule.createAnnotation({
				latitude : latitude,
				longitude : longitude,
				title : "Job Location",
				pincolor : MapModule.ANNOTATION_RED,
				animate : true,
				draggable : true,
				leftView: Ti.UI.createButton({title: 'Detail'}),
				myid : 1 // Custom property to uniquely identify this annotation.
			});

			var map = MapModule.createView({
				height : '95%',
				userLocation : true,
				mapType : MapModule.NORMAL_TYPE,
				animate : true,
				region : {
					latitude : latitude,
					longitude : longitude,
					latitudeDelta : 0.1,
					longitudeDelta : 0.1
				},
				top : 0,
				left : 0,
				annotations : [locPin]
			});
		} else {
			// code
			var locPin = Titanium.Map.createAnnotation({
				latitude : latitude,
				longitude : longitude,
				title : "Job Location",
				pincolor : Titanium.Map.ANNOTATION_RED,
				animate : true,
				draggable : true,
				leftButton : Titanium.UI.iPhone.SystemButton.INFO_LIGHT,
				myid : 1 // Custom property to uniquely identify this annotation.
			});

			var map = Titanium.Map.createView({
				height : '95%',
				userLocation : true,
				mapType : Titanium.Map.STANDARD_TYPE,
				animate : true,
				region : {
					latitude : latitude,
					longitude : longitude,
					latitudeDelta : 0.1,
					longitudeDelta : 0.1
				},
				top : 0,
				left : 0,
				annotations : [locPin]
			});
		}

		var doneButton = Ti.UI.createButton({
			color : '#000000',
			title : 'Okay',
			width : Ti.UI.FILL,
			padding : 10
		});

		doneButton.addEventListener('click',function(e) {
			// Set new latitude and longitude
			latitude = locPin.getLatitude();
			longitude = locPin.getLongitude();
			// Close map window
			mapWindow.close();
		});

		mapWindow.add(map);
		mapWindow.add(doneButton);
		mapWindow.open();
	});
	
	self.add(loc_button);
	/*
	var long_label = Ti.UI.createLabel({
		color : '#000000',
		text : 'Longitude',
		// height : '50%',
		width : Ti.UI.FILL
	});

	var long_field = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		value : longitude,
		width : Ti.UI.FILL

	});

	var lat_label = Ti.UI.createLabel({
		color : '#000000',
		text : 'Latitude',
		// height : '50%',
		width : Ti.UI.FILL
	});

	var lat_field = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		value : latitude,
		width : Ti.UI.FILL

	});


	self.add(long_label);
	self.add(long_field);
	self.add(lat_label);
	self.add(lat_field);
*/
	// Form fields:
	// Description
	var description_label = Ti.UI.createLabel({
		color : '#000000',
		text : 'Job Description',
		// height : '50%',
		width : Ti.UI.FILL
	});

	var description = Ti.UI.createTextArea({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		top : 10,

		width : Ti.UI.FILL

	});

	// Wage
	var wage_label = Ti.UI.createLabel({
		color : '#000000',
		text : 'Offering Wage',
		// height : 'auto',
		width : Ti.UI.FILL
	});

	var wage = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',

		width : Ti.UI.FILL

	});

	// Time estimate
	var estimate_label = Ti.UI.createLabel({
		color : '#000000',
		text : 'Time Estimate (hours)',
		// height : 'auto',
		width : Ti.UI.FILL
	});

	var estimate = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',

		width : Ti.UI.FILL
	});

	// Expiration date
	var date_label = Ti.UI.createLabel({
		color : '#000000',
		text : 'Expiration date',
		// height : 'auto',
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
	win.add(self);
	var label = Ti.UI.createButton({
		color : '#000000',
		title : 'Post',
		height : '5%',
		width : Ti.UI.FILL,
		padding : 10
	});

	win.add(label);
	var cancel = Ti.UI.createButton({
		color : '#000000',
		title : 'Cancel',
		height : '5%',
		width : Ti.UI.FILL,
		padding : 10
	});

	win.add(cancel);



	//Add behavior for UI
	label.addEventListener('click', function(){
		var fields = {
			"coordinates" : [longitude, latitude], // note: these are [long, lat]
			"description" : description.value,
			"expiration" : picker.value,
			"wage" : wage.value,
			"time_estimate" : estimate.value,
			"claimed" : false
		};
		
		createWhenPossible(fields);
	});
	cancel.addEventListener('click', function(e) {
		win.close();
	});

	
	win.open();
}


// module.exports = Post;
