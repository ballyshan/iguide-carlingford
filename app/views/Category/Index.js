App.views.CategoryIndex = Ext.extend(Ext.Panel, {
    layout : 'fit',
    searchText : 'Please enter text for search:',
    refresh : function(){
        this.items.getAt(0).scroller.scrollTo({x: 0, y: 0});
        App.unmask();
    },
    initComponent : function(){
        var panel = this;
        this.dockedItems = [{
            xtype: 'toolbar',
            dock : 'top',
            ui : 'light',
            itemId : 'searchBar',
            items: [{
                xtype: 'searchfield',
                itemId: 'searchField',
                placeHolder: panel.searchText,
                flex: 1,
                listeners: {
                    keyup: function(thisField, e) {
                        var key = e.browserEvent.keyCode;
                        if(key === 13 || key === 10){
                            App.dispatch({
                                controller: 'Category',
                                action: 'search',
                                historyUrl: 'Category/products',
                                searchTerm : App.viewport.query('#searchField')[0].getValue(),
                                animation: {
                                    type: 'slide',
                                }
                            });
                        }
                    }
                }
            },
            {
                itemId: 'searchBtn',
                iconCls: 'search',
                iconMask: true,
                ui: 'action',
                handler : function (btn, e){
                    App.dispatch({
                        controller: 'Category',
                        action: 'search',
                        historyUrl: 'Category/products',
                        searchTerm : App.viewport.query('#searchField')[0].getValue(),
                        animation: {
                            type: 'slide',
                        }
                    });
                }
            }]
        }]
         App.views.CategoryIndex.superclass.initComponent.call(this);
    },
    items : [new Ext.List({
        store: 'Categories',
        itemTpl: '{cat_name}',
        onItemDisclosure : true,
        listeners : {
            itemTap : function ( list, index, item, e ){
                var rec = list.getStore().getAt(index);
                if(rec){
                    App.dispatch({
                        controller: 'Category',
                        action: 'select',
                        category: rec.get('cat_id'),
                        historyUrl: 'Category/select',
                        animation: {
                            type: 'slide'
                        }
                    });
                }
            },
            render : function(list){
                var store = list.getStore();
                if(!store.data.length){
                    store.load();
                }
            }
        }

    })]
});
Ext.reg('CategoryIndex', App.views.CategoryIndex);
