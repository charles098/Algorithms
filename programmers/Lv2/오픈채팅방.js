function solution(records) {
    let answer = [];
    
    // 쓰기 쉽게 원소를 객체로 변환
    let new_records = records.map((record) => {
        const [type, uid, nickname] = record.split(' ');
        return {type, uid, nickname}
    })
    
    // 1. {uid: nickname} 객체 생성 - 처음부터 탐색해서 덮어쓰도록 한다
    const uid_nickname = {}
    new_records.forEach(({type, uid, nickname}) => {
        if (type !== 'Leave') uid_nickname[uid] = nickname;
    })
    
   
    // 2. 순회하면서 출력
    new_records.forEach(({type, uid, nickname}) => {
        if (type === 'Enter') answer.push(`${uid_nickname[uid]}님이 들어왔습니다.`)
        else if(type === 'Leave') answer.push(`${uid_nickname[uid]}님이 나갔습니다.`)
    })
    
    return answer;
}