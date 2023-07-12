import examplePhoto from "../../assets/images/user-6.jpg";
import "./Profile.css";
import { UserContext } from "../../helpers/Context";
import { useEffect, useState, useContext } from "react";
import { apiDomain } from "../../utils/utils";

// http://localhost:8081/users/emily
const Profile = () => {
  const { miniMediumUserData, setMiniMediumUserData } = useContext(UserContext);
  const username = miniMediumUserData.username;
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (!username) return;
    const fetchUserData = async () => {
      const response = await fetch(`${apiDomain}/users/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      setUserData(responseData);
    };
    fetchUserData();
  }, [miniMediumUserData]);
  return (
    <div className="profile">
      {userData && (
        <div className="profile__top">
          <div className="profile__image">
            <img
              src={userData.profilePicture}
              alt="your profile photo"
              className="profile__image--img"
            />
          </div>
          <div className="profile__user-details">
            <h4 className="profile__fullName">
              {userData.firstName} {userData.lastName}
            </h4>
            <p className="profile__username">{userData.username}</p>
            <p className="profile__email">{userData.emailAddress}</p>
            <p className="profile_join-date">
              You joined mini-medium on{" "}
              {new Date(userData.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
