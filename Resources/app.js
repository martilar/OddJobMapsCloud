var login = require('/ui/common/login');
var nav = require('/ui/common/nav');
var dat = require('dat');
var map = require('/ui/common/map');
var post = require('/ui/common/post');

function getMyStoredAccessToken(){
	
	var seconds = new Date().getTime() / 1000 ;
	var loginTime = Ti.App.Properties.getInt('loginTime', 0);
	var expiresIn = Ti.App.Properties.getInt('expires', 0);
	if ( loginTime + expiresIn < seconds ){
		return Ti.App.Properties.getString('token', '');
	} else {
		return '';
	}
}
/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
var toLoginWin = Ti.UI.createWindow({
	background : 'white',
	layout : 'vertical',
	navBarHidden : true
});
toLoginWin.open();
var toLoginBtn = Ti.UI.createButton({
	title : 'Login',
	top: '5%',
	width : Ti.UI.FILL
});
toLoginWin.add(toLoginBtn);
var loginWin = login.createLoginWindow();


toLoginBtn.addEventListener( 'click', function(){
	
	dat.unsetToken();
	var loginWin = login.createLoginWindow();
});

var toMapBtn = Ti.UI.createButton({
	title : 'Map',

	width : Ti.UI.FILL
});
toLoginWin.add(toMapBtn);


toMapBtn.addEventListener( 'click', function(){
	var token = dat.getMyStoredAccessToken();
	if (token){
		var mapWin = map.createMapWindow();
	} else{
		var loginWin = login.createLoginWindow();
	}
});

var toPostBtn = Ti.UI.createButton({
	title : 'Post',

	width : Ti.UI.FILL
});
toLoginWin.add(toPostBtn);

toPostBtn.addEventListener( 'click', function(){
	var token = dat.getMyStoredAccessToken();
	if (token){
		var postWin = map.createPostWindow();
	} else{
		var loginWin = login.createLoginWindow();
	}
});

/*
// this sets the background color of the master UIView (when there are no windows/tab groups on it)  
Titanium.UI.setBackgroundColor('#fff');  
var tabGroup = Titanium.UI.createTabGroup();  
var login = Titanium.UI.createWindow({  
    title:'User Authentication Demo',  
    tabBarHidden:true,  
    url:'login.js'  
});  
var loginTab = Titanium.UI.createTab({  
    title:"Login",  
    window:login  
});  
tabGroup.addTab(loginTab);  
tabGroup.open();  

// Send an email
Cloud.Emails.send({
    template: 'welcome',
    recipients: 'lara.ann.martin@gmail.com'
}, function (e) {
    if (e.success) {
        alert('Success');
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});

/*
if () {
// Create an object
Cloud.Objects.create({
    classname: 'jobs',
    fields: {
        latitude: '',
        longitude: '',
        description: 'Description',
        expiration: 'date', 
        wage: 'dollar amt',
        time_estimate: 'hours',
        claimed: false
    }
}, function (e) {
    if (e.success) {
        var job = e.jobs[0];
        alert('Success:\n' +
            'latitude: ' + job.id + '\n' +
            'longitude: ' + job.make + '\n' +
            'description: ' + job.color + '\n' +
            'expiration: ' + job.year + '\n' +
            'wage: ' + job.wage + '\n' +
            'time_estimate: ' + job.time_estimate + '\n' +
            'claimed: ' + job.claimed + '\n' +
            'created_at: ' + job.created_at);
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});


// Update custom object
Cloud.Objects.update({
    classname: 'jobs',
    id: savedCar1.id,
    fields: {
        expiration: '',
        wage: 10000
    }
}, function (e) {
    if (e.success) {
        var job = e.jobs[0];
        alert('Success:\n' +
            'latitude: ' + job.id + '\n' +
            'longitude: ' + job.make + '\n' +
            'description: ' + job.color + '\n' +
            'expiration: ' + job.year + '\n' +
            'wage: ' + job.wage + '\n' +
            'time_estimate: ' + job.time_estimate + '\n' +
            'claimed: ' + job.claimed + '\n' +
            'updated_at: ' + job.created_at);
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});

// Remove custom object
Cloud.Objects.remove({
    classname: 'cars',
    id: savedCar1.id
}, function (e) {
    if (e.success) {
        alert('Success');
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});

// Query custom objects
Cloud.Objects.query({
    classname: 'cars',
    page: 1,
    per_page: 10,
    where: {
        color: 'blue'
    }
}, function (e) {
    if (e.success) {
        alert('Success:\n' +
            'Count: ' + e.cars.length);
        for (var i = 0; i < e.cars.length; i++) {
            var car = e.cars[i];
            alert('id: ' + cars.id + '\n' +
                'make: ' + car.make + '\n' +
                'color: ' + car.color + '\n' +
                'year: ' + car.year + '\n' +
                'created_at: ' + car.created_at);
        }
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});*/

// This is a single context application with mutliple windows in a stack
// (function() {
	// //determine platform and form factor and render approproate components
	// var osname = Ti.Platform.osname,
		// version = Ti.Platform.version,
		// height = Ti.Platform.displayCaps.platformHeight,
		// width = Ti.Platform.displayCaps.platformWidth;
// 	
	// //considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	// //yourself what you consider a tablet form factor for android
	// var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
// 	
	// var Window;
	// if (isTablet) {
		// Window = require('ui/tablet/ApplicationWindow');
	// }
	// else {
		// Window = require('ui/handheld/ApplicationWindow');
	// }
// 
	// var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	// new ApplicationTabGroup(Window).open();
// })();