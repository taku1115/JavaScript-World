// Statement（文）：手続きを処理系に命令するもの
// Expression（式）：評価された後に値として存在するもの
// 変数に代入できるのか式、できないのが文

const rand = Math.floor(Math.random()*10);
// if分は値として評価されない（文）ためシンタックスエラー
const judge = if (rand % 2 === 0) 'even' else 'odd';
// 三項演算子による評価は式であり変数に代入OK
const judge = rand % 2 === 0 ? 'even' : 'odd';
// ※ Scalaのような関数型言語ならifは式のため前者の記述可能

// 関数の定義
function double(n) {
  return n * 2;
}
const twice = n => n * 2;
// varとconstの違い同様、constを使う式による定義は再宣言や巻き上げを起こさない

// 関数式とは、Functionオブジェクトを生成するリテラル
const sum = new Function('n','m','return n+m;');
const add = (n,m) => n + m;
// sumとaddは全く同じ働きをする関数