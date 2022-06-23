const getSet = (str, set) => {
    const eng = /^[a-zA-Z]*$/; 
    let tmp;
    for (let i = 0; i < str.length - 1; i++) {
        tmp = str.slice(i, i + 2);    
        if (eng.test(tmp)) set[tmp] ? set[tmp]++ : set[tmp] = 1;
    }
    return Object.entries(set);
}

function solution(str11, str22) {
    // 먼저 두 문자열을 집합으로 만든다.
    let [str1, str2] = [str11.toLowerCase(), str22.toLowerCase()];
    let [set1, set2] = [getSet(str1, {}), getSet(str2, {})];
    
    const MUL = 65536;
    
    // 특수 케이스 처리
    // 둘 다 공집합이면 1 반환, 하나라도 공집합이면 0 반환
    const [ s1_len, s2_len] = [set1.length, set2.length]
    if (!s1_len && !s2_len) return MUL;
    if (!s1_len || !s2_len) return 0;
    
    
    let [inter, union] = [0, 0];
    const check = []; // 검사한 문자 담는 배열
    
    // 교집합?
    // 같은게 있으면 min
    set1.forEach((elem1) => {
        let elem2 = set2.find((elem2) => elem1[0] === elem2[0]);
        if (elem2) {
            inter += Math.min(elem1[1], elem2[1]);
            union += Math.max(elem1[1], elem2[1]);
            check.push(elem1[0]);
        }
    })
    
    // 합집합? 
    set2.forEach((elem1) => {
        if (!check.includes(elem1[0])) {
            let elem2 = set1.find((elem2) => elem1[0] === elem2[0]);
            if (elem2) {
                union += Math.max(elem1[1], elem2[1]);
                check.push(elem1[0]);
            }
        }
    })
    
    // check에 없는거 다 넣어줌
    set1.forEach((elem) => {
        if (!check.includes(elem[0])) union += elem[1];
    })
    set2.forEach((elem) => {
        if (!check.includes(elem[0])) union += elem[1];
    })
    
    return Math.floor((inter / union) * MUL)
}