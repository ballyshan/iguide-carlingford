Ext.regModel('destination', {
    idProperty : 'id',
    fields: [
        {name : 'id', type : 'int', fieldOption : 'PRIMARY KEY ASC'},
        {name : 'title', type : 'string'},
        {name : 'url', type : 'string'},
        {name : 'active', type : 'bool'}],

     proxy: {
        type: 'sqlitestorage',
        dbConfig :{
            tablename 	: 'destinations',
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

Ext.regModel('destinationXML', {
    idProperty : 'id',
    fields: [
        {name : 'id', type : 'int', mapping : '@id'},
        {name : 'title', type : 'string', mapping : '@title'},
        {name : 'url', type : 'string', mapping : '@url'},
        {name : 'active', type : 'bool', mapping : '@active'}]

});