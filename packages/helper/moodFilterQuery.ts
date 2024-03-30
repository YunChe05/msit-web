import { FiltersType } from "../types/mood";

export const moodFilterQuery = ({
  college,
  course,
  end_date,
  start_date,
  selectedMood,
  studentId,
}: FiltersType) => {
  const filters = {
    createdAt: {},
    mood: {},
    profile: { college: { id: {} }, course: { id: {} }, studentId: {} },
  };

  if (start_date && end_date && end_date !== "Invalid Date") {
    filters.createdAt = {
      $gte: start_date,
      $lte: end_date,
    };
  }

  if (college && college.id > 0) {
    filters.profile.college.id = {
      $eqi: college.id,
    };
  }

  if (course && course.id > 0) {
    filters.profile.course.id = {
      $eqi: course.id,
    };
  }

  if (studentId && studentId.length !== 0) {
    filters.profile.studentId = {
      $contains: studentId,
    };
  }

  if (selectedMood && selectedMood.length !== 0 && selectedMood !== "All") {
    filters.mood = {
      $eqi: selectedMood,
    };
  }

  return filters;
};
