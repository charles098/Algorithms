// 문자열 오름차순 정렬
function sort_asc(ary) {
    ary.sort((b, a) => {
                    if(a < b) return 1;
                    else if(a >= b) return -1;
                    return 0;
                })
}


function getCombinations (arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((el) => [el]); 

    arr.forEach((fixed, index, origin) => {
      const rest = origin.slice(index + 1); 
      const combinations = getCombinations(rest, selectNumber - 1); 
      const attached = combinations.map((el) => [fixed, ...el]); 
      results.push(...attached); 
    });
    
    return results.map(elem => {
        sort_asc(elem)
        return elem.join('');
    })
}



function solution(orders, course) {
    
    const hash = {}
    
    // 순열과 조합
    orders.forEach((order) => {
        const order_ary = order.split('');
        
        course.forEach((n) => {
            if(n <= order.length) {
                const comb = getCombinations(order_ary, n);
                
                comb.forEach((segment) => {
                    if(hash[segment]) hash[segment] += 1;
                    else hash[segment] = 1;
                })
            }
        })
    })
    
    const result = [];
    const course_max = {}

    course.forEach(n => {
        course_max[n] = 0;
        
        for(let key in hash) {
            if (key.length === n) {
                course_max[n] = Math.max(course_max[n], hash[key])
            }
        }
    })
    
    Object.entries(course_max).forEach(([str_len, count]) => {
        if (count >= 2) {
            Object.keys(hash).forEach((key) => {
                if (key.length === Number(str_len) && hash[key] === count) {
                    result.push(key)
                }
            })
        }
    })

    
    sort_asc(result);
    return result;
}