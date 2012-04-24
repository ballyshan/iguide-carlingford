Ext.regController('Home', {

    welcome : function(options){
        if(App.LoadComplete){
            App.afterLoadGoTo(options.returnUrl);
        }
        else{
            var backBtn = this.application.viewport.query('#backBtn')[0];
            backBtn.hide();

            App.mask();
            var loadingpanel = new Ext.Panel({
                html: '<div style="text-align:center"><img src="'+ App.phoneStartupScreen +'" alt="loading" /></div>',
                listeners:{
                    checkStore:function(){

                        if(App.LoadComplete){
                            App.afterLoadGoTo(options.returnUrl);
                        }
                        else{
                            this.autoCheck.delay(5000);
                        }
                    },
                    startRotation:function(){
                        this.autoCheck.delay(5000);
                    },
                    exitConditionEvent:function(){
                        this.autoCheck.cancel();
                    },
                    afterrender:function(){
                        this.autoCheck = new Ext.util.DelayedTask(function(){
                            this.fireEvent('checkStore');
                        }, this);
                        this.fireEvent('checkStore');
                    }
                }
            });
            this.application.viewport.setActiveItem(loadingpanel, options.animation);

        }
    },
    // index action
    index: function(options)
    {
        if (!this.indexView)
        {
            this.indexView = this.render({
                xtype: 'HomeIndex',
                listeners : {
                    activate : function(){
                        App.unmask();
                    }
                }
            });
        }
        Ext.getCmp('viewportToolbar').setVisible(true);
        var backBtn = this.application.viewport.query('#backBtn')[0];
        backBtn.hide();


        this.application.viewport.setActiveItem(this.indexView, options.animation);
        App.viewport.doComponentLayout();
    },

    taxi : function(options){
        var products = Ext.getStore('Products');
        var rec = products.findRecord('taxiSponsorTrue', true);
    },

    offerDetails : function(options){
        if(!options.offer){
            Ext.redirect("Home/index");
        }

        if(!this.offerDetailsView){
            this.offerDetailsView = this.render({
                xtype : 'OfferDetails',
                data : options.offer,
                listeners : {
                    activate : function(){
                        App.unmask();
                    }
                }
            });
        }else {
            this.offerDetailsView.update(options.offer);
        }
        var backBtn = this.application.viewport.query('#backBtn')[0];
        Ext.getCmp('viewportToolbar').setVisible(true);
        backBtn.show();

        backBtn.setHandler(function()
        {
            var returnAction = options.returnUrl || 'Home/index',
            allDiscountsText = Ext.getStore('Settings').findRecord('variable', 'allDiscountsText'),
            parts = returnAction.split('/');

            App.dispatch({
                controller: parts[0],
                action: parts[1],
                historyUrl: returnAction,
                title : allDiscountsText.data.value,
                animation: {
                    type: 'slide',
                    reverse: true
                }
            });
        });
        this.application.viewport.setActiveItem(this.offerDetailsView, options.animation);
        App.viewport.doComponentLayout();
    },

    offerList : function(options){

        var deals = Ext.getStore("Deals"),
            products = Ext.getStore("Products"),
            carouselItems = [];

        if(navigator.onLine){
            App.geo.updateLocation(function(){products.UpdateDistance();});
        }
        deals.each(function(deal){
            var prod = products.getById(deal.data.locationidlink);
            if(prod){
                deal.data.dist = prod.data.dist;
            }
        });
        deals.sort('dist', 'asc');
        if(!this.OfferList){
            this.OfferList = this.render({
                xtype : 'AdvertList',
                monitorOrientation : true,
                store : 'Deals',
                title : options.title,
                listeners: {
                    activate : function(){
                        App.unmask();
                    },
                    orientationchange : function(){
                        if(!this.hidden){
                            Ext.redirect('Home/offerList');
                        }
                    }
                }
            });
        }

        if(!this.offerCarousel){

            deals.each(function(deal){
                carouselItems.push({
                    xtype : 'CarouselCard',
                    data : deal.data,
                    dockedItems : [{
                        xtype : 'toolbar',
                        title : deal.data.title
                    }],
                    tpl : ['<div style="text-align:center">',
                    '<img src="<tpl if="panelimage && navigator.onLine">',
                    App.onlineImageFolder,
                    '{panelimage}</tpl>',
                    '<tpl if="!panelimage || !navigator.onLine">',
                    'resources/images/', App.offlineLocation,
                    '</tpl>" alt="{panelimage}" title="{title}" />',
                    '{[Ext.htmlDecode(values.description)]}</div>'],
                    listeners: {
                        body: {
                            tap: function(event, target) {
                                App.dispatch({
                                    controller: 'Home',
                                    action: 'offerDetails',
                                    offer: deal.data,
                                    historyUrl: 'Home/offerDetails',
                                    returnUrl : 'Home/offerList',
                                    animation: {
                                        type: 'slide'
                                    }
                                });
                            }
                        }
                    }
                });
            });

            this.offerCarousel = this.render({
                xtype : 'carousel',
                centered : true,
                layout : 'card',
                monitorOrientation : true,
                items : [carouselItems],
                listeners: {
                    activate : function(){
                        App.unmask();
                    },
                    orientationchange : function(){
                        if(!this.hidden){
                            App.dispatch({
                                controller: 'Home',
                                action: 'offerList',
                                returnUrl : options.returnUrl || 'Home/index',
                                animation : {
                                    type : 'slide'
                                }
                            });
                        }
                    }
                }
            });
        }
        var backBtn = this.application.viewport.query('#backBtn')[0];
        Ext.getCmp('viewportToolbar').setVisible(true);
        backBtn.show();

        backBtn.setHandler(function()
        {
            var returnAction = options.returnUrl || 'Home/index',
            parts = returnAction.split('/');

            App.dispatch({
                controller: parts[0],
                action: parts[1],
                historyUrl: returnAction,
                animation: {
                    type: 'slide',
                    reverse: true
                }
            });
        });
        var view = Ext.Viewport.getOrientation() == 'portrait' ? this.OfferList : this.offerCarousel;

        this.application.viewport.setActiveItem(view, options.animation);
        App.viewport.doComponentLayout();
    },

    offerMap : function(options){
        if(!this.OfferMap){
            if(!navigator.onLine){
                var settings = Ext.getStore("Settings"),
                workingOffline = settings.findRecord("variable", "WorkingOffline"),
                YouMustBeConnectedMap = settings.findRecord("variable", "YouMustBeConnectedMap");
                Ext.Msg.alert(workingOffline.data.value, YouMustBeConnectedMap.data.value, Ext.emptyFn);
                return false;
            } else {
                App.geo.updateLocation();
                Ext.getStore("Products").UpdateDistance();
            }

            this.OfferMap = this.render({
                xtype : 'OfferMap',
                title : options.title,
                listeners: {
                    deactivate: function(view){
                        view.destroy();
                        delete this.OfferMap;
                    },
                    activate : function(){
                        App.unmask();
                    },
                    scope: this
                }
            })
        }

        var backBtn = this.application.viewport.query('#backBtn')[0];
        Ext.getCmp('viewportToolbar').setVisible(true);
        backBtn.show();

        backBtn.setHandler(function()
        {
            App.dispatch({
                controller: 'Home',
                action: 'index',
                historyUrl: 'Home/index',
                animation: {
                    type: 'slide',
                    reverse: true
                }
            });
        });
        this.application.viewport.setActiveItem(this.OfferMap, options.animation);
    },

    offers : function(options){
        var settings = Ext.getStore('Settings'),
        allDiscountsText = settings.findRecord("variable", "allDiscountsText");

        if (!this.offerMenu)
        {
            Ext.getStore('Deals').load();
            this.offerMenu = this.render({
                xtype : 'PopupWindow',
                title : allDiscountsText.data.value
            });
        }
        this.offerMenu.show({ type : 'slide', direction : 'up' });
    },

    booka : function (options){
        var ctrl = this;
        if (!ctrl.bookingView)
        {
            var store = Ext.getStore('Settings'),
            bookOnlineText = store.findRecord("variable", "bookOnlineText"),
            trainsOptionText = store.findRecord("variable", "trainsOptionText"),
            bookTrainUrl = store.findRecord("variable", "bookTrainUrl"),
            bookRestaurantUrl = store.findRecord("variable", "bookRestaurantUrl"),
            bookHotelUrl = store.findRecord("variable", "bookHotelUrl");
            this.bookingView = this.render({
                xtype : 'PopupWindow',
                title : bookOnlineText.data.value,
                items : [
                {
                    text : 'Book ' + trainsOptionText.data.value,
                    ui : 'round',
                    handler : function(){
                        window.open(bookTrainUrl.data.value);
                        ctrl.bookingView.hide();
                    }
                },

                {
                    text : 'Book Restaurant',
                    ui : 'round',
                    handler : function(){
                        window.open(bookRestaurantUrl.data.value);
                        ctrl.bookingView.hide();
                    }
                },

                {
                    text : 'Book Hotel',
                    ui : 'round',
                    handler : function(){
                        window.open(bookHotelUrl.data.value);
                        ctrl.bookingView.hide();
                    }
                },

                {
                    text : 'Book Taxi',
                    ui : 'round',
                    handler : function(){
                        App.dispatch({
                            controller: 'Home',
                            action: 'taxi'
                        });
                        ctrl.bookingView.hide();
                    }
                }]
            });
        }
        this.bookingView.show({
            type : 'slide',
            direction : 'up'
        });
    },
    destinations : function(options)
    {
        if (!this.destinationsView)
        {
            this.destinationsView = this.render({
                xtype: 'list',
                store : 'Destinations',
                itemTpl : '<a class="linkAsText" href="{url}" target="_blank" >{title}</a>',
                onItemDisclosure : true,

                listeners :{
                    activate : function(){
                        App.unmask();
                    }
                }
            });
        }
        var toolbar = this.application.viewport.query('#viewportToolbar')[0],
            backBtn = this.application.viewport.query('#backBtn')[0];
        toolbar.show();
        backBtn.show();

        backBtn.setHandler(function()
        {

            App.dispatch({
                controller: 'Home',
                action: 'index',
                historyUrl: 'Home/index',
                animation: {
                    type: 'slide',
                    reverse: true
                }
            });
        });

        this.application.viewport.setActiveItem(this.destinationsView, options.animation);
    },

    more: function(options)
    {
        if (!this.moreView)
        {
            this.moreView = this.render({
                xtype: 'HomeMore'
            });
        }
        var toolbar = this.application.viewport.query('#viewportToolbar')[0],
            backBtn = this.application.viewport.query('#backBtn')[0];
        toolbar.show();
        backBtn.show();

        backBtn.setHandler(function()
        {
            App.dispatch({
                controller: 'Home',
                action: 'index',
                historyUrl: 'Home/index',
                animation: {
                    type: 'slide',
                    reverse: true
                }
            });
        });

        this.application.viewport.setActiveItem(this.moreView, options.animation);
    }
});