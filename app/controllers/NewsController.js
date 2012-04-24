Ext.regController('News', {

    // index action
    index: function(options)
    {
        if ( ! this.indexView)
        {
            this.indexView = this.render({
                xtype: 'NewsIndex',
                listeners: {
                    activate : function(){
                        App.unmask();
                    },
                    /*itemtap: function(view, index){
			            this.selectedNewsItem = view.store.getAt(index);
			            Ext.redirect('News/details');
			        },*/
                    render: function (thisComponent) {
                    //thisComponent.getStore().load();
                    },
                    scope: this
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
                    reverse: true
                },
            });
        });

        this.application.viewport.setActiveItem(this.indexView, options.animation);
    },

    details: function(options)
    {
        if (!options.article)
        {
            Ext.redirect('News/index');
        }

        if (!this.detailsView)
        {
            this.detailsView = this.render({
                xtype: 'NewsDetails',
                data : options.article.data,
                listeners : {
                    activate : function(){
                        App.unmask();
                    }
                }
            });
        } else {
            this.detailsView.update(options.article.data);
        }

        var toolbar = this.application.viewport.query('#viewportToolbar')[0],
        backBtn = this.application.viewport.query('#backBtn')[0];
        //toolbar.show();
        backBtn.show();

        backBtn.setHandler(function()
        {

            App.dispatch({
                controller: 'News',
                action: 'index',
                historyUrl: 'News/index',
                //
                animation: {
                    type: 'slide',
                    reverse: true,
                },
            });
        });

        this.application.viewport.setActiveItem(this.detailsView, options.animation);
    }
});