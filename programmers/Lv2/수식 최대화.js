// 100-200*300-500+20
// [100, '-', 200, '*', 300, '-', 500, '+', 20]

// 1. 우선순위를 정한다
// 2. 우선순위 케이스마다 연산을 수행한다

function solution(expression) {
    // 연산자 조합 선택
    let operator_fix = expression.match(/[+\*\-]/g);
    let oper_unique = [...new Set(operator_fix)] // 연산자 고유값 필터링
    let oper_priors = []
    permutation([], oper_unique, oper_unique.length, oper_priors)
    
    let cand = []
    oper_priors.forEach(oper_prior => {
        const exp = expression.split(/(\D)/);
        oper_prior.forEach(oper => {
            while(exp.includes(oper)) {
                console.log(exp)
                const idx = exp.indexOf(oper);
                exp.splice(idx - 1, 3, calc(exp[idx - 1], exp[idx], exp[idx + 1]))
            }
        })
        cand.push(Math.abs(exp[0]))
    })
    
    return Math.max(...cand)
}

function permutation(items, listCopy, k, result) {
  if(items.length === k) {
    result.push(items);
    return;
  }
  for (let i = 0; i < listCopy.length; i ++) {
    permutation([...items, listCopy[i]], listCopy.filter((v, j) => j !== i), k, result);
  }
}

function calc(X, oper, Y) {
    let [x, y] = [Number(X), Number(Y)]
    if(oper === '+') return x + y
    if(oper === '-') return x - y
    if(oper === '*') return x * y
}