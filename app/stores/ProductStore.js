Ext.regStore('Products',{
    model: 'product',
    //autoLoad : true,
    sorters: [{
        property : 'dist',
        direction: 'ASC'
    },{
        property : 'title',
        direction : 'ASC'
    },{
        property: 'dateAdded',
        direction: 'DESC'
    }],

    UpdateDistance : function (){
        if(App.myLatLng){

            var records = this.data.items;

            for(var i =0, l = records.length; i < l; i++){
                if(!records[i].data.active)continue;
                var loc = new google.maps.LatLng(records[i].get('latitude'), records[i].get('longitude')),
                kmdistance = DistanceBetween(App.myLatLng, loc);

                records[i].set('dist', kmdistance.toFixed(2));
            }
            this.sync();
            this.sort('dist', 'ASC');
        }
    }
});


function DistanceBetween(p1, p2) {
    if (!p1 || !p2) {
        return 0;
    }

    var R = 6371, // Radius of the Earth in km
    dLat = (p2.lat() - p1.lat()) * Math.PI / 180,
    dLon = (p2.lng() - p1.lng()) * Math.PI / 180,
    a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
    d = R * c;
    return d;
};