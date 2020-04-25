import React, { Component } from "react";
//Used for formating the times of post to show post times like twitter / fb
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//MUI stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";

const Link = require("react-router-dom").Link;

class Snippet extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      snip: {
        body,
        createdAt,
        snipDescription,
        snipTitle,
        snipType,
        userHandle,
        userProfileImage,
        numOfLikes,
        numOfComments,
        snipId,
      },
    } = this.props;
    return (
      <Card id="card">
        <CardMedia
          image={userProfileImage}
          title="Profile Image"
          id="cardImage"
        />
        <CardContent id="cardContent">
          <Typography variant="h5" color="primary">
            {snipTitle}
          </Typography>
          <Typography
            variant="body2"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography id="snippetCode" variant="body1">
            {body}
          </Typography>
          <Typography variant="body2">{snipType}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default Snippet;
