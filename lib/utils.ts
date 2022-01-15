// token=value를 {token: 'value'}로 바꾸는 함수
export const cookieStringToObject = (cookieString: string | undefined) => {
    const cookies: { [key: string]: string } = {};
    if (cookieString) {
        // token = value
        const itemString = cookieString?.split(/\s*;\s*/);
        itemString.forEach((pairs) => {
            // ['token','value']
            const pair = pairs.split(/\s*=\s*/);
            cookies[pair[0]] = pair.splice(1).join('=');
        });
    }
    return cookies;
}

// string에서 number만 return 하는 함수
// 예시) 침실 3개 => 3 리턴
export const getNumber = (string: string) => {
    const numbers = string.match(/\d/g)?.join("");
    if (numbers) {
        return Number(numbers);
    }
    return null;
};


// 금액 변경시
export const makeMoneyString = (input: string) => {
    const numberPrice = Number(input).toLocaleString('ko-KR');
    return numberPrice;
}


// query string 만들기
export const makeQueryString = (baseUrl: string, queriesObject: Object & { [key: string]: any } ) => {
    const keys = Object.keys(queriesObject);
    const valuse = Object.values(queriesObject);
    if (keys.length === 0) {
        return baseUrl;
    }

    let queryString = `${baseUrl}?`;
    keys.forEach((key, i) => {
        if (queriesObject[key]) {
            queryString += `${keys[i]}=${valuse[i]}&`;
        }
    });
    // 마지막 '&'제거
    return queryString.slice(0,-1);
}