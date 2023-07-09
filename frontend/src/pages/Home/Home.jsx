import Header from "../../components/Header/Header";
import SignUpForm from "./SignUpForm";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  return (
    <>
      <Header />
      <section className="home">
        <div className="home__textbox">
          <h2 className="home__textbox--title">Stay curious...</h2>
          <p className="home__textbox--subtitle">
            Discover stories, thinking, and expertise from writers on any topic
          </p>
          <Link className="home__textbox--link">start reading</Link>
        </div>
        <SignUpForm />
      </section>
    </>
  );
};
export default Home;
