import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function TextButtons({nextPage, prevPage, changePage}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {!(prevPage === '') ? <Button onClick={() => changePage(prevPage)}>Previous Page</Button> : null}
      {!(nextPage === '') ? <Button onClick={() => changePage(nextPage)}>Next Page</Button> : null}
    </div>
  );
};