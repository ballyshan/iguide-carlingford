App.views.NewsDetails = Ext.extend(Ext.Panel, {
    scroll: 'vertical',
    styleHtmlContent: true,
    layout : 'fit',
    tpl : ['<h1>{title}</h1>',
        '<p>{date}</p>',
        '<p>{[Ext.htmlDecode(values.description)]}</p>',
        '<p>{venue}</p>'
    ]
});
Ext.reg('NewsDetails', App.views.NewsDetails);