import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePickerComponent } from "./DatePickerComponent";
import { useMoodFilter } from "../hooks/useMood";
import { PrimitiveAtom } from "jotai";
import { FiltersType, MoodEnum } from "../types/mood";
import { moods } from "../constants/staticMessages";

export const Filters = ({
  chartFilter,
}: {
  chartFilter: PrimitiveAtom<FiltersType>;
}) => {
  const {
    collegeData,
    courses,
    moodFilter,
    isCollegeLoading,
    setDateRange,
    setCollegeId,
    setCourseId,
    setMoodFilter,
    setMood,
    setStudentId,
  } = useMoodFilter(chartFilter);

  const { college, course, end_date, start_date, selectedMood, studentId } =
    moodFilter;
  return (
    <div className="flex flex-row justify-center items-center gap-4 w-full">
      <div className="flex flex-col">
        <TextField
          value={studentId}
          onChange={(event) => setStudentId(event.target.value)}
          margin="dense"
          id="studentId"
          name="studentId"
          label="Student Id"
          type="text"
          variant="outlined"
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Mood</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedMood}
            label="Mood"
            onChange={(event) => {
              setMood(event.target.value as MoodEnum);
            }}
          >
            <MenuItem value="All">
              <em>All</em>
            </MenuItem>
            {moods.map((value) => {
              return <MenuItem value={value}>{value}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
      <div className="flex items-center justify-center">
        <DatePickerComponent
          endDate={end_date}
          startDate={start_date}
          onChange={setDateRange}
        />
      </div>
      <div className="flex flex-col justify-center items-start">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">College</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={`${college.id}:${college.name}`}
            label="College"
            disabled={isCollegeLoading}
            onChange={(event) => {
              const value = event?.target?.value || "-1:";
              const [id, name] = value.split(":");
              setCollegeId(Number(id), name);
            }}
          >
            <MenuItem value={"-1:"}>
              <em>All</em>
            </MenuItem>
            {collegeData &&
              collegeData.map(({ collegeName, id }) => {
                return (
                  <MenuItem value={`${id}:${collegeName}`}>
                    {collegeName}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Course</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={`${course.id}:${course.name}`}
            label="Course"
            disabled={isCollegeLoading || courses.length === 0}
            onChange={(event) => {
              const value = event?.target?.value || "-1:";
              const [id, name] = value.split(":");
              setCourseId(Number(id), name);
            }}
          >
            <MenuItem value="-1:">
              <em>All</em>
            </MenuItem>
            {courses.map(({ name, id }) => {
              return <MenuItem value={`${id}:${name}`}>{name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>

      <div className="flex justify-center">
        <Button
          size="large"
          onClick={() =>
            setMoodFilter({
              start_date: "",
              end_date: "",
              course: { id: -1, name: "" },
              college: { id: -1, name: "" },
              selectedMood: "All",
              studentId: undefined,
            })
          }
          variant="contained"
        >
          <Typography color={"black"}>Clear</Typography>
        </Button>
      </div>
    </div>
  );
};
