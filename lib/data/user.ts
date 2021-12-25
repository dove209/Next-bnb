/* eslint-disable import/no-anonymous-default-export */
import { readFileSync, writeFileSync } from "fs";
import { StoredUserType } from "../../types/user";

// 유저 리스트 데이터 불러오기
const getList = () => {
    const usersBuffer = readFileSync("data/user.json");
    const userString = usersBuffer.toString();
    if (!userString) {
        return [];
    }

    const users: StoredUserType[] = JSON.parse(userString);
    return users;
};

// email의 유저가 있는지 확인
const exist = ({ email }: { email: string }) => {
    const users = getList();
    return users.some((user) => user.email === email);
}

// 유저 리스트 저장하기
const write = (users: StoredUserType[]) => {
    writeFileSync('data/user.json', JSON.stringify(users));
}

// email 또는 id의 유저 불러오기
const find = ({ email, id }: { email?: string, id?: number }) => {
    const users = getList();
    return users.find((user) => user.email === email || user.id === id );
}

export default { getList, exist, write, find };