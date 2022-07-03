function solution(relation) {
    const cols = relation[0].length;
    const indexes = [...Array(cols)].map((e, i) => i);
    const keys = [];
    
    for (let k = 1; k <= cols; k++) {
        // 조합으로 선택
        let key_candidates = [];
        combination([], 0, k, indexes, key_candidates);
        
        key_candidates.forEach((key_candidate) => {
            // 1. result 유일성 검사
            let tmp_relation = [];
            let isUnique = false;
            for (let i = 0; i < relation.length; i++) {
                tmp_relation.push([...relation[i]]
                                    .filter((e, i) => key_candidate.includes(i))
                                    .join(''));
                tmp_relation = [...new Set([...tmp_relation])];
                if (tmp_relation.length === relation.length) {
                    // result 유일성 만족
                    isUnique = true;
                    if (k === 1) keys.push(key_candidate);
                }
            }
            
            // 유일성 만족하지 않으면 패스
            if (!isUnique) return;
            
            // 2. 최소성 검사
            // keys의 각 원소 배열이 result에 포함되는지 검사
            let isSubSet = false;
            for (let i = 0; i < keys.length; i++) {
                isSubSet = keys[i].every(e => key_candidate.includes(e));
                if (isSubSet) break;
            }
            
            // 최소성 만족하지 않으면 패스
            if (isSubSet) return;
            
            // 다 만족하면 result를 keys에 push
            keys.push(key_candidate);
        })
    }
    
    return keys.length
}

function combination(items, idx, k, list, result) {
    if (k === items.length) {
        result.push(items);
        return;
    }
    for(let i = idx; i < list.length; i++)
        combination([...items, list[i]], i + 1, k, list, result);
}