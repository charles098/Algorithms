// 맨해튼 거리 2 이하로 앉으면 안됨.
// 자리 사이에 파티션으로 막히면 ok

const valid = (r, c) => ((r >= 0 && r < 5) && (c >= 0 && c < 5))

function check(place, r, c) {
    // 행/열+2 체크
    if (valid(r + 2, c) && place[r + 1][c] !== 'X' && place[r + 2][c] === 'P') return false;
    if (valid(r - 2, c) && (place[r - 1][c] !== 'X' && place[r - 2][c] === 'P')) return false;
    if (valid(r, c + 2) && (place[r][c + 1] !== 'X' && place[r][c + 2] === 'P')) return false; 
    if (valid(r, c - 2) && (place[r][c - 1] !== 'X' && place[r][c - 2] === 'P')) return false; 
    
    // 상하좌우 체크
    if (valid(r + 1, c) && place[r + 1][c] === 'P') return false;
    if (valid(r - 1, c) && place[r - 1][c] === 'P') return false;
    if (valid(r, c + 1) && place[r][c + 1] === 'P') return false;
    if (valid(r, c - 1) && place[r][c - 1] === 'P') return false;
    
    
    // 대각선 체크
    if (valid(r + 1, c + 1) &&
        place[r + 1][c + 1] === 'P' && !(place[r + 1][c] === 'X' && place[r][c + 1] === 'X')) return false;
    
    if (valid(r + 1, c - 1) && 
        place[r + 1][c - 1] === 'P' && !(place[r + 1][c] === 'X' && place[r][c - 1] === 'X')) return false;
    
    if (valid(r - 1, c + 1) &&
        place[r - 1][c + 1] === 'P' && !(place[r - 1][c] === 'X' && place[r][c + 1] === 'X')) return false;
    
    if (valid(r - 1, c - 1) &&
        place[r - 1][c - 1] === 'P' && !(place[r - 1][c] === 'X' && place[r][c - 1] === 'X')) return false;
    
    return true;
}

function solution(places) {
    const ans = [];
    for (place of places) {
        let flag = 0;
        for (let r = 0; r < 5; r++) {
            if (flag) break;
            for(let c = 0; c < 5; c++) {
                if (place[r][c] === 'P' && !check(place, r, c)) {
                    // false를 반환하면 0
                    ans.push(0);
                    flag = 1;
                    break;
                }
            }
        }
        if (!flag) ans.push(1);
    }
    return ans;
}