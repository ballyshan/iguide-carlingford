App.views.MapPanel = Ext.extend(Ext.Panel, {
    layout : 'fit',
    iconCls: 'locate',
    title: 'Map',
    refreshDelay : 4000, // default delay for auto switcher
    carouselItems : [],
    initComponent: function(){
        if(navigator.onLine){
            this.mapProds = new Ext.Map({
                //styleHtmlContent: true,
                mapOptions: {
                    zoom: 10,
                    center: new google.maps.LatLng(0, 0),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                },
                iconCls: 'locate',
                title: 'Map',
                listeners : {
                    maprender : function(comp, map){
                        var store = Ext.getStore('Products'),
                        settings = Ext.getStore('Settings'),
                        mapMarkerMax = settings.findRecord("variable", "maxMapLocations"),
                        count = 0, maxLocs = parseInt(mapMarkerMax.data.value, 10);
                        var bounds = new google.maps.LatLngBounds();
                        store.each(function(rec){
                            if(count > maxLocs){
                                return false;
                            }
                            var pos = new google.maps.LatLng(rec.get('latitude'), rec.get('longitude'));
                            var marker = new google.maps.Marker({
                                position: pos,
                                map: map,
                                title : rec.get('title'),
                                productId : rec.get('id')
                            });

                            google.maps.event.addListener(marker, 'mousedown', function() {
                                if(marker.productId){
                                    var actionSheet = new App.views.ActionSheetDialog({
                                        recordId : marker.productId,
                                        calledFrom : 'prodMap'
                                    });
                                    actionSheet.show(true);
                                }
                            });
                            bounds.extend(pos);
                            map.fitBounds(bounds);
                            count++;
                        });
                    }

                }
            });

            if(this.carouselItems.length){
                this.bottomCarousel = new App.views.AutoCarousel({
                    itemId: 'carouselBottom',
                    items : [this.carouselItems],
                    height : 12,
                    dock : 'bottom',
                    cardSwitchDelay : this.refreshDelay
                });
                this.dockedItems = [this.bottomCaroulsel];
            }
            this.items = [this.mapProds];
            App.views.MapPanel.superclass.initComponent.call(this);
        }
    }
});

Ext.reg('MapPanel', App.views.MapPanel);

