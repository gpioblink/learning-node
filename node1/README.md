# DAY1 (なんでも開発合宿一日目)

「Javascript本格入門」を読破する。
作ったサンプルコードやテストコードはここにあげる。

## Chapter 1

- 「ブラウザー以外の環境でもJavaScriptを利用したいという方は、特にChapter 5までの内容を確実に理解するようにしてください」

- Chromeのdevツールでブレイクポイントから１行単位にブレイクポイント指定もできる

## Chapter 2

- コメントで無効にすることを「コメントアウト」というが、再び有効にすることは「コメントイン」という。

- varとletの違いは２点で、「変数の重複を許可しない(上書きしない)」と「ブロックスコープを認識する」こと。

- ただの数値(1.08など)は、自分以外にとっては意味を持たないマジックナンバーと考えるべき。ES2015ではconstが使える。

- 数値リテラルでは、10進のほかに16(0x),ES2015では8(0o),2(0b)進が使える

- 文字リテラルは基本型(文字リテラルがそのままメモリ上に格納される)

- ダブルクォートとシングルクォートのちがいはなし

- es2015にはテンプレート文字列がある

- オブジェクトと連想配列は同一のもの。オブジェクト内の個々のデータはプロパティと呼び、関数を格納されたプロパティのことを特別にメソッドという。ただしES2015では連想配列を専門に扱うMapが追加された

- オブジェクトのキー指定には、ドット演算子もブラケット構文も使えるが、ブラケット構文のほうが識別子の命名規則によらないので汎用性が高い

- Javascriptは関数もリテラルの１つとして扱われる。

- 意図した空を表すにはnull、そうでなければundefined

- 小数の掛け算は不正確なので、掛けようとするかずをまず10の累乗倍して、最終的な結果を小数点以下で四捨五入した後、かけた数を乗算しふただび小数点にもどすといい。このかける数は有効数字で決めること。

- constであっても参照型の場合は配列そのものを再代入するのでなければconstの規約違反にはならない。

- ES2015では分割代入ができる。これを`[x,y] = [y,x];`のように使えばswapも一行でできるね！

``` JavaScript
let data = [1,2,3,4,5];
let [x0, x1, x2, ...other] = data;
//順番に変数名をつけて取り出し
console.log(x0); // 1
console.log(other); //[4,5]
```

``` JavaScript
//名前で個々の変数を分解。入れ子もそのとおりに掛けばおｋ。「変数名:別名」の形式でもかける。宣言のない代入のときは({ごにょごにょ} = book);でいける
let book = { title: 'Java聖書リファレス', publish: '並木先生', price: 2680 };
let { price, title, memo = 'なし'} = book;
```

- 「==」の等価演算子では、「オペランドのデータ型が違う場合にもデータ型を変換してなんとか等しいとみなせないか」を試みる。例えば、「1 == true」は「true」とみなされる。ただし、参照型の場合はアドレスが一致するかしか見ないので注意。

- 「==」の場合は例えば「0x10」という文字リテラルと「16」という数値リテラルをtrueとしてしまう。これはこの「x」が16進数の意味でない場合も同様。そこで、型まで一致するか見る「===」同値演算子を使えば良い。

- 「?:」もちろん条件演算子`console.log((x >= 70) ? '合格' : '不合格');`もある。

- ショートカット演算子の使い時として、`msg = msg || 'デフォルト値';`とするとmsgがfalsyな空文字などのときにデフォルト値にできたりする。

- 2進数で負数を表すとき、「ビット列を反転させて１加えたものが、その絶対値になる」という規則がある。

- delete演算子の特徴３つ「配列の要素を削除しても、後ろの要素は繰り上がらない（インデックス番号は変わらない）」「プロパティを削除した場合でも、プロパティそのものが削除されるだけで、プロパティが参照するオブジェクト自体は消えない」「`var data2 = 1`などの明示的に宣言された変数は削除できない」

- typeof演算子は基本データ型の識別はできるが、配列やオブジェクト、また基本型のラッパーオブジェクトは一様に「object」と返される。objectの種類を知りたいときはinstanceof演算子やconstructorプロパティを使う

- カンマ演算子を使うと`for(var i=1, j=1; i<5; i++,j++)`のように書ける。

- for...in命令もある。ただし、配列で使用するとコードがシンプルにならず、処理の順序がおかしくなったり、仮変数にはインデックス番号が格納されるだけだったりするので注意。

- 配列用にES2015では「for...of命令」が追加された。これは列挙可能オブジェクトを順番通りに処理し、仮変数もインデックス番号やキーではなく値そのものを列挙する

- 配列のサイズは、「.length」で取得できる

- document.writeよりもtextContentやinnerHTMLを使うこと。document.writeは特殊な動きをもち「ドキュメント全て出力したあとに呼び出すとページが一旦クリアされる」などの挙動をする。

- breakには次のようにしてラベルをつけられる

``` JavaScript
kuku:
for(){
    for(){
        if() break kuku;
    }
}
```

