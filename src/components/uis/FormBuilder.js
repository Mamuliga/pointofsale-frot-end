import React, { useState } from "react";
import { FormGroup } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CustomTextField from "./FormComponents/CustomTextField";
import CustomGender from "./FormComponents/CustomGender";
import CustomPhone from "./FormComponents/CustomPhone";
import { Button } from "@material-ui/core";
import CustomAvatar from "./FormComponents/CustomAvatar";
import DatePicker from "./FormComponents/DatePicker";

const FormBuilder = ({
  title,
  data,
  onClick,
  actor,
  handleDelete,
  datePickerLabel = "date"
}) => {
  const [newActor, setNewActor] = useState({ ...actor });
  const getValue = ({ target: { value, name } }) => {
    console.log({ ...newActor, [name]: value });
  };
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDatePickerChange = (date, name) => {
    setSelectedDate(date);
    console.log(date);
    setNewActor({ ...newActor, ...(newActor[`${name}`] = date) });
    console.log(newActor);
  };
  return (
    <div>
      <div className={FormGroup.root}>
        <div>
          <Grid>
            <Typography variant='h6' noWrap>
              {title}
            </Typography>
          </Grid>
          {data.map(entry => {
            switch (entry.type) {
              case "date":
                return (
                  <DatePicker
                    datePickerLabel={datePickerLabel}
                    selectedDate={selectedDate}
                    handleDatePickerChange={handleDatePickerChange}
                  />
                );
              case "text":
              case "email":
                return (
                  <CustomTextField
                    entry={entry}
                    key={entry.label}
                    getValue={getValue}
                  />
                );
              case "radio":
                return (
                  <CustomGender
                    entry={entry}
                    key={entry.label}
                    getValue={getValue}
                  />
                );
              case "number":
                return (
                  <CustomPhone
                    entry={entry}
                    key={entry.label}
                    getValue={getValue}
                  />
                );
              case "avatar":
                return <CustomAvatar key={entry.label} entry={entry} />;
              default:
                return null;
            }
          })}
          <Button
            variant='contained'
            color='primary'
            onClick={onClick(newActor)}
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
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
