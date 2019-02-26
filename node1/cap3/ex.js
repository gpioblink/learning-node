/* 

配列の内容を順に処理する
forEachメソッド

array.forEach(callback [,that])
    array: 配列オブジェクト
    callback: 個々の要素を処理するための関数
    that: 関数callbackの中でthisが示すオブジェクト

*/

var data = [2, 3, 4, 5];
data.forEach(function(value, index, array){
    console.log(value*value);
});

/* 

配列を指定されたルールで加工するmapメソッド
forEachとの違いは加工けったを戻り値として返すこと
mapメソッド

array.map(callback [,that])
    array: 配列オブジェクト
    callback: 個々の要素を加工するための関数
    that: 関数callbackの中でthisが示すオブジェクト

*/

var result = data.map(function(value, index, array){
    return value*value;
});

/* 

someメソッド
要素が条件に合致したかをtrue/falseで返し
1つでも条件に合致する要素がればtrueを返す

ちなみにeveryメソッドはその逆を行う

array.some(callback [,that])
    array: 配列オブジェクト
    callback: 個々の要素を判定するための関数
    that: 関数callbackの中でthisが示すオブジェクト

*/

var data = [4, 9, 16, 25];
var result = data.some(function(value, index, array){
    return value % 3 === 0;
});

if (result) {
    console.log('3の倍数が見つかりました！');
} else {
    console.log('3の倍数は見つかりませんでした');
}

/*

またsome/everyの書き方で、配列の内容をfilterすることができる。
以下を実行するとresultに9と25が残る

*/

var data = [4, 9, 16, 25];
var result = data.filter(function(value, index, array){
    return value % 2 === 1;
});

//sortのルールを変更するには、引数が２つの負数と整数を返す関数を作ればいい

//これだと辞書順のソート
var ary = [5, 25, 10];
console.log(ary.sort());

//これで数値順のソート
console.log(ary.sort(function(x,y){
    return x-y;
}));

//キー順のソート
var classes = ['部長', '課長', '主任', '担当'];
var members = [
    {name: "あい うえお", clazz: '主任'},
    {name: "かき くけこ", clazz: '部長'},
    {name: "さし すせそ", clazz: '担当'},
    {name: "たち つてと", clazz: '課長'},
    {name: "なに ぬねの", clazz: '担当'},
];
console.log(classes.sort(function(x,y){
    return classes.indexOf(x.clazz) - classes.indexOf(y.clazz);
}));


