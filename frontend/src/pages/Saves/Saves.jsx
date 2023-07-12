import HomeNav from "../../components/HomeNav/HomeNav";
import SaveItem from "../../components/SaveItem/SaveItem";
import exampleImage from "../../assets/images/fantasy.jpg";
import { UserContext } from "../../helpers/Context";
import { useContext, useState, useEffect } from "react";
import { apiDomain } from "../../utils/utils";
import "./Saves.css";

const Saves = () => {
  const [userSaves, setUserSaves] = useState(null);
  const { miniMediumUserData, setMiniMediumUserData } = useContext(UserContext);
  const username = miniMediumUserData.username;
  useEffect(() => {
    const fetchUserSaves = async () => {
      if (!username) return;
      const response = await fetch(`${apiDomain}/favorites/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      setUserSaves(responseData);
    };
    fetchUserSaves();
  }, [miniMediumUserData]);
  return (
    <div className="saves">
      <HomeNav />
      <div className="saves__container">
        {Array.isArray(userSaves) &&
          (userSaves.length <= 0 ? (
            <h1>You don't have any saves</h1>
          ) : (
            <div>
              {userSaves.map((item) => (
                <SaveItem
                  key={item._id}
                  item_id={item._id}
                  title={item.title}
                  description={item.description}
                  article_image={exampleImage}
                  dateCreated={new Date(item.dateCreated).toLocaleString()}
                  lastUpdated={new Date(item.lastUpdated).toLocaleString()}
                />
              ))}
            </div>
          ))}
        {/* <SaveItem
          title="How to take nature walk with friends"
          description="what makes a successful nature walk with friends and family"
          article_image={exampleImage}
          dateCreated="4th July 2023"
          lastUpdated="4th August 2023"
        /> */}
      </div>
    </div>
  );
};
export default Saves;
