import {
  Box,
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
import { Formik } from "formik";
import { UserProfile, UserProfilePayload } from "../types/user";
import { useCreateProfile } from "../hooks/useAuth";
import { getCourses, useGetColleges } from "../hooks/useMood";
import { Toast } from "./Toast";
import { useEffect, useState } from "react";
import { parseErrorMessage } from "../helper/parseErrorMessage";

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
  const { createUser, isSuccess, isError, error } = useCreateProfile();
  const { colleges, isCollegeLoading } = useGetColleges();
  const [toastInfo, setToastInfo] = useState<{
    message?: string;
    isOpen?: boolean;
    type: "error" | "warning" | "info" | "success";
  }>({
    isOpen: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (isSuccess) {
      setToastInfo({
        isOpen: true,
        message: "Successfully created a user",
        type: "success",
      });
      onClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setToastInfo({
        isOpen: true,
        message: parseErrorMessage(error),
        type: "error",
      });
    }
  }, [isError]);

  const onSubmit = (values: UserProfile) => {
    console.log(values.birthDate);
    createUser({
      ...values,
      birthDate: values.birthDate.toString(),
      course: values.course.split(":")[0],
      college: values.college.split(":")[0],
    });
  };

  const handleCloseToast = () => {
    setToastInfo((prev) => ({ ...prev, isOpen: false }));
  };
  return (
    <>
      <Formik<UserProfile>
        initialValues={{
          studentId: "",
          email: "",
          username: "",
          firstName: "",
          lastName: "",
          middleName: "",
          birthDate: "2000-01-01",
          college: "-1:",
          course: "-1:",
        }}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          errors,
        }) => {
          const courses = getCourses(
            colleges,
            Number(values.college.split(":")[0])
          );
          return (
            <Dialog
              open={isOpen}
              onClose={onClose}
              PaperProps={{
                component: "form",
                onSubmit: handleSubmit,
              }}
            >
              <DialogTitle>Add new user</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To subscribe to this website, please enter your email address
                  here. We will send updates occasionally.
                </DialogContentText>

                <TextField
                  value={values.studentId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors?.studentId || isError}
                  autoFocus
                  required
                  margin="dense"
                  id="studentId"
                  name="studentId"
                  label="Student Id"
                  type="text"
                  variant="standard"
                  fullWidth
                />
                <TextField
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors?.username || isError}
                  autoFocus
                  required
                  margin="dense"
                  id="username"
                  name="username"
                  label="Username"
                  type="text"
                  variant="standard"
                  fullWidth
                />
                <TextField
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors?.email || isError}
                  autoFocus
                  required
                  margin="dense"
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  variant="standard"
                  fullWidth
                />
                <TextField
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors?.firstName || isError}
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
                  value={values.middleName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors?.middleName || isError}
                  autoFocus
                  margin="dense"
                  id="middleName"
                  name="middleName"
                  label="Middle Name"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors?.lastName || isError}
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
                  value={values.birthDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors?.birthDate || isError}
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
                    id="college"
                    name="college"
                    label="College"
                    value={values.college}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isCollegeLoading}
                    error={!!errors?.college || isError}
                  >
                    <MenuItem value={"-1:"}>
                      <em>None</em>
                    </MenuItem>
                    {colleges &&
                      colleges.map(({ collegeName, id }) => {
                        return (
                          <MenuItem value={`${id}:${collegeName}`}>
                            {collegeName}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                <FormControl sx={{ my: 2, width: "100%" }}>
                  <InputLabel id="course">Course</InputLabel>
                  <Select
                    labelId="course"
                    id="course"
                    name="course"
                    label="Course"
                    value={values.course}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors?.course || isError}
                    disabled={isCollegeLoading || courses.length === 0}
                  >
                    <MenuItem value="-1:">
                      <em>None</em>
                    </MenuItem>
                    {courses.map(({ name, id }) => {
                      return (
                        <MenuItem value={`${id}:${name}`}>{name}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit">Save</Button>
              </DialogActions>
            </Dialog>
          );
        }}
      </Formik>
      <Toast {...toastInfo} handleClose={handleCloseToast} />
    </>
  );
};
