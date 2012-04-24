App.views.PopupWindow = Ext.extend(Ext.Panel, {
    floating: true,
    centered: true,
    modal: true,

    layout: {type : 'vbox', pack : 'center', align : 'stretch'},
    title : '',
    defaults: {
        flex: 1,
        xtype: 'button',
    },
    initComponent : function(){

    	var popup = this,
            settings = Ext.getStore('Settings'),
            toolbar = new Ext.Toolbar({
    		title: this.title,
    		items: [{
		        iconMask : true,
		        ui : 'plain',
		        iconCls: 'arrow_down',
		    }]
    	});
    	this.dockedItems = [toolbar,
    	{html : '<div style="text-align:center">' + App.pleaseChoose + ':</div>', xtype : 'panel'}];

        this.items = [{
                    text : App.showOnMap,
                    ui : 'round',
                    handler : function(){
                        if(navigator.onLine){
                            App.dispatch({
                                controller: 'Home',
                                action: 'offerMap',
                                title : popup.title,
                                animation : {
                                    type : 'slide'
                                }
                            });
                            popup.hide();
                        }else{
                            var workingOffline = settings.findRecord("variable", "WorkingOffline"),
                            YouMustBeConnectedMap = settings.findRecord("variable", "YouMustBeConnectedMap");
                            Ext.Msg.alert(workingOffline.data.value, YouMustBeConnectedMap.data.value, Ext.emptyFn);
                            popup.hide();
                        }
                    }
                },
                {
                    text : App.browseList,
                    ui : 'round',
                    handler : function(){
                        App.dispatch({
                            controller: 'Home',
                            action: 'offerList',
                            title : popup.title,
                            animation : {
                                type : 'slide'
                            }
                        });
                        popup.hide();
                    }
                }]
    	App.views.PopupWindow.superclass.initComponent.apply(this, arguments);
    },
   items : [{ text: 'Nothing to display' }]
});
Ext.reg('PopupWindow', App.views.PopupWindow);