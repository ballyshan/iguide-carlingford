App.views.NavMenu = Ext.extend(Ext.List, {
    store: null,
    centered : true,
    itemTpl: ['<tpl if="!navigator.onLine || !link">{text}</tpl>',
        '<tpl if="navigator.onLine && link">',
        '<a class="linkAsText" href="{link}" target="_blank" >{text}</a>',
        '</tpl>'],
    disableSelection : true,
    onItemDisclosure : true,
    layout : 'auto',
    listeners : {
        itemTap : function ( list, index, item, e ){
            var rec = list.getStore().getAt(index);
            if(rec){
                if(rec.data.action){
                    var history = rec.data.action == 'booka' || rec.data.action == 'offers' ? 'Home/index' : rec.data.controller+ '/' + rec.data.action;
                    
                    App.dispatch({
                        controller: rec.data.controller,
                        action: rec.data.action,
                        historyUrl: history,
                        animation: {
                            type: 'slide'
                        }
                    });

                } else if (rec.data.link){
                    if(navigator.onLine){
                        return false;
                        //window.location = rec.data.link;
                    } else {
                        var workingOffline = Ext.getStore("Settings").findRecord("variable", "WorkingOffline");
                        Ext.Msg.alert(workingOffline.data.value, App.actionNotAvailable, Ext.emptyFn);
                    }
                } else {
                    Ext.Msg.alert(App.notAvailable, App.actionNotAvailable, Ext.emptyFn)
                }
            }
        }
    }
});

Ext.reg('NavMenu', App.views.NavMenu);