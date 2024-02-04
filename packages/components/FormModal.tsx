import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

type FormModalProps = {
  title?: string;
  isOpen?: boolean;
  onClose?: () => void;
};
export const FormModal = ({
  isOpen = false,
  onClose = () => null,
  title,
}: FormModalProps) => {
  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Add new user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="studentId"
            name="studentId"
            label="Student Id"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="middleName"
            name="middleName"
            label="Middle Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="birthDate"
            name="birthDate"
            label="Birth Date"
            type="date"
            fullWidth
            variant="standard"
          />
          <FormControl sx={{ my: 2, width: "100%" }}>
            <InputLabel id="demo-simple-select-helper-label">
              College
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="College"
              //   value={`${college.id}:${college.name}`}
              //   disabled={isCollegeLoading}
              //   onChange={(event) => {
              //     const value = event?.target?.value || "-1:";
              //     const [id, name] = value.split(":");
              //     setCollegeId(Number(id), name);
              //   }}
            >
              <MenuItem value={"-1:"}>
                <em>None</em>
              </MenuItem>
              {/* {collegeData &&
                collegeData.map(({ collegeName, id }) => {
                  return (
                    <MenuItem value={`${id}:${collegeName}`}>
                      {collegeName}
                    </MenuItem>
                  );
                })} */}
            </Select>
          </FormControl>
          <FormControl sx={{ my: 2, width: "100%" }}>
            <InputLabel id="course">Course</InputLabel>
            <Select
              labelId="course"
              id="course"
              label="Course"
              // value={`${course.id}:${course.name}`}
              // disabled={isCollegeLoading || courses.length === 0}
              // onChange={(event) => {
              //   const value = event?.target?.value || "-1:";
              //   const [id, name] = value.split(":");
              //   setCourseId(Number(id), name);
              // }}
            >
              <MenuItem value="-1:">
                <em>None</em>
              </MenuItem>
              {/* {courses.map(({ name, id }) => {
              return <MenuItem value={`${id}:${name}`}>{name}</MenuItem>;
            })} */}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
