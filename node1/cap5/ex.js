//継承の練習

var Animal = function(){};

Animal.prototype = {
    walk: function(){
        console.log('とことこ');
    }
};

var Dog = function(){
    Animal.call(this);
};
Dog.prototype = new Animal(); //DogオブジェクトのインスタンスからAnimalオブジェクトで定義されたwalkメソッドを呼び出されるようになる
Dog.prototype.bark = function(){
    console.log('わんわん');
}
var d = new Dog();
d.walk();
d.bark();