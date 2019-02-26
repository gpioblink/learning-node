//フラグの解説　g/i/m/u

// 正規表現の検索
var p = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/gi;
var str = 'サポートサイトはhttp://www.wings.msn.to/です。'
str += 'サンプル紹介サイトHTTP://www.web-deli.com/もよろしく！'
var result = str.match(p); //正規表現にマッチした文字列を配列として返す。ここではforループでえられた配列の内容を順に出力している
for(var i = 0, len = result.length; i < len; i++){
    console.log(result[i]);
}

// 正規表現のオプションでマッチング時の挙動を制御する

//gオプションを外すと。。
var p = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/g;
var str = 'サポートサイトはhttp://www.wings.msn.to/です。'
str += 'サンプル紹介サイトHTTP://www.web-deli.com/もよろしく！'
var result = str.match(p); //正規表現にマッチした文字列を配列として返す。
for(var i = 0, len = result.length; i < len; i++){
    console.log(result[i]); //最初に一致した文字列が見つかったところで終了する。
    //このときmatchメソッドは「最初に一致した文字列全体とサブマッチ文字列」を配列として返す
    //サブマッチ文字列は正規表現パターン中の丸かっこで示された部分に合致した部分文字列のこと
}

//iオプションを外すと、大文字・小文字の違いを無視しなくなる。

//分かりにくいmオプションとは
var p = /^[0-9]{1,}/gm; //行頭にある１文字以上の数値を検索
var str = '101匹のワンちゃん。\n7人の小人';
var result = str.match(p);
for(var i = 0, len = result.length; i < len; i++){
    console.log(result[i]);
}
//mがないと「101」だけヒットするが、改行後の「7」にもヒットするようになる。

//uフラグをつけると、「叱」などのサロゲートペアを認識できるようになる（任意の１文字としてしっかり認識する）。


/*
正規表現で文字列を置き換える
*/

var p = /(http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?)/g; // $1にマッチング文字列全体をセットするための処置
var str = 'サポートサイトはhttp://www.wings.msn.to/です。'
console.log(str.replace(p, '<a href="$1">$1</a>'));

/*
正規表現で文字列を分割する
*/

var p = /[\/\.\-]/gi;
console.log('2016/12/04'.split(p));
console.log('2016-12-04'.split(p));
console.log('2016.12.04'.split(p));
//どんな区切り文字であるかにかかわらず文字列が正しく分割されている