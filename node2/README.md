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

## @NgModuleデコレータの主なパラメータで知らなかったやつ

declarations 現在のモジュールに属するコンポーネントなど
bootstrap アプリで最初に起動すべき最上位コンポーネント
id モジュールのid値

## 一般的な命名規則（コンポーネント、ディテクティブ、パイプ、サービス等）

- クラス名
  - 「名前＋種類」でUpperCamelCase
  - AppModule, FriendListComponent

- ファイル名
  - 「名前.種類.ts」でKebabCase(全て小文字、単語区切はハイフン。中東の串刺し肉料理ケバブの名前にちなんで、こう呼ばれる。ChainCaseと呼ばれることも)
  - app.module.ts,friend-list.component.ts

- テストスクリプト
  - テスト対称のファイル名に「.spec.ts」を追加
  - friend-list.component.spec.ts


## tsconfig.json内のcompilerOptionsに含められるパラメータについて

target  JSのバージョン(es3,es5,es6)
module  生成するJSモジュールの形式(commonjsなど)
moduleResolution    モジュールの解決方法(sourceMapなど)
lib コンパイル時にインクルードされるライブラリ(["es2015","dom"]など)
experimentalDecorators  デコレータを有効にするか
noImplicitAny   暗黙的なanyを許容しない
suppressImplicitAnyIndexErrors  インデックスアクセスでnoImplicitAnyエラー回避

※ noImplicitAnyが指定されていても、コード内でany型を明示すれば制約エラーを回避できる。設定を無効にするよりは、これで対処したほうがよい。