App.views.TabMapList = Ext.extend(Ext.Panel, {
    layout : 'card',
    refreshDelay : 5000, // default delay for auto switcher
    carouselItems : [],

    onBeforeCardSwitch: function(newCard, oldCard, animated) {
        if( App.views.TabMapList.superclass.onBeforeCardSwitch.apply(this, arguments) === false ){
            return false;
        }
        var settings = Ext.getStore("Settings");
        if(newCard.title == "List"){
            if(Ext.Viewport.getOrientation() != 'portrait'){
                App.dispatch({
                    controller: 'Category',
                    action: 'carousel',
                    returnUrl : 'Category/products',
                    animation : {
                        type : 'slide'
                    }
                });
            }
        }
        if(!navigator.onLine){
            if(newCard.title == 'Map'){
                var workingOffline = settings.findRecord("variable", "WorkingOffline"),
                YouMustBeConnectedMap = settings.findRecord("variable", "YouMustBeConnectedMap");
                Ext.Msg.alert(workingOffline.data.value, YouMustBeConnectedMap.data.value, Ext.emptyFn);
                return false;
            }
        }
    },
    initComponent: function(){
        if(navigator.onLine){
            this.mapPanel = new App.views.MapPanel({
                refreshDelay : this.refreshDelay,
                carouselItems : this.carouselItems
            });
        } else {
            this.mapPanel = {
                iconCls: 'locate',
                title: 'Map'
            };
        }
        this.productList = new Ext.List({
            title: 'List',
            iconCls: 'more',
            store: 'Products',
            monitorOrientation : true,
            styleHtmlContent: false,
            itemTpl: ['<table style="width:100%"><tr><td rowspan="2" width="80px">',
            '<img class="location_img" src="<tpl if="panelRight && navigator.onLine">',
            App.onlineImageFolder,
            '{panelRight}</tpl>',
            '<tpl if="!panelRight || !navigator.onLine">',
            'resources/images/', App.offlineLocation,
            '</tpl>" /></td>',
            '<td colspan="2" class="location_title">{[Ext.htmlDecode(values.title)]}',
            '</td></tr><tr><td class="location_desc">',
            '{[Ext.htmlDecode(values.description)]}</td><td><tpl if="dist && navigator.onLine">{dist} Km</tpl></td></tr>',
            '</table>'],
            emptyText : 'Nothing in this category',
            itemDisclosure : true,
            listeners : {
                itemTap : function ( list, index, item, e ){
                    var rec = list.getStore().getAt(index);
                    if(rec){
                        var actionSheet = new App.views.ActionSheetDialog({
                            recordData : rec.data,
                            calledFrom : 'prodList'
                        });
                        actionSheet.show(true);
                    }
                },
                orientationchange : function(){
                    if(!this.hidden){

                        App.dispatch({
                            controller: 'Category',
                            action: 'carousel',
                            returnUrl : 'Category/products',
                            animation : {
                                type : 'slide'
                            }
                        });
                    }
                },
            }
        });

        this.items = [this.productList, this.mapPanel];

        var panel = this;

        this.dockedItems = {
            xtype : 'toolbar',
            dock: 'bottom',
            cls : 'product_toolbar',
            layout: {
                pack: 'center'
            },
            items : [{
                xtype:'button',
                cls : 'btnAction btnBack',
                handler : function(){
                    var products = Ext.getStore("Products"), categories = Ext.getStore("Categories");
                    var prod = products.getAt(0);

                    categories.clearFilter();
                    var cat = categories.findRecord('cat_id', prod.get('cat_id'));

                    App.dispatch({
                        controller: 'Category',
                        action: 'select',
                        historyUrl: 'Category/select',
                        category : cat.get('cat_parent_id'),
                        animation: {
                            type: 'slide',
                            reverse: true
                        }
                    });
                }
            }, {
                xtype:'button',
                cls : 'btnAction btnMap',
                handler : function(){
                    panel.setActiveItem(1);
                }
            },{
                xtype:'button',
                cls : 'btnAction btnList',
                handler : function(){
                    panel.setActiveItem(0);
                }
            },{
                xtype:'button',
                cls : 'btnAction btnOffers',
                handler : function(){
                    var settings = Ext.getStore("Settings");
                    var allDiscountsText = settings.findRecord("variable", "allDiscountsText");

                    App.dispatch({
                        controller: 'Home',
                        action: 'offerList',
                        returnUrl : 'Category/products',
                        title : allDiscountsText.data.value,
                        animation : {
                            type : 'slide'
                        }
                    });
                }
            },{
                xtype:'button',
                cls : 'btnAction btnSearch',
                handler : function(){
                    App.searchBox.show();
                }
            }]
        };

        App.views.TabMapList.superclass.initComponent.call(this);
    }
});

Ext.reg('TabMapList', App.views.TabMapList);

App.views.ProductList = Ext.extend(Ext.Panel, {
    layout: 'card',
    refreshDelay : 5000, // default delay for auto switcher
    carouselTopItems : [],
    carouselBottomItems : [],
    initialTab : 'prodList',
    refresh : function(){
        this.topCarousel = new App.views.AutoCarousel({
            itemId: 'carouselTop',
            items : [this.carouselTopItems],
            height : 124,
            dock : 'top',
            cardSwitchDelay : this.refreshDelay
        });

        this.tabPanel = new App.views.TabMapList({
            refreshDelay : this.refreshDelay,
            carouselItems : this.carouselBottomItems,
            listeners: {
                activate : function(tp){
                    if(navigator.onLine && this.initialTab == 'prodMap'){
                        tp.setActiveItem(1);
                    }
                },
                deactivate: function(view){
                    view.destroy();
                    delete this.tabPanel;
                },
                scope: this
            }
        });

        this.dockedItems = [this.topCarousel];
        this.items = [this.tabPanel];
        //this.scroller.scrollTo({ x: 0, y: 0 });
    },
    initComponent: function(){
        this.refresh();
        App.views.ProductList.superclass.initComponent.call(this);
    }
});

Ext.reg('ProductList', App.views.ProductList);