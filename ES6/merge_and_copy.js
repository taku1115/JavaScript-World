// [ オブジェクトのコピー・マージ ]

// 代入だと参照渡しとなり実体は共有されたまま
const original = { a: 1, b: 2, c: 3 };
const copy = Object.assign({}, original);
console.log(copy); // { a: 1, b: 2, c: 3 }
console.log(copy === original); // false → プロパティが同じでもアドレスを共有しない別オブジェクト
const assigned = Object.assign(original, { c: 10, d: 50 }, { d: 100 });
console.log(assigned); // { a: 1, b: 2, c: 10, d: 100 }
console.log(original); // { a: 1, b: 2, c: 10, d: 100 }
// Object.assign() はoriginalを書き換える破壊的メソッド

// Object.assign() の代わりにスプレット構文が使われる
const original = { a: 1, b: 2, c: 3 };
const copy = { ...original };
console.log(copy); // { a: 1, b: 2, c: 3 }
console.log(copy === original); // false
const assigned = { ...original, ...{ c: 10, d: 50 }, d: 100 };
console.log(assigned); // { a: 1, b: 2, c: 10, d: 100 }
console.log(original); // { a: 1, b: 2, c: 3 }　-> 破壊されない

// しかしこれらはシャローコピー（１段階までしか有効ではない）

const Taku = {
  name: 'Taku',
  email: 'taku@osk.town',
  address: { town: 'Osaka' },
};
const Hiro = { ...Taku, name: 'Hiro' };
Hiro.email = 'Hiro@spr.town';
Hiro.address.town = 'Sapporo';
console.log(Taku);
// {
//  name: 'Taku',
//  email: 'taku@osk.town',
//  address: { town: 'Sapporo' }, ２層目からはコピーが無効
// }

//　これを解決する裏技（文字列に展開してからJSONにパースし直す）
const Taku = {
  name: 'Taku',
  email: 'taku@osk.town',
  address: { town: 'Osaka' },
};
const Hiro = JSON.parse(JSON.stringify(Taku));
Hiro.email = 'Hiro@spr.town';
Hiro.address.town = 'Sapporo';
console.log(Taku);
// {
//  name: 'Taku',
//  email: 'taku@osk.town',
//  address: { town: 'Osaka' },
// }

// これはDateや関数、undefinedがある時は使えない（その場合はLodashのcloneDeep()などを使用）