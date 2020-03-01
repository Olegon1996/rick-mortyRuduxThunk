import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SpringModal from "./ViewFullImage";

import { connect } from "react-redux";
import { getCurrentImage, openLernMorePopup } from "../../Redux/action";

const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    minWidth: 250,
    margin: "12px 20px 4px 20px",
    backgroundColor: "#3cd3d92b"
  },
  media: {
    height: 160
  }
});

function MediaCard({ name, image, id, getImage, openLernMorePopup }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const viewFullImage = () => {
    getImage(id);
    setIsOpen(true);
  };

const learnMore = () => {
  openLernMorePopup(id);
  setIsOpen(true);
}

  const closeViewFullImage = value => {
    setIsOpen(value);
  };
  return (
    <React.Fragment>
      <SpringModal open={isOpen} closeViewFullImage={closeViewFullImage} />
      <Card className={classes.card}>
        <CardActionArea style={{ height: "280px" }} onClick={viewFullImage}>
          <CardMedia
            className={classes.media}
            image={image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={learnMore}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    getImage: id => dispatch(getCurrentImage(id)),
    openLernMorePopup: id => dispatch(openLernMorePopup(id))
  };
};

export default connect(null, mapDispatchToProps)(MediaCard);
