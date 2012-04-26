Ext.ns('App');

App = Ext.regApplication({
    name: 'App',
    //Start Facebook variables
    App_ID : '194940677280167',
    App_Name : 'iGuide%20Post',
    FB_Picture : 'http://fbrell.com/f8.jpg',
    FB_Caption : 'iGuide%20Post',
    FB_Description : 'iGuide%20Post',
    FB_RedirectUrl : 'http://www.iguidecarlingfordmourne.com/HTML5/index.html',
    //End Facebook variables
    useLoadMask: true,
    defaultUrl: 'Home/welcome',
    phoneStartupScreen: 'resources/images/HTML5-splash.png',
    offlineHeader : 'HTML5-WEBHEADERDEFAULT.jpg',
    offlineFooter : 'HTML5-WEBFOOTERDEFAULT.jpg',
    offlineLocation : 'HTML5-WEBLOCATIONDEFAULT.jpg',
    gDefaultLat : 53.34756,
    gDefaultLng : -6.259439,
    debug : false,
    onlineImageFolder : 'http://www.iguidecarlingfordmourne.com/WEBFILES/',
    offlineImage : 'resources/images/avatar.jpg',
    dataUrl : 'data/initialb.php.xml?xu=iguide&xp=iguide&seq=initialb&tname=initialb&langprefix=eng',
	//'http://www.iguidecarlingfordmourne.com/xml/initialb.php?xu=iguide&xp=iguide&seq=initialb&tname=initialb&langprefix=eng',
	//
    updateUrl : 'data/updateb.php.xml?xu=iguide&xp=iguide&tname=updateb&langprefix=eng&seq=',
	//'http://www.iguidecarlingfordmourne.com/xml/updateb.php?xu=iguide&xp=iguide&tname=updateb&langprefix=eng&seq=',
	//
    //This variables must be included in the settings
    locationError : "Location Error",
    timeOutOccured : "Timeout occurred.",
    allowDiscovery : "Allow location dicovery to use map",
    locationUnavailable : "Location unavailable",
    notAvailable : "Not Available",
    actionNotAvailable : 'This action is not available',
    noLocations : 'No Locations',
    noLocationSearch : "There are no locations for '{searchTerm}'",
    noData : "No Data",
    overview : "Overview",
    audio : "Audio",
    video : "Video",
    image : "Image",
    search : "Search",
    list : "List",
    pleaseWait : "Please wait...",
    pleaseChoose : "Please choose one of the following",
    showOnMap : 'Show on Map',
    browseList : 'Browse List',
    LoadComplete : false,
    DbConnection : new Ext.Sqlite.Connection({
        dbName : "iguidedb-carlingford",
        dbDescription: "iguide offline storage database"
    }),
    mask: function() {
        if(!this.viewport.loadMask)
            this.viewport.loadMask = this.viewport.setLoading(true);
        this.viewport.loadMask.show();
    },
    unmask: function() {
        if(this.viewport.loadMask)
            this.viewport.loadMask.hide();
    },
    dispatch: function(config) {
        this.mask();
        new Ext.util.DelayedTask(function(){
            Ext.dispatch(config);
        }).delay(1);
    },
    GetSeqNo : function(){
        return localStorage.getItem("iguide_curr_seq_num");
    },
    GetURL : function(){
        var seq = App.GetSeqNo();
        if(seq){
            App.dataUrl = App.updateUrl + seq;
        }
        return App.dataUrl;
    },
    createXMLDoc : function(xmlString) {
        var parser = new DOMParser();
        var xmlDocument = parser.parseFromString(xmlString,"text/xml");
        return xmlDocument;
    },
    getData : function(nodeName) {
        var dq = Ext.DomQuery;
        var node = dq.selectNode(nodeName, App.xml);
        if(node == undefined) {
            return(App.createXMLDoc("<" +nodeName + " />"));
        }
        if(nodeName == "sequence"){
            localStorage.setItem('iguide_curr_seq_num', node.childNodes[0].textContent);
        }
        if(App.debug)alert("Xml nodes : " + node.childNodes.length);
        localStorage.setItem(nodeName, node.childNodes.length)
        return node;
    },
    afterLoadGoTo: function(returnUrl){
        returnUrl = returnUrl || 'Home/index';
        var parts = returnUrl.split('/');
        App.dispatch({
            controller: parts[0],
            action: parts[1],
            historyUrl: returnUrl,
            animation: {
                type: 'slide'
            }
        });
    },
    OfflineDataSync : function(records, offlineStoreName, idField, activeField){
        var offlineStore = Ext.getStore(offlineStoreName);
        //offlineStore.load();
        if(!records || !records.length){
            return;
        }

        for(var i = 0, l = records.length; i < l; i++){
            var storedRec = offlineStore.getById(records[i].data[idField]);
            if(!storedRec){
                if(!activeField || (activeField && records[i].data[activeField]))
                    offlineStore.add(records[i].data);
                continue;
            }else if (activeField && !records[i].data[activeField]){
                offlineStore.remove(storedRec);
                continue;
            }

            Ext.iterate(records[i].data, function(key, value, obj){
                storedRec.set(key, value);
            });
        }
        offlineStore.sync();
    },
    launch: function()
    {
        //this.viewport = new App.views.Viewport();
		this.launched = true;
        this.mainLaunch();
    },
	
	mainLaunch: function() {
		if (!device || !this.launched) {return;}
		this.viewport = new App.views.Viewport();
	}
});

