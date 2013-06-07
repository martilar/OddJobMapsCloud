exports.createMapWindow = function(){
	var win = Ti.UI.createWindow({
	backgroundColor : "white",
	layout : 'vertical', 
	navBarHidden : true
	});

	var osname = Ti.Platform.osname;

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
		leftView: Ti.UI.createButton({title: 'Detail'}),
		myid : 1 // Custom property to uniquely identify this annotation.
	});

	var map = MapModule.createView({
		userLocation : true,
		mapType : MapModule.NORMAL_TYPE,
		animate : true,
		region : {
			latitude : 44.5646,
			longitude : -123.2757,
			latitudeDelta : 0.1,
			longitudeDelta : 0.1
		},
		height : Titanium.UI.Fill,
		width : Titanium.UI.Fill,
		top : 0,
		left : 0,
		annotations : [osu]
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
		userLocation : true,
		mapType : Titanium.Map.STANDARD_TYPE,
		animate : true,
		region : {
			latitude : 44.5646,
			longitude : -123.2757,
			latitudeDelta : 0.1,
			longitudeDelta : 0.1
		},
		top : 0,
		left : 0,
		annotations : [osu]
	});
}
win.add(map);
	win.open();	
}