- 例外処理はtry...catch...finally。オーバーヘッドが大きい処理なのでループ処理の中で使用するのは控え、ループ処理の外に配置するなど工夫をする。エラーをthrowするときは`throw new Error('エラー原因の解説')`とする。Errorの代わりにEvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIErrorなどもthrowできる。

- strictモードにするにはスクリプトの先頭や関数本体の先頭に`'use strict';`と書けばいい。

- async/defer属性を使うことで、外部スクリプトを非同期にロードできる。`<script src="app.js" async></script>`とすることで、src属性で指定されたスクリプトを非同期にロードし、読み込み完了次第実行するようになる。この場合読み込み順が保証されあいので、その場合defer属性をつけるとスクリプトの実行を文書の解析完了まで延滞できる。

### 識別子の使い方

- 変数・関数名　camelCase記法

- 定数名 アンダースコア記法

- クラス名 Pascal記法

## Chapter 3

- オブジェクトはそれ自身がデータを保持しようとするものなので、特殊な例外を除いて基本的に複数の箇所から異なる値をセットしようとしてはいけない

- 組み込みオブジェクトとは、「JavaScriptに標準で組み込まれた」という意味で、ブラウザーに限らず組み込みオブジェクトはJSが動作するすべての環境で利用できる。

- Object, Array, String, Boolean, Number, Symbol, Functionなどは、組み込みオブジェクトの中でもデータ型と対応していて、リテラルをそのまま対応する組み込みオブジェクトとして利用できるので、インスタンス化をほとんど意識する必要がない。他にも組み込みオブジェクトには、Map/WeakMap, Set/WeakSet, Math, Date, RegExp, Error/XxxxxError, Proxy, Promiseがある。

- 基本データ型をnew演算子を使ってインスタンス化するのは原則避ける。さもないと以下のようになる

``` JavaScript
var flag = new Boolean(false);
if (flag) {
    console.log('flagはtrueです！！');
} // ここで「null以外のオブジェクトはtrueとみなされる」ため、if内が実行されてしまう。
```

- JSのデータ型を扱うオブジェクトの中でも基本形の文字、数値、理論値を扱うためのオブジェクトをラッパーオブジェクトという。ラッパーオブジェクトは「単なる値に過ぎない基本形のデータを包んで、オブジェクトとしての機能を追加するためのオブジェクト」である。JSはこれを自動的に相互変換するため開発者は意識する必要はない。

- `str.indexOf(部分文字列substr, 検索開始インデックスstart);`を使うことで文字列前方(start+1文字目)から部分文字列substrを検索できる。不一致の場合は`-1`が返る

- 「叱」などのサロゲートペア文字の長さをカウントするとき、Unicodeで2バイトではなく4バイトで表現しているため、「.length」ではこれを２文字と認識してしまう。回避は以下のようにする

```JavaScript
var mag = '叱る';
var len = msg.length;
var num = msg.split(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g).length -1;
console.log(msg.length - num);
```

- Numberオブジェクトは、整数整形の機能の他に無限大・無減小/整数型の最大値・最小値など特別な値を表すための定数を公開している。Numberで安全に表せる最大の整数値はES2015でMAX_SAFE_INTEGER。EPSILONなんかもある。

- 演算の結果がJSで表現可能な値を超えるとPOSITIVE_INFINITYなどになり、０除算などの不正な場合はNaNとなる。NaNは自分自身を含む全ての値と等しくない

- `!!`のように「!」演算子を２重に使うことで理論型への変換ができる

- ES2015ではSymbolオブジェクトが追加され、「モノの名前」を作成することができる。列挙定数を表すようなケースで使う。定数の値は同名であってもユニークになる。(例：MONDAY=0の場合でもMONDAYと等しいのはMONDAYのみ)。プライベートプロパティ、イテレータの定義にシンボルを使うこともできる。性質は、newできない、引数が同じでも別物として扱われる、===での比較では異なるものとみなされる、「-0」や「+ ''」を使った暗黙的な型変換は不可（booleanの「!!」は可）。

- Mathオブジェクトは全て静的プロパティ・メソッド

- 同じオブジェクトを繰り返し呼び出す場合、with命令でオブジェクト名を省略できる。ただし処理速度低下や可読性低下の原因になるのでサンプルコード以外では使わないこと。

```JavaScript
with(console){
    log(Math.abs(-100));
    log(Math.sign(-100)); //正・負・０いずれかの符号
    log(Math.ceil(1234.56));
}
```

- Arrayもnewで作ろうとすると意味が曖昧になるため、できる限り配列リテラルを使う。

- reverseやsortなどのメソッドは戻り値だけでなく、もとの配列もソートされてしまうので注意。（破壊的なメソッド）

- コールバック系のメソッドでは、大本のメソッドが基本となる操作を提供しする。そのためその範囲の中でどのような加工・演算を行うかは、ユーザー定義関数が決める、という役割分担が基本。

