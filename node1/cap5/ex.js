//自作クラスへのイテレータの実装

class MyIterator{
    constructor(data){
        this.data = data;
    }

    //これを実装すると自作関数でもイテレータが使える！
    [Symbol.iterator](){
        let current = 0;
        let that = this;
        return {
            next(){
                return current < this.data.length ?
                {value: that.data[current++], done: false}:
                {done: true};
            }
        };
    }
}

let itr = new MyIterator(['one','two','three']);
for(let value of itr){
    console.log(value);
}