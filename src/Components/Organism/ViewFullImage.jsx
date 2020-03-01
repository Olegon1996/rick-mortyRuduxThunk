import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";

import { connect } from "react-redux";
import "../app.css";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    width: 600,
    height: 600,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2)
  }
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

function SpringModal({ open, closeViewFullImage, fullImage, hero }) {
  const classes = useStyles();
  console.log(Object.values(hero).length !== 0);

  const handleClose = () => {
    closeViewFullImage(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {fullImage ? (
              <img src={fullImage} alt="fullImage" className="imageFull"></img>
            ) : null}
            {Object.values(hero).length !== 0 ? (
              <div>
                <img src={hero.image} className='imageWithMoreInfo' alt="fullImage"></img>
                <h1 className='moreName'>{hero.name}</h1>
                <p className='moreInfoPar'>Planet: <span className='spanInfo'>{hero.location.name}</span></p>
                <p className='moreInfoPar'>Gender: <span className='spanInfo'>{hero.gender}</span></p>
                <p className='moreInfoPar'>Species: <span className='spanInfo'>{hero.species}</span></p>
                <p className='moreInfoPar'>Status: <span className='spanInfo'>{hero.status}</span></p>
                <p className='moreInfoPar'>Created: <span className='spanInfo'>{hero.created}</span></p>
              </div>
            ) : null}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    fullImage: state.image,
    hero: state.heroId
  };
};

export default connect(mapStateToProps, null)(SpringModal);
