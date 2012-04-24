App.views.SearchPopup = Ext.extend(Ext.Panel, {
    floating: true,
    centered: true,
    modal: true,
    cls : 'searchpopup',
    layout: {
        type : 'vbox',
        pack : 'center'
    },
    title : App.search,
    defaults: {
        xtype: 'button'
    },
    listeners : {
        activate : function(){
            App.searchBox.query('#prodSearchField').focus();
        },
        keyup: function(thisField, e) {
            var key = e.browserEvent.keyCode;
            if(key === 13 || key === 10){//This doesn't pick up the go button from keyboard must fix'
                App.dispatch({
                    controller: 'Category',
                    action: 'search',
                    historyUrl: 'Category/products',
                    searchTerm : App.viewport.query('#searchField')[0].getValue(),
                    animation: {
                        type: 'slide',
                    }
                });
                App.searchBox.query('#prodSearchField')[0].setValue("");
                App.searchBox.hide();
            }
        }
    },
    dockedItems : [{
        xtype : 'toolbar',
        title : App.search,
        dock : 'top'
    }],
    items : [{
        xtype: 'searchfield',
        itemId: 'prodSearchField',
        flex: 1
    },
    {
        itemId: 'prodSearchBtn',
        iconCls: 'search',
        iconMask: true,
        title : App.search,
        ui: 'action',
        handler : function (btn, e){
            App.dispatch({
                controller: 'Category',
                action: 'search',
                historyUrl: 'Category/products',
                searchTerm : App.searchBox.query('#prodSearchField')[0].getValue(),
                searchType : "inner",
                animation: {
                    type: 'slide',
                }
            });
            App.searchBox.query('#prodSearchField')[0].setValue("");
            App.searchBox.hide();
        }
    }]
});

Ext.reg('SearchPopup', App.views.SearchPopup);