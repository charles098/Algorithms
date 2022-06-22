function solution(fees, records) {
    // 기본시간, 기본요금, 단위시간, 단위요금
    const [default_time, default_fee, per_time, per_fee] = fees;
    
    // 동일 차번으로 분리
    // {Car: timeAry}
    let history = {};
    records.forEach((elem) => {
        const [time, carNum] = elem.split(' ');
        
        // 기록 있는 경우와 없는 경우
        if (history[carNum]) history[carNum].push(time);
        else history[carNum] = [time];
    })
    
    // 홀수면 마지막에 11:59분 out 자동 기입
    Object.entries(history).map(([carNum, times]) => {
        if(times.length % 2 === 1) {
            history[carNum].push('23:59');
        }
    })
    
    // 요금 구하기
    Object.entries(history).map(([carNum, times]) => {
        let [hourSum, minSum] = [0, 0];
        for(let i = 0; i < times.length; i = i + 2) {
            let [before, after] = [times[i].split(':'), times[i + 1].split(':')];
            hourSum += (Number(after[0]) - Number(before[0]));
            minSum += (Number(after[1]) - Number(before[1]));
        }
        
        let divider = (hourSum * 60 + minSum) - default_time;
        if (divider < 0) divider = 0;
        let multer = Math.ceil(divider / per_time);
        history[carNum] = default_fee + multer * per_fee;
    })
    
    // 오름차순 정렬
    return Object.entries(history).sort().map(ary => ary[1])
}