/*
 * This model is used for adverts and deals *
 */
Ext.regModel('advert', {
    idProperty: 'id',
    fields : [{
        name : 'id',
        type : 'int',
        fieldOption : 'PRIMARY KEY ASC'
    }, {
        name : 'dateStart',
        type : 'string'
    }, {
        name : 'dateEnd',
        type : 'string'
    }, {
        name : 'title',
        type : 'string'
    }, {
        name : 'description',
        type : 'string'
    }, {
        name : 'panelimage',
        type : 'string'
    }, {
        name : 'locationidlink',
        type : 'string'
    }, {
        name : 'status',
        type : 'bool'
    },  {
        name: 'dist',
        type: 'float',
        defaultValue : 0.0
    }, {
        name: 'starrating',
        type : 'int',
        defaultValue : 0
    }
    ],
    associations: [
    {
        type: 'belongsTo',
        model: 'product',
        foreignKey : 'locationidlink',
        name : 'Location'
    }
    ]
});

/*
 * This model is used for adverts and deals *
 */
Ext.regModel('advertXML', {
    fields : [{
        name : 'id',
        type : 'int',
        mapping : '@id'
    }, {
        name : 'dateStart',
        type : 'string',
        mapping : '@dateStart'
    }, {
        name : 'dateEnd',
        type : 'string',
        mapping : '@dateEnd'
    }, {
        name : 'title',
        type : 'string',
        mapping : '@title'
    }, {
        name : 'description',
        type : 'string',
        mapping : '@description'
    }, {
        name : 'panelimage',
        type : 'string',
        mapping : '@panelimage'
    }, {
        name : 'locationidlink',
        type : 'string',
        mapping : '@locationidlink'
    }, {
        name : 'status',
        type : 'bool',
        mapping : '@status'
    }
    ]
});