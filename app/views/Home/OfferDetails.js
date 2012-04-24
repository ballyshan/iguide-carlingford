App.views.OfferDetails = Ext.extend(Ext.Panel, {
    scroll: 'vertical',
    id : 'offer_panel',
    layout : 'fit',
    tpl : ['<div style="text-align : center; padding-top: 72px">',
            '<img src="<tpl if="panelimage && navigator.onLine">',
    App.onlineImageFolder, '{panelimage}</tpl>',
    '<tpl if="!panelimage || !navigator.onLine">',
    'resources/images/', App.offlineHeader, '</tpl>" alt="header"/>',
    '<h1>{[Ext.htmlDecode(values.title)]}</h1>',
    '<p>{[Ext.htmlDecode(values.description)]}</p>',
    '</div>'
    ]
});

Ext.reg('OfferDetails', App.views.OfferDetails);