function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();

	//create app tabs
	var win1 = Titanium.UI.createWindow({
		title : 'User Authentication Demo',
		tabBarHidden : true,
		url : 'login.js'
	});
	
	var win2 = new Window(L('settings'));

	var tab1 = Ti.UI.createTab({
		title : L('home'),
		icon : '/images/KS_nav_ui.png',
		window : win1
	});
	win1.containingTab = tab1;

	var tab2 = Ti.UI.createTab({
		title : L('settings'),
		icon : '/images/KS_nav_views.png',
		window : win2
	});
	win2.containingTab = tab2;

	self.addTab(tab1);
	self.addTab(tab2);

	return self;
};

module.exports = ApplicationTabGroup;
