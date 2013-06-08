function mapQuery(view) {
	Ti.Geolocation.purpose = Ti.Geolocation.ACTIVITYTYPE_OTHER;
	var osname = Ti.Platform.osname;
	var Cloud = require('ti.cloud');
	var region = view.getRegion();
	Ti.API.info('region' + region.latitude);
	Ti.API.info('region' + region.longitude);
	Ti.API.info(region);
	var lat = region.latitude;
	var lon = region.longitude;
	var longdelt = region.longitudeDelta;

	var radians = longdelt*3.14/180;
	var today = new Date();
	
	Cloud.debug = true;
	Ti.API.info(view);
	var jobs = Cloud.Objects.query({
		classname : 'jobs',
		limit : 100,
	
		where : { 
			"coordinates":{"$nearSphere":[lon, lat], "$maxDistance" : radians },
			"claimed" : false,
			"expiration" : {"$gt": today}
			}	
	}, function(e) {
		if (e.success) {

			// var jobs = e.jobs;
			var annot = new Array();
			for (var i = 0; i < e.jobs.length; i++) {
				// alert('Success:\n' + 'Count: ' + e.jobs.length + e.jobs[i].description+e.jobs[i].coordinates[0][0]);
				if (osname == 'android') {
					annot.push(MapModule.createAnnotation({
						latitude : e.jobs[i].coordinates[0][1],
						longitude : e.jobs[i].coordinates[0][0],
						title : e.jobs[i].description,
						subtitle : e.jobs[i].time_estimate + " hours \n$" + e.jobs[i].wage + "\nexpires " + e.jobs[i].expiration,
						animate : true,
						leftView : Ti.UI.createButton({
							title : 'contact Poster'
						})
					}));
				} else {
					annot.push(Titanium.Map.createAnnotation({
						latitude : e.jobs[i].coordinates[0][1],
						longitude : e.jobs[i].coordinates[0][0],
						title : e.jobs[i].description,
						subtitle : e.jobs[i].time_estimate + " hours \n$" + e.jobs[i].wage + "\nexpires " + e.jobs[i].expiration,
						animate : true,
						leftView : Ti.UI.createView({
							title : 'contact Poster'
						})
					}));
				}
				var email = e.jobs[i].user.email;
				var description = e.jobs[i].description;
				annot[i].addEventListener('click', function(b) {
					var emailDialog = Ti.UI.createEmailDialog()
					emailDialog.subject = "Interest in job posting: " + description;
					emailDialog.toRecipients = [email];
					emailDialog.open();
				});
				Ti.API.info(e.jobs[i].user.email);
			}
			Ti.API.info(annot);
			Ti.API.info(view);
			view.addAnnotations(annot);
			var viewAnnot = view.getAnnotations();
			alert('viewAnnot ' + viewAnnot[0].title);
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

}

exports.createMapWindow = function() {


	


	var lat;
	var lon;
	var	latitudeDelta = 0.1;
	var	longitudeDelta = 0.1;

	var loc = Ti.Geolocation.getCurrentPosition(function(e) {
		if (e.error) {
			alert('Cannot get your current location, please manually set your location.');
			lat = 0;
			lon = 0;
			makeMaps(lat, lon);
		} else {
			alert('Success getting location\nLatitude' + e.coords.latitude + '\nLongitude ' + e.coords.longitude);
			lat = e.coords.latitude;
			lon = e.coords.longitude;
			Ti.API.info('getCurrentPos Map.js')
			Ti.API.info(lat);
			Ti.API.info(lon);
			makeMaps(lat, lon);
			
		}
		
	});

	Ti.API.info(lat);
	Ti.API.info(lon);
}
	
var makeMaps = function(lat, lon){
	var win = Ti.UI.createWindow({
		backgroundColor : "white",
		layout : 'vertical',
		navBarHidden : true
	});
	var osname = Ti.Platform.osname;
	// alert(JSON.stringify(jobs));
	var annot = new Array();

	if (osname == 'android') {

		var MapModule = require('ti.map');

		var osu = MapModule.createAnnotation({
			latitude : 44.5646,
			longitude : -123.2757,
			title : "Oregon State University",
			subtitle : 'Corvallis, OR',
			pincolor : MapModule.ANNOTATION_RED,
			animate : true,
			//leftButton : '../images/appcelerator_small.png',
			leftView : Ti.UI.createButton({
				title : 'Detail'
			}),
			myid : 1 // Custom property to uniquely identify this annotation.
		});

		var map = MapModule.createView({
			height : '90%',
			userLocation : true,
			mapType : MapModule.NORMAL_TYPE,
			animate : true,
			region : {
				latitude : lat,
				longitude : lon,
				latitudeDelta : 0.1,
				longitudeDelta : 0.1
			},
			// height : Titanium.UI.Fill,
			width : Titanium.UI.Fill,
			top : 0,
			left : 0,
			// annotations :
		});
	} else {

		var osu = Titanium.Map.createAnnotation({
			latitude : 44.5646,
			longitude : -123.2757,
			title : "Oregon State University",
			subtitle : 'Corvallis, OR',
			pincolor : Titanium.Map.ANNOTATION_RED,
			animate : true,
			// leftView: Ti.UI.createButton({title: 'Detail'}),
			// leftView: Ti.UI.createButton({title: 'Detail'}),
			leftButton : Titanium.UI.iPhone.SystemButton.INFO_LIGHT,
			myid : 1 // Custom property to uniquely identify this annotation.
		});

		var map = Titanium.Map.createView({
			height : '95%',
			userLocation : true,
			mapType : Titanium.Map.STANDARD_TYPE,
			animate : true,
			region : {
				latitude : lat,
				longitude : lon,
				latitudeDelta : 0.1,
				longitudeDelta : 0.1
			},
			top : 0,
			left : 0,
			annotations : [osu]
		});
	}
	win.add(map);

	mapQuery(map);
	
	win.open();
	
	var backBtn = Ti.UI.createButton({
		title : 'Back',
		width : Ti.UI.FILL,
		height : Ti.UI.FILL
	});

	backBtn.addEventListener('click', function() {
		win.close();
	});
	win.add(backBtn);
}
