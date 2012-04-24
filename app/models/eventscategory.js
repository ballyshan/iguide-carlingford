Ext.regModel('eventscategory', {
    idProperty : 'id',
    fields: [
    	{name : 'id', type : 'int', fieldOption : 'PRIMARY KEY ASC'},
    	{name : 'eventcattitle', type : 'string'}, 
    	{name : 'status', type : 'bool'}],
    
     hasMany: {model: 'event', name: 'iguideEvents', foreignKey : 'category'}
});

Ext.regModel('eventscategoryXML', {
    fields: [
    	{name : 'id', type : 'int', mapping : '@id'},
    	{name : 'eventcattitle', type : 'string', mapping : '@eventcattitle'}, 
    	{name : 'status', type : 'bool', mapping : '@status'}]
});