Ext.regController('Event', {

    // index action
    index: function(options)
    {
        if (!this.eventCategoryIndex)
        {
            this.eventCategoryIndex = this.render({
                xtype: 'EventCategoryIndex',
                listeners :{
                    activate : function(){
                        App.unmask();
                    }
                }
            });
        }

        var toolbar = this.application.viewport.query('#viewportToolbar')[0],
            backBtn = this.application.viewport.query('#backBtn')[0];
        //toolbar.show();
        backBtn.show();

        backBtn.setHandler(function()
        {

            App.dispatch({
                controller: 'Home',
                action: 'index',
                historyUrl: 'Home/index',
                //
                animation: {
                    type: 'slide',
                    reverse: true,
                },
            });
        });

        this.application.viewport.setActiveItem(this.eventCategoryIndex, options.animation);
    },

    events: function(options){
        if(!options.category){
            Ext.redirect('Event/index');
        }
        var store = new Ext.getStore("Events");
        store.clearFilter();
        store.filter( 'category', options.category);

        if (!this.eventsView){
            this.eventsView = this.render({
                xtype: 'EventIndex',
                listeners :{
                    activate : function(){
                        App.unmask();
                    }
                }
            });
        } else {
            this.eventsView.refresh();
        }
        var toolbar = this.application.viewport.query('#viewportToolbar')[0],
            backBtn = this.application.viewport.query('#backBtn')[0];
        //toolbar.show();
        backBtn.show();

        backBtn.setHandler(function()
        {

            App.dispatch({
                controller: 'Event',
                action: 'index',
                historyUrl: 'Event/index',
                //
                animation: {
                    type: 'slide',
                    reverse: true
                },
            });
        });

        this.application.viewport.setActiveItem(this.eventsView, options.animation);

    },


    event: function(options)
    {
        if (!options.event)
        {
            Ext.redirect('Event/index');
        }

        if ( ! this.eventDetails)
        {
            this.eventDetails = this.render({
                xtype: 'EventDetails',
                data : options.event.data,
                listeners : {
                    activate : function(){
                        App.unmask();
                    }
                }
            });

        }
        else{
             //this.eventDetails.data = ;
             this.eventDetails.update(options.event.data);
        }

        var toolbar = this.application.viewport.query('#viewportToolbar')[0],
            backBtn = this.application.viewport.query('#backBtn')[0];
        //toolbar.show();
        backBtn.show();

        backBtn.setHandler(function()
        {

            App.dispatch({
                controller: 'Event',
                action: 'events',
                historyUrl: 'Event/events',
                category : options.event.data.category,
                animation: {
                    type: 'slide',
                    reverse: true,
                },
            });
        });

        this.application.viewport.setActiveItem(this.eventDetails, options.animation);
    }
});