Ext.regStore('Adverts',{
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
            tablename 	: 'adverts',
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