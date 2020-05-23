import React, { Component } from "react";
import PropTypes from "prop-types";
//Redux stuff
import { connect } from "react-redux";
import { getSnippetByTypeAction } from "../../redux/actions/dataActions";
//Components
import Loadingdots from "./Loadingdots";
//Material UI
import { Tooltip } from "@material-ui/core";
//
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
//images
import noSnippets from "../../images/noSnippets.png";
//Icons
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const options = [
  "Other",
  "Angular",
  "C",
  "C#",
  "C++",
  "CSS",
  "Django",
  "HTML-CSS",
  "Java",
  "JavaScript",
  "jQuery",
  "Nodejs",
  "PHP",
  "Python",
  "Ruby",
  "Objective-C",
  "React",
  "React-Native",
  "SQL",
  "SASS",
  "TypeScript",
  "Unity",
  "Vue",
];

class SearchBar extends Component {
  state = {
    searchType: "",
  };

  takeChange = (eventChange) => {
    this.setState({
      [eventChange.target.name]: eventChange.target.value,
    });
  };

  checkEmpty = (data) => {
    if (
      data === null ||
      data === undefined ||
      JSON.stringify(data) === "{}" ||
      (typeof data === "object" && Object.keys(data).length === 0)
    )
      return true;
    else return false;
  };

  submitUserSearch = (eventSub) => {
    eventSub.preventDefault();
    const searchInput = this.state.searchType;
    this.props.getSnippetByTypeAction(searchInput);
  };

  render() {
    const {
      UI: { loading },
    } = this.props;
    const { snippets } = this.props.data;
    const dataloading = this.props.data.loading;

    const searchBarRes =
      this.checkEmpty(snippets) && !dataloading ? (
        <>
          <div className="searchBarContainer">
            <div className="searchBar">
              <form onSubmit={this.submitUserSearch}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="searchBarTextInput">Search</InputLabel>
                  <NativeSelect
                    value={this.state.searchType}
                    onChange={this.takeChange}
                    inputProps={{
                      name: "searchType",
                      id: "searchBarTextInput",
                    }}
                  >
                    <option key="emptyValue" value=""></option>
                    {options.map((typeOption) => (
                      <option key={typeOption} value={typeOption}>
                        {typeOption}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
                {loading && <Loadingdots />}
                <Tooltip title="search" placement="bottom">
                  <div className="searchBtnContainer">
                    <IconButton type="submit" disabled={loading}>
                      <SearchIcon className="searchBtn" />
                    </IconButton>
                  </div>
                </Tooltip>
              </form>
            </div>
          </div>
          <h1 id="noSnippetsText">
            Sorry, there seems to be no snippet posts of this type.
          </h1>
          <div className="noSnippetImageContainer">
            <div id="noSnippetsImage">
              <img src={noSnippets} alt="no snippets" id="imageScale" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="searchBarContainer">
            <div className="searchBar">
              <form onSubmit={this.submitUserSearch}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="searchBarTextInput">Search</InputLabel>
                  <NativeSelect
                    value={this.state.searchType}
                    onChange={this.takeChange}
                    inputProps={{
                      name: "searchType",
                      id: "searchBarTextInput",
                    }}
                  >
                    <option key="emptyValue" value=""></option>
                    {options.map((typeOption) => (
                      <option key={typeOption} value={typeOption}>
                        {typeOption}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
                {loading && <Loadingdots />}
                <Tooltip title="search" placement="bottom">
                  <div className="searchBtnContainer">
                    <IconButton type="submit" disabled={loading}>
                      <SearchIcon className="searchBtn" />
                    </IconButton>
                  </div>
                </Tooltip>
              </form>
            </div>
          </div>
        </>
      );

    return searchBarRes;
  }
}

SearchBar.propTypes = {
  getSnippetByTypeAction: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
});

const mapActionsToProps = {
  getSnippetByTypeAction,
};

export default connect(mapStateToProps, mapActionsToProps)(SearchBar);
