import { useContext } from "react";
import { UserContext } from "../../helpers/Context";

const Explore = () => {
  const { userData, setUserData } = useContext(UserContext);
  console.log(userData);
  return (
    <div>
      <h3>Explore endless reads</h3>
    </div>
  );
};

export default Explore;
