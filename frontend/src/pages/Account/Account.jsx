import HomeNav from "../../components/HomeNav/HomeNav";
import Profile from "../../components/Profile/Profile";
import UserBlogs from "../../components/UserBlogs/UserBlogs";
const Account = () => {
  return (
    <>
      <HomeNav />
      <div className="account">
        <Profile />
        <UserBlogs />
      </div>
    </>
  );
};

export default Account;
