var ary1 = ['Sato', 'Takae', 'Osada', 'Hio', 'Saitoh', 'Sato'];
var ary2 = ['Yabuki', 'Aoki', 'Moriyama', 'Yamada'];

console.log(ary1.length);
console.log(Array.isArray(ary1));
console.log(ary1.toString()); //全てが「,」で連結されて出力
console.log(ary1.indexOf('Sato'));
console.log(ary1.lastIndexOf('Sato'));

console.log(ary1.concat(ary2)); //JS上でみたままのような形式で出力
console.log(ary1.join('/')); // "/"で連結して出力
console.log(ary1.slice(1)); //１番めから最後の要素までを出力
console.log(ary1.slice(1,2)); //1番目から2番目までの要素を出力
console.log(ary1.splice(1,2,"Kakeya","Yamaguchi")); //1から2番目までの要素を置き換え。戻値は置き換え対称の置換え前の要素を取得
console.log(ary1); //上で置き換え後の配列を取得できる
console.log(Array.of(20,40,60)); //可変長引数を配列にする静的メソッド
console.log(ary1.copyWithin(1,3,5)); // 4〜5番目の要素を２〜３番めの位置にコピー。戻値はコピー後の配列
console.log(ary1); //上でコピー後の配列を取得できる

console.log(ary2.fill('Suziki', 1, 3)); //2〜3番目の要素をSuzukiで置き換え

console.log(ary1.pop());
console.log(ary1.push("Kondo"));
console.log(ary1.shift());//先頭を削除するバージョンのpop
console.log(ary1.unshift("Ozawa","Kuge")); //先頭を追加するバージョンのpush
console.log(ary1.reverse());
console.log(ary1.sort());