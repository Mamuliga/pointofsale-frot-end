import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CustomTextField from './FormComponents/CustomTextField';
import CustomGender from './FormComponents/CustomGender';
import CustomPhone from './FormComponents/CustomPhone';
import { Button, Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CustomAvatar from './FormComponents/CustomAvatar';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from './FormComponents/DatePicker';
import CssBaseline from '@material-ui/core/CssBaseline';
import DropDown from './FormComponents/DropDown';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0),
  },
  margin: {
    marginRight: theme.spacing(1),
  },
}));

const FormBuilder = ({
  title,
  data,
  onClick,
  actor,
  handleDelete,
  handleDatePickerChange,
}) => {
  const [newActor, setNewActor] = useState({ ...actor });
  const getValue = ({ target: { value, name } }) => {
    setNewActor({ ...newActor, [name]: value });
    console.log({ ...newActor, [name]: value });
  };

  const classes = useStyles();

  return (
    <Container component='main' maxWidth='md'>
      <CssBaseline />
      <Typography component='h1' variant='h5'>
        <Box lineHeight={2}>
          <CreateIcon className={classes.margin} />
          {title}
        </Box>
      </Typography>
      <div className={classes.paper}>
        <form className={classes.form}>
          <Grid container spacing={3}>
            {data.map((entry) => {
              switch (entry.type) {
                case 'text':
                case 'email':
                  return (
                    <CustomTextField
                      entry={entry}
                      key={entry.label}
                      getValue={getValue}
                    />
                  );
                case 'date':
                  return (
                    <DatePicker
                      entry={entry}
                      handleDatePickerChange={handleDatePickerChange}
                    />
                  );
                case 'radio':
                  return (
                    <CustomGender
                      entry={entry}
                      key={entry.label}
                      getValue={getValue}
                    />
                  );
                case 'number':
                  return (
                    <CustomPhone
                      entry={entry}
                      key={entry.label}
                      getValue={getValue}
                    />
                  );
                case 'avatar':
                  return <CustomAvatar key={entry.label} entry={entry} />;
                default:
                  return null;
                case 'dropDown':
                  return (
                    <DropDown
                      entry={entry}
                      key={entry.label}
                      getValue={getValue}
                    />
                  );
              }
            })}
          </Grid>
          <Button
            variant='contained'
            color='primary'
            onClick={onClick(newActor)}
            className={classes.submit}
          >
            Submit
          </Button>
          {newActor.id && (
            <Button
              variant='contained'
              color='secondary'
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </form>
      </div>
    </Container>
  );
};

export default FormBuilder;
