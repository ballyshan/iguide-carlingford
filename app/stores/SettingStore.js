Ext.regStore('Settings',{
    model: 'setting',
    createMenuStores : function(){
        var store = this,
        features = Ext.getStore('Features'),
        bookOnlineText = store.findRecord("variable", "bookOnlineText"),
        newsText = store.findRecord("variable", "latestCityNewsText"),
        moodText = store.findRecord("variable", "moodText"),
        eventsText = store.findRecord("variable", "eventsText"),
        cinemaAndMoreText = store.findRecord("variable", "cinemaAndMoreText"),
        allDiscountsText = store.findRecord("variable", "allDiscountsText"),
        dailyDealText = store.findRecord("variable", "dailyDealText"),
        dailyDealUrl = store.findRecord("variable", "dailyDealUrl"),
        notificationsText = store.findRecord("variable", "notificationsText"),
        sendFeedbackText = store.findRecord("variable", "sendFeedbackText"),
        sendFeedbackUrl = store.findRecord("variable", "sendFeedbackUrl"),
        sendToFriendText = store.findRecord("variable", "sendToFriendText"),
        sendAppUrl = store.findRecord("variable", "sendAppUrl"),
        sendToFriendEmailBodyText = store.findRecord("variable", "sendToFriendEmailBodyText"),
        sendToFriendEmailBodySubject = store.findRecord("variable", "sendToFriendEmailBodySubject"),
        otherDestText = store.findRecord("variable", "otherDestText"),
        barcodeOptionText = store.findRecord("variable", "barcodeOptionText"),
        pushfeedFile = store.findRecord("variable", "pushfeedFile"),
        mailto = 'mailto:?Subject=',
        arModeText = store.findRecord("variable", "arModeText"),
        mainMenuItems = [], moreMenuItems = [];
        try{
            mailto += sendToFriendEmailBodySubject.data.value + '&Body='+ sendToFriendEmailBodyText.data.value + '    ' + sendAppUrl.data.value;
        }
        catch(exception){
            localStorage.clear();
            AjaxRefreshStores();
        }

        var rec = features.findRecord('featuredescription', 'MOOD-FOR');
        if(rec && rec.data.featureenabled){
            mainMenuItems.push({
                text : moodText.data.value,
                controller : 'Category',
                action : 'index',
                order : rec.data.orderby,
                list : 'main'
            });
        }
        rec = features.findRecord('featuredescription', 'EVENTS');
        if(rec && rec.data.featureenabled){
            mainMenuItems.push({
                text : eventsText.data.value,
                controller : 'Event',
                action : 'index',
                order : rec.data.orderby,
                list : 'main'
            });
        }
        rec = features.findRecord('featuredescription', 'NEWS');
        if(rec && rec.data.featureenabled){
            mainMenuItems.push({
                text : newsText.data.value,
                controller : 'News',
                action : 'index',
                order : rec.data.orderby,
                list : 'main'
            });
        }
        rec = features.findRecord('featuredescription', 'LATEST-OFFERS');
        if(rec && rec.data.featureenabled){
            mainMenuItems.push({
                text : allDiscountsText.data.value,
                controller : 'Home',
                action : 'offers',
                order : rec.data.orderby,
                list : 'main'
            });
        }

        rec = features.findRecord('featuredescription', 'BOOK-A-MENU');
        if(rec && rec.data.featureenabled){
            mainMenuItems.push({
                text : bookOnlineText.data.value,
                controller : 'Home',
                action : 'booka',
                order : rec.data.orderby,
                list : 'main'
            });
        }
        rec = features.findRecord('featuredescription', 'AUGMENTED-REALITY-MODE');
        if(rec && rec.data.featureenabled){
            mainMenuItems.push({
                text : arModeText.data.value,
                order : rec.data.orderby,
                list : 'main'
            });
        }

        /*mainMenuItems.push({
            text : cinemaAndMoreText.data.value,
            controller : 'Home',
            action : 'more',
            order : 99,
            list : 'main'
        });
        */
        //var mainStore = Ext.getStore('MenuItems');
       // mainStore.loadData(mainMenuItems, false);


        rec = features.findRecord('featuredescription', 'QR-READER');
        if(rec && rec.data.featureenabled){
            mainMenuItems.push({
                text : barcodeOptionText.data.value,
                order : rec.data.orderby,
                list : 'more'
            });
        }
        rec = features.findRecord('featuredescription', 'NOTIFICATIONS');
        if(rec && rec.data.featureenabled){
            mainMenuItems.push({
                text : notificationsText.data.value,
                link : pushfeedFile.data.value,
                order : rec.data.orderby,
                list : 'more'
            });
        }
        rec = features.findRecord('featuredescription', 'DAILY-DEAL-APP-PAGE');
        if(rec && rec.data.featureenabled){
            mainMenuItems.push({
                text : dailyDealText.data.value,
                link : dailyDealUrl.data.value,
                order : rec.data.orderby,
                list : 'more'
            });
        }
        rec = features.findRecord('featuredescription', 'GIVE-US-FEEDBACK');
        if(rec && rec.data.featureenabled){
            mainMenuItems.push({
                text : sendFeedbackText.data.value,
                link : sendFeedbackUrl.data.value,
                order : rec.data.orderby,
                list : 'more'
            });
        }
        rec = features.findRecord('featuredescription', 'SEND-TO-FRIEND');
        if(rec && rec.data.featureenabled){
            mainMenuItems.push({
                text : sendToFriendText.data.value,
                link : mailto,
                order : rec.data.orderby,
                list : 'more'
            });
        }
        rec = features.findRecord('featuredescription', 'OTHER-DESTINATIONS');
        if(rec && rec.data.featureenabled){
            mainMenuItems.push({
                text : otherDestText.data.value,
                controller : 'Home',
                action : 'destinations',
                order : rec.data.orderby,
                list : 'more'
            });
        }

        var mainStore = Ext.getStore('MenuItems');
        mainStore.loadData(mainMenuItems, false);

        /*Ext.regStore('MoreMenuStore', {
            model : 'menuItem',
            data : moreMenuItems
        });*/
    },
    proxy: {
        type: 'sqlitestorage',
        dbConfig :{
            tablename 	: 'settings',
            dbConn 	: App.DbConnection.dbConn
        },
        reader : {
            idProperty : 'id'
        }
    },
    writer: {
        type: 'json'
    }
});
