Ext.regModel('product', {
    idProperty: 'id',
    fields: [
    {
        name : 'id',
        type : 'int',
        fieldOption : 'PRIMARY KEY ASC'
    },

    {
        name : 'cat_id',
        type : 'int'
    },

    {
        name : 'package_id',
        type : 'int'
    },

    {
        name : 'title',
        type : 'string'
    },

    {
        name : 'cname',
        type : 'string'
    },

    {
        name : 'address',
        type : 'string'
    },

    {
        name : 'county',
        type : 'string'
    },

    {
        name : 'country',
        type : 'string'
    },

    {
        name : 'phone',
        type : 'string'
    },

    {
        name : 'email',
        type : 'string'
    },

    {
        name : 'description',
        type : 'string'
    },

    {
        name : 'webaddress',
        type : 'string'
    },

    {
        name : 'panelPlainText',
        type : 'string'
    },

    {
        name : 'panelRight',
        type : 'string'
    },

    {
        name : 'latitude',
        type : 'string'
    },

    {
        name : 'longitude',
        type : 'string'
    },

    {
        name : 'ARInclude',
        type : 'bool'
    },

    {
        name : 'active',
        type : 'bool'
    },

    {
        name : 'dateAdded',
        type : 'string'
    },

    {
        name : 'dateRenew',
        type : 'string'
    },

    {
        name : 'sponsorTrue',
        type : 'bool'
    },

    {
        name : 'sponsorcarouselpic',
        type : 'string'
    },

    {
        name : 'taxiSponsorTrue',
        type : 'bool'
    },

    {
        name : 'showcaseTrue',
        type : 'bool'
    },

    {
        name : 'webheader',
        type : 'string'
    },

    {
        name : 'webfooter',
        type : 'string'
    },

    {
        name : 'webcontent',
        type : 'string'
    },

    {
        name : 'GID',
        type : 'int'
    },

    {
        name : 'lastModified',
        type : 'string'
    },

    {
        name : 'dist',
        type : 'float',
        defaultValue : 0.0
    }
    ],

    proxy: {
        type: 'sqlitestorage',
        dbConfig :{
            tablename 	: 'products',
            dbConn 	: App.DbConnection.dbConn
        },
        reader : {
            idProperty : 'id'
        }
    },
    writer: {
        type: 'json'
    },

    associations: [
    {
        type: 'belongsTo',
        model: 'category',
        foreignKey : 'cat_id'
    },

    {
        type: 'belongsTo',
        model : 'package'
    },

    {
        type: 'hasMany',
        model: 'review',
        name : 'Reviews',
        foreignKey : 'locationid'
    }
    ]

});

Ext.regModel('productXML', {

    fields: [
    {
        name : 'id',
        type : 'int',
        mapping : '@id'
    },

    {
        name : 'cat_id',
        type : 'int',
        mapping : '@catId'
    },

    {
        name : 'package_id',
        type : 'int',
        mapping : '@package'
    },

    {
        name : 'title',
        type : 'string',
        mapping : '@title'
    },

    {
        name : 'cname',
        type : 'string',
        mapping : '@cname'
    },

    {
        name : 'address',
        type : 'string',
        mapping : '@address'
    },

    {
        name : 'county',
        type : 'string',
        mapping : 'county'
    },

    {
        name : 'country',
        type : 'string',
        mapping : '@country'
    },

    {
        name : 'phone',
        type : 'string',
        mapping : '@phone'
    },

    {
        name : 'email',
        type : 'string',
        mapping : '@email'
    },

    {
        name : 'description',
        type : 'string',
        mapping : '@description'
    },

    {
        name : 'webaddress',
        type : 'string',
        mapping : '@webaddress'
    },

    {
        name : 'panelPlainText',
        type : 'string',
        mapping : '@panelPlainText'
    },

    {
        name : 'panelRight',
        type : 'string',
        mapping : '@panelRight'
    },

    {
        name : 'latitude',
        type : 'string',
        mapping : '@latitude'
    },

    {
        name : 'longitude',
        type : 'string',
        mapping : '@longitude'
    },

    {
        name : 'ARInclude',
        type : 'bool',
        mapping : '@ARInclude'
    },

    {
        name : 'active',
        type : 'bool',
        mapping : '@active'
    },

    {
        name : 'dateAdded',
        type : 'string',
        mapping : '@dateAdded'
    },

    {
        name : 'dateRenew',
        type : 'string',
        mapping : '@dateRenew'
    },

    {
        name : 'sponsorTrue',
        type : 'bool',
        mapping : '@sponsorTrue'
    },

    {
        name : 'sponsorcarouselpic',
        type : 'string',
        mapping : '@sponsorcarouselpic'
    },
    {
        name : 'taxiSponsorTrue',
        type : 'bool',
        mapping : '@taxiSponsorTrue'
    },

    {
        name : 'showcaseTrue',
        type : 'bool',
        mapping : '@showcaseTrue'
    },

    {
        name : 'webheader',
        type : 'string',
        mapping : '@webheader'
    },

    {
        name : 'webfooter',
        type : 'string',
        mapping : '@webfooter'
    },

    {
        name : 'webcontent',
        type : 'string',
        mapping : '@webcontent'
    },

    {
        name : 'GID',
        type : 'int',
        mapping : '@GID'
    },

    {
        name : 'lastModified',
        type : 'string',
        mapping : '@lastModified'
    },

    {
        name : 'dist',
        type : 'float',
        defaultValue : 0.0
    }
    ]
});