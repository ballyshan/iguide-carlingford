App.views.AutoCarousel = Ext.extend(Ext.Carousel, {
    indicator : false,
    centered : true,
    layout : 'card',

    cardSwitchDelay : 5000, //defalt to 5 secs

    listeners:{
        autoNextCard:function(){
            if(this.getActiveIndex() == this.items.length -1){
                this.setActiveItem(0,'slide');
            }
            else{
                this.next();
            }
            this.autoNext.delay(this.cardSwitchDelay);
        },
        startRotation:function(){
            this.autoNext.delay(this.cardSwitchDelay);
        },
        exitConditionEvent:function(){
            this.autoNext.cancel();
        },
        activate : function(){
            this.fireEvent('startRotation');
        },
        afterrender:function(c){
            c.autoNext = new Ext.util.DelayedTask(function(){
                c.fireEvent('autoNextCard');
            }, c);
            c.fireEvent('startRotation');
        }
    }
});
Ext.reg('AutoCarousel', App.views.AutoCarousel);

App.views.CarouselCard = Ext.extend(Ext.Panel, {
    tpl: ['<div style="text-align:center">',
        '<img src="<tpl if="panelRight && navigator.onLine">',
        App.onlineImageFolder,
        '{panelRight}</tpl>',
        '<tpl if="!panelRight || !navigator.onLine">',
        'resources/images/', App.offlineLocation,
        '</tpl>" alt="{panelRight}" title="{title}" /></div>']
});
Ext.reg('CarouselCard', App.views.CarouselCard);