- オブジェクトリテラルとMapオブジェクトの違いは３つ。任意の型でキーを設定できる。マップのサイズを取得できる（オブジェクトのときはfor...inなどで手動カウントしないといけない）。クリーンな(完全に空の)マップを作成できる（オブジェクトは作成時点でObjectオブジェクトしてのプロパティが最初から存在する）。

- Mapオブジェクトのキーに関する注意点として、「`1`」と「`'1'`」のように型が違うと同じとみなされない、`NaN === NaN`とみなされる、オブジェクトの比較は参照アドレスでの比較となるので注意しないといけない。

- SetオブジェクトでもMapと同様に、NaNは同一とみなされ、違う起源の{}と{}は別物として追加される。

- キーを弱参照で管理するWeakSetとWeakMapもある。弱参照では、キーがこのマップ以外で参照されなくなると、ガベージコレクトの対称となる。そのためWeakMap/WeakSetでは、キーは参照型でなければならず、列挙することができない。

- Dateオブジェクトには日付や時刻を直接加算・減算するためのメソッドは用意されていないため、getXxxxxメソッドで個々の日付、時刻要素を取り出し、加算・減算した結果をsetXxxxxメソッドで書き戻すという手順が必要になる。

```JavaScript
var d = new Date();
var d = new Date('2016/12/24 20:45:23');
var d = new Date(2016,11,2,44,55,22,300); //月だけは0~11での指定となるので注意。時刻の部分は省略できる。
var d = new Date(1480849635543); //タイムスタンプ値での指定
```

- 経過ミリ秒を日付にするには　経過ミリ秒÷(1000ミリ秒*60秒*60分*24時間) をすればよい

- 郵便番号のRegular Expressionは「`[0-9]{3}-[0-9]{4}`」というパターンで表せる。

- 正規表現について詳しく知りたいなら、「詳説 正規表現 第３版」を読め

- RegExpオブジェクトを作成する方法。RegExpオブジェクトのコンストラクタを経由する、正規表現リテラルを利用する方法がある。

```JavaScript
var hoge = new RegExp('正規表現', 'オプション'); //この構文では正規表現の「\」をJSの予約文字と認識されないようにエスケープすること
var hoge = /正規表現/オプション;
```

- 検索時に、String.matchを使う場合とRegExp.execを使う場合では挙動が違う。execではgオプションにかかわらず１つの実行結果しか返さない。これは、execコマンドが「最後にマッチした文字位置を記憶しているからであり、RegExpオブジェクトは「前回のマッチ位置から検索を再開する」

```JavaScript
var p = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/gi;
var str = 'サポートサイトはhttp://www.wings.msn.to/です。'
str += 'サンプル紹介サイトHTTP://www.web-deli.com/もよろしく！'
while((result = p.exec(str)) !== null){
    console.log(result[0]);
}
```

- マッチした文字列自体ではなく、マッチングの成否のみを知りたい場合には「`regexp.test(str)` true/false」または「`str.search(pattern)` 最初にマッチした文字位置 or -1」を使える！

- replace/splitの第一引数にはRegExpオブジェクトだけではなく、ただの文字列リテラルを指定することもできる。その場合、正規表現ではなく、固有文字列で置き換え・分割される。

- Javascriptのオブジェクトは基本的に、「オブジェクトの共通的な性質・機能を提供する」という役割を担っている。Objectオブジェクトはすべてのオブジェクトの基本オブジェクトであるともいえる。つまり、組み込みオブジェクトも、ユーザー定義オブジェクトもObjectオブジェクトで定義されたプロパティやメソッドを共通して利用することができる。

- オブジェクトと名前がつくものはすべて、Objectオブジェクトで定義されたプロパティやメソッドを共通して利用することができる。

- 例外的にObjectクラスの機能を引き継がないものもあるが、Object.createというメソッドを利用することでObjectの機能を引き継がないオブジェクトを作成することもできる。

- オブジェクトはtoString（文字列を返す）/valueOf(文字列以外の基本型の値が返されることを「期待して」使われる)メソッドを使用することで基本形に変形できる。オブジェクトを自作するならまともなtoStringを定義しよう。valueOfは組み込みオブジェクトは自分自身を返すだけ。例外として、Dateオブジェクトだけが日付・日時のタイムスタンプ値を返す。オブジェクトが基本型として表せるなら個々に定義すること。

- オブジェクトをマージするassignメソッドは、既存のオブジェクトを結合できる。`Object.assign(target, source, ...)`破壊的なメソッドであることに注意。元のオブジェクトに変更を及ぼしたくない場合は`let merged = Object.assign({}, pet, pet2, pet3)`のようにすればよい。

- オブジェクトを生成するcreateメソッドは、名前をもたない匿名オブジェクトを生成する最もシンプルな手段。`Object.create(作成するオブジェクトのもととなるオブジェクトproto [,プロパティ情報props])`。protoにObject.prototypeを渡しているのは、「Objectオブジェクトの機能を引き継いだオブジェクトを作成しない」という意味。

