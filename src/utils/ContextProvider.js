import React, { useContext, useEffect, useState } from "react";
import Context from "./store";
import axios from "axios";
const allUsers = "https://60f2479f6d44f300177885e6.mockapi.io/users";

const ContextProvider = ({ children }) => {
  // main
  const [isShowModal, setIsShowModal] = useState(false);
  const showModal = () => {
    setIsShowModal(true);
  };
  const hideModal = () => {
    setIsShowModal(false);
  };
  // tempdata

  const [data, setData] = useState([]);
  const fetchData = (url) => {
    axios
      .get(url)
      .then((res) => {
        if (res) {
          // setData(res.data);
          const newData = res.data.map((item) => {
            if (item.division.match(/dhaka/) && item.district.match(/dhaka/)) {
              return { ...item, status: "true" };
            }
            return { ...item, status: "false" };
          });
          setData(newData);
        } else {
          setData([]);
        }
      })
      .then((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData(allUsers);
  }, []);
  //

  //
  const [fistName, setFistName] = useState("");
  const [lastName, setLastName] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");

  const handleEdit = (item) => {
    const { first_name, last_name, division, district } = item;
    setFistName(first_name);
    setLastName(last_name);
    setDivision(division);
    setDistrict(district);
  };

  return (
    <Context.Provider
      value={{
        isShowModal,
        showModal,
        hideModal,
        data,
        fetchData,
        setData,
        handleEdit,
        fistName,
        setFistName,
        lastName,
        setLastName,
        division,
        setDivision,
        district,
        setDistrict,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Context);
};

export default ContextProvider;
