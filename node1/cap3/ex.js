var dat = new Date(2016, 11, 25, 11, 37, 15, 999);
console.log(dat); //それっぽく出る
console.log(dat.getFullYear());
//省略
console.log(dat.getSeconds());
console.log(dat.getTime()); // 1970/01/01 00:00:00からの経過ミリ秒
console.log(dat.getTimezoneOffset); //協定世界時との時差の経過ミリ秒

// dat.getUTCFullYear() のように間にUTCをつけると協定時での取得となる。

var dat2 = new Date(); //デフォルト値として生成時点の値が入っている
dat2.setFullYear(2017);
//省略
dat2.setMilliseconds(513);

console.log(dat2.toLocaleString()); //ローカル時の文字列出力
console.log(dat2.toUTCString()); //UTC時の文字列出力
console.log(dat2.toDateString());//日付部分を文字列として出力
console.log(dat2.tiTImeString());//時刻部分を文字列として出力
console.log(dat2.toLocaleDateString());//地域情報に従って日付部分を文字列として出力
console.log(dat2.toLocaleTimeString());//地域情報に従って時刻部分を文字列として出力
console.log(dat2.toJSON()); //JSON文字列として時刻を取得

console.log(Date.parse('2016/11/05')); //日付文字列を解析しミリ秒にする
console.log(Date.UTC(2016, 11, 5));
console.log(Date.now());

//時刻の加算減算

var dat = new Date(2017, 4, 15, 11, 40);
console.log(dat.toLocaleString());
dat.setMonth(dat.getMonth() + 3);
dat.setMonth(dat.getDate() - 20);
// 日付などの有効範囲を超えた場合でもDateオブジェクトは自動的にさかのぼって正しい日付を作ってくれる
// 例：来月の０日目＝今月の最終日

//日付・時刻の差分を求める

var dat1 = new Date(2017, 4, 15);
var dat2 = new Date(2017, 5, 20);
var diff = (dat2.getTime() - dat1.getTime()) / (1000*60*60*24);
console.log(diff + '日の差があります！');
