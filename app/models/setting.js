Ext.regModel('setting', {
    idProperty : 'id',
    fields : [{
        name : 'id',
        type : 'int', fieldOption : 'PRIMARY KEY ASC'
    }, {
        name : 'variable',
        type : 'string'
        
    }, {
        name : 'value',
        type : 'string'
        
    }]
});

Ext.regModel('settingXML', {
    idProperty : 'id',
    fields : [{
        name : 'id',
        type : 'int',
        mapping : '@id'
    }, {
        name : 'variable',
        type : 'string',
        mapping : '@variable'
    }, {
        name : 'value',
        type : 'string',
        mapping : '@value'
    }]
});