- 完全にからのオブジェクトを作成したい場合は`Object.create(null)`とすればよい。

- Object.createで利用できる属性は主にconfigurable(writable以外の属性変更やプロパティ削除が可能か)、enumerable(列挙を可能とするか)、value、writable(書き換え可能か)、getter/setter関数などがある。またconfigurable/enumerable/writableのデフォルト値はいずれもfalseである。

- 不変オブジェクトとは、最初にインスタンスを作成した後、一切の状態を変更できないオブジェクトのことをいう。

- JavaScriptプログラムでよく利用する機能を提供するGlobalオブジェクトがある。これはnewでインスタンス化したり、`Global.メソッド名(...);`メンバーを呼び出せるわけではない。グローバルオブジェクトであり、つまり`Global.`なしで`変数名`、`関数名(引数,...)`として参照できる。

- `Number.isNaN('hoge')`はfalseだが、グローバルオブジェクトの`isNaN('hoge')`はtrueとなる。これはNumberオブジェクトでは「引数が数値型であり、かつ、NaNである」ものだけをtrueとしているためである。isFiniteも同様の挙動。

- クエリ文字列のためにURIエンコードする、`encodeURI(str)`と`encodeURIComponent(str)`の違いは、componentのほうが`#$+/@;:,`などの変換もするところにある。

- eval関数は与えられた文字列をJSのコードとして評価・実行する。しかし、セキュリティリスクやパフォーマンス劣化の原因になるため乱用は避けるべき。eval is evil

- JSONで利用できるリテラル表現と、JavaScriptのリテラル表現は３点「プロパティ名はダブルクォートでくくらなければならない」「配列・オブジェクト配下の要素はカンマで終わってはいけない」「ゼロ始まりの数値は禁止」という制約がある。

### 不変オブジェクトの種類

- preventExtensionsは、プロパティの追加のみ不可にし、削除や値の変更は可能とする
- sealは、プロパティの追加と削除のみ不可能にし、値の変更は可能とする
- freezeは、プロパティの追加、削除、値の変更のいずれも不可能にする

これらの規則を破ったとき、無視されるだけでstrictモードでないと例外を発生しないため、これらの機能を使うときはstrictモードを有効にすべきである。

### 値の集合を管理・操作するオブジェクトについて

- Arrayオブジェクト インデックス管理 値の重複可
- Mapオブジェクト キー/値の組で管理 キーの重複不可
- Setオブジェクト 値に順番はない 値の重複はNG

### 文字列の数値変換について

- parseFloat/parseIntメソッド
  - 「123xxx」のような文字列混在の数字を「123」のように解析できる部分だけを数値として取り込む。ただし先頭から連続した場合のみ(「xxx123」などは不可)
  - Dateオブジェクトの解析は不可
  - 「0x10」は、parseFloatでは上の条件より「x」の前の「0」となり、parseIntでは16進数とみなして「16」を返す。ただし、ES2015で追加された２、８進数の解析はできない。
  - 「1.01e+2」は、parseFloatは正しく認識、parseIntは「e+2」の前の「1.01」を切り捨て1となる

- Number関数
  - 「123xxx」のような文字列混在の数字はNaNになる
  - Dateオブジェクトは「Dateオブジェクトを経過ミリ秒に換算した値」として返す
  - 「0x10」は、16進数とみなして「16」を返す
  - 「1.01e+2」は、正しく認識

### 部分文字列抽出について

- substring
  - 開始位置〜終了位置で抽出箇所を指定
  - start>endのときstartとendの関係を入れ替えて抽出
  - startやendに負の数を指定すると無条件に0

- slice
  - 開始位置〜終了位置で抽出箇所を指定
  - start>endのとき入替はせず空文字も返す
  - startやendに負の数を指定すると「文字列末尾からの文字数」と認識

- substring
  - 開始位置からの文字数指定で抽出箇所を指定

## Chapter 4

- 関数とは、与えられたパラメータに基づいてなんらかの処理を行い、その結果を返す仕組み。デフォルトの関数のほかにユーザー定義関数も作れる。ユーザー定義関数は４種類の作り方があり、「function命令で定義する」「Functionコンストラクター経由で定義する」「関数リテラル表現で定義する」「アロー関数で定義する」がある。

- 関数名は一般的に「showMessage」のように「動詞＋名詞」で表すこと！！camelCaseな

- function命令の中では関数の中身が１文であってもif/for/whileなど制御命令の中括弧を省略できないので注意。

- 「Functionコンストラクター経由で定義する」ときは`var getTriangle = new Function('base', 'height', 'return base * height /2;');`のように`var 変数名 = new Function(引数,... ,関数の本体);`と書く。仮引数の部分を１つにまとめてもいい。

  - わざわざコンストラクタ経由で記述するメリットは、「引数や関数本体を文字列として定義できる」点。ただし、evalのように乱用すべきではないが。

  - どうしても使用する場合はコストの高い処理のため、whileやfor、頻繁に呼び出される関数の中での使用を避ける。

  - コンストラクタで作ると、Functionコンストラクターの配下の変数は、その宣言場所にかかわらず、常にグローバルスコープとみなされる。関数リテラルでかけばローカル変数をさんしょうするのに。。というわけでやはりFunctionコンストラクターは原則使わないほうがいい。

