// さまざまな機能・構文

// [ デフォルト引数 ]
const raise = (n,m = 2) => n ** 3; // mにデフォルト値を設定
console.log(raise(2,3)); // 8 (２の３乗)
console.log(raise(3)); // 9（３の２乗）
// デフォルト値が設定された引数は省略可能で、省略するとその値が適用される
// デフォルト値の引数はいちばん後ろから配置する（省略可＝重要度低い）

// [ レストパラメータ(残余引数) ]
const showNames = (a, b, ...rest) => {
  console.log(a);
  console.log(b);
  console.log(rest);
}
showNames('Taku', 'Hiro', 'Yuta', 'Masa', 'Taka');
// Taku
// Hiro
// [ 'Yuta', 'Masa', 'Taka' ]

// レストパラメータは、可変長引数も同時に実現している
const showAllArgs = (...args) => {
  console.log(args);
};
showAllArgs('A', 'B', 'C', 'D'); // [ 'A', 'B', 'C', 'D' ]

// それぞれ名前を付けて取得したい場合
const sum = (i, ...[j, k, l]) => i + j + k + l;
console.log(sum(1, 2, 3, 4)); // 10
console.log(sum(1, 1, 1, 1, 1)); // 4
// 定義している引数の数から溢れた分は捨てられるため注意

// [ キー名や値を変数から展開 ]
const keyName = 'bar';
const baz = 300;
const obj = { foo: 100, [keyName]: 200, baz: baz };
console.log(obj); // { foo: 100, bar: 200, baz: 300 }

// [ プロパティ名のショートハンド ]
const baz = 500;
const obj = { baz };
console.log(obj) // { baz: 500 }

// [ 分割代入 ]
const [n, m] = [1, 4]; // 配列の分割代入
console.log(n. m); // 1 4
const obj = { name: 'Taku', age: 24 }; // オブジェクトの分割代入
const { name, age } = obj;
console.log(obj); // Taku 24
// 分割代入の応用
const response = {
  data: [
    {
      id: 1,
      name: 'Taku',
      email: 'taku@osk.town',
    },
    {
      id: 2,
      name: 'Hiro',
      email: 'hiro@spr.town',
    },
    {
      id: 3,
      name: 'Mizo',
      email: 'mizo@osk.town',
    },
  ],
};
const { data: users = [] } = response;
// ショートハンド { data } = { data: [{},{},{}] }
console.log(users);
// [
//  { id: 1, name: 'Taku', email: 'taku@osk.town' },
//  { id: 2, name: 'Hiro', email: 'hiro@spr.town' },
//  { id: 3, name: 'Mizo', email: 'mizo@osk.town' }
// ]

// [ スプレット構文: ...で中身を展開 ]
const arr1 = ['A', 'B', 'C'];
const arr2 = [...arr1, 'D', 'E'];
console.log(arr2); // [ 'A', 'B', 'C', 'D', 'E' ]
const obj1 = { a: 1, b: 2, c: 3, d: 4 };
const obj2 = { ...obj1, d: 99, e: 5 };　// dは上書きされる
console.log(obj2); // { a: 1, b: 2, c: 4, d: 99, e: 5 }

// [ スプレット構文 + 分割代入 ]
const user = {
  id: 1,
  name: 'Taku',
  email: 'taku@osk.town',
  age: 24,
};
const { id, ...userWithoutId } = user;
console.log(id, userWithoutId);
// 1 { name: 'Taku', email: 'taku@osk.town', age: 24 }


// 関数型プログラミングでは、先行する式の評価を後続の式に適用し、最終的な評価値に到る式のツリーを組み立てていく。
// 式：値を演算する or 関数を呼びだす、またはそれらの組み合わせ
// Reactでは文の手続きを書き連ねていくスタイルではなく、y = f(x) + w のような数学的な式を多用するスタイルがより好まれる

// [ ショートサーキット評価(短絡評価) ]
// OR演算子|| は左辺がfalsyだと評価が右辺に渡される(変数の初期化を動的に行いたい場合には便利)
const hello = undefined || null || 0 || NaN || '' || 'Hello!';
// AND演算子&& は左辺がtruthyだと評価が右辺に渡される
const chao = ' ' && 100 && [] && {} && 'Chao!';
false && console.log('1.', hello); // (no output)
true && console.log('2.', hello); // 2. Hello!
false || console.log('3.', chao); // 3. Chao!
// この記法はif文の代わりに使える

// [ Nullish Coalescing / Optional Chaining ]
const users = [
  {
    name: 'Taku',
    address: {
      town: 'Osaka',
    },
  },
  {
    name: 'Hiro',
    address: {},
  },
  null,
];
for (u of users) {
const user = u ?? { name: '(Somebody)' };
const town = user?.address?.town ?? '(Somewhere)';
console.log(`${user.name} lives in ${town}`);
}
// Taku lives in Osaka
// Hiro lives in (SomeWhere)
// (Somebody) lives in (Somewhere)

// ? : Optional Chaining 
const obj = {};
obj.foo // undefined
obj.foo.bar // Uncaught TypeError: Cannot read property 'bar' of undefined (タイプエラー)
obj?.foo?.bar // undefined (タイプエラーを起こさないよう短絡評価してくれる)

// ?? : Nullish Coalescing
// 左辺が null または undefined のときだけ右辺が評価される
// よって 0 や '' の空文字といったfalsyな値はそのまま評価される
// OR演算子だと 0 や空文字もスルーされてしまうので、より明示的な nullish coalescing のほうが望ましい
// nullish coalescing が使えるときは、OR演算子によるショートサーキット評価より優先して使う