
var dat = require('/dat');
var login = require('/ui/common/login');

exports.createManageWindow = function() {
	var Cloud = require('ti.cloud');
	Cloud.debug = true;
	var token = dat.getMyStoredAccessToken();
	// Create a user
	// ACS app must be configured to use 3-legged OAuth
	if (token) {

		Cloud.accessToken = token;
		// Ti.App.fireEvent('loggedIn',{});

	} else {

		login.createLoginWindow();

	}
	
	var win = Ti.UI.createWindow({
		title : 'Manage Jobs',
		backgroundColor : "white",
		layout : 'vertical'
	});
	
	var view = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : '95%'
	});
	
	win.add(view);
	
	showEntries(view);
	
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

var showEntries = function(view){
	var Cloud = require('ti.cloud');
	Cloud.debug = true;
	
	Cloud.Users.showMe(function(e){
		if (e.success) {
			var user = e.users[0];
			Ti.API.info('email '+user.email);
			var myJobs = Cloud.Objects.query({
				classname : 'jobs',
				limit : 1000,

				where : { 
					user_id : user.id
				}	
			}, function(f) {	
				if (f.success) {
					var scroll = Ti.UI.createScrollView({
						width : Ti.UI.FILL,
						height : Ti.UI.FILL,
						layout : 'vertical'
					});
					var rows = new Array();
					for (var i = 0 ; i < f.jobs.length ; i++ ){
						var job = f.jobs[i];
						var bar = Ti.UI.createView({
							layout : 'horizontal',
							width : Ti.UI.FILL,
							height : 60	
						});
						scroll.add(bar);
						var delBtn = Ti.UI.createButton({
							title : 'delete',
							width : '10%'
						});
						delBtn.addEventListener('click', function(){
							Cloud.Objects.remove({
								classname : 'jobs',
								id : job.id
							}, function(g) {
								if(g.success){
									scroll.close();
									showEntries(view);	
								}	else {
									alert('Error:\n' +
           							 ((e.error && e.message) || JSON.stringify(e)));	
								}
							});
						});
						bar.add( delBtn);
						view.add( Ti.UI.createLabel({
							width : '80%',
							text: job.description +'  '+job.wage+'  '+job.time_estimate+"\n"+job.expiration+'  Claimed '+job.claimed
						}));
						
						
						var claimBtn = Ti.UI.createButton({
							title :'mark claimed',
							width : '10%'
						});
						claimBtn.addEventListener('click', function(){
							Cloud.Objects.update({
								classname : 'jobs',
								id : job.id,
								fields:{
									claimed : true
								}
							}, function(g) {
								if(g.success){
									scroll.close();
									showEntries(view);	
								}	else {
									alert('Error:\n' +
           							 ((e.error && e.message) || JSON.stringify(e)));	
								}
							});
						});
						bar.add( claimBtn);			
					} // end of for each job loop for loop
				}else{	//	end of if success loop funcrtion(f)
					
					alert('Error:\n' +
   				 ((e.error && e.message) || JSON.stringify(e)));				
				}
			}); //end of function f
		}// end of if e success	
		 else{
			alert('Error:\n' +
           	 ((e.error && e.message) || JSON.stringify(e)));
    	}	
	}); // end of function e
}// end of show entries function 