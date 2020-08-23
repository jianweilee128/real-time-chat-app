import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../../resources/img/close.svg";
import {
  updatePassword,
  updateProfile,
  toggleUpdateProfile,
} from "../../redux/user/user.actions";
import "./update-profile.scss";
import { connect } from "react-redux";

const UpdateProfile = ({
  user,
  updatePassword,
  updateProfile,
  toggleUpdateProfile,
}) => {
  const [nameInput, setNameInput] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="update-profile-container">
      <div className="test-icon">
        <CloseIcon onClick={() => toggleUpdateProfile()} />
      </div>
      <h1>Update profile</h1>
      <div className="update-profile-form">
        <h3 className="update-profile-subtitle">General Information</h3>
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
          onClick={() => updateProfile(nameInput)}
        >
          update profile
        </div>

        <h3 className="update-profile-subtitle">Update my password</h3>
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
            updatePassword(currentPassword, newPassword, confirmPassword)
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
  toggleUpdateProfile: () => dispatch(toggleUpdateProfile()),
});

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
