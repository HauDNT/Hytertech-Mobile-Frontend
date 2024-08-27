import React, { createContext, useState } from "react";

const UserInfoContext = createContext();

const UserInfoProvider = ({children}) => {
    const initValues = {
        id: "",
        avatar: "",
        email: "",
        full_name: "",
        tel: "",
        gender: "",
        address: "",
        city_id: "",
        district_id: "",
        ward_id: "",
        created_at: "",
    };

    const [userInfo, setUserInfo] = useState(initValues);

    const applyUserInfo = (data) => {
        console.log(data);
        
        setUserInfo({
            ...userInfo,  // Kết hợp giá trị cũ với giá trị mới
            ...data,      // Ghi đè với các giá trị mới từ `data`
        });
    };

    const clearUserInfo = () => setUserInfo(initValues);

    return (
        <UserInfoContext.Provider value={{userInfo, setUserInfo, applyUserInfo, clearUserInfo}}>
            {children}
        </UserInfoContext.Provider>
    );
};

export { UserInfoProvider, UserInfoContext }