Ext.setup({
    phoneStartupScreen: 'resources/images/HTML5-splash.png',
    onReady : function(){

        if(navigator.onLine){
            if(!App.geo){
                App.geo = new Ext.util.GeoLocation({
                    autoUpdate: false,
                    listeners: {
                        locationerror: function (geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
                            if(bTimeout){
                                Ext.Msg.alert(App.locationError, App.timeOutOccured, Ext.emptyFn);
                            }
                            else if(bPermissionDenied){
                                Ext.Msg.alert(App.locationError, App.allowDiscovery, Ext.emptyFn);
                            }
                            else if(bLocationUnavailable){
                                Ext.Msg.alert(App.locationError,App.locationUnavailable, Ext.emptyFn);
                            }
                            else{
                                Ext.Msg.alert(App.locationError, message, Ext.emptyFn);
                            }
                        },
                        locationupdate : function(geo){
                            App.myLatLng = new google.maps.LatLng(geo.latitude, geo.longitude);
                        }
                    }
                });
            }
            App.geo.updateLocation();
            AjaxRefreshStores();
        } else {
            OfflineLoad();
        }
    }
});

function AjaxRefreshStores(){
    Ext.Ajax.request({
        url: App.GetURL(),
        method: 'GET',
        success: function (response) {
            console.log("Data returned from server");
            App.xml = response.responseXML;
            App.RegisterOnlineStores();
            RefreshOnlineStores();
        },
        failure: function (response) {
            //Ext.MessageBox.alert('Failed', response.responseText);
            OfflineLoad();
        }
    });
}
function OfflineLoad(){
    Ext.getStore('Features').load(function(records, operation, success){
        if (App.debug) alert("offline features loaded: " + success);

        var settings = Ext.getStore('Settings').load(function(r, s){
            if (App.debug) alert("inside settings load");
            settings.createMenuStores();
            Ext.getStore('Categories').load(function(){
                if (App.debug) alert("inside Categories load");
                Ext.getStore('Articles').load(function(){
                    if (App.debug) alert("inside Articles load");
                    Ext.getStore('EventCategories').load(function(){
                        if (App.debug) alert("inside EventCategories load");
                        Ext.getStore('Events').load(function(){
                            if (App.debug) alert("inside Events load");
                            Ext.getStore('Deals').load(function(){
                                if (App.debug) alert("inside Deals load");
                                Ext.getStore('Adverts').load(function(){
                                    if (App.debug) alert("inside Adverts load");
                                    Ext.getStore('Products').load(function(){
                                        if (App.debug) alert("inside Products load");
                                        Ext.getStore('ShowCaseFiles').load(function(){
                                            if (App.debug) alert("inside ShowCaseFiles load");
                                            Ext.getStore('Destinations').load(function(){
                                                App.LoadComplete = true;
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
function RefreshOnlineStores(){
    var update = App.GetSeqNo();
    if (App.debug) alert("Update: " + update);
    if(update){//&& false){//Hack to load data everytime
        if (App.debug) alert("Updating data");
        this.delayLoad = new Ext.util.DelayedTask(function(){
            Ext.getStore('Features').load(function(records, operation, success){
                if (App.debug) alert("offline features loaded: " + success);
                /*if(!records.length) {
                    if(App.debug) alert("No records for features, trying again");
                    AjaxRefreshStores();
                    return;
                }*/
                var settings = Ext.getStore('Settings').load(function(){
                    if (App.debug) alert("inside settings load");
                    settings.createMenuStores();
                    Ext.getStore('Categories').load(function(){
                        if (App.debug) alert("inside Categories load");
                        Ext.getStore('Articles').load(function(){
                            if (App.debug) alert("inside Articles load");
                            Ext.getStore('EventCategories').load(function(){
                                if (App.debug) alert("inside EventCategories load");
                                Ext.getStore('Events').load(function(){
                                    if (App.debug) alert("inside Events load");
                                    Ext.getStore('Deals').load(function(){
                                        if (App.debug) alert("inside Deals load");
                                        Ext.getStore('Adverts').load(function(){
                                            if (App.debug) alert("inside Adverts load");
                                            Ext.getStore('Products').load(function(){
                                                if (App.debug) alert("inside Products load");
                                                Ext.getStore('ShowCaseFiles').load(function(){
                                                    if (App.debug) alert("inside ShowCaseFiles load");
                                                    Ext.getStore('Destinations').load(function(){
                                                        App.LoadComplete = true;
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }, this);
        this.delayLoad.delay(5000);

    } else {
        if (App.debug) alert("Loading full set of data");
        Ext.getStore('onlineFeatures').load(function(recs, store){
            if (App.debug) alert("Online Features Loaded: ");
            /*if(!recs.length) {
                    if(App.debug) alert("No records for features, trying again");
                    AjaxRefreshStores();
                    return;
                }*/
            Ext.getStore('onlineSettings').load(function(r, s){
                if (App.debug) alert("Online Settings Loaded: ");
                //App.OfflineDataSync(r,'Settings', 'id'); //no enabled value for settings
                Ext.getStore('Settings').createMenuStores(function(){
                    Ext.getStore('onlineCategories').load(function(){
                        Ext.getStore('onlineArticles').load(function(){
                            Ext.getStore('onlineEvents').load(function(){
                                Ext.getStore('onlineEventCategories').load(function(){
                                    Ext.getStore('onlineDeals').load(function(){
                                        Ext.getStore('onlineAdverts').load(function(){
                                            Ext.getStore('onlineProducts').load(function(){
                                                Ext.getStore('onlineShowCaseFiles').load(function(){
                                                    Ext.getStore('onlineDestinations').load(function(){
                                                        Ext.getStore('onlineSequenceStore').load(function(){
                                                            App.LoadComplete = true;
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });

            });
        });
    }
}