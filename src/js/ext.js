extend(Cln.prototype, {
    _initExts: function() {
        Cln._exts.forEach(function(ext) {
            var name = ext[0],
                Constr = ext[1] || function() {},
                prot = ext[2];

            extend(Constr.prototype, prot);

            this[name] = new Constr();

            var obj = this[name];
            obj.parent = this;
            obj.init && obj.init(this._data, this._container);
        }, this);
    },
    _removeExts: function() {
        Cln._exts.forEach(function(ext) {
            var name = ext[0];

            this[name].destroy();
            delete this[name];
        }, this);
    }
});

Cln._exts = [];

Cln.addExt = function(name, constr, prot) {
    Cln._exts.push([name, constr, prot]);
};
