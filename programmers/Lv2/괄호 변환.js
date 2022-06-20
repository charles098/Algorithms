// 올바른 괄호 문자열 검사
function isCorrect(w) {
    const stack = [];
    
    for (let i = 0; i < w.length; i++) {
        if (w[i] === '(') stack.push(w[i]);
        else {
            // 스택이 비었으면 false
            if (stack.length === 0) {
                return false
            }
            
            // top이 )면 false
            if (stack[stack.length - 1] === ')') {
                return false
            }
            
            stack.pop();
        }
    }
    
    return stack.length === 0 ? true : false
}

// 괄호 뒤집기
function reverse_brackets(w) {
    let temp = ''
    for (let i = 0; i < w.length; i++) {
        if(w[i] === '(') temp += ')';
        else if(w[i] === ')') temp += '(';
    }
    
    return temp;
}


// 올바른 괄호 문자열 생성 
function solution(w) {
    // 1. 빈 문자열이면 그대로 반환
    if(w.length === 0) return '';
    
    // 2. 문자열 w를 u,v로 분리
    const brackets = [0, 0];
    let u = ''
    let v = '';
    
    for(let i = 0; i < w.length; i++) {
        u += w[i];
        if(w[i] === '(') brackets[0]++;
        if(w[i] === ')') brackets[1]++;
        
        if(brackets[0] === brackets[1]) {
            v = w.slice(i + 1);
            break;
        }
    }
    
    // 3. 문자열 'u'가 올바른 괄호 문자열이면 v를 1단계부터 시작
    if(isCorrect(u)) {
        return u + solution(v)
    }
    
    // 4. 문자열 'u'가 올바른 괄호 문자열이 아닌 경우
    else {
        
        // 4-1~3
        let str = '(' + solution(v) + ')';
        
        // 4-4
        str += reverse_brackets(u.slice(1, u.length - 1));
        
        // 4-5
        return str;
    }
}