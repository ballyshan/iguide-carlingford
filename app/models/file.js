Ext.regModel('file', {
    idProperty : 'file_id',
    fields: [
        {name : 'file_id', type : 'int', fieldOption : 'PRIMARY KEY ASC'},
        {name : 'file_location_id', type : 'int'},
        {name : 'file_name', type : 'string'},
        {name : 'file_description', type : 'string'},
        {name : 'file_extension', type : 'string'},
        {name : 'file_cover', type : 'string'},
        {name : 'file_live', type : 'auto'}],
    proxy: {
        type: 'sqlitestorage',
        dbConfig :{
            tablename 	: 'showCaseFiles',
            dbConn 	: App.DbConnection.dbConn
        },
        reader : {
            idProperty : 'file_id'
        }
    },
    writer: {
        type: 'json'
    }
});

Ext.regModel('fileXML', {
    idProperty : 'file_id',
    fields: [
        {name : 'file_id', type : 'int', mapping : '@file_id'},
        {name : 'file_location_id', type : 'int', mapping : '@file_location_id'},
        {name : 'file_name', type : 'string', mapping : '@file_name'},
        {name : 'file_description', type : 'string', mapping : '@file_description'},
        {name : 'file_extension', type : 'string', mapping : '@file_extension'},
        {name : 'file_cover', type : 'string', mapping : '@file_cover'},
        {name : 'file_live', type : 'auto', mapping : '@file_live'}]
});