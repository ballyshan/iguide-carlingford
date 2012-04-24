App.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',

    dockedItems: [{
        xtype: 'toolbar',
        itemId: 'viewportToolbar',
        id : 'viewportToolbar',
        cls: 'viewport-toolbar',
        hidden: true,
        height : '77',
        items: [{
            itemId: 'backBtn',
            cls : 'backBtn'
        }]
    }]
});