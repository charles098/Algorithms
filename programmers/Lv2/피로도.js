function solution(k, dungeons) {
    let ans = 0;
    let result = [];

    permutation([], dungeons.length, dungeons, result)
    
    result.forEach((ary) => {
        ans = Math.max(ans, explore(k, ary))
    })
    
    return ans;
}

const explore = (k, dungeons) => {
    let count = 0;
    let life = k;
    for(let i = 0; i < dungeons.length; i++) {
        let [enter, use] = dungeons[i];
        if (life >= enter) {
            count++;
            life -= use;
            continue;
        } 
        break;
    }
    return count;
}

const permutation = (items, k, list, result) => {
  if(items.length === k) {
    result.push(items);
    return;
  }
  for (let i = 0; i < list.length; i ++) {
    permutation([...items, list[i]], k, list.filter((v, j) => j !== i), result);
  }
}