Ext.regStore('EventCategories',{
    model: 'eventscategory',

    filters: [{
        property: 'status',
        value   : true
    }],
        proxy: {
        type: 'sqlitestorage',
        dbConfig :{
            tablename 	: 'eventcategories',
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
