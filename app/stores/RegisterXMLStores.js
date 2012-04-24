App.RegisterOnlineStores = function(){
    Ext.regStore('onlineAdverts',{
        model: 'dealXML',
        data: App.getData("slideradvertising"),
        proxy: {
            type: 'memory',
            reader: {
                type: 'xml',
                record: 'advert'
            }
        },
        listeners: {
            load : function(store, records, successful){
                console.debug(store.storeId + " Loaded, records loaded: " + records.length + ", xml nodes: " + localStorage.getItem("slideradvertising"));
                App.OfflineDataSync(records,'Adverts', 'id', 'status');
            }
        }
    });

    Ext.regStore('onlineArticles',{
        model: 'articleXML',
        data: App.getData("news"),
        proxy: {
            type: 'memory',
            reader: {
                type: 'xml',
                record: 'article'
            }
        },
        listeners: {
            load : function(store, records, successful){
                console.debug(store.storeId + " Loaded, records loaded: " + records.length + ", xml nodes: " + localStorage.getItem("news"));
                App.OfflineDataSync(records,'Articles', 'id', 'status');
            }
        }
    });


    Ext.regStore('onlineCategories', {
        model: 'categoryXML',
        data: App.getData("categories"),
        proxy: {
            type: 'memory',
            reader: {
                type: 'xml',
                record: 'category'
            }
        },
        listeners: {
            load : function(store, records, successful){
                console.debug(store.storeId + " Loaded, records loaded: " + records.length + ", xml nodes: " + localStorage.getItem("categories"));
                App.OfflineDataSync(records,'Categories', 'cat_id', 'active');

            }
        }
    });


    Ext.regStore('onlineDeals',{
        model: 'dealXML',
        data: App.getData("deals"),
        proxy: {
            type: 'memory',
            reader: {
                type: 'xml',
                record: 'deal'
            }
        },
        listeners: {
            load : function(store, records, successful){
                console.debug(store.storeId + " Loaded, records loaded: " + records.length + ", xml nodes: " + localStorage.getItem("deals"));
                App.OfflineDataSync(records,'Deals', 'id', 'status');
            }
        }
    });


    Ext.regStore('onlineEventCategories',{
        model: 'eventscategoryXML',
        data: App.getData("eventscategories"),
        proxy: {
            type: 'memory',
            reader: {
                type: 'xml',
                record: 'event'
            }
        },
        listeners: {
            load : function(store, records, successful){
                 console.debug(store.storeId + " Loaded, records loaded: " + records.length + ", xml nodes: " + localStorage.getItem("eventscategories"));
                 App.OfflineDataSync(records,'EventCategories', 'id', 'status');
            }
        }
    });


    Ext.regStore('onlineEvents',{
        model: 'eventXML',
        data: App.getData("events"),
        proxy: {
            type: 'memory',
            reader: {
                type: 'xml',
                record: 'event'
            }
        },
        listeners: {
            load : function(store, records, successful){
                console.debug(store.storeId + " Loaded, records loaded: " + records.length + ", xml nodes: " + localStorage.getItem("events"));
                App.OfflineDataSync(records,'Events', 'id', 'status');
            }
        }
    });

    Ext.regStore('onlineFeatures',{
        model: 'featureXML',
        data: App.getData("featuresenabled"),
        proxy: {
            type: 'memory',
            reader: {
                type: 'xml',
                record: 'feature'
            }
        },
        listeners : {
            load : function(store, records, successful){
                console.debug(store.storeId + " Loaded, records loaded: " + records.length + ", xml nodes: " + localStorage.getItem("featuresenabled"));
                if (App.debug) alert("Internal Online Features Loaded" + records.length);
                App.OfflineDataSync(records,'Features', 'featureid', 'featureenabled');
            }
        }
    });


    Ext.regStore('onlineProducts',{
        model: 'productXML',
        data: App.getData("location"),
        proxy: {
            type: 'memory',
            reader: {
                type: 'xml',
                record: 'product'
            }
        },
        listeners: {
            load : function(store, records, successful){
                console.debug(store.storeId + " Loaded, records loaded: " + records.length + ", xml nodes: " + localStorage.getItem("location"));
                App.OfflineDataSync(records,'Products', 'id', 'active');
            }
        }

    });


    Ext.regStore('onlineReviews', {
        model : 'reviewXML',
        data: App.getData("reviews"),
        proxy: {
            type: 'memory',
            reader: {
                type: 'xml',
                record: 'review'
            }
        }
    });

    Ext.regStore('onlineSequenceStore',{
        model: 'sequence',
        data: App.getData("sequence"),
        proxy: {
            type: 'memory',
            reader: {
                type: 'xml',
                record: 'sequence_num'
            }
        },
        listeners: {
            load : function(store, records, successful){
                 console.debug(store.storeId + " Loaded, records loaded: " + records.length + ", xml nodes: " + localStorage.getItem("reviews"));
                    if(records.length){
                        //localStorage.setItem('iguide_curr_seq_num', records[0].data.sequence_num);
                    }
            }
        }
    });


    Ext.regStore('onlineSettings',{
        model: 'settingXML',
        data: App.getData("application"),
        proxy: {
            type: 'memory',
            reader: {
                type: 'xml',
                record: 'setting'
            }
        },
        listeners : {
            load : function(store, records, successful){
                console.debug(store.storeId + " Loaded, records loaded: " + records.length + ", xml nodes: " + localStorage.getItem("application"));
                if (App.debug) alert("Internal Online Settings Loaded: " + records.length);
                App.OfflineDataSync(records,'Settings', 'id');//No enabled field
            }
        }

    });

    Ext.regStore('onlineShowCaseFiles', {
        model : 'fileXML',
        data: App.getData("showcasefiles"),
        proxy: {
            type: 'memory',
            reader: {
                type: 'xml',
                record: 'file'
            }
        },
        listeners: {
            load : function(store, records, successful){
                console.debug(store.storeId + " Loaded, records loaded: " + records.length + ", xml nodes: " + localStorage.getItem("showcasefiles"));
                App.OfflineDataSync(records,'ShowCaseFiles', 'file_id', 'file_live');
            }
        }
    });

    Ext.regStore('onlineDestinations', {
        model : 'destinationXML',
        data: App.getData("destinations"),
        proxy: {
            type: 'memory',
            reader: {
                type: 'xml',
                record: 'destination'
            }
        },
        listeners: {
            load : function(store, records, successful){
                console.debug(store.storeId + " Loaded, records loaded: " + records.length + ", xml nodes: " + localStorage.getItem("destinations"));
                App.OfflineDataSync(records,'Destinations', 'id', 'active');
            }
        }
    });
}


