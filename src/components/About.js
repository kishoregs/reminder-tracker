import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h4>
        Version 2.0.0{" "}
        <Link to="/" title="Go back">
          &#8602;
        </Link>
      </h4>
    </div>
  );
};

export default About;
