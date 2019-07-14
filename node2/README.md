# DAY2

「Angularアプリケーションプログラミング」を読破する。
作ったサンプルコードやテストコードはここにあげる。

## Chapter 1

- フレームワークは同じようなコードを何度も書くような問題に対処する「再利用可能なクラス」。ユーザーコードから支持を受けてはじめて処理を行うのがライブラリ。フレームワークはフレームワークが必要なユーザーコードを呼び出す「制御の反転(IoC: Inversion of Control)」こそが本質。

- フレームワークを導入すると、「開発生産性の向上(分割しやすい、枠組みによる作コードの一貫性維持)」「メンテナンス性に優れる(アプリの可読性向上)」「先端の技術トレンドに対応しやすい(開発者の負担軽減)」「一定以上の品質が期待できる(信頼性が高い)」という利点がある。

- Angularはフルスタックのフレームワークで、これをインストールするだけでアプリを開発するための基本的な環境が揃う。HTMLベースのテンプレートエンジン、コンポーネント・テンプレート間のでデータバインディング機能、コンポーネント・サービス間の依存関係を解決するDIコンテナー、文章ツリーを操作するためのディレクティブ、表示すべき値を加工するためのパイプ、ビジネスロジックを実装するためのサービス、ページ振り分けルーティング機能、単体テスト・シナリオテストを支援するテストフレームワークがある。

- アプリの要件に応じてディテクティブ、パイプ、サービスといった要素を自ら実装することもできる。

- コンポーネント指向。コンポーネントはページを構成するUI部品で、ビュー(テンプレート)、ロジック、コンポネートを構成するメタ情報から構成される。

- Angularでは、TypeScript,SystemJS,RxJS,Zone.jsなどのライブラリが採用されている

- TypeScriptはC#によく似た構文

- ngx-bootstrapなどのライブラリを利用すると、アコーディオンパネル、カルーセル、モーダルダイアログのような高機能UIをごく少ないコード量で実装できる

- AuguryというChromeプラグインを使うと、ブラウザ上でのデバックが簡単になる

## Chapter 2

- 初歩的なアプリを開発する上で編集する必要があるのは、app.component.ts(とたまにapp.module.ts)のみ。

-  ある程度の規模のアプリを開発するには、コードを「モジュール」で分類する。オブジェクトを束ねる便宜的な器として、exportキーワードで外部に公開したモジュールクラスを作る。`export class AppModule { }`

- import命令 `import { name, ... } from module`

- angularにおけるモジュールの実体はTypeScriptのクラス。

- デコレーターは構成情報を付与するためのしくみ。`@name({ param1: value1 , ... })`。指定するパラメータがない場合は、`@name`だけでよい。

- デコレータの解説

```JavaScript
@NgModule({
    imports: [BrowserModule],  //BrowserModuleを参照しており
    declarations: [AppComponent], //AppComponentに属し
    bootstrap: [AppComponent] //ルートコンポーネントとしてAppComponentを含んだ
})
export class AppModule { } //AppModuleを定義する
```

- モジュールと一口にいっても２種類ある。「@NgModuleデコレータで装飾されたAngularモジュール」と「JavaScript(TypeScript)のモジュール」。angularのモジュールはアプリを構成するコンポーネント／サービス／ディレクティブ／パイプを束ねるための論理的な器のこっとで、@NgModule内にimportsパラメータをいれて利用する。JSのモジュールは実際のファイル１つ１つのことでexport,import命令を使用する。

- コンポネートは、ページを構成する**UI部品**。Angularアプリはコンポーネントの集合体。一般的には複数のコンポーネントを組み合わせページを構成する。

- 「app.component.ts」はアプリで最初に呼び出されるルートコンポーネント。

- 下の例では「<my-app>要素に<h1>Hello {{name}}</h1>というテンプレートを適用している。この補間(Interpolation)はビュー変数を埋め込むためのプレイスホルダー」
```JavaScript
@Component({
    selector: 'my-app', //コンポーネントを適用すべき要素を表すセレクター一式
    template: `<h1>Hello {{name}}</h1>`, //コンポーネントに適用するビュー
})
export class AppComponent {
    name = 'Angular';
}
```
- Angularアプリを起動するためのスタートアップコードとしてmain.tsがある。これはappフォルダではなくsrcフォルダの直下に置かれる。ここでは、まず必要なオブジェクトや関数をインポートして、 `platformBrowserDynamic#bootstrapModule`メソッドでモジュールを起動するだけ（例： `platformBrowserDynamic().bootstrapMoudle(AppModule);`)

