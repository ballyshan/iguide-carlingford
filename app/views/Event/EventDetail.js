App.views.EventDetails = Ext.extend(Ext.Panel, {
    styleHtmlContent : true,
    scroll: 'vertical',
    layout : 'fit',
    tpl : ['<h1>{event} : {date} to {dateto}</h1>',
        '<p><b>Date From : </b>{date}</p>',
        '<p><b>Date To : </b>{dateto}</p>',
        '<p><b>Event : </b>{event}</p>',
        '<p><b>Description : </b><br/>{[Ext.htmlDecode(values.description)]}</p>',
        '<p>{times}</p>',
        '<p>{venue}</p>',
        '<p>{link}</p>'
    ]
});
Ext.reg('EventDetails', App.views.EventDetails);