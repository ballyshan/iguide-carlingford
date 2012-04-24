Ext.regStore('Features',{
    model: 'feature',
    listeners : {
        load : function(store, records, success){
            if (App.debug) alert("Internal Offline Features Loaded" + records.length);
        }
    }
});
