// 1월부터 12월
export const monthList = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
]

// 1부터 31일 까지
export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

// 2021년부터 1900년까지
export const yearList = Array.from(Array(122), (_, i) => String(2021 - i));