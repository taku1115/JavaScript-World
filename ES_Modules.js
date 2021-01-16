// Named Exports
const ONE = 1;
const TWO = 2;

export { ONE, TWO }; // 後からエクスポート
export const TEN = 10; // 定義時にエクスポート

// Default Exports
import { ONE, TWO as ZWEI } from './constants.js';
// ONEはそのままで、TWOはZWEIに変更してインポート
// asキーワードはエクスポート時も使える（例：export { foo as bar }; )
export const plus = (n, m = ONE) => n + m;
const times = (n, m = ZWEI) => n * m;
export default times; // 名前なしでエクスポート(1モジュール = 1ファイルにつき 1回 まで)

// モジュールの集約
export * from './constants.js'; 
export { plus as add, default as multiply } from './math.js';
// './constants.js'と'./math.js'からまとめて再エクスポート
// './math.js'のデフォルトエクスポートも名前を付け直して再エクスポート
export * as German from './constants2.js';

// './constants2.js'
const EINS = 1;
const ZWEI = 2;
const DREI = 3;
const VIER = 4;
const FUNF = 5;
export { EINS, ZWEI, DREI, VIER, FUNF };

// インポート側
import { add, multiply, TWO, TEN, German } from './modules/index.js';
console.log(add(5, TWO)); // 7
console.log(multiply(4, TEN)); // 40
console.log(multiply(German.FUNF, German.DREI)); // 15