- JavaScriptの関数は、原則としてfunction命令、または後述する関数リテラル・アロー関数で定義すること。

- 関数リテラルで表現すると、「リテラルとして表現できるし、関数リテラルを変数に代入したり、ある関数の引数として渡したり、はたまた、戻値として関数を返すことすら可能である」

```JavaScript
var getTriangle = function(base, height){
    return base * height / 2;
};
console.log('三角形の面積：', + getTriangle(5,2));
```

- function命令と関数リテラルの違いは、「関数を直接定義する」のか、「名前のない関数を定義した上で、変数に格納する」のか。関数リテラルは定義時点で名前をもたないので、、匿名関数とか無名関数と呼ばれる。

- アロー関数で`(引数, ...) => { ...関数の本体... }`は、関数リテラルをより簡潔に記述できる。また、本体が１文のときは関数の本体を囲む{}ブロックが不要で文の戻値がそのまま戻値とみなされるため括弧も省略できる(例:`let getTriangle = (base, height) => base * height / 2;`)。引数が１つのときは括弧を省略できる（０個のときは省略できない）。また、thisの固定もできる。

```JavaScript
let getTriangle = (base, height) => {
    return base * height /2;
};
console.log('三角形の面積：' + getTriangle(5,2));
```

- アロー関数の戻値を「オブジェクトリテラル」で返す場合、リテラル全体を括弧でくくらなければならない。(正しく解釈されなくなる)

- JSは文末のセミコロンを自動で補うのでreturn/break/continueの途中で改行してはいけない。文の継続が明らかな箇所でのみ改行すること。

- function命令で構造を宣言した場合はコンパイルするタイミングで関数を登録しているので(静的な構造)、呼び出しコードの後に書いても実行できる。

- JSでは「変数の巻き上げ(hoisting)」という現象がおきる。ローカル変数の確保は「関数全体」で有効なためされているが、この時点ではvarは実行されていないため未定義となっている。これを防ぐために、「ローカル変数は関数の先頭で宣言する」ことを心がける。(これは他の言語でよくある作法の「変数はできるだけ利用する場所の近くで宣言する」に反するので要注意)

```JavaScript
var scope = 'Global Variable';

function getValue(){
    console.log(scope); // <- ここはundefinedが出力される？！
    var scope = 'Local Variable';
    return scope;
}

console.log(getValue());
console.log(scope);
```

- ES2015以前では、ブロックレベルのスコープは存在しないため以下の様なコードでもエラーは出ない。このような意図しない競合を防ぐために、その下のサンプルのように模擬的なブロックスコープを実現すると良い。

```JavaScript
if (true) {
    var i = 5;
}
console.log(i);
```

```JavaScript
(function(){
    var i = 5;
    console.log(i);
}).call(this); //call(this)とすることで即時関数をその場で実行している
console.log(i); //変数iはスコープ外なのでエラーとなる
//自作のアプリ作成等のときは、コード全体を即時関数でくくることで、ライブラリなどアプリ以外のコードと変数名が競合する心配がなくなる。
```

- ブロックスコープに対応したlet命令もある。コードが複雑になるので即時関数は使わないこと。

- switch文内のlet宣言は注意。条件分岐全体として１つのブロックになっているため、case感で同じ変数をlet宣言するとエラーになる。

- JSは引数の数をチェックしない。もしチェックしたければ、関数配下で「arguments.length」を参照すればよい。

- 引数のデフォルト値を表現するための構文。普通に `if (base === undefined) {base = 1;}`のようにすればよい。無名引数は`arguments[0]`のようにして受け取ることができる。

- `getTriangle({ base:5, height:4 })`のようにして名前付き引数を扱うこともできる。ただし、呼び出し時も`getTriangle({height:4})`のように明示的に名前を指定しなければならない。

- ES2015では、普通な感じでデフォルト値を指定できる。デフォルト値をもった仮引数は、引数リストの末尾で宣言すべき。

- 必須の引数を作る場合にはひと工夫必要。値が指定されないとき、デフォルト値である関数が呼ばれてエラーを発生させる。

```JavaScript
function required(){
    throw new Error('引数が不足しています');
}

function hoge(value = required()){
    return value;
}
hoge(); //Errorになる
```

- 可変長引数の関数を定義する。

```JavaScript
function sum(...sums){ //名前が分かりやすい
    let result = 0;
    for(let num of nums){ //完全なArrayオブジェクトとして扱える
        if(typeof num !== 'number') {
            throw new Error('指定値が数値ではありません：' + num);
        }
        result += num;
    }
    return result;
}

try{
    console.log(sum(1,3,5,7,9));
}cache(e){
    window.alert(e.message);
}
```

