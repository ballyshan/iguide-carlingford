Ext.regStore('Deals',{
    model: 'deal',
    sorters: [{
        property: 'dateStart',
        direction: 'DESC'
    }],
	filters: [{
            property: 'status',
            value   : true
    }],
    proxy: {
        type: 'sqlitestorage',
        dbConfig :{
            tablename 	: 'deals',
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
