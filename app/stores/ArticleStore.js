Ext.regStore('Articles',{
    model: 'article',
    sorters: [{
        property: 'date',
        direction: 'DESC'
    }],
    filters: [{
        property: 'status',
        value   : true
    }],
    proxy: {
        type: 'sqlitestorage',
        dbConfig :{
            tablename 	: 'articles',
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

