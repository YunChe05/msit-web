import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { BasicModal } from "./BasicModal";
import { DatePickerComponent } from "./DatePickerComponent";
import { useMoodFilter } from "../hooks/useMood";

type ChartFilterModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
};
export const ChartFilterModal = ({
  isOpen = false,
  onClose = () => null,
}: ChartFilterModalProps) => {
  const {
    collegeData,
    courses,
    moodFilter,
    isCollegeLoading,
    setDateRange,
    setCollegeId,
    setCourseId,
    setMoodFilter,
  } = useMoodFilter();

  const { college, course, end_date, start_date } = moodFilter;
  return (
    <BasicModal isOpen={isOpen} onClose={onClose} width={600}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Filters
      </Typography>
      <div className="flex items-center justify-center">
        <DatePickerComponent
          endDate={end_date}
          startDate={start_date}
          onChange={setDateRange}
        />
      </div>
      <div className="flex flex-wrap justify-center">
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
              <em>None</em>
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
              <em>None</em>
            </MenuItem>
            {courses.map(({ name, id }) => {
              return <MenuItem value={`${id}:${name}`}>{name}</MenuItem>;
            })}
          </Select>

          <Button
            onClick={() =>
              setMoodFilter({
                start_date: "",
                end_date: "",
                course: { id: -1, name: "" },
                college: { id: -1, name: "" },
              })
            }
          />
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
            })
          }
          variant="contained"
        >
          <Typography color={"black"}>Reset</Typography>
        </Button>
      </div>
    </BasicModal>
  );
};
