// [ コレクションの配列処理 ]
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr.map((n) => n * 2)); // [ 2, 4, 6, 8, 10, 12, 14, 16, 18 ]
console.log(arr.filter((n) => n % 3 === 0)); // [ 3, 6, 9 ]
console.log(arr.find((n) => n > 4)); // 5
console.log(arr.findIndex((n) => n > 4)); // 4
console.log(arr.every((n) => n !== 0)); // true
console.log(arr.some((n) => n >= 10)); // false
console.log(arr.reduce((n, m) => n + m)); // 45
console.log(arr.sort((n, m) => n > m ? -1 : 1)); // [9, 8, 7, 6, 5, 4, 3, 2, 1 ]
console.log(arr.includes(5)); // true
console.log(arr.includes(11)); // false

// [ 高階関数 ]

// 無名関数が引数として渡される
// ここでの引数となる関数をコールバック関数と呼ぶ
const greeter = (target) => () => console.log(`Hi, ${target}!`);
// `Hi, ${target}!`を出力する無名関数が引数となっている
// Reactでもこれを応用した高階コンポーネントという概念がある

// [ カリー化 ]
// 複数の引数を取る関数を、より少ない引数を取る関数に分割して入れ子にすること

// Pre-curried
const multiply = (n, m) => n * m;
console.log(multiply(2, 4)); // 8

// Curried
const withMultiple = (n) => (m) => n * m;
console.log(withMultiple(2)(4)); // 8

// [ 関数の部分適用 ]
// カリー化された関数の一部の引数を固定して新しい関数を作る
const withMultiple = (n) => (m) => n * m;
console.log(withMultiple(3)(5)); // 15
const triple = withMultiple(3);
console.log(triple(5)); // 15

// [ クロージャ ]
// Reactのコンポーネントはクロージャであることが多い
let count = 0;
const increment = () => count += 1;
console.log(increment()); // 1
console.log(increment()); // 2
console.log(count) // 2
// incrementは参照透過性が低く（グローバル変数countに依存しているため）挙動が予測不可能
const counter = () => {
  let count = 0;
  const increment = () => count += 1;
};
// 安全にはなったが、カウンターの機能が関数の中に閉じ込められてて使えない
const counter = () => {
  let count = 0;
  const increment = () => count += 1;
  return increment;
};
// 実用性を加味した最終形は以下
const counter = (count = 0) => (adds = 1) => count + adds;
const increment = counter();
console.log(increment()); // 1
console.log(increment(2)); // 3

// ???　なぜcounter()の引数countはリセットされないのか　???
// メモリサイクル
// 1. 必要なメモリを割り当てる
// 2. 割り当てられたメモリを使用する
// 3. 不要になったメモリを開放する
// JavaScriptに装備されている「ガベージコレクタ」では、3を自動で判別してくれる
// その判定条件は、外部から必要とされているか、すなわち「参照」
let frinedship = null;
if (true) {
  const he = 'Takumi';
  const saveHim = () => console.log(`${he} saved`);
  friendship = saveHim; //friendshipがあるから参照される
}
frinedship();
