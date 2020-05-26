import React, { Component } from "react";
import PropTypes from "prop-types";
//Redux stuff
import { connect } from "react-redux";
import Navbar from "../components/layout-Util-Comps/Navbar";
//Material UI
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
//images
import symbolsBGlarge from "../images/BackgroundSymbols.png";
import mainimage from "../images/mainimage2.png";
import vscodeLogo from "../images/vscodeLogo.png";
//components
import LandingpageSVGs from "../components/pagesvgs/LandingSVGs";

const overflowSET = "overflowSwitch";
const bgColourSwitch = "bgColourSwitch";
class landingpage extends Component {
  //Used to set the bodies overflow hidden + background colour white when the landing page mounts
  componentDidMount() {
    document.body.classList.add(overflowSET, bgColourSwitch);
  }
  //Used to remove the bodies overflow hidden + background colour white when the landing page unmounts
  componentWillUnmount() {
    document.body.classList.remove(overflowSET, bgColourSwitch);
  }
  render() {
    return (
      <>
        <Navbar />
        <div className="largeSymbolsBG">
          <img src={symbolsBGlarge} id="largeBG" alt="background" />
          <div className="textContainer">
            <h1 className="tagline">
              <span id="purpleUnderline">Type once,</span>{" "}
              <span id="yellowUnderline">reuse</span>{" "}
              <span id="redUnderline">any</span>{" "}
              <span id="blueUnderline">time.</span>
            </h1>
            <div className="pTextContainer">
              <p className="pText">
                Snippy is your very own code bank that is built straight into a
                VS code extension - no more third-party applications needed.
                Highlight, save and reuse to your hearts content. Speed up your
                coding life and share your snippets with others here!
              </p>
            </div>
          </div>
          <div className="actionBtnContainer">
            <Link to="/">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                id="dashboardButton"
              >
                EXPLORE
              </Button>
            </Link>
            <span className="orBreak">or</span>
            <Button
              type="submit"
              variant="outlined"
              id="getSnippyButton"
              target="_blank"
              href="https://github.com/ThomasKerslake/INDE611-Snippy"
            >
              Get snippy here
            </Button>
          </div>
          <div className="extensionImage">
            <div className="getExt">
              <img src={vscodeLogo} className="vscodeLogo" alt="vscode" />
            </div>
            <img
              src={mainimage}
              className="landingPageMainImage"
              alt="Site examples"
            />
          </div>
        </div>
        <LandingpageSVGs />
      </>
    );
  }
}

landingpage.propTypes = {
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {})(landingpage);
