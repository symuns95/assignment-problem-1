import React from "react";
import TabsComponent from "../../components/TabComponents/tabsComponent";
import "./profileLists.css";
import Modal from "../../components/addUserModal/Modal";
import Heading from "../../components/heading/heading";

const ProfileLists = () => {
  return (
    <section className="section-profile-lists">
      <Modal />
      <div className="container-profile-lists container">
        <Heading userLists heading="User Lists" />
        <TabsComponent />
      </div>
    </section>
  );
};

export default ProfileLists;
