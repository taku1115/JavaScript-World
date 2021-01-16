# JavaScriptの鬼門 [ this ]

this :<br>
`「その関数が実行されるコンテキストであるオブジェクトへの参照が格納されている『暗黙の引数』」`

実際にはどこからでもアクセスできるグローバル変数だが、  
`関数実行時に呼び出し側から暗黙の内に与えられる引数`と捉えた方が理解が容易

メソッドの実行において、実行コンテキストのオブジェクトが`this`や`self`という引数として自動的に渡されるという仕組みは、多くのオブジェクト指向言語で共通

Pythonでは明示的に受け取る必要がある
```py
class Person:
  def __init__(self, name):
    self.name = name
  def greet(self):
    print("Hi, I'm " + self.name)
minky = Person("Momo")
minky.greet() # Hi, I'm Momo
```
RubyやJavaでは暗黙的に受け取っており、JavaScriptのthisもこれの延長線上と考えて良い

異なる点 
* `メソッド以外の関数`にも `this`が引き渡される

特殊な点　　
* `this`を呼び出し側から任意のオブジェクトを指定する方法がある
* Functionオブジェクトのcall()やapply()が該当
```js
const Person = function(name) {
  this.name = name;
  return this;
};
const kanae = Person.call({ gender: 'f' }, 'Kanae'); // { gender: 'f' } を this として渡す
console.log(kanae); // { gender: 'f', name: 'Kanae' }
```
call()やapply()を使わず通常の呼び方をされた場合の、  
暗黙的に渡された`this`が示しているのはその`実行コンテキストのオブジェクト`と考えれば良い

## thisの中身４つのパターン
### 1 : new演算子付きでの呼び出し
**= `新規生成されるオブジェクト`**
```js
const dump = function() { 
  console.log('`this` is', this);
};
const obj = new dump(); // `this` is dump {}
obj // dump {}
dump.prototype //dump {}
obj !== dump.prototype // true 
//objはdump.prototypeとアドレスを共有しない新規オブジェクト
```
1. 関数のprototypeオブジェクトをコピーして新規にオブジェクトを作り、  
2. 次にそれを関数に暗黙の引数thisとして渡し、  
3. 最後にその関数が return this で終わってない場合は代わりにそれを実行する

### 2 : メソッドとして実行
**= `所属するオブジェクト`**
```js
const foo = {
  name: 'Foo Object',
  dump() {
    console.log(this);
  },
};
foo.dump(); // { name: 'Foo Object', dump: [Function: dump] }
```

### 3 : 上記以外の関数［非 Strict モード］
**= `グローバルオブジェクト`**

thisのデフォルトはグローバルオブジェクト
* Node.jsの場合：globalオブジェクト
* ブラウザの場合：windowオブジェクト
```js
const dump = function () {
  console.log(this);
};
dump();
// <ref *1> Object [global] {
//   global: [Circular *1],
//     ︙
// }
```
new演算子なしで実行される関数、メソッドではない関数はグローバルオブジェクトが`this`として引き渡される

### 4 : 上記以外の関数［Strict モード］
**= `undefined`**

strictモードではグローバル汚染を防ぐため、  
関数がメソッドでない、つまり任意のオブジェクトのコンテキストになかった場合、  
`this`には`undefined`が入るようになる

## this の挙動の問題点と対処法

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    const doIt = function () {
      console.log(`Hi, I'm ${this.name}`);
    };
    doIt();
  }
}
const minky = new Person('Momo');
minky.greet(); // TypeError: Cannot read property 'name' of undefined
```
関数doIt()は、オブジェクトの実行コンテキスト内にない  
そしてstrictモードはただの関数でのthisへのアクセスをundedinedにするためエラーが発生

### 4つの対処法
```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet1() {
    const doIt = function () {
      console.log(`Hi, I'm ${this.name}`);
    };
    const bindedDoIt = doIt.bind(this);
    // 対処法1：bind()で関数にthisを束縛
    bindedDoIt();
  }

  greet2() {
    const doIt = function () {
      console.log(`Hi, I'm ${this.name}`);
    };
    doIt.call(this); // 対処法 2：call()またはapply()を使ってthisを指定
  }

  greet3() {
    const _this = this; // 対処法 3：thisの値を一時変数に代入（_thisに値を移し替える）
    const doIt = function () {
      console.log(`Hi, I'm ${_this.name}`);
    };
    doIt();
  }

  greet4() {
    const doIt = () => { // 対処法 4：アロー関数式で定義
      console.log(`Hi, I'm ${this.name}`);
    };
    doIt();
  }

  greet5 = () => { // メソッド自身もアロー関数式で定義
    const doIt = () => {
      console.log(`Hi, I'm ${this.name}`);
    };
    doIt();
  }
}
const creamy = new Person('Mami');
creamy.greet1(); // Hi, I'm Mami
creamy.greet2(); // Hi, I'm Mami
creamy.greet3(); // Hi, I'm Mami
creamy.greet4(); // Hi, I'm Mami
creamy.greet5(); // Hi, I'm Mami
```

### 徹底するべきルール
1. thisはクラス構文内でしか使わない
2. クラス構文内では、メソッドを含めたあらゆる関数の定義をアロー関数式で行う

この原則に従えば、シンプルにthisの問題点を解決できる

