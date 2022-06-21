// 입력은 아피치
// 라이언이 쏘는데, 동점이면 아피치가 점수 가져감
function solution(pick, peachBoard) {
    const list = Array(11).fill(0).map((_, i) => i)

    let ans = [];
    let maxDiff = 0;

    // 중복순열 구현
    const pwc = (items, index) => {
        if(items.length === pick) {
            // items가 중복순열 결과
            // 1. lionBoard로 변환
            let lionBoard = Array(11).fill(0);
            items.forEach((e) => { lionBoard[10 - e]++ });
            
            // 2. 아피치랑 점수차이 계산
            let [peachScore, lionScore] = [0, 0];
            for(let i = 0; i < 11; i++) {
                if(peachBoard[i] === 0 && lionBoard[i] === 0) continue;
                else if(peachBoard[i] >= lionBoard[i]) peachScore += (10 - i);
                else lionScore += (10 - i);
            }

            // 3. 점수차이로 result 갱신
            if(lionScore - peachScore === maxDiff) {
                for(let i = 10; i >= 0; i--) {
                    if(!ans[i] && !lionBoard[i] && ans[i] < lionBoard[i]) {
                        ans = [...lionBoard];
                        break;
                    }
                }
            }
            else if(lionScore - peachScore > maxDiff) {
                ans = [...lionBoard]
                maxDiff = lionScore - peachScore
            }
            return;
        }
        
        for (let i = index; i < list.length; i ++) {
            pwc([...items, list[i]], i);
        }
    }

    pwc([], 0); // 중복순열

    if (ans.length === 0) return [-1];
    else return ans;
}
