App.views.ProductDetails = Ext.extend(Ext.Panel, {
    //styleHtmlContent : true,
    layout : 'fit',
    fullscreen: true,

    initComponent: function(){

        var header = '<div style="text-align: center"><img style="height:124px" src="'
        if(navigator.onLine && this.data.webheader)
            header += App.onlineImageFolder  + this.data.webheader;
        else
            header += 'resources/images/' + App.offlineHeader;
        header += '" alt="header"/></div>';

        var footer = '<div style="text-align: center"><img src="';
        if(navigator.onLine && this.data.webfooter)
            footer += App.onlineImageFolder  + this.data.webfooter;
        else
            footer += 'resources/images/' + App.offlineFooter;
        footer += '" alt="footer"/></div>';

        this.dockedItems = [ { html : header, dock : 'top'},
        { html : footer, dock : 'bottom'}];

        this.items = [{ scroll: 'vertical', layout : 'fit', html :  '<h1>' + Ext.htmlDecode(this.data.title) + '</h1><p>' + Ext.htmlDecode(this.data.webcontent) + '</p>' }]
        App.views.ProductDetails.superclass.initComponent.call(this);
    }
});

Ext.reg('ProductDetails', App.views.ProductDetails);