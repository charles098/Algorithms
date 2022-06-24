function solution(s) {
    const removed_s = s.slice(2, s.length - 2)
        
    const sets = removed_s
                    .split('},{')
                    .map(e => e.split(',').map(el => parseInt(el)))
        
    sets.sort((b, a) => b.length - a.length)
    
    let ans = sets[0];
    for(let i = 0; i < sets.length - 1; i++) {
        const [arr2, arr1] = [sets[i], sets[i + 1]]
        let difference = arr1.filter(x => !arr2.includes(x));
        ans = [...ans, ...difference]
    }
    
    return ans;
}

