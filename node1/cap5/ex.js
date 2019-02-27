//自作クラスへのジェネレータの実装

class MyIterator{
    constructor(data){
        this.data = data;
        this[Symbol.iterator] = function*(){
            let current = 0;
            let that = this;
            while(current < that.data.length){
                yield that.data[current++];
            }
        }
    }
}

let itr = new MyIterator(['one','two','three']);
for(let value of itr){
    console.log(value);
}