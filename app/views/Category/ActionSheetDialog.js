App.views.ActionSheetDialog = Ext.extend(Ext.ActionSheet, {
    recordData : null,
    recordId : null,
    floating : true,
    calledFrom : null,
    initComponent: function(){
        if(this.recordId){
            var prods = Ext.getStore("Products"),
            r = prods.getById(this.recordId);
            this.recordData = r.data;
        }
        if(this.recordData){
            var actionsheet = this;
            var btns = [{
                xtype: 'toolbar',
                title: this.recordData.title
            }],
            settings = Ext.getStore('Settings');

            if(this.recordData.package_id == 3 || this.recordData.showcaseTrue){
                var detailsText = settings.findRecord("variable", "detailsButtonText"),
                closeText = settings.findRecord("variable", "Close");
                btns.push({
                    text : detailsText.data.value,
                    type : 'viewdetails',
                    record : this.recordData,
                    calledFrom : this.calledFrom,
                    handler : function(){
                        App.dispatch({
                            controller: 'Category',
                            action: 'product',
                            historyUrl: 'Category/product',
                            product : this.record,
                            visibleTab : this.calledFrom,
                            animation: {
                                type: 'slide'
                            }
                        });
                        actionsheet.hide(true);
                    }
                });

            }
            var callText = settings.findRecord("variable", "callButtonText");
            btns.push({
                text : callText.data.value,
                type : 'call',
                record : this.recordData,
                handler : function(){
                    window.location = "tel:" + this.record.phone;
                    actionsheet.hide(true);
                }
            });


            var fbText = settings.findRecord("variable", "facebookButtonText"),
                fbUrl = settings.findRecord("variable", "facebookUrl"),
                facebookBodyText = settings.findRecord("variable", "facebookBodyText");
            var url = 'https://www.facebook.com/dialog/feed?' +
                        'app_id=' + App.App_ID +
                        '&link=' + fbUrl.data.value +
                        '&picture=' + App.FB_Picture +
                        '&name=' + App.App_Name +
                        '&caption=' + App.FB_Caption +
                        '&description=' + App.FB_Description +
                        '&message=' + fbText.data.value +
                        '&redirect_uri=' + App.FB_RedirectUrl;
                /*'https://www.facebook.com/dialog/feed?'+
                       'app_id=102250606478466&' +
                       'link=https://developers.facebook.com/docs/reference/dialogs/' + //Ext.htmlEncode(fbUrl.data.value) +
                       '&name=iGuide%20Dublin&'+
                       'message=Facebook%20Dialogs%20are%20so%20easy!&'
                       'redirect_uri=http://www.iguidecarlingfordmourne.com/HTML5/iGuide4/index.html#Category/products&'
                       'caption=Testing'; //+ facebookBodyText.data.value;*/
            btns.push({
                //text : fbText.data.value,
                type : 'facebook',
                facebookUrl : fbUrl.data.value,
                facebookText : facebookBodyText.data.value,
                html : '<span class="x-button-label"><a class="linkAsText" href="' + url + '" target="_blank" >' + fbText.data.value + '</a></span>',
                handler : function(){
                    actionsheet.hide(true);
                }
            });

            if(navigator.onLine){
                var directionsText = settings.findRecord("variable", "directionsButtonText");

                btns.push({
                    text : directionsText.data.value,
                    type : 'directions',
                    record : this.recordData,
                    calledFrom : this.calledFrom,
                    handler : function(){
                        if(navigator.onLine){

                        App.dispatch({
                            controller: 'Location',
                            action: 'directions',
                            historyUrl: 'Location/directions',
                            product : this.record,
                            visibleTab : this.calledFrom,
                            animation: {
                                type: 'slide'
                            }
                        });
                        } else {
                            var workingOffline = settings.findRecord("variable", "WorkingOffline");
                            Ext.Msg.alert(workingOffline.data.value, App.actionNotAvailable, Ext.emptyFn);
                        }
                        actionsheet.hide(true);
                    }
                });
            }
            var cancelText = settings.findRecord("variable", "Cancel")
            btns.push({
                text : cancelText.data.value,
                ui : 'confirm',
                handler : function(){
                    actionsheet.hide(true);
                }
            });
            this.items = [btns];
        }
        App.views.ActionSheetDialog.superclass.initComponent.call(this);
    }
});

Ext.reg('ActionSheetDialog', App.views.ActionSheetDialog);
