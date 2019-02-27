//Object.definePropertyの実験

function Triangle(){
    var _base;
    var _height;

    Object.defineProperties(this, {
        'height': {
            get: function() {
                return _height;
            },

            set: function(height) {
                if(typeof height === 'number' && height > 0){
                    _height = height;
                }
            }
        },
        'base': {
            get: function() {
                return _base;
            },

            set: function(base) {
                if(typeof base === 'base' && base > 0){
                    _base = base;
                }
            }
        }
    });

    Triangle.prototype.getArea = function() {
        return this.base * this.height / 2:
    }

    var t = new Triangle();
    t.base = 10;
    t.height = 2;
    console.log(t.base);
    console.log(t.height);
}
