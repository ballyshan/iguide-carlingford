Ext.regModel('menuItem', {
    fields: [
    {name : 'order', type : 'int', fieldOption : 'PRIMARY KEY ASC' },
    {name : 'text', type : 'string'}, 
    {name : 'controller', type : 'string'},
    {name : 'action', type : 'string'},
    {name : 'link', type : 'string'},
    {name : 'list', type : 'string'}]
});