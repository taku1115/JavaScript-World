// クラスのようでクラスでない、JSのクラス構文

class Bird {
  constructor(name) {
    this.name = name;
  }
  // コンストラクトはアロー関数で書けない

  chirp = () => {
    console.log(`${this.name}が鳴きました`);
  }
  // メンバーメソッドは極力アロー関数で書くのがおすすめ

  static explain = (name) => {
    console.log(`${name}は翼があって卵を産みます`);
  }
}

class FlyableBird extends Bird {
  constructor(name) {
    super(name);
  }

  fly = () => {
    console.log(`${this.name}が飛びました`);
  }
}

const penguin = new Bird('ペンギン');
penguin.chirp(); // ペンギンが鳴きました
Bird.explain('カラス'); //カラスは翼があって卵を産みます

const hawk = new FlyableBird('タカ');
hawk.fly(); // タカが飛びました


// ES2015から追加されたが、厳密な意味でのクラスは存在しない
// クラスを作っているように見せかけたシンタックスシュガー
typeof Bird // 'function'
// JavaScriptがプロトタイプベースであるため(RubyやJavaはクラスベース)

// JSは「プロトタイプベースのオブジェクト指向言語」である
// クラス：実体を持たない抽象概念
// プロトタイプ：実体のあるオブジェクト
// 各オブジェクト値のプロトタイプはプロパティ[ __proto__ ]に格納される
[1, 2, 3].__proto__ // [] (継承元プロトタイプ：空配列)
{ foo: 'bar' }.__proto__ // {} (継承元プロトタイプ：空オブジェクト)
'JavaScript'.__proto__ // [String: ''] (継承元プロトタイプ：空文字)
(300).__proto__ // [Number: 0] (継承元プロトタイプ：数値0)

new Array(1, 2, 3); // [1, 2, 3]
typeof Array // 'function' (Arrayは[]を継承してオブジェクトインスタンスを生成するコンストラクタ関数)
Array.prototype // []

new String('JavaScript'); // [String: 'JavaScript]
typeof String // 'function'
String.prototype // [String: '']

// プロトタイプが持っているメソッドの継承
Number.prototype.toString(); // '0'
(100).toString(); // '100' (Number.prototype.toString() を継承したもの)
String.prototype.replace('', 'blank string'); // 'blank string'
'LiveScript'.replace('Live', 'Java'); // 'JavaScript' (String.prototype.replace() を継承したもの)

// あらゆるオブジェクトは何らかのプロトタイプの継承
// このプロトタイプチェーンは最終的に、{} を経て null に到達する
hawk.__proto__ // FlyableBird {}
hawk.__proto__.__proto__ // Bird {}
hawk.__proto__.__proto__.__proto__ // {}
hawk.__proto__.__proto__.__proto__.__proto__ // null


// Birdクラスのコードをプロトタイプベースで書き直し
function Bird(name) {
  this.name = name;
  this.chirp = function() {
    console.log(`${this.name}が鳴きました`);
  }
  return this;
}

Bird.explain = function(name) {
  console.log(`${name}は翼があって卵を産みます`);
}

function FlyableBird(name) {
  Bird.call(this, name);
  this.fly = function() {
    console.log(`${this.name}が飛びました`);
  }
  return this;
}

FlyableBird.prototype.__proto__ = Bird.prototype;

// 拡張性と柔軟性がプロトタイプベースの強み
