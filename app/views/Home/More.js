App.views.HomeMore = Ext.extend(Ext.Panel, {
    listitems : [],
	//styleHtmlContent: true,
	initComponent : function(){
		//var store = new Ext.data.Store({ model : 'menuItem', data : this.listitems});
		this.items = [{xtype : 'NavMenu', store : 'MoreMenuStore'}];
		App.views.HomeMore.superclass.initComponent.call(this);
	}
});
Ext.reg('HomeMore', App.views.HomeMore);