- 「...」演算子で引数の展開。配列を展開して渡したいとき、`Math.max(..[15,-3,78,1])`のようにすると`Math.max(15,-3,78,1)`と展開されて解釈される。

- 名前付き引数を分割代入で`{プロパティ名 = デフォルト値}`で使うことができる。また、分割代入を利用すると次のように個々のプロパティを意識せずにオブジェクトをまるごと渡せる

```JavaScript
function show({name}){
    console.log(name);
}

let member = {
    mid: 'Y001',
    name: '山田田老',
    address: 't-yamada@example.jp'
};

show(member); //nameだけが表示される
```

- 複数の戻値を個別の変数に代入できる

```JavaScript
function getMaxMin(...nums){
    return [Math.max(...nums), Math.min(...nums)];
}
let [max, min] = getMaxMin(10,35,-5,78,0); //これでそれぞれに格納できる
let [, min2] = getMaxMin(10,35,-5,78,0); //値を捨てることもできる
```

- 関数を引数や戻り値として扱う高階関数もできる(高階関数は１度しか使わない場合匿名関数で書くとよい)

```JavaScript
function (data, f){
    for(var key in data){
        f(data[key], key);
    }
}

var ary = [1,2,4,8,16];
arrayWalk(ary, function(value, key){
    console.log(key+':'+value);
});
```

- タグ付きテンプレート文字列を使うと、エスケープ処理して表示するなどが簡単になる。タグ付きテンプレート文字列も実態は、単なる関数呼出しで「引数として、分解したテンプレート文字列と、埋め込む変数の可変長引数をとる」「戻値として加工済みの文字列を返す」ものである。

```JavaScript
function escapeHtml(str){
    if (!str) {return '';}
    str = str.replace(/&/g, '&amp;');
    //ここに様々なエスケープ処理を書く。<>"'くらいは必要かな
    return str
}
function e(templates, ...values){
   let result = '';
   for (let i=0, len = templates.length; i<len; i++){
       result += templates[i] + escapeHtml(values[i]);
   }
   return result;
}
let name = '<"Namco" &\'NamiNami\'>';
console.log(e`こんにちは${name}さん！`);
```

- ローカル変数はActivation Object(Callオブジェクト)と呼ばれ、関数呼出しの都度、内部的に自動生成されるオブジェクト。このオブジェクト群とグローバルオブジェクトがスコープチェーンとなり連結したリストになっている。スコープチェーンを理解することで変数名が重複した変数の解決も規則がはっきりする。

- クロージャは、「ローカル変数を参照している関数内関数」のこと。クロージャごとにちがったスコープチェーンが作られ、一種の記憶領域を提供する。

```JavaScript
function closure(init){
    var count = init;

    return function() {
        return ++counter;
    }
}
var myClosure1 = closure(1);
var myClosure2 = closure(100);
console.log(myClosure1());
console.log(myClosure2());
console.log(myClosure1());
console.log(myClosure2());
```

### クロージャとオブジェクトの対応

- クロージャをくくっている親関数 コンストラクタ
- クロージャから参照されるローカル変数 プロパティ
- クロージャ自身 メソッド
- クロージャの最初の関数呼出し インスタンス化
- クロージャを格納する変数 インスタンス

こうしてみると、クロージャは「シンプルなオブジェクト」と言い換えられる。

## Chapter 5

- 旧JSには「クラス」ではなく「プロトタイプ」がある。プロトタイプとは「より縛りの弱いクラスのようなもの」である。

- 最もシンプルなクラスを定義する。`var Member = function() {};`「変数Memberに対して、空の関数リテラルを代入したもの」そして、`var mem = new Member();`このようにしてnew演算子でインスタンス化する。

- JavaScriptでは関数(Functionオブジェクト)にクラスとしての役割を与えている。

- アロー関数ではコンストラクタは定義できない。ES2015ではclass命令を使うべき。

- JSの世界では、同一のクラスを元に生成されたインスタンスであっても、それぞれが持つメンバは同一であるとは限らない。インスタンスごとにメンバの追加や削除ができてしまう。（より縛りのやわいクラス）

- ↑ちなみにオブジェクトの追加削除をされたくない場合は、コンストラクタの末尾に`Object.seal(this);`なんかをつければよい。（thisはコンストラクタの文脈に置いてはコンストラクタによって生成されるインスタンスを表す）

- JavaScriptのthisは、呼び出す場所、呼び出しの方法によって中身の変化する不思議な変数である。

- call/applyメソッド`func.call(that [,arg1 [,arg2[,...]]])` `func.apply(that [,args])`ここでfunc:関数オブジェクト、that:関数の中でthisキーワードが示すもの、arg1,arg2...:関数に渡す引数、that:関数の中でthisキーワードが示すもの、args:関数に渡す引数(配列)

