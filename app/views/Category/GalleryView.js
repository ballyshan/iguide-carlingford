App.views.GalleryView = Ext.extend(Ext.Carousel, {
    centered : true,
    layout : 'card'

});
Ext.reg('GalleryView', App.views.GalleryView);

App.views.GalleryCard = Ext.extend(Ext.Panel, {
    tpl: ['<div style="text-align:center"><a href="',
        App.onlineImageFolder, '{file_name}" target="_blank">',
        '<img src="<tpl if="file_cover && navigator.onLine">',
        App.onlineImageFolder,
        '{file_cover}</tpl>',
        '<tpl if="!file_cover || !navigator.onLine">',
        'resources/images/', App.offlineLocation,
        '</tpl>" alt="{file_cover}" /></a><span>{file_description}</span></div>']
});
Ext.reg('GalleryCard', App.views.GalleryCard);

App.views.ImageCard = Ext.extend(Ext.Panel, {
    tpl: ['<div style="text-align:center"><a href="',
        App.onlineImageFolder, '{file_name}" target="_blank">',
        '<img src="<tpl if="file_name && navigator.onLine">',
        App.onlineImageFolder,
        '{file_name}</tpl>',
        '<tpl if="!file_name || !navigator.onLine">',
        'resources/images/', App.offlineLocation,
        '</tpl>" alt="{file_name}" /></a></div>']
});
Ext.reg('ImageCard', App.views.ImageCard);

