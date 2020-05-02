import React, { Component } from "react";

class Loadingdots extends Component {
  render() {
    return (
      <div className="Load">
        <ul>
          <li>
            <div className="dotBox1">
              <div className="dot1"></div>
            </div>
          </li>
          <li>
            <div className="dotBox2">
              <div className="dot2"></div>
            </div>
          </li>
          <li>
            <div className="dotBox3">
              <div className="dot3"></div>
            </div>
          </li>
          <li>
            <div className="dotBox4">
              <div className="dot4"></div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Loadingdots;
