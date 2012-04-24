App.views.HomeIndex = Ext.extend(Ext.Panel, {
    layout : 'fit',
    initComponent : function(){
        var store = Ext.getStore('MenuItems');
        var list = new App.views.NavMenu({});

        list.bindStore(store);
        this.items = [list];
        App.views.HomeIndex.superclass.initComponent.call(this);
    }
});
Ext.reg('HomeIndex', App.views.HomeIndex);