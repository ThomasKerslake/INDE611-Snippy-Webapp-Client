import React, { Component } from "react";
import PropTypes from "prop-types";
//Redux stuff
import { connect } from "react-redux";
//Components
import Loadingdots from "./Loadingdots";
//Material UI
import TextField from "@material-ui/core/TextField";
import { Tooltip } from "@material-ui/core";
//Icons
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

class SearchBar extends Component {
  render() {
    return (
      <>
        <div className="searchBarContainer">
          <div className="searchBar">
            <form>
              <TextField
                name="search"
                type="text"
                label="Search"
                placeholder="Search for 'Javascript'..."
                id="searchBarTextInput"
                fullWidth
              />
              <Tooltip title="search" placement="bottom">
                <div className="searchBtnContainer">
                  <IconButton>
                    <SearchIcon className="searchBtn" />
                  </IconButton>
                </div>
              </Tooltip>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default SearchBar;
