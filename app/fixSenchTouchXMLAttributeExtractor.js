Ext.DataView.override({
    getRecordData: function(record, ids) {
        var data = record.data;
        Ext.apply(data, this.prepareAssociatedData(record, ids));

        return data;
    },

    prepareAssociatedData: function(record, ids) {
        ids = ids || [];

        var data = {};
        var associations = record.associations;

        associations.each(function(association) {
            if (association.type == "belongsTo") {
                var belongsToRecord = record[association.instanceName];

                if (belongsToRecord != undefined && ids.indexOf(belongsToRecord.internalId) == -1) {
                    ids.push(belongsToRecord.internalId);
                    data[association.name] = this.getRecordData(belongsToRecord, ids);
                }
            } else {
                var toManyStore = record[association.storeName];

                if (toManyStore != undefined) {
                    var records = [];
                    toManyStore.each(function(toManyRecord) {
                        if (ids.indexOf(toManyRecord.internalId) == -1) {
                            ids.push(toManyRecord.internalId);
                            records.push(this.getRecordData(toManyRecord, ids));
                        }
                    }, this);
                    data[association.name] = records;
                }
            }
        }, this);

        return data;
    }
});
Ext.override( Ext.data.XmlReader, {
    createAccessor: function() {
        var selectValue = function(key, root, defaultValue){
            if( key == '#' ){
                return root.tagName;
            }
            if( key.indexOf( '@' ) != -1 ){
                var property = key.split( '@' )[ 1 ];
                key = key.split( '@' )[ 0 ];
            }
            var val;
            if( key.length ){
                var node = Ext.DomQuery.selectNode(key, root);
                if( node && node.firstChild ){
                    node = node.firstChild;
                }
            }
            else{
                var node = root;
            }
            if(node){
                if( typeof( node.getAttribute ) != 'undefined' && typeof( property ) != 'undefined' ){
                    val = node.getAttribute( property );
                }
                else{
                    val = node.nodeValue;
                }
            }
            return Ext.isEmpty(val) ? defaultValue : val;
        };

        return function(key) {
            var fn;

            if (key == this.totalProperty) {
                fn = function(root, defaultValue) {
                    var value = selectValue(key, root, defaultValue);
                    return parseFloat(value);
                };
            }

            else if (key == this.successProperty) {
                fn = function(root, defaultValue) {
                    var value = selectValue(key, root, true);
                    return (value !== false && value !== 'false');
                };
            }

            else {
                fn = function(root, defaultValue) {
                    return selectValue(key, root, defaultValue);
                };
            }

            return fn;
        };
    }()
});