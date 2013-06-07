exports.createNavWin = function(){
	
	var win = Ti.UI.createWindow({
		layout : 'vertical',
		backgroundColor : 'white',
	});
	
	var mapBtn = Ti.UI.createButton({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		title : 'MAP VIEW'
	});
	
	win.add(mapBtn);
	
	var postBtn = Ti.UI.createButton({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		title : 'POST A JOB'
	});
	
	win.add(postBtn);
	
};
