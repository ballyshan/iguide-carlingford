Ext.regController('Location', {

    directions : function(options){
        if(!options.product){
            Ext.redirect('Category/products');
            return;
        }

        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();

        var request = {
            origin: App.myLatLng,
            destination: new google.maps.LatLng(options.product.latitude, options.product.longitude),
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        var displayMap = new Ext.Map({
            mapOptions: {
                center: App.myLatLng
            },
            listeners : {
                maprender : function(comp, map){
                    directionsService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                            directionsDisplay.setMap(map);
                        }
                    });
                }
            }
        });
        var settings = Ext.getStore('Settings'),
            directionsToText = settings.findRecord("variable", "DirectionsTo");

        var directionsPanel =  this.render({
            xtype : 'panel',
            layout : 'fit',
            dockedItems: [{
                xtype: 'toolbar',
                title: directionsToText.data.value + ': ' + options.product.title,
                dock : 'top'
            }],
            items : [displayMap],
            listeners: {
                activate : function(){
                    App.unmask();
                },
                deactivate: function(view){
                    view.destroy();
                    delete this.directionsPanel;
                },
                scope: this
            }
        });

        var toolbar = this.application.viewport.query('#viewportToolbar')[0],
            backBtn = this.application.viewport.query('#backBtn')[0];
        toolbar.show();
        backBtn.show();

        backBtn.setHandler(function()
        {
            App.dispatch({
                controller: 'Category',
                action: 'products',
                historyUrl: 'Category/products',
                category : options.product.cat_id,
                visibleTab : options.visibleTab || 'map',
                animation: {
                    type: 'slide',
                    reverse: true
                }
            });
        });

        this.application.viewport.setActiveItem(directionsPanel, options.animation);
    },

    gallery : function(options){
        if(!options.items){
            Ext.redirect('Category/products');
            return;
        }

        var galleryItems = [];

        for(var i = 0, len = options.items.length; i < len; i++){
            var file = options.items[i].data;
            galleryItems.push({
                xtype : file.file_extension == 'jpg' ? 'ImageCard' : 'GalleryCard',
                data : file
            });
        }

         this.galleryCarousel = this.render({
            xtype : 'GalleryView',
            items : [galleryItems],
            listeners: {
                activate : function(){
                    App.unmask();
                    App.viewport.doComponentLayout();
                },
                deactivate: function(view){
                    view.destroy();
                    delete this.galleryCarousel;
                },
                scope: this
            }
        });

        var toolbar = this.application.viewport.query('#viewportToolbar')[0],
            backBtn = this.application.viewport.query('#backBtn')[0];
        toolbar.show();
        backBtn.show();
        var product = Ext.getStore("Products").getById(options.items[0].data.file_location_id);
        backBtn.setHandler(function()
        {
            App.dispatch({
                controller: 'Category',
                action: 'product',
                historyUrl: 'Category/product',
                product : product.data,
                animation: {
                    type: 'slide',
                    reverse: true
                }
            });
        });

        this.application.viewport.setActiveItem(this.galleryCarousel, options.animation);
    }
});