Ext.regModel('feature', {
    idProperty : 'featureid',
    fields : [{
        name : 'featureid',
        type : 'int',
        fieldOption : 'PRIMARY KEY ASC'
    }, {
        name : 'featuredescription',
        type : 'string'
    }, {
        name : 'featureenabled',
        type : 'bool',
        defaultValue : false

    }, {
        name : 'orderby',
        type : 'int',
        defaultValue : 99
    }
    ],
    proxy: {
        type: 'sqlitestorage',
        dbConfig :{
            tablename 	: 'features',
            dbConn 	: App.DbConnection.dbConn
        },
        reader : {
            idProperty : 'featureid'
        }
    }
});

Ext.regModel('featureXML', {
    idProperty : 'featureid',
    fields : [{
        name : 'featureid',
        type : 'int',
        mapping : '@featureid'
    }, {
        name : 'featuredescription',
        type : 'string',
        mapping : '@featuredescription'
    }, {
        name : 'featureenabled',
        type : 'bool',
        mapping : '@featureenabled'
    }, {
        name : 'orderby',
        type : 'int',
        mapping : '@orderby'
    }
    ]
});