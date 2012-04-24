Ext.regModel('event', {
    idProperty : 'id',
    fields: [
        {name : 'id', type : 'int', fieldOption : 'PRIMARY KEY ASC'},
        {name : 'date', type : 'string'},
        {name : 'dateto', type : 'string'},
        {name : 'event', type : 'string'},
        {name : 'venue', type : 'string'},
        {name : 'times', type : 'string'},
        {name : 'duration', type : 'string'},
        {name : 'cost', type : 'string'},
        {name : 'description', type : 'string'},
        {name : 'link', type : 'string'},
        {name : 'image', type : 'string'},
        {name : 'category', type : 'int'},
        {name : 'sby', type : 'string'},
    	{name : 'status', type : 'bool'}],

     associations: [
        {type: 'belongsTo', model: 'eventscategory', foreignKey : 'category'}
    ],

    proxy: {
        type: 'sqlitestorage',
        dbConfig :{
            tablename 	: 'events',
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

Ext.regModel('eventXML', {
    fields: [
        {name : 'id', type : 'int', mapping : '@id'},
        {name : 'date', type : 'string', mapping : '@date'},
        {name : 'dateto', type : 'string', mapping : '@dateto'},
        {name : 'event', type : 'string', mapping : '@event'},
        {name : 'venue', type : 'string', mapping : '@venue'},
        {name : 'times', type : 'string', mapping : '@times'},
        {name : 'duration', type : 'string', mapping : '@duration'},
        {name : 'cost', type : 'string', mapping : '@cost'},
        {name : 'description', type : 'string', mapping : '@description'},
        {name : 'link', type : 'string', mapping : '@link'},
        {name : 'image', type : 'string', mapping : '@image'},
        {name : 'category', type : 'int', mapping : '@category'},
        {name : 'sby', type : 'string', mapping : '@sby'},
        {name : 'status', type : 'bool', mapping : '@status'}]
});