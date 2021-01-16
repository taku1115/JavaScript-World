// 非同期処理

// Promise以前はコールバック地獄
fs.readfile('foo.txt', (err, data) => {
  console.log('foo:', data);
  fs.readfile('bar.txt', (err, data) => {
    console.log('bar:', data);
    fs.readfile('baz.txt', (err, data) => {
      console.log('baz:', data);
    });
  });
});
// foo.txt → bar.txt → baz.txt の順にファイルの内容を読み込んでダンプ

// Promiseを自作してみる
const isSucceeded = true;
const promise = new Promise((resolve, reject) => {
  if (isSucceeded) {
    resolve('Success');
  } else {
    reject(new Error('Failure'));
  }
});
promise.then((value) => {
  console.log('1.', value);
  return 'Succees again';
})
.then((value) => {
  console.log('2.', value);
})
.catch((error) => {
  console.error('3.', error);
})
.finally(() => {
  console.log('4.', 'Completed');
});
// 1. Success
// 2. Succees again
// 4. Completed

// Promiseをハンドリングしてみる
import fetch from 'node-fetch';

const getUser = (userId) =>
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(`${response.status} Error`);
      } else {
        return response.json();
      }
    },
  );
console.log('-- Start --');
getUser(2)
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log('-- Completed --');
  });

// async / await を使って書き直し
import fetch from 'node-fetch';

const getUser = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  if (!response.ok) {
    throw new Error(`${response.status} Error`);
  }
  return response.json();
};
console.log('-- Start --');
const main = async () => {
  try {
    const user = await getUser(2);
    console.log(user);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('-- Completed --');
  }
};
main();
// 関数宣言時に[async]を付与すると非同期関数となって、返り値が暗黙の内にPromise.resolve()によってラップされる
// そして非同期関数の中では他の非同期関数を、[await]演算子をつけて呼びだすことができる
// await式によって非同期関数を実行すると、そのPromiseがresolveされるかrejectされるまで待機
// resolveされたらawait式は、ラップしていたPromiseから値を抽出して返す