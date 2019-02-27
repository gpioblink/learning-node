//配列ライクなオブジェクトを配列に変換する

function hoge(){
    // prototypeオブジェクトは、「Arrayオブジェクト配下のメンバを表すためのプロパティ」
    var args = Array.prototype.slice.call(arguments);
    //sliceは引数を指定しない場合、もとの配列をそのまま返すのでこの文によってargumentsオブジェクトの内容が配列として得られる
    console.log(args.join('／'));//argumentsオブジェクトでは使えないjoinができる＝Arrayオブジェクトに変換される
}

hoge('Angular', 'React', 'BackBone');

//NodeListオブジェクトを配列に変換する場合も使えるよ！