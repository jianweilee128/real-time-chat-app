import React, { useState, useRef } from "react";
import {
  updatePassword,
  updateProfile,
  setCurrentUser,
  toggleUpdateProfile,
} from "../../redux/user/user.actions";
import "./update-profile.scss";
import { connect } from "react-redux";
import ListenOutsideClick from "../../utils/listenOutsideClick";

const UpdateProfile = ({
  user,
  updatePassword,
  updateProfile,
  setCurrentUser,
  isUpdateProfile,
  toggleUpdateProfile,
}) => {
  const [nameInput, setNameInput] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const ref = useRef();
  ListenOutsideClick(ref, () => {
    if (isUpdateProfile === true) {
      toggleUpdateProfile();
    }
  });

  const handleUpdateProfile = (nameInput) => {
    updateProfile(nameInput).payload.then((res) => {
      if (res.status && res.status === "success") setCurrentUser(res.user);
      else alert("Error in updating profile!");
    });
  };

  const handleUpdatePassword = (
    currentPassword,
    newPassword,
    newPasswordConfirm
  ) => {
    updatePassword(
      currentPassword,
      newPassword,
      newPasswordConfirm
    ).payload.then((res) => {
      if (res.status && res.status === "success") return;
      else alert("Error in updating password!");
    });
  };

  return (
    <div className="update-profile-view-container" ref={ref}>
      <h1>Update profile</h1>
      <div className="update-profile-form">
        <h2 className="update-profile-subtitle">General Information</h2>
        <div className="form-item">
          <label className="form-label">name</label>
          <input
            type="text"
            className="input-box"
            name="name"
            placeholder="Enter your name..."
            defaultValue={user.name}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>
        <div
          className="update-profile-btn"
          onClick={() => handleUpdateProfile(nameInput)}
        >
          update profile
        </div>

        <h2 className="update-profile-subtitle">Update my password</h2>
        <div className="form-item">
          <label className="form-label">current password</label>
          <input
            type="password"
            className="input-box"
            name="current-password"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label className="form-label">new password</label>
          <input
            type="password"
            className="input-box"
            name="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label className="form-label">confirm new password</label>
          <input
            type="password"
            className="input-box"
            name="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div
          className="update-profile-btn"
          onClick={() =>
            handleUpdatePassword(currentPassword, newPassword, confirmPassword)
          }
        >
          update password
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updatePassword: (currentPassword, newPassword, newPasswordConfirm) =>
    dispatch(updatePassword(currentPassword, newPassword, newPasswordConfirm)),
  updateProfile: (name) => dispatch(updateProfile(name)),
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  toggleUpdateProfile: () => dispatch(toggleUpdateProfile()),
});

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    isUpdateProfile: state.user.isUpdateProfile,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
