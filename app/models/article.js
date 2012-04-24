Ext.regModel('article', {
    idProperty: 'id',
    fields: [
    	{name : 'id', type : 'int', fieldOption : 'PRIMARY KEY ASC'}, 
    	{name : 'date', type : 'string'},
    	{name : 'title', type : 'string'}, 
    	{name : 'description', type : 'string'}, 
    	{name : 'image', type : 'string'}, 
    	{name : 'sby', type : 'string'}, 
    	{name : 'status', type : 'bool'}]
});

Ext.regModel('articleXML', {
    fields: [
    	{name : 'id', type : 'int', mapping : '@id'}, 
    	{name : 'date', type : 'string', mapping : '@date'},
    	{name : 'title', type : 'string', mapping : '@title'}, 
    	{name : 'description', type : 'string', mapping : '@description'}, 
    	{name : 'image', type : 'string', mapping : '@image'}, 
    	{name : 'sby', type : 'string', mapping : '@sby'}, 
    	{name : 'status', type : 'bool', mapping : '@status'}]
});