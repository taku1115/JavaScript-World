// 第一級オブジェクト
// * 変数への代入
// * 配列の要素として扱う
// * オブジェクトのプロパティ値（メソッド）として扱う
// * 他の関数に引数として渡す
// * 別の関数の戻り値として設定

// 関数を第一級オブジェクトとして扱うことができる言語の性質を
// [ 第一級関数 ] という

// メソッドとなる例
const foo = {
  bar: 'bar',
  baz: function(){
    console.log('This is method.')
  },
  fuu() {
    console.log('This is method.')
  }
}
foo.baz(); // This is method.
foo.fuu(); // This is method.