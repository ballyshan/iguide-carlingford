Ext.regModel('review', {
    idProperty : 'id',
    fields : [{
        name : 'id',
        type : 'int', fieldOption : 'PRIMARY KEY ASC'
    }, {
        name : 'reviewdate',
        type : 'string'

    }, {
        name : 'reviewtitle',
        type : 'string'

    }, {
        name : 'reviewcontent',
        type : 'string'

    }, {
        name : 'starrating',
        type : 'int'

    }, {
        name : 'revieweremail',
        type : 'string'

    }, {
        name : 'locationid',
        type : 'string'

    }, {
        name : 'reviewername',
        type : 'string'

    }, {
        name : 'reviewstatus',
        type : 'bool'

    }],
    associations: [
    {
        type: 'belongsTo',
        model: 'product',
        foreignKey : 'locationid',
        name : 'Location'
    }
    ],
    proxy: {
        type: 'sqlitestorage',
        dbConfig :{
            tablename 	: 'reviews',
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

Ext.regModel('reviewXML', {
    fields : [{
        name : 'id',
        type : 'int',
        mapping : '@id'
    }, {
        name : 'reviewdate',
        type : 'string',
        mapping : '@reviewdate'
    }, {
        name : 'reviewtitle',
        type : 'string',
        mapping : '@reviewtitle'
    }, {
        name : 'reviewcontent',
        type : 'string',
        mapping : '@reviewcontent'
    }, {
        name : 'starrating',
        type : 'int',
        mapping : '@starrating'
    }, {
        name : 'revieweremail',
        type : 'string',
        mapping : '@revieweremail'
    }, {
        name : 'locationid',
        type : 'string',
        mapping : '@locationid'
    }, {
        name : 'reviewername',
        type : 'string',
        mapping : '@reviewername'
    }, {
        name : 'reviewstatus',
        type : 'bool',
        mapping : '@reviewstatus'
    }]
});