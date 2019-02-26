let m = new Map();
m.set('dog', 'ワンちゃん');
m.set('cat', 'にゃ〜ん');
m.set('mouse', 'チュウ');
//or let m = new Map([['dog', 'わんわん'],['cat', 'にゃーん']]);

console.log(m.size);
console.log(m.get('dog'));
console.log(m.has('cat'));

//キーを順番に取得
for(let key of m.keys()){
    console.log(key);
}

//値を順番に取得
for(let value of m.values()){
    console.log(value);
}

//キー・値を順番に取得
for(let [key,value] of m){
    console.log(value);
}

//キーdogを削除
m.delete('dog');
console.log(m.size);

m.clear();
console.log(m.size);