- call/applyメソッドを使うことでthisキーワードが示すオブジェクトを切り替えることができる。引数thatにそれぞれ異なるオブジェクトを渡すことで、hoge関数配下のthisの内容(ここでは出力されるthis.xの値)が変化している。引数thatにnullを渡すと、暗黙的にグローバルオブジェクトが渡されたものとみなされる。

- 配列ライクなオブジェクトを配列にするには、ES2015では`let args = Array.form(arguments)`でいけるようになった！

- JSの構造上、関数がコンストラクタの役割を持っているので、コンストラクタを関数としても呼び出せてしまう。これをふせぐために、以下のようにする

```JavaScript
var Member = function(firstName, lastName){
    if(!(this instanceof Member)){
        //instanceof演算子はオブジェクトが指定されたクラスのインスタンスであるかを判定する
        return new Member(firstName,lastName);
    }
    this.firstName = firstName;
    //...
}
```

- コンストラクタによるメソッドの追加は、「メソッドの数に比例してメモリを消費する」問題がある。いちいちインスタンス化のたびにすべてのメソッドをコピーするのは無駄。

- メソッドはプロトタイプで宣言する。「オブジェクトをインスタンス化した場合、インスタンスは元となるオブジェクトに属するprototypeオブジェクトに対しって暗黙的な参照を持つことになる」

```JavaScript
var Member = function(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
};

Member.prototype.getName = function(){
    return this.lastName + ' ' + this.firstName;
};
```

- Javascriptの世界には「クラス」という抽象的な設計図が存在しない。JSの世界にあるのはあくまで実体化されたオブジェクトだけで、新しいオブジェクトを生成するにもオブジェクトが元になっている。そして新しいオブジェクトを作るための雛形が「プロトタイプ」という特別なオブジェクトである。(プロトタイプベースのオブジェクト指向)

- プロトタイプオブジェクトを利用することで、メモリの使用量を節減（挙動は、まずインスタンス側に要求されたメンバが存在しないか確認し、存在しない場合は暗黙の参照をたどってプロトタイプオブジェクトを検索）でき、メンバの追加や変更をインスタンスがリアルタイムに認識できる。つまり、インスタンスを生成した後にメソッドを追加できる

- 暗黙の参照とはいうもの、プロトタイプオブジェクトが利用されるのは「値の参照時だけ」！

- プロパティの宣言はコンストラクタで、メソッドの宣言はプロトタイプでやること！

- インスタンス側でのメンバーの追加や削除と言った操作が、プロトタイプオブジェクトにまで影響を及ぼすことはない。ちなみに`delete Member.prototype.sex`のように削除することもできるが、全てのインスタンスのsexプロパティが削除されてしまうので、注意すること

- インスタンス内のみでメンバを削除したいならundefinedで上書きする手があるが、厳密に削除してないのでfor...inなどでは存在するものとして扱われる。

- プロトタイプを書くときはオブジェクトのリテラル表現を使うこともできる。

```JavaScript
var Member = function(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
}

Member.prototype = {
    getName : function(){
        return this.lastName + ' ' + this.firstName;
    },
    toString : function(){
        return this.lastName +this.firstName;
    }
};
```

- 静的プロパティや静的メソッドを定義するときは、プロトタイプオブジェクトには登録できない（あくまでインスタンスから暗黙的に参照されることを目的としたオブジェクト）なので、コンストラクター（オブジェクト）に直接追加する`オブジェクト名.プロパティ名 = 値``オブジェクト名.メソッド名 =  function() {/* メソッドの定義 */}`

- プロトタイプ同士を「暗黙の参照」で連結し、互いに継承関係をもたせることができる！(プロトタイプチェーン)。終端には必ず「Object.prototype」がある。

- hasOwnPropertyメソッドは現在のインスタンス自身(連結先のメンバでない)が持つメンバであるかtrue/falseで返す。`obj.hasOwnProrerty(key)`

- 基底クラスのコンストラクタに引数を渡す場合`Animal.call(this, 'hoge', 'foo')`とする。

- 「継承関係は動的に変更可能」ただし、”インスタンスが生成された時点で固定され、その後の変更にかかわらず保存される”

- 元となるコンストラクターを取得するconstractorプロパティ（継承元のクラス判定になる）、元となるコンストラクタを判定するinstanceof演算子、参照しているプロトタイプを確認するisPrototypeOfメソッド、特定のメンバの有無を確認するin演算子がある。

- getterやsetterなどのアクセサーメソッドの実装について、モダンな環境なら、Object.definePropertyを使うのがおすすめ`Object.defineProperty(プロパティを定義するオブジェクトobj,プロパティ名prop,プロパティの構成情報desc)`

- JavaScriptで名前空間は用意されていないので以下のようにして模擬的に実装する。ないときは作りその名前空間へ。名前空間のクラスをインスタンス化するんには名前空間も含んだ完全修飾子でクラス名を指定する必要がある。

```JavaScript
var Wings = Wings || {};

Wings.Member = function(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
};

Wings.Member.prototype = {
    getName : function(){
        return this.lastName + ' ' + this.firstName;
    }
};

var mem = new Wings.Member('あい','うえお');
console.log(mem.getName);
```

