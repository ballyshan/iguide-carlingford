App.views.MediaList = Ext.extend(Ext.List, {
    emptyText : App.noData,
    itemTpl : '{file_description} {file_name}',
    listeners : {
        itemTap : function(list, index, item, e ){
            if(navigator.onLine){
                var store = list.getStore();
                //var rec = list.getStore().getAt(index);
                //window.location = App.onlineImageFolder + rec.data.file_name;
                App.dispatch({
                    controller: 'Location',
                    action: 'gallery',
                    historyUrl: 'Location/gallery',
                    items : store.data.items,
                    index : index,
                    //visibleTab : this.calledFrom,
                    animation: {
                        type: 'slide'
                    }
                });
            } else{
                var workingOffline = Ext.getStore("Settings").findRecord("variable", "WorkingOffline");
                Ext.Msg.alert(workingOffline.data.value, App.actionNotAvailable, Ext.emptyFn);
            }
        }
    }
});
Ext.reg('MediaList', App.views.MediaList);

App.views.ShowCaseView = Ext.extend(Ext.Panel, {
    layout : 'fit',
    fullscreen: true,
    initComponent : function(){
        var container = this,
            showcasefiles = Ext.getStore('ShowCaseFiles');

        showcasefiles.filterBy(function(file, id){
            if(file.data.file_location_id === container.data.id){
                return file;
            }
        }, this)

        var audioFiles = [], videoFiles = [], imageFiles = [];
        showcasefiles.each(function(file){
           if(file.data.file_extension == "mp3") {
               audioFiles.push(file.data);
           } else if(file.data.file_extension == "mp4"){
               videoFiles.push(file.data);
           } else if (file.data.file_extension == "jpg"){
               imageFiles.push(file.data);
           }
        });

        var audioStore = new Ext.data.Store({
            autoLoad: true,
            model: 'file',
            data : audioFiles,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        });

        var videoStore = new Ext.data.Store({
            autoLoad: true,
            model: 'file',
            data : videoFiles,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        });

        var imageStore = new Ext.data.Store({
            autoLoad: true,
            model: 'file',
            data : imageFiles,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        });
        var tabPanel = new Ext.TabPanel({
            scroll : 'verticle',
            tabBar : {cls : 'showcase_tabBar'},
            items : [
                {scroll: 'vertical', layout : 'fit', title: App.overview, html : Ext.htmlDecode(container.data.webcontent)},
                {xtype: 'MediaList', title: App.audio, store : audioStore},
                {xtype: 'MediaList', title: App.video, store : videoStore},
                {xtype: 'MediaList', title: App.image, store : imageStore},
            ]
        });
        var header = '<div style="text-align: center"><img style="height:124px" src="'
        if(navigator.onLine && this.data.webheader)
            header += App.onlineImageFolder  + this.data.webheader;
        else
            header += 'resources/images/' + App.offlineHeader;
        header += '" alt="header"/></div>';

        var footer = '<div style="text-align: center"><img src="';
        if(navigator.onLine && this.data.webfooter)
            footer += App.onlineImageFolder  + this.data.webfooter;
        else
            footer += 'resources/images/' + App.offlineFooter;
        footer += '" alt="footer"/></div>';

        this.dockedItems = [
            {dock : 'top', html :  header},
            {dock : 'bottom', html : footer}
        ];
        this.items = [tabPanel];
        App.views.ShowCaseView.superclass.initComponent.call(this);
    }
});

Ext.reg('ShowCaseView', App.views.ShowCaseView);
