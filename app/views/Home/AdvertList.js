App.views.AdvertList = Ext.extend(Ext.Panel, {
    layout : 'fit',
    title: '',
    store : null,
    initComponent : function(){
        this.dockedItems = [new Ext.Toolbar({
            title : this.title + ' ' + App.list
        })];

        this.items = [{
            xtype : 'list',
            store : this.store,
            onItemDisclosure : true,
            itemTpl : ['<table style="width:100%"><tr><td style="width:70%">{title}</td>',
            '<td><tpl if="navigator.onLine">{dist} km</tpl></td></tr>',
            '</table>'],
            listeners : {
                itemTap : function ( list, index, item, e ){
                    var rec = list.getStore().getAt(index);
                    if(rec){
                        Ext.dispatch({
                            controller: 'Home',
                            action: 'offerDetails',
                            offer: rec.data,
                            historyUrl: 'Home/offerDetails',
                            returnUrl : 'Home/offerList',
                            animation: {
                                type: 'slide'
                            }
                        });
                    }
                }
            }
        }];
        App.views.AdvertList.superclass.initComponent.call(this);
    }
});
Ext.reg('AdvertList', App.views.AdvertList);