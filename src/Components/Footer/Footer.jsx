import React from "react";
import SendIcon from "@mui/icons-material/Send";
import YoutubeIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import "./footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col" id="company">
              <img src="/images/logo.png" alt="" className="logo" />
              <p>
              Connecting those striving for success with those who've achieved it
              </p>
              <div className="social">
                <Link to="/d">
                  <YoutubeIcon />
                </Link>
                <Link to="/d">
                  <XIcon />
                </Link>
                <Link to="/d">
                  <InstagramIcon />
                </Link>
                <Link to="/d">
                  <LinkedInIcon />
                </Link>
              </div>
            </div>

            <div className="col" id="services">
              <h3>Services</h3>
              <div className="links">
                <Link to="#">Mentoring</Link>
                <Link to="#">Courses</Link>
              </div>
            </div>

            <div className="col" id="useful-links">
              <h3>Links</h3>
              <div className="links">
                <Link to="#">About</Link>
                <Link to="#">Jobs</Link>
                <Link to="#">Our Policy</Link>
                <Link to="#">Help</Link>
              </div>
            </div>

            <div className="col" id="contact">
              <h3>Contact</h3>
              <div className="contact-details">
                <PlaceIcon />
                <p>
                  RN-414 ,Vivekanand, Muradnagat <br />
                  Ghaziabad, India
                </p>
              </div>
              <div className="contact-details">
                <PhoneIcon />
                <p>+91 124567890</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form">
              <form action="">
                <input type="text" placeholder="Email here..." />
                <button>
                  <SendIcon />
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
