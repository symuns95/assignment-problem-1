import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { useGlobalContext } from "../../utils/ContextProvider";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
const allUsers = "https://60f2479f6d44f300177885e6.mockapi.io/users?";

const UserLists = ({ index, value }) => {
  const { userInfo, data, setData } = useGlobalContext();
  const [selectDivision, setSelectDivision] = useState("");
  const [selectDistict, setSelectDistict] = useState("");

  useEffect(() => {
    if (selectDistict && selectDistict) {
      axios.get(`${allUsers}district=${selectDistict}&division=${selectDivision}&page=1`).then((respose) => {
        if (respose) {
          const employee = respose.data.filter((item) => item.user_type === "employee");
          setData(employee);
        }
      });
    }
  }, [selectDivision, selectDistict, setData]);

  return (
    <>
      {value === index && (
        <div className="single-tab-main">
          <ProfileInfo heading={true} setSelectDivision={setSelectDivision} setSelectDistict={setSelectDistict} selectDistict={selectDistict} selectDivision={selectDivision} />
          {data.map((item, i) => {
            return <ProfileInfo key={i} {...item} userInfo={userInfo} bg={i % 2 === 0 ? true : false} />;
          })}
        </div>
      )}
    </>
  );
};
export default UserLists;
