import React, { useContext, useState } from "react";
import axios from "axios";
import "./formStyle.css";
import Context from "../../utils/store";
import { useFormik } from "formik";
import { useEffect } from "react/cjs/react.development";
const url = "https://60f2479f6d44f300177885e6.mockapi.io/users";

const FormAddUser = () => {
  const { hideModal, fetchData } = useContext(Context);
  const user_typeSelect = {
    id: "",
    value: "",
    option: [
      { value: "", text: "Select User Type" },
      { value: "admin", text: "Admin" },
      { value: "employee", text: "Employee" },
    ],
  };

  //validation by formik
  const validate = (values) => {
    const errors = {};
    if (!values.first_name) {
      errors.first_name = "Required";
    } else if (values.first_name.length > 20) {
      errors.first_name = "Must be 15 characters or less";
    }
    if (!values.last_name) {
      errors.last_name = "Required";
    } else if (values.last_name.length > 20) {
      errors.last_name = "Must be 15 characters or less";
    }
    if (!values.user_type) {
      errors.user_type = "Required";
    }
    if (!values.division) {
      errors.division = "Required";
    }
    if (!values.district) {
      errors.district = "Required";
    }

    return errors;
  };

  // formik function
  const formik = useFormik({
    // initialvalue
    initialValues: {
      first_name: "",
      last_name: "",
      user_type: "",
      division: "",
      district: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      axios({
        method: "post",
        url,
        data: values,
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(function (response) {
          console.log(response);
          fetchData(url);
        })
        .catch(function (error) {
          console.log(error);
        });
      resetForm();
    },
  });

  /// select district base on division

  const [selectDivision, setSelectDivision] = useState("");

  const districtUrl = "https://bdapis.herokuapp.com/api/v1.1/division";
  const divisionsUrl = "https://bdapis.herokuapp.com/api/v1.1/divisions";

  const [divisionData, setDivisionData] = useState([]);
  const [districtData, setDistrictData] = useState([]);

  const fetchDivision = () => {
    axios.get(divisionsUrl).then((respose) => {
      if (respose) {
        setDivisionData(respose.data.data);
      } else {
        setDivisionData([]);
      }
    });
  };

  useEffect(() => {
    fetchDivision();
  }, []);

  const newdivisionData = [{ division: "", empty: "Select your Division", value: "" }, ...divisionData];

  // district

  useEffect(() => {
    axios.get(`${districtUrl}/${selectDivision}`).then((respose) => {
      if (respose) {
        if (respose.data.data) {
          setDistrictData(respose.data.data);
        } else {
          setDistrictData([]);
        }
      } else {
        setDistrictData([]);
      }
    });
  }, [selectDivision]);
  const newDistrictData = [{ district: "", empty: "Select your District", value: "" }, ...districtData];

  return (
    <div className="form-main" onSubmit={formik.handleSubmit}>
      <form className="form-add-user">
        <div className="input-field-main">
          <label htmlFor="first_name">
            First Name <span>*</span>
            <span className={` ${formik.errors.first_name ? "error-msg" : ""}`}>{formik.touched.first_name && formik.errors.first_name ? formik.errors.first_name : null}</span>
          </label>
          <div className="input-field first_Name-field">
            <input
              type=""
              name="first_name"
              id="first_name"
              placeholder="Enter your first name"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              value={formik.values.first_name}
              onBlur={formik.handleBlur}
            />
            <div className="input-length">{20 - formik.values.first_name.length}/20</div>
          </div>
        </div>

        <div className="input-field-main">
          <label htmlFor="last_name">
            Last Name <span>*</span>
            <span className={`error-msg ${formik.errors.last_name && "error-msg-active"}`}>
              {formik.touched.last_name && formik.errors.last_name ? formik.errors.last_name : null}
            </span>
          </label>
          <div className="input-field last_Name-field">
            <input
              type=""
              name="last_name"
              id="last_name"
              placeholder="Enter your last name "
              onChange={(e) => {
                formik.handleChange(e);
              }}
              value={formik.values.last_name}
              onBlur={formik.handleBlur}
            />
            <div className="input-length">{20 - formik.values.last_name.length}/20</div>
          </div>
        </div>

        <div className="input-field-main">
          <label htmlFor="user-type">
            User Type <span>*</span>
            <span className={`error-msg ${formik.errors.last_name && "error-msg-active"}`}>
              {formik.touched.user_type && formik.errors.user_type ? formik.errors.user_type : null}
            </span>
          </label>
          <div className="input-field user_type-field">
            <select name="user_type" id="user-type" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.user_type}>
              {user_typeSelect.option.map((item) => {
                return <option value={item.value}>{item.text}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="input-field-main">
          <label htmlFor="division">
            Division <span>*</span>
            <span className={`error-msg ${formik.errors.last_name && "error-msg-active"}`}>
              {formik.touched.division && formik.errors.division ? formik.errors.division : null}
            </span>
          </label>
          <div className="input-field division-field">
            <select
              name="division"
              className="my-2 p-1 px-3"
              id="division"
              onChange={(e) => {
                formik.handleChange(e);
                setSelectDivision(e.target.value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.division}
            >
              {newdivisionData.map((item) => {
                const { division, empty } = item;

                return (
                  <>
                    {empty && <option value="">{empty}</option>}
                    {division === "" ? null : <option value={division.toLowerCase()}>{division}</option>}
                  </>
                );
              })}
            </select>
          </div>
        </div>
        <div className="input-field-main">
          <label htmlFor="district">
            District <span>*</span>
            <span className={`error-msg ${formik.errors.last_name && "error-msg-active"}`}>
              {formik.touched.district && formik.errors.district ? formik.errors.district : null}
            </span>
          </label>
          <div className="input-field district-field">
            <select name="district" className="my-2 p-1 px-3" id="district" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.district}>
              {newDistrictData.map((item) => {
                const { district, empty } = item;
                return (
                  <>
                    {empty && <option value="">{empty}</option>}
                    {district === "" ? null : <option value={district.toLowerCase()}>{district}</option>}
                  </>
                );
              })}
            </select>
          </div>
        </div>

        <div className="buttons-form">
          <button className="btn-cancle btn-form" onClick={hideModal}>
            Cancle
          </button>
          <button type="submit" className="btn-save btn-form">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddUser;