- 規模が大きい場合にはnamespace作成用の関数を用意しておくと便利

```JavaScript
function namespace(ns){
    var names = ns.split('.');
    var parent = window;

    for(var i=0, len = name.length; i<len; i++){
        parent[names[i]] = parent[names[i]] || {};
        parent = parent[names[i]];
    }
    return parent;
}

var my = namespace('Wings.Gihyo.Js.MyApp');
my.Person = function(){};
var p = new my.Person();
console.log(p instanceof Wings.Gihyo.Js.MyApp.Person);//true
```

- ES2015のクラスでもpublic/protected/privateのようなアクセス修飾子は利用できない

- `const Member = class {...}`の形で匿名クラスもつくれる

- class命令は、プロトタイプベースのオブジェクト指向を覆い包むシンタックスシュガーにすぎない。とはいえ、functionコンストラクタと違い、「（特に対策しなくても）関数としての呼び出しができない」「（特に対策しなくても）定義前のクラスを呼び出すことはできない」

- get/setブロックプロパティの定義もできるよ！

- staticを定義の頭につけることで静的メソッドを定義することもできる、extends Memberみたいなかんじでできる

- 基底クラスのメソッド・コンストラクタを呼び出すにはsuperキーワードが使える

- プロパティの名前と、その値を表した変数名とが同じ場合は値の指定を省略できる`let member = {name, birth};`

- コンストラクタの初期値設定も簡略化できる

```JavaScript
constructor(firstName, lastName){
    Object.assign(this, {firstName, lastName});
}
```

- プロパティを動的に作成できる

```JavaScript
let i = 0;
let member = {
    name: '山田太郎',
    birth: new Date(1970, 5, 25),
    ['memo' ++i]: '正規会員',
    ['memo' ++i]: '支部会長',
    ['memo' ++i]: '関東',
}
//とするとmemo1,memo2,memo3とかができて入っている
```

- モジュールには以下のようにアクセスする

```JavaScript
const AUTHOR = "T. Yamada";
export class Member {...}
export class Area {...}
```

```JavaScript
import { Member, Area } from './lib/Util'
var m = new Member('Taro', 'Yamada');
cosole.log(m.getName());
```

- import命令には目的に応じてさまざまな書き方が有り「as句で別名をつけモジュール全体の別名`import * as app from './lib/Util'`で指定し、app.~で参照」「`import {Member as MyMember, Area as MyArea} from './lib/Util'`として個々の別名を付与」「モジュールに含まれる要素が１つだけの場合、`export default class`としといて、デフォルトのエクスポートを`import Area from './lib/Area'`としてインポートするとAreaとしてそれにアクセスできるようになる。」これを利用するにはnpmでbrowserifyを-gと--save-devでインストールし、`browserify scripts/main.js`

- プライベートメンバを定義するときモジュール+Symbolを使える。for...inやstringifyからは隠せるが、

```JavaScript
const SECRET_VALUE = Symbol();

export default class{
    constructor(secret){
        this.hoge = 'hoge';
        this.foo = 'foo';
        this[SECRET_VALUE] = secret;
    }
    checkValue(secret){
        return this[SECRET_VALUE] === secret;
    }
}
```

```JavaScript
import MyApp from './lib/MyApp';

let app = new MyApp('secret string');

for (let key in app){
    console.log(key); //for..inでも列挙されない
}

console.log(JSON.stringify(app));//jsonにしても見えない
console.log(app.checkValue('secret string'));//methodからは確認できる
```

- イテレータのnextメソッドはオブジェクトで、終わりに到達したらdoneを返して、valueで次の要素の値が取得できる。

```JavaScript
let data_ary = ['one', 'two', 'three'];
let itr = data_ary[Symbol.iterator]();//Symbol.iteratorから返されたシンボルをキーとして、Arrayオジェクトのメンバーを呼び出しているということ。Array.Symobol.iteratorではない。
let d;
whlie(d = itr.next()){
    if(d.done) {break;}
    console.log(d.done);
    console.log(d.value);
}
```

- Proxyオブジェクトは、プロパティの設定.取得.削除.for...of/for...inなどの基本的な操作をアプリ独自の動作に差し替えるためのオブジェクト。

```JavaScript
let data = {red: '赤色', yellow: '黄色'};
var proxy = new Proxy(obj, {
    get(target, prop){
        return prop in target ? target[prop] : '?';
    }
});
console.log(proxy.red);
console.log(proxy.nothing);
```


### JavaScriptのthisが示す場所

- トップレベル(関数の外) グローバルオブジェクト
- 関数 グローバルオブジェクト(strictではundefined)
- call/applyメソッド(関数が提供するメンバ、その関数を呼び出す)  引数で指定されたオブジェクト
- イベントリスナー イベントの発生元
- コンストラクター 生成したインスタンス
- メソッド 呼び出し元のオブジェクト(=レシーバーオブジェクト)

