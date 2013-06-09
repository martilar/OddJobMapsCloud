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
var showEntries = function(view) {
	var Cloud = require('ti.cloud');
	Cloud.debug = true;

	Cloud.Users.showMe(function(e) {
		var claimBtn = new Array();
		var delBtn = new Array();
		if (e.success) {
			var user = e.users[0];
			Ti.API.info('email ' + user.email);
			var myJobs = Cloud.Objects.query({
				classname : 'jobs',
				limit : 1000,

				where : {
					user_id : user.id
				}
			}, function(f) {
				if (f.success) {
					var table = Ti.UI.createTableView({
						width : Ti.UI.FILL,
						height : Ti.UI.FILL,
						layout : 'vertical'
					});
					var rows = new Array();
					for (var i = 0; i < f.jobs.length; i++) {
						var job = f.jobs[i];
						var row = Ti.UI.createTableViewRow({
							//layout : 'horizontal',
							//width : Ti.UI.FILL,
							height : Ti.UI.SIZE,
							id: job.id
						});
						delBtn[i] = Ti.UI.createButton({
							title : 'Delete',
							right : 0,
							width : '15%'
						});
						delBtn[i].addEventListener('click', function() {
							Cloud.Objects.remove({
								classname : 'jobs',
								id : this.parent.id,
							}, function(g) {
								if (g.success) {
									view.removeAllChildren();
									// table.close();
									showEntries(view);
								} else {
									alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
								}
							});
						});
						var label = Ti.UI.createLabel({
							height : Ti.UI.SIZE,
							width : '50%',
							left : 0,
							text : job.description + '  ' + job.wage + '  ' + job.time_estimate + "\n" + job.expiration
						});
						var claimButton;
						var claimColor;
						if (job.claimed == true) {
							claimButton = 'Unclaim';
							claimColor = 'red';
						} else {
							claimButton = 'Claim';
							claimColor = 'green';
						}
						claimBtn[i] = Ti.UI.createButton({
							title : claimButton,
							width : '25%',
							right : '20%',
							backgroundColor : claimColor,
							color : claimColor
						});
						claimBtn[i].addEventListener('click', function() {
							var claimVal;
							if (this.title == 'Claim') {
								claimVal = true;
							} else {
								claimVal = false;
							}
							Ti.API.info("Job: " + this.parent.id);
							Cloud.Objects.update({
								classname : 'jobs',
								id : this.parent.id,
								fields : {
									claimed : claimVal
								}
							}, function(g) {
								if (g.success) {
									view.removeAllChildren();
									// table.close();
									showEntries(view);
								} else {
									alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
								}
							});
						});
						row.add(label);
						row.add(delBtn[i]);
						row.add(claimBtn[i]);
						Ti.API.info(row);
						Ti.API.info(label.text);
						rows.push(row);
					} // end of for each job loop for loop
				} else {//	end of if success loop funcrtion(f)

					alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
				}
				Ti.API.info(row);
				/*table.addEventListener('click', function(e) {
					if (e.source && e.source.objName !== 'table') {
						Ti.API.info('Row swiped: ' + e.source);
						Ti.API.info('Row swiped: ' + e.source.objName);
						Ti.API.info('Row ID : ' + e.source.rowID);
					}
				});*/
				table.data = rows;
				view.add(table);
				Ti.API.info(rows);
				Ti.API.info(table.data);
			});
			//end of function f

		}// end of if e success
		else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
	// end of function e
}// end of show entries function 