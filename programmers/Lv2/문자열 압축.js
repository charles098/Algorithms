function solution(str) {
    let answer = 1001;
    
    if (str.length === 1) return 1;
    
    for (let set = 1; set <= Math.floor(str.length / 2); set++) { 
        
        let equal = 1;
        let m = set;
        let check_str = str.slice(0, m);
        let new_str = '';
        
        while(m + set <= str.length) {
            if(check_str === str.slice(m, m + set)) {
                equal++;
                // 여기서 끝나면 더해지지 않으므로 while 탈출후 따로 처리 필요
            } 
            else {
                if(equal >= 2) new_str += `${equal}${check_str}`;
                else {
                    new_str += check_str;
                }
                check_str = str.slice(m, m + set)
                equal = 1;
            }
            
            m += set;
        }
        
        // 마지막 문자열 검사
        if(equal >= 2) { 
            new_str += `${equal}${check_str}`;
        }
        else {
            new_str += check_str;
        }
        
        // 나머지 문자열 검사
        if (str.length % set) {
            new_str += str.slice((-1) * (str.length % set))
        }
        
        answer = Math.min(answer, new_str.length)
    }
    
    return answer;
}