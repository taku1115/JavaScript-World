// 安全なプログラミングをする上で、varは問題を抱えている

// 1 : 再宣言が可能
var a = 1;
a = 2; //再代入OK
var a = 3; //再宣言OK

let b = 1;
b = 2; //再代入OK
let b = 3;　//再宣言NG

const c = 1;
c = 2; //再代入NG
const c = 3; //再宣言NG

// 2 : 変数の巻き上げが可能
a = 100; //宣言する前に代入（巻き上げ）できてしまう
console.log(a); //100
var a;
// let, constならリファレンスエラー

// 3 : スコープ単位が関数
var n = 0;
if(true) {
  var n = 50;
  var m = 100;
  console.log(n); //50
}
console.log(n); //50
console.log(m); //100
// 変数のスコープが関数単位であるため、制御構文をすり抜けてしまう
const n = 0;
if(true) {
  const n = 50;
  const m = 100;
  console.log(n); //50
}
console.log(n); //0
console.log(m); //参照できずにエラー
// constとletはブロックスコープ

// 以上３点は、どれもバグの原因になりかねない
// あくまで第一選択肢はconst, やむをえず再代入が必要な時はlet
