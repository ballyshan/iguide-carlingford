App.views.OfferMap = Ext.extend(Ext.Panel, {
    layout : 'fit',
    iconCls: 'locate',
    title: '',

    initComponent : function(){
        this.dockedItems = [new Ext.Toolbar({
            title : this.title + ' Map'
        })];
        this.offerMap = new Ext.Map({
            mapOptions: {
                    zoom: 10,
                    center: new google.maps.LatLng(0, 0),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                },
            listeners : {
                maprender : function(comp, map){
                    var store = Ext.getStore('Deals'),
                    products = Ext.getStore("Products"),
                    settings = Ext.getStore('Settings'),
                        mapMarkerMax = settings.findRecord("variable", "maxMapLocations"),
                        count = 0, maxLocs = parseInt(mapMarkerMax.data.value, 10);
                    var bounds = new google.maps.LatLngBounds();
                    store.each(function(record){
                        if(count > maxLocs){
                            return false;
                        }
                        var prod = products.getById(record.data.locationidlink);
                        if(prod){
                            var pos = new google.maps.LatLng(prod.get('latitude'), prod.get('longitude'))
                            var marker = new google.maps.Marker({
                                position: pos,
                                map: map,
                                title : record.get('title'),
                                offer : record.data
                            });

                            google.maps.event.addListener(marker, 'mousedown', function() {
                                if(marker.offer){
                                    App.dispatch({
                                        controller: 'Home',
                                        action: 'offerDetails',
                                        offer: marker.offer,
                                        historyUrl: 'Home/offerDetails',
                                        returnUrl : 'Home/offerMap',
                                        animation: {
                                            type: 'slide'
                                        }
                                    });
                                }
                            });
                            bounds.extend(pos);
                            map.fitBounds(bounds);
                            count++;
                        }

                    });
                }
            }
        });
        this.items = [this.offerMap];
        App.views.OfferMap.superclass.initComponent.call(this);
    }
});
Ext.reg('OfferMap', App.views.OfferMap);