- core-jsはレガシーブラウザのポリフィルに、zone.js/SystemJSはAngularの動作に必要となるライブラリ。SystemJSは「systemjs.config.js」をインポートするとともに、コンパイル済みのtsであるmain.jsをインポート起動するようにする。あとは、body内に対してテンプレートの内容が反映される！

- Angularアプリのコンパイル・実行には、「package.json」の他に「tsconfig.json」「systemjs.config.js」が必要となる。

- npmのpackage.jsonのscripts書くときにconcurrentlyを使うと指定された命令を並列に実行できる。例：`"start": "concurrently \"npm run build:watch\" \"npm run serve\""`

- `npm install --production`を実行すると、`devDependencies`内のライブラリを除いて一括インストールされる。

- SystemJSは、JSのモジュール(個々の.jsファイル)を動的にロードするためのライブラリ。アプリを別環境に配置するときや、拡張ライブラリを導入する場面で必要になる。

```JavaScript
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: { // 短縮名 : 検索先 の形式で、アプリからモジュールを呼び出すときの短縮名を設定できる
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      // pathsで設定されたエイリアスにより「npm:」で「node_modules/」を表している
      ...
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js', // ファイル名が省略された場合のデフォルト拡張子
        ...
      },...
    }
  });
})(this);
```

- 標準では呼び出し元(index.html)のあるフォルダが起点となるが、SystemJSで`baseURL`を設定すると、基底パスを変えることもできる。

### @NgModuleデコレータの主なパラメータで知らなかったやつ

- declarations 現在のモジュールに属するコンポーネントなど
- bootstrap アプリで最初に起動すべき最上位コンポーネント
- id モジュールのid値

### 一般的な命名規則（コンポーネント、ディテクティブ、パイプ、サービス等）

- クラス名
  - 「名前＋種類」でUpperCamelCase
  - AppModule, FriendListComponent

- ファイル名
  - 「名前.種類.ts」でKebabCase(全て小文字、単語区切はハイフン。中東の串刺し肉料理ケバブの名前にちなんで、こう呼ばれる。ChainCaseと呼ばれることも)
  - app.module.ts,friend-list.component.ts

- テストスクリプト
  - テスト対称のファイル名に「.spec.ts」を追加
  - friend-list.component.spec.ts


### tsconfig.json内のcompilerOptionsに含められるパラメータについて

- target  JSのバージョン(es3,es5,es6)
- module  生成するJSモジュールの形式(commonjsなど)
- moduleResolution    モジュールの解決方法(sourceMapなど)
- lib コンパイル時にインクルードされるライブラリ(["es2015","dom"]など)
- experimentalDecorators  デコレータを有効にするか
- noImplicitAny   暗黙的なanyを許容しない
- suppressImplicitAnyIndexErrors  インデックスアクセスでnoImplicitAnyエラー回避

※ noImplicitAnyが指定されていても、コード内でany型を明示すれば制約エラーを回避できる。設定を無効にするよりは、これで対処したほうがよい。

## Chapter 3

- データーバインディングとは、コンポーネントとテンプレートを紐付けるためのしくみ。ビューの変化をコンポーネントに伝える役割を担う。

- Angularのデータバインディング構文はデータの流れる方向で大きく次の４種類がある
  - コンポーネント→ビュー Interpolation(補間) `{{}}`
  - コンポーネント→ビュー プロパティ・属性バインディング `[property]="value"`
  - ビュー→コンポーネント イベントバインディング `(event)="handler"`
  - コンポーネント↔ビュー 双方向バインディング `[(target)]="value"`

- テンプレートに埋め込むべき値について、コンポーネントのプロパティとして定義するのが基本。Interpolation(補間)構文はnameプロパティを`{{name}}`として参照することになる。`{{3*5}}`や`{{getList()}}`のようなメソッド呼び出しなど、おおよそJSとして妥当な式があれば自由である。が、代入やnewなど副作用を伴う演算子は使えない。Mathとかのグローバル名前空間上のオブジェクトにアクセスできない。ビット演算子もだめ。グローバル名前空間のオブジェクトも参照できない。

- angularは目に見える以上に`{{...}}式`を何度も評価するので、シンプルで短時間で実行できるものが求められる

- `{{...}}`だけで使える「?.」演算子がある。これで安全にオブジェクトのプロパティやメソッドにアクセスできる。これをつけると、取得しようとしたオブジェクトのプロパティがundefinedでもエラーにならない。`{{member?.name}}`のときmemberオブジェクトが空でない場合だけプロパティにアクセスしようとするからだ。

- プロパティバインディングを使用すると、要素のプロパティに対して値をバインド出来る。バインド対称となるブラケットを`[]`で囲む。`[prop] = "exp"`

- プロパティバインディングの別構文として、`bind-xxxxx属性`もある。「`<img bind-src="image" \>`」という具合に、xxxの部分にプロパティ名を入れて使うことも出来る。もちろん、`src="{{image}}"`みたいなのも動く

- 要素にHTMLタグを含んでいると、勝手にエスケープ処理されて文字列として表示される。これを防ぐにはdiv要素でも作って、innerHTMLプロパティへバインドすればいい。ただ一応、scriptやbutton、input要素、divのstyle属性はサニタイズされる。このサニタイズを完全に無効化したい場合は、「信頼済みマークを付与するといい。」`template: `<div [innerHTML]="safeMsg"></div>``this.safeMsg = sanitizer.bypassSecurityTrustHtml(this.msg);`。戻り値はSafeHtml。ちゃんとセキュリティ管理しろよ

- iframe要素に外部リソースをバインドするには、これもセキュリティ上危険なので、`this.safeUrl =  sanitizer.bypassSecurityTrustResourceUrl(this.url)`でするしかない。

- ほかにも信頼済みマークとして`bypassSecurityTrustXXX`のXXXに`Style` `Script` `Url`が入るものがある。XSS気をつけてね。ちゃんとサニタイザとその戻り値を「`@angular/platform-browser`」からインポートしとくんだよ！

- 属性・クラス・スタイルバインディングは、できないorめんどくさいプロパティバインディングをなんとかできる。

- 属性バインディング　例：`<tr><td [rowspan]="len">結合</td><td>1</td></tr>`はプロパティのバインドではないので、バインド出来ないエラーに成る。そこで、`<tr><td [attr.rowspan]="len">結合</td><td>1</td></tr>`という感じでやるといい。このattrをつけた属性バインディングはこの他にも、ARIAやSVG属性に用いる。ただし基本は属性バインディング。

- 属性とプロパティは別物。属性は要素の初期値、プロパティは現在地。だからgetAttribute経由でユーザーからの入力を受け取ったりすることはできない。

- こういうことすると、バインディングの部分しか反映されない(All or Nothing)`<div class="line back" [class]="clazz">WINGSプロジェクト</div>`。クラスバインディングを使用すると、スタイルの脱着をシンプルに表現できる。`<div class="line back" [class.fore]="flag">`でexport内の`flag=true;`を指定すると表示される。`<div [style.background-color]="bcolor">WINGSプロジェクト</div>`と`bcolor = '#0ff';`のように個々のスタイルを適当に反映させてもいける。これをtrue/falseで切り替えたいときは`[style.background-color]="bcolor ? '#0ff' : ''"`のようにしてしまうといい。

- スタイルバインディングは便利な反面、テンプレートやコンポーネントのコードにスタイル情報が混在してしまう問題が起きるので、基本的にはスタイル設定はクラスバインディングを利用してスタイルシートに集約させるべきである。

- スタイルバインディングは、単位付きの値を設定するために、`[style.name.unit] = 'exp'`の形で利用することができる。例えば、`<div [style.font-size.%]="size">WINGSプロジェクト</div>`と`size = 150;`。もちろん単位付きの値をそのまま渡すこともできるが、演算の都合から積極的に活用すべき。

- イベントバインディングは、チェックボックスやテキスト入力など「ビューからコンポーネントに情報を引き渡す」仕組みを提供する。文法は、`<element (event)="exp">~~~</element>`。イベントはclick,bdclick,mousedown,mouseup,mouseenter,mousemove,mouseleave,focus,blur,keydown,keypress,keyup,input,select,reset,submitなんかを使う。`<input type="button" (click)="show()" value="現在時刻" />`と`show(){this.msg = new Date().toLocaleString()}`みたいな感じ。テンプレート式には代入演算子イコールと連結演算子;や,も使えるように成る。別公文として`on-click="show()"`を使うことも出来る。

- イベント情報を取得するには、`$event`を使えばいい。呼び出し元で`(click)="show($event)"`、呼び出し先で`show(e: any) {`でやればいい。eの中には、type,target,which,timeStamp,altKey,ctrlKey,shiftKey,screenX/Y,pageX/Y,clientX/Y,offsetX/Y,preventDefault(),stopPropagation()などが入ってる

- テンプレート参照変数による入力値の取得をするには、`e.target.value`を参照すればいいが、要素オブジェクトを取得するためにイベント情報全体を受け渡すのはやりすぎ。そこで、テンプレート参照変数を使えばいい。この変数はテンプレート内の特定の要素を参照するための変数で、コレ経由でその対象要素のプロパティやメソッドにアクセスできる。`<element #variable ... />`、こんな感じで投げてあげる`<input #txt id="txt" name="txt" type="text" (input)="show(txt.value)" />`。受け取り側ではStringとしてgetできるね！で、これは`{{txt.value}}`のようにすればそのまま取得できる。で、そうしたとき、inputのとこで`(change)="0"`のようなことをしないといけない。そうすることでangularがデータバインディングを値の変更時に実施できるようになる。

- enterキーで処理することは多いので、専用のイベント(keyup.enter)がある。`<input id="txt" name="txt" type="text" (keyup.enter)="show($event)" />`

- ここまで片方向のバインディングのみしてきが、双方向のバインディングももちろんある。`<element name="name" [(ngModel)]="exp" />`合体したぞー。このngModelよく分からいけど、かみくだくと`<input ~~ [ngModel]="myName" (input)="myName=$event.target.value">`のようなことをしてるんだ。(inputイベントはjs標準のイベントだったりする)。後ろの方は`(ngModelChange)="myName=$event"`と書くことも出来る。もし入力時に値を変えたい場合は、こんな感じにするといい`(ngModelChange)="myName=$event.toUpperCase()`。双方向でやったら、その時点でプロパティと同期してるから、、初期値のvalueは反映されないから注意。

## Chapter4

- パイプは、`{{exp | pipe [:param1 [:param2]] }}`のような書式で書く。例えば、変数priceに対してcurrencyパイプ(パラメータはJPY)を適用するときは、`{{price | currency: 'JPY'}}`

- Angular標準のパイプとして、lowercase,uppercase,titlecase(単語の先っ当文字を大文字に変換),slice,date,number,percent,currency,json,i18nPlural(数値によって表示文字列を変化),i18nSelect(文字列に応じて出力を切替),async(observable,promiseによる非同期処理の結果を取得)。がある。

- パイプのlowercase,uppercase,titilecaseはマルチバイト文字も変換の対象となる

- オブジェクトをJSON形式に変換するには、jsonパイプを利用する。「JSON.stringify」に相当するパイプ`{{ obj | json }}`

- `{{str | slice: 3: 5}}`で4~5文字目を取得、`{{str | slice: 4}}`で4文字目移行を取得、`{{str | slice: -10}}`で後方から10文字目以降を取得、`{{str | slice: -3: -2}}`で後方から3文字目から2文字目の前までを取得。これは文字列以外に、配列から特定範囲を取り出すのにも使える。

- numberで数値を桁区切り文字で整形して出力する。`{{price | number: '5.0-2'}}`。引数を指定すれば整数部・小数部の表示桁数をそろえることもできる。`minInt .minFrac -maxFrac`の形式で書く

- アプリのロケールを変更するには、AppModuleでLOCALE_IDを指定すればいい。`providers:    [{ provide: LOCALE_ID, useValue: 'de-DE' }],`

- 数値を通貨形式に整形するときは`{{price | currency : 'JPY' : true : '1.0-1'}}`のように指定する。パラメータは、code通貨コード(JPY,USD,EURなど), symbol通貨記号を利用するか
、info桁数情報

- 数値をパーセント形式に整形するにはpercentパイプを使う。`{ num | percent [:info] }`

- dateパイプを使用するとフォーマットを整形できる。`{ datetime | date [:format] }`。タイムスタンプ値、日付文字列などを指定できる。medium,short,fullDate,longDate,mediumDate,shortDate,mediumTime,shortTime。`{{current | date: ''medium }}` `{{current | date: 'y MM dd (EEE)'}}`

- 数値によって表示文字列を変化させるi18nPlural。引数mapに`"=数値": "対応するメッセージ"`で用意しとける5
```Javascript
 @Component({
   selector: 'my-app',
   template: `<div>{{ favs.length | i18nPlural: messages }}</div>`
 })
 export class AppComponent  {
     favs = [ '山田理央', '鈴木洋平', '腰掛奈美' ];
     messages = {
       '=0': '［いいね！］されていません。',
       '=1': '1人だけ［いいね！］と言ってくれています。',
       'other': '# 人が［いいね！］と言っています。'
     };
 }
```

- i18nSelect文字列に応じて出力を切り替える。先程の文字列バージョン。`文字列: 対応するメッセージ`。

- angularではHTMLをベースとしたテンプレートエンジンを採用している。標準的なHTMLに対してngFor、ngStyleのような独自の要素・属性を追加することで機能を付与している。このカスタムの要素・属性のことをディレクティブ(directive)という。

- コンポーネント：テンプレートを伴ったディテクティブ、構造ディレクティブ：要素を追加・削除することで文章ツリーを操作する、属性ディレクティブ：属性の形式で、要素・コンポーネントのみためや動作を変更

- 主な構造ディテクティブとして、ngIf,ngSwitch,ngFor,ngTemplateOutlet,ngComponentOutlet、主な属性ディテクティブとしてngStyle,ngClass,ngPluralがある

- ngIfでは式の真偽によって表示・非表示を切り替える。

- ngIf頭の「*」は、配下の要素を再利用可能なテンプレートとして扱うことを意味する。「*」は構造ディレクティブであることのしるし

- ngIfは、「条件式の真偽に応じて、該当する要素を文章ツリーに挿入・破棄する」ディレクティブ。Angularは不可視の要素に対してもデータバインディングに関わる変更監視を継続するが、「*ngIf」のときはリソースそのものを破棄する。もし、初期化に高いオーバーヘッドを要する処理をするときは、スタイルバインディングでdisplayスタイルプロパティを設定する。`[style.display]="show ? 'inline': 'none'"`

- 条件式を満たさない場合、ngIfの出力を指定する。`条件式 ; else 名前`のときに「名前」の部分に指定されたテンプレート`<ng-template #名前>`を表示することになる。また、全ての部分をテンプレート化したいときは`条件式; then T名前; else F名前 `のようにする。この場合ngIf配下のコンテンツは無視される。

- 式の値によってngSwitchは表示を切り替える。Javascriptのswitch命令に相当。`<parent [ngSwitch]="exp"> <child *ngSwitchCase="value1">...</child><child *ngSwitchCase="value2">...</child><child *ngSwitchDefalut>...</child> </parent>`という具合。

- ngForはJSの「for...of」に相当するディテクティブ。`<element *ngFor="let tmp of list">...</element>`(element:任意の要素、tmp:仮変数、list:処理対象の配列)になる。ngFor内では、index,first,last,even,oddという特殊変数を使える。この場合、index as iやfirst as firstのようにローカル変数の代入することを忘れないでね。

- ngForディレクティブは、開始タグから閉じタグを１つの塊として要素を繰り返し出力する。要素セットをまとめて要素で囲む方法がある。ただし、繰り返し要素セットをdivなどで囲むのはおすすめできない。そこで、ng-containerというダミーコンテナー要素を使うと、通常「ダミーコンテナ要素」のみを繰り替えし出力するが、「現在の要素を除いた小要素だけが出力される」。これを使うと、divなど余計な要素を出力せずに要素セットを繰り返し出力できるようになる。これは、ngIf/ngSwitchCaseなどでも利用できる。

- 通常、オブジェクトの同一性をもとに配列内要素の追加・削除をしているが、値が変化しなくても同一性が変化することもある。その際、オブジェクトはすべて再生成される。これではデータが増えたとき大きなオーバーヘッドとなるので、トラッキング式(trackBy関数)でオブジェクト追跡のキーを決めれば良い。「引数として、現在のインデックス、値を受け取る」「戻り値として、現在の項目を一意に識別する値を返す」の２つがある。これを実装するときは、`<li *ngFor="let b of books; rackBy: trackFn">`のようにする。
```JavaScript
trackFn(index: any, book: any) {
  return book.isbn;
}
```

- sliceパイプと連携すると、ページング機能付きのテーブルも簡単に実装できる。 

- ngStyleで要素にスタイルプロパティを付与して、バインディングすることもできる。スタイルバインディングでは一度に１つのスタイルしか設定できなかったが、これなら可能。

```TypeScript
@Component({
  selector: 'my-app',
  template: `
    <input type="button" (click)="back=!back" value="背景色" />
    <input type="button" (click)="fore=!fore" value="前景色" />
    <input type="button" (click)="styles.back=!styles.back" value="余白" />
  `<div [ngStyle]="styles">
    <p>WINGSプロジェクトは、当初、ライター...</p>
  </div>
})
export class AppComponent {
    back: false;
    fore: false:
    space: false:

    get styles() { //静的に指定するだけの場合は、オブジェクトでいいよ
      return {
        'background-color': this.back ? '#f00' : '',
        'color' : this.fore ? '#fff' : '#000',
        'padding.px' : this.space ? 15 :5
      };
    }
}
```

- ngClassは、複数のスタイルクラスを脱着する時に使う。引数clazzに適用するスタイルクラスを書こう。具体的には次の段階を踏む 「スタイル情報をスタイルシート(stylesパラメータ)として切り出す」「スタイルのオンオフ情報をstylesプロパティとして準備」「stylesプロパティをngClassディレクティブにバインディング」「ボタンクリックで反転」

```TypeScript
@Component({
  selector: 'my-app',
  template: `
  <form>
    <input type="button" (click)="styles.back=!styles.back" value="背景色" />
    <input type="button" (click)="styles.fore=!styles.fore" value="背景色" />
    <input type="button" (click)="styles.space=!styles.space" value="空白" />
    <div [ngClass]="styles">
    <p>WINGSプロジェクトは、当初、ライター...</p>
  </div>
  </form>`,
  styles: [`
    .back { background-color: #f00 }
    .fore { color: #fff }
    .space { padding: 15px }
  `]
})
export class AppComponent {
  styles = {
    back: false,
    fore: false,
    space: false
  };
}
```

- ngClassディテクティブを囲んでいる[...]はプロパティバインディングの構文なので、[...]を外した場合は単なる文字列として評価されることになる。文字列をngClassディテクティブとして渡すときは、
文字列リテラルをクォートで囲む方法と、ディテクティブの[...]を外しJSの式と評価しないようにする方法がある。

- ngPluralはメッセージを動的に組み込みたいときに適する。i18nPluralのディテクティブ版。パイプよりも冗長になるが、メッセージを動的に組みたい場合には便利。`<element [ngPlural]="exp"> <ng-template ngPluralCase="num"> message </ng-template> </element> (element: 任意の要素, exp: 任意の式, num: 引数expに対応する値, message: 表示するメッセージ)`。メッセージ毎にテンプレートにまとめられるので、ある程度メッセージの分量が多いときはディレクティブ表記の方がすっきり書ける。メッセージをコンポーネント側で管理したい場合は、パイプ表現の方が便利

```TypeScript
@Component({
  selector: 'my-app',
  template: `
  <div [ngPlural]="favs.length">
    <ng-template ngPluralCase="=0">[いいね！]されていません</ngtemplate>
    <ng-template ngPluralCase="=1">1人だけが[いいね！]と言ってくれています</ngtemplate>
    <ng-template ngPluralCase="other">{{favs.length}}人が[いいね！]と言っています</ngtemplate>
  </div>
  `
})
export class AppComponent {
  favs: string[]= ['山田','スズキ','田中'];
}
```

- ngTemplateOutletではあらかじめ用意したテンプレートをコンポーネント内の任意の場所に挿入できる。 `<ng-container *ngTemplateOutlet="exp; context: ctx"></ng-container> (exp:テンプレート, ctx:テンプレートに反映させるオブジェクト)`。`let-変数名="プロパティ名"`という形で呼び出し元から値を受けとれるようにしておく。あとは、テンプレートに渡すべきオブジェクトをngTempOutletのcontextで指定しておけば渡せる。contextで指定したオブジェクト内に、「$implicit」というキーで値をを指定すると、「let-XXX」のXXXに該当する部分がない時それが読み込まれることになる。

```TypeScript
@Component({
  selector: 'my-app',
  template: `
  <ng-template #myTemp let-isbn="isbn" let-title="title" let-price="price" let-publisher="publisher">
    <div>
      <img src ="http://www.wings.msn.to/books/{{isbn}}/{{isbn}}.jpg" />
      <ul>
        <li>{{publisher}}発行</li>
      </ul>
    </div>
  <ng-template>

  <select name="temp" [(ngModel)]="temp">
    <option *ngFor="let b of books; let i = index" [value]="i">{{ b.title }}</option>
  </select>

  <ng-container *ngTemplateOutlet="myTemp; context: books[temp]"></ng-container>
  `
})

export class AppComponent {
  temp = 0;
  books = [
    {
      isbn: '978-4-7741-8411-1',
      title: 'ほげほげ本',
      price: 1234,
      publisher: 'ああああ'
    },
    ...略...
  ];
}
```

- テンプレートの反映先をngTemplateOutletディレクティブで準備して、それをcontextキーで指定する。tempは選択ボックスで選択された値なのでbooks[temp]は選択された書籍情報を表す。

- ngConponentOutputディテクティブを利用すると、あらかじめ用意したコンポーネントを動的にビューにインポートできるようになる。`<ng-container *ngComponentOutlet="exp"></ng-container>`。まずはインポート対象のコンポーネントを用意する。次に、ルートモジュールにコンポーネントを登録して、最後にルートコンポーネントを準備すればよい。動的にインポートするコンポーネントは、declarationsパラメータだけでなくentryComponentsにも登録することを忘れずに。setIntervalメソッドで3000ミリ秒ごとにコンポーネントを切り替えている。表示すべきコンポーネントは配列として用意してあるので、0〜最大インデックスの範囲で循環する値を求め、その値をインデックスとして使用し、対応するコンポーネントをbannerプロパティに反映させれば良い。あとは、bannerの値を*ngComponentOutletにバインドするだけ。

```TypeScript
// 準備するコンポーネントの例
import { Component } from '@angular/core';
@Component({
  selector: 'my-event',
  template: `
  <div class="event">
    <h3>半額セール中</h3>
    <p>今がチャンス！欲しかったあの商品も50％OFF!</p>
  </div>
  `,
  styleUrls: ['app/app.component.css']
})
export class EventComponent {
}
```

```TypeScript
// ルートモジュール
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }    from './app.component';
import { EventComponent }  from './event.component';
import { BookComponent }   from './book.component';
import { WingsComponent }  from './wings.component';

 @NgModule({
   imports:      [ BrowserModule ],
   declarations: [ AppComponent, EventComponent, BookComponent, WingsComponent ],
   entryComponents: [ EventComponent, BookComponent, WingsComponent ],
   bootstrap:    [ AppComponent ]
 })
 export class AppModule {}
```
```TypeScript
// AppComponent
import { Component, OnInit, OnDestroy } from '@angular/core';

import { EventComponent } from './event.component';
import { BookComponent } from './book.component';
import { WingsComponent } from './wings.component';

@Component({
  selector: 'my-app',
  template: `
  <div>
    広告バナー: <br />
    <ng-container *ngComponentOutlet="banner"></ng-container>
  </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  interval: any; // タイマー
  comps = [ EventComponent, BookComponent, WingsComponent ];
  current = 0; // 現在のコンポーネントのインデックス値
  banner: any = EventComponent; // 現在のコンポーネントのオブジェクト

  ngOnInit() {
    this.interval = setInterval(() => {
      this.current = (this.current + 1) % this.comps.length;
      this.banner = this.comps[this.current];
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
```

