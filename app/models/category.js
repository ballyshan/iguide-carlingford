Ext.regModel('category', {
    idProperty: 'cat_id',
    fields: [
    	{name : 'cat_id', type : 'int', fieldOption : 'PRIMARY KEY ASC'},
    	{name : 'cat_parent_id', type : 'int',  defaultValue : 0},
    	{name : 'cat_name', type : 'string'},
    	{name : 'cat_description', type : 'string'},
    	{name : 'active' , type : 'bool'},
    	{name : 'cat_imagepanel', type : 'string'},
    	{name : 'cat_subtitletext', type : 'string'},
    	{name : 'cat_introcontent', type : 'string'}
    	],
     proxy: {
        type: 'sqlitestorage',
        dbConfig :{
            tablename 	: 'categories',
            dbConn 	: App.DbConnection.dbConn
        },
        reader : {
            idProperty : 'cat_id'
        }
    },
    writer: {
        type: 'json'
    },
     associations: [
        {type: 'hasMany', model: 'product', name: 'Products', foreignKey : 'cat_id' },
        //{type: 'hasMany',model: 'category', name: 'children', filterProperty : 'cat_parent_id'}
     ]
});

Ext.regModel('categoryXML', {
    idProperty: 'cat_id',
    fields: [
    	{name : 'cat_id', type : 'int', mapping : '@cat_id'},
    	{name : 'cat_parent_id', type : 'int', mapping : '@cat_parent_id'},
    	{name : 'cat_name', type : 'string', mapping : '@cat_name'},
    	{name : 'cat_description', type : 'string', mapping : '@cat_description'},
    	{name : 'active' , type : 'bool', mapping : '@active'},
    	{name : 'cat_imagepanel', type : 'string', mapping : '@cat_imagepanel'},
    	{name : 'cat_subtitletext', type : 'string', mapping : '@cat_subtitletext'},
    	{name : 'cat_introcontent', type : 'string', mapping : '@cat_introcontent'}
    	]
});