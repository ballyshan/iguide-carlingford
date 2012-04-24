Ext.regStore('Categories', {
    model: 'category',
    sorters : [{
        property: 'cat_name',
        direction: 'ASC'
    }],
    filters: [{property : 'active', value: true}]
});