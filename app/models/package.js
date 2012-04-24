Ext.regModel('package', {
    idProperty : 'package_id',
    fields: [
        {name : 'package_id', type : 'int', fieldOption : 'PRIMARY KEY ASC'},
        {name : 'title', type : 'string'}, 
        {name : 'description', type : 'string'},
        {name : 'price', type : 'auto'}],

    hasMany: {model: 'product', name: 'products'}
});

Ext.regModel('packageXML', {
    idProperty : 'package_id',
    fields: [
        {name : 'package_id', type : 'int', mapping : '@packageId'},
        {name : 'title', type : 'string', mapping : '@title'}, 
        {name : 'description', type : 'string', mapping : '@description'},
        {name : 'price', type : 'auto', mapping : '@price'}]

});