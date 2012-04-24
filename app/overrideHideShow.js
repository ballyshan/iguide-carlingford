var originalComponentShow = Ext.Component.prototype.show;
var originalComponentHide = Ext.Component.prototype.hide;
Ext.override(Ext.Component, {
  show:function () {
    originalComponentShow.apply(this, arguments);

    // doesn't work with animations
    if (arguments.length === 0) {
      this.visibilityCleanup();
    }
  },
  hide:function () {
    originalComponentHide.apply(this, arguments);

    // doesn't work with animations
    if (arguments.length === 0) {
      this.visibilityCleanup();
    }
  },

  visibilityCleanup:function () {
    var parent = this.up();
    if (parent && parent.dockedItems !== undefined) {
      var i = parent.dockedItems.indexOf(this);
      if (i !== -1) {
        parent.removeDocked(this, false);
        parent.insertDocked(i, this);
      }
    }
  }
  });