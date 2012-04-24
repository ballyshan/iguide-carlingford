Ext.regController('Category', {

    // index action
    index: function(options)
    {
        if(!App.LoadComplete){
            App.dispatch({
                controller: 'Home',
                action: 'welcome',
                historyUrl: 'Home/welcome',
                returnUrl : 'Category/index',
                animation: {
                    type: 'slide'
                }
            });
            return;
        }

        this.parent_category = null;
        var store = Ext.getStore("Categories");
        store.clearFilter();
        store.filterBy(function(cat, id){
            if(cat.data.cat_parent_id == null || cat.data.cat_parent_id === 0){
                return cat;
            }
        });

        store.sort("cat_name", "asc");

        if (!this.indexView)
        {
            var settings = Ext.getStore("Settings");
            var searchText = settings.findRecord("variable", "searchText");
            this.indexView = this.render({
                xtype: 'CategoryIndex',
                searchText : searchText.data.value,
                listeners : {
                    afterrender : function(){
                        App.unmask();
                    }
                }
            });

        }else{
            this.indexView.refresh();
        }

        Ext.getCmp('viewportToolbar').show();
        var backBtn = this.application.viewport.query('#backBtn')[0];
        backBtn.show();

        backBtn.setHandler(function()
        {
            store.clearFilter();

            App.dispatch({
                controller: 'Home',
                action: 'index',
                historyUrl: 'Home/index',
                //
                animation: {
                    type: 'slide',
                    reverse: true
                }
            });
        });

        this.application.viewport.setActiveItem(this.indexView, options.animation);
        App.viewport.doComponentLayout();
    },

    select: function(options)
    {
        if(!App.LoadComplete){
            App.dispatch({
                controller: 'Home',
                action: 'welcome',
                historyUrl: 'Home/welcome',
                returnUrl : 'Category/index',
                animation: {
                    type: 'slide'
                }
            });
            return;
        }
        if (!options.category)
        {
            Ext.redirect('Category/index');
            return;
        }

        var store = Ext.getStore("Categories");
        store.clearFilter();

        store.filterBy(function(cat, id){
            if(cat.data.cat_parent_id && cat.data.cat_parent_id === options.category){
                return cat;
            }
        });
        var count = store.getCount();
        if(count == 0){
            var prodStore = Ext.getStore('Products');
            prodStore.clearFilter();
            //prodStore.filter('cat_id', options.category);
            prodStore.filterBy(function(prod, id){
                if(prod.data.cat_id && prod.data.cat_id === options.category){
                    return prod;
                }
            });
            count = prodStore.getCount()
            if(count){
                App.dispatch({
                    controller: 'Category',
                    action: 'products',
                    historyUrl: 'Category/products',
                    category : this.parent_category,
                    animation: {
                        type: 'slide'
                    }
                });
                return;
            }else{
                store.clearFilter();
                //store.filter('cat_parent_id', this.parent_category || 0);
                var parentCategory = this.parent_category || 0;
                store.filterBy(function(cat, id){
                    if(cat.data.cat_parent_id == parentCategory){
                        return cat;
                    }
                });
                Ext.Msg.alert('No Locations', "There is no data for this category", Ext.emptyFn);
                return;
            }
        }

        Ext.getCmp('viewportToolbar').show();
        var backBtn = this.application.viewport.query('#backBtn')[0];
        backBtn.show();

        backBtn.setHandler(function()
        {
            store.clearFilter();
            if(this.parent_category){

                App.dispatch({
                    controller: 'Category',
                    action: 'select',
                    historyUrl: 'Category/select',
                    category : this.parent_category,
                    animation: {
                        type: 'slide',
                        reverse: true
                    }
                });
            }else{

                App.dispatch({
                    controller: 'Category',
                    action: 'index',
                    historyUrl: 'Category/index',
                    animation: {
                        type: 'slide',
                        reverse: true
                    }
                });
            }
        });

        this.parent_category = options.category;
        this.indexView.refresh();


        this.application.viewport.setActiveItem(this.indexView, {
            type: 'slide',
            direction: 'left'
        });
        App.viewport.doComponentLayout();

    },

    products : function(options){
        if(!App.LoadComplete){

            App.dispatch({
                controller: 'Home',
                action: 'welcome',
                historyUrl: 'Home/welcome',
                returnUrl : 'Category/index',
                animation: {
                    type: 'slide'
                }
            });
            return;
        }

        var store = Ext.getStore('Products');
        if(navigator.onLine){
            store.UpdateDistance();
            store.sort("dist", "asc");
        } else {
            store.sort("title", "asc");
        }
        var carouselTopItems = [], carouselBottomItems = [],
        advertFilter = function(item) {
            if(item.data.panelRight.length && item.data.package_id === 3 && item.data.active && new Date(item.data.dateRenew) >= new Date()){
                return item;
            }
        },
        textFilter = function(item){
            if(item.data.panelPlainText.length && item.data.package_id === 2 && item.data.active && new Date(item.data.dateRenew) >= new Date()){
                return item
            }
        },
        itemsTop = store.queryBy(advertFilter),
        itemsText = store.queryBy(textFilter);

        if(itemsTop.length == 0){
            if(!store.snapshot){
                store.load();
            }
            itemsTop = store.snapshot.filterBy(advertFilter);
        }
        if(itemsTop.length == 0){
            carouselTopItems.push({
                xtype : 'CarouselCard',
                data : { panelRight : '', title : ''}
            });
        }else{
        itemsTop.each(function(rec){
            carouselTopItems.push({
                xtype : 'CarouselCard',
                data : rec.data,
                listeners: {
                    body: {
                        tap: function(event, target) {
                            var actionSheet = new App.views.ActionSheetDialog({
                                recordData : rec.data
                            });
                            actionSheet.show(true);
                        }
                    }
                }
            });
        });
        }
        if(itemsText.length == 0){
            itemsText = store.snapshot.filterBy(textFilter);
        }
        itemsText.each(function(rec){
            var img = rec.get('panelRight');
            carouselBottomItems.push({
                html : '<p>' + rec.get('panelPlainText') + '</p>'
            });
        });

        var settings = Ext.getStore('Settings'),
        val = settings.findRecord("variable", "partnerRefresh"),
        refresh = parseInt(val.get('value'), 10) * 1000;

        if(!this.productsView){
            this.productsView = this.render({
                xtype : 'ProductList',
                refreshDelay : refresh,
                carouselTopItems : carouselTopItems,
                carouselBottomItems : carouselBottomItems,
                initialTab : options.visibleTab || 'prodList',
                listeners: {
                    activate : function(){
                        App.unmask();
                    },
                    deactivate: function(view){
                        this.productsView.destroy();
                        delete this.productsView;
                    },
                    scope: this
                }
            });
            App.searchBox = this.render({
                xtype : 'SearchPopup'
            });
        }

        var prod = store.first();
        //var backBtn = this.application.viewport.query('#backBtn')[0];
        //backBtn.show();
        Ext.getCmp('viewportToolbar').hide();

        /*backBtn.setHandler(function()
        {
            store.clearFilter(false);
            var catStore = Ext.getStore('Categories');
            catStore.clearFilter();
            var cat = catStore.findRecord('cat_id', prod.get('cat_id'));

            Ext.dispatch({
                controller: 'Category',
                action: 'select',
                historyUrl: 'Category/select',
                category : cat.get('cat_parent_id'),
                animation: {
                    type: 'slide',
                    reverse: true
                }
            });
        });*/

        this.application.viewport.setActiveItem(this.productsView, {
            type: 'slide',
            direction: 'left'
        });
        //this.productsView.doLayout();
        //App.viewport.doLayout();
        App.viewport.doComponentLayout();
    },

    carousel : function(options){
        if(!App.LoadComplete){

            App.dispatch({
                controller: 'Home',
                action: 'welcome',
                historyUrl: 'Home/welcome',
                returnUrl : 'Category/index',
                animation: {
                    type: 'slide'
                }
            });
            return;
        }

        var prodCarouselItems = [],
        products = Ext.getStore('Products');
        products.sort("dist", "asc");
        products.sort("title", "asc");
        products.each(function(prod){
            prodCarouselItems.push({
                xtype : 'CarouselCard',
                data : prod.data,
                dockedItems : [{
                    xtype : 'toolbar',
                    title : prod.data.title
                }],
                tpl : ['<div style="text-align:center">',
                '<img src="<tpl if="panelRight && navigator.onLine">',
                App.onlineImageFolder,
                '{panelRight}</tpl>',
                '<tpl if="!panelRight || !navigator.onLine">',
                'resources/images/', App.offlineLocation,
                '</tpl>" alt="{panelRight}" title="{title}" />',
                '<tpl if="dist && navigator.onLine">',
                '<p>{dist} km</p></tpl>',
                '{[Ext.htmlDecode(values.description)]}</div>'],
                listeners: {
                    activate : function(){
                        App.viewport.doComponentLayout();
                    },
                    body: {
                        tap: function(event, target) {
                            var actionSheet = new App.views.ActionSheetDialog({
                                recordData : prod.data,
                                calledFrom : 'prodList'
                            });
                            actionSheet.show(true);
                        }
                    }
                }
            });
        });

        this.productCarousel = this.render({
            xtype : 'carousel',
            title: 'List',
            iconCls: 'more',
            centered : true,
            layout : 'card',
            monitorOrientation : true,
            items : [prodCarouselItems],
            listeners: {
                orientationchange : function(){
                    if(!this.hidden){
                        Ext.redirect('Category/products');
                    }
                },
                activate : function(){
                    App.viewport.doComponentLayout();
                    App.unmask();
                },
                deactivate: function(view){
                    view.destroy();
                    delete this.productCarousel;
                },
                scope: this
            }
        });

        Ext.getCmp('viewportToolbar').show();
        var prod = products.first(),
        backBtn = this.application.viewport.query('#backBtn')[0];
        backBtn.show();

        backBtn.setHandler(function()
        {
            products.clearFilter(false);
            var catStore = Ext.getStore('Categories');
            catStore.clearFilter();
            var cat = catStore.findRecord('cat_id', prod.get('cat_id'));

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
        });

        this.application.viewport.setActiveItem(this.productCarousel, {
            type: 'slide',
            direction: 'left'
        });
    },

    search : function(options){
        if(!options.searchTerm){
            Ext.redirect("Category/products");
        }

        if(options.searchTerm && options.searchTerm.length){
            var products = Ext.getStore('Products');
            if(!options.searchType)
                products.clearFilter();
            var searchRegEx = new RegExp(options.searchTerm, "i");
            products.filterBy(function(record){
                var found = false;
                found = found || record.data.title.search(searchRegEx) > -1;
                found = found || record.data.cname.search(searchRegEx) > -1;
                found = found || record.data.address.search(searchRegEx) > -1;
                found = found || record.data.description.search(searchRegEx) > -1;
                found = found || record.data.webcontent.search(searchRegEx) > -1;
                if(found) return record;
            });
            if(products.getCount() > 0){
                if(options.searchType){
                    this.application.viewport.getActiveItem().fireEvent("deactivate");
                }

                App.dispatch({
                    controller: 'Category',
                    action: 'products',
                    historyUrl: 'Category/products',
                    category : 0,
                    animation: {
                        type: 'slide'
                    }
                });
            }
            else{
                products.clearFilter();
                var msg = App.noLocationSearch.replace('{searchTerm}', options.searchTerm);
                Ext.Msg.alert(App.noLocations, msg, Ext.emptyFn);
            }
        }

    },

    product : function(options){
        if(!options.product){
            Ext.redirect("Category/products");
            return;
        }

        if(!App.LoadComplete){
            App.dispatch({
                controller: 'Home',
                action: 'welcome',
                historyUrl: 'Home/welcome',
                returnUrl : 'Category/index',
                animation: {
                    type: 'slide'
                }
            });
            return;
        }

        var cardToShow;
        if(options.product.showcaseTrue){

            this.productShowCase = this.render({
                xtype: 'ShowCaseView',
                data : options.product,
                listeners :{
                    deactivate : function(view){
                        view.destroy();
                        delete this.productDetails;
                    },
                    activate : function(view){
                        App.unmask();
                        view.doComponentLayout();
                    }
                }
            });

            cardToShow = this.productShowCase;
        }else{

            this.productDetails = this.render({
                xtype: 'ProductDetails',
                data : options.product,
                listeners :{
                    deactivate : function(view){
                        view.destroy();
                        delete this.productDetails;
                    },
                    activate : function(view){
                        view.doComponentLayout();
                        App.unmask();
                    }
                }
            });

            cardToShow = this.productDetails
        }

        Ext.getCmp('viewportToolbar').show();
        var backBtn = this.application.viewport.query('#backBtn')[0];
        backBtn.show();

        backBtn.setHandler(function()
        {
            App.dispatch({
                controller: 'Category',
                action: 'products',
                historyUrl: 'Category/products',
                category : options.product.cat_id,
                visibleTab : options.visibleTab || 'prodMap',
                animation: {
                    type: 'slide',
                    reverse: true
                }
            });
        });

        this.application.viewport.setActiveItem(cardToShow, { type: 'slide', direction: 'left' });

        App.viewport.doComponentLayout();
    }
});