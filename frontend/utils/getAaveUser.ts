import {fetchAaveData, calculateCollateralDebtHealthFactor} from './flashLoanUtils';

export async function getAaveUser() {
    const aaveData = await fetchAaveData() as { users: { id: string, reserves: any[] }[] };
    const usersData = aaveData.users.map((user) => calculateCollateralDebtHealthFactor(user));
    console.log("_________________")
    console.log("usersData",usersData);
    return usersData;
    
}

export const getAaveUsers = async () => {
    const usersData = await getAaveUser();
    return usersData;
}
getAaveUsers();