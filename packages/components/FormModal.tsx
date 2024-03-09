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
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { UserProfile } from "../types/user";
import { useCreateProfile, useEditProfile } from "../hooks/useAuth";
import { getCourses, useGetColleges } from "../hooks/useMood";
import { Toast } from "./Toast";
import { useEffect, useState } from "react";
import { parseErrorMessage } from "../helper/parseErrorMessage";
import CloseIcon from "@mui/icons-material/Close";

type FormModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  initialValue: UserProfile;
};
export const FormModal = ({
  isOpen = false,
  onClose = () => null,
  initialValue = {
    studentId: "",
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    middleName: "",
    birthDate: "2000-01-01",
    college: "-1:",
    course: "-1:",
  },
}: FormModalProps) => {
  const {
    createUser,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    error: errorCreate,
    reset: createReset,
  } = useCreateProfile();
  const {
    editUser,
    isSuccess: isEditSuccess,
    isError: isEditError,
    error: editError,
    reset: editReset,
  } = useEditProfile();
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

  const isEditing = !!initialValue?.id;

  useEffect(() => {
    if (isCreateSuccess) {
      setToastInfo({
        isOpen: true,
        message: "Successfully created a user",
        type: "success",
      });
      onClose();
      createReset();
    }
  }, [isCreateSuccess]);

  useEffect(() => {
    if (isEditSuccess) {
      setToastInfo({
        isOpen: true,
        message: `Successfully edited ${initialValue?.firstName}'s profile`,
        type: "success",
      });
      onClose();
      editReset();
    }
  }, [isEditSuccess]);

  useEffect(() => {
    if (isCreateError) {
      setToastInfo({
        isOpen: true,
        message: parseErrorMessage(errorCreate),
        type: "error",
      });
    }
  }, [isCreateError]);

  useEffect(() => {
    if (isEditError) {
      setToastInfo({
        isOpen: true,
        message: parseErrorMessage(editError),
        type: "error",
      });
    }
  }, [isEditError]);

  const onSubmit = (values: UserProfile) => {
    if (isEditing) {
      editUser({
        ...values,
        id: initialValue?.id || -1,
        birthDate: values.birthDate.toString(),
        course: values.course.split(":")[0],
        college: values.college.split(":")[0],
      });
    } else {
      createUser({
        ...values,
        birthDate: values.birthDate.toString(),
        course: values.course.split(":")[0],
        college: values.college.split(":")[0],
      });
    }
  };

  const handleOnClose = () => {
    onClose();
    editReset();
    createReset();
  };

  const handleCloseToast = () => {
    setToastInfo((prev) => ({ ...prev, isOpen: false }));
  };
  return (
    <>
      <Formik<UserProfile>
        initialValues={initialValue}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setValues,
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
              onClose={handleOnClose}
              maxWidth={"md"}
              PaperProps={{
                component: "form",
                onSubmit: handleSubmit,
              }}
            >
              <IconButton
                aria-label="close"
                onClick={handleOnClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogTitle variant="h4">
                {isEditing ? "Edit user" : "Add new user"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Attention: Prior to finalizing the addition, please ensure the
                  accuracy and completeness of the provided user information.
                  Your thoroughness is crucial for maintaining seamless
                  operations and user satisfaction. Thank you for your attention
                  to detail.
                </DialogContentText>
                <Grid container spacing={3} sx={{ marginTop: 2 }}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={values.studentId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!errors?.studentId || isCreateError || isEditError
                      }
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
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors?.username || isCreateError || isEditError}
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
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors?.email || isCreateError || isEditError}
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
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!errors?.firstName || isCreateError || isEditError
                      }
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
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={values.middleName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!errors?.middleName || isCreateError || isEditError
                      }
                      autoFocus
                      margin="dense"
                      id="middleName"
                      name="middleName"
                      label="Middle Name"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors?.lastName || isCreateError || isEditError}
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
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      value={values.birthDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        !!errors?.birthDate || isCreateError || isEditError
                      }
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
                  </Grid>
                  <Grid item xs={12} md={4}>
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
                        error={
                          !!errors?.college || isCreateError || isEditError
                        }
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
                  </Grid>
                  <Grid item xs={12} md={4}>
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
                        error={!!errors?.course || isCreateError || isEditError}
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
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit"> {isEditing ? "Update" : "Save"}</Button>
              </DialogActions>
            </Dialog>
          );
        }}
      </Formik>
      <Toast {...toastInfo} handleClose={handleCloseToast} />
    </>
  );
};
