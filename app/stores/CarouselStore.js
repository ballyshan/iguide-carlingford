Ext.regStore('ProductsForCarousel',{
    model: 'product',
    proxy: {
       	type: 'localstorage',
        id: 'ProductsForCarousel-store'
    }
});