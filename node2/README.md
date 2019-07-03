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