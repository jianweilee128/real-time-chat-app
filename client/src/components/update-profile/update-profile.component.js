import React, { useRef } from "react";
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
  const nameRef = useRef("");
  const currentPasswordRef = useRef("");
  const newPasswordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const handleUpdatePassword = () => {
    let currentPassword = currentPasswordRef.current.value;
    let newPassword = newPasswordRef.current.value;
    let confirmPassword = confirmPasswordRef.current.value;
    updatePassword(currentPassword, newPassword, confirmPassword);
    currentPassword = "";
    newPassword = "";
    confirmPassword = "";
  };
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
            ref={nameRef}
            type="text"
            className="input-box"
            name="name"
            placeholder="Enter your name..."
            defaultValue={user.name}
          />
        </div>
        <div
          className="update-profile-btn"
          onClick={() => updateProfile(nameRef.current.value)}
        >
          update profile
        </div>

        <h3 className="update-profile-subtitle">Update my password</h3>
        <div className="form-item">
          <label className="form-label">current password</label>
          <input
            ref={currentPasswordRef}
            type="password"
            className="input-box"
            name="current-password"
          />
        </div>
        <div className="form-item">
          <label className="form-label">new password</label>
          <input
            ref={newPasswordRef}
            type="password"
            className="input-box"
            name="password"
          />
        </div>
        <div className="form-item">
          <label className="form-label">confirm new password</label>
          <input
            ref={confirmPasswordRef}
            type="password"
            className="input-box"
            name="password"
          />
        </div>
        <div
          className="update-profile-btn"
          onClick={() => handleUpdatePassword()}
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
