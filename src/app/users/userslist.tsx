import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
  randomEmail,
  randomUserName,
} from "@mui/x-data-grid-generator";
import { useEffect, useState } from "react";
import { useGetProfilesAtom } from "../../../packages/hooks/useAuth";
import { FormModal } from "../../../packages/components/FormModal";
import { UserProfile } from "../../../packages/types/user";
import { EmptyForm } from "../../../packages/constants/staticMessages";

const colleges = ["ICS", "COED", "COENG"];
const courses = ["BSIT", "BSIS", "BSPD"];
const randomCollege = () => {
  return randomArrayItem(colleges);
};
const randomCourse = () => {
  return randomArrayItem(courses);
};

type EditToolbarProps = {
  handleCreate?: () => void;
};

function EditToolbar({ handleCreate }: EditToolbarProps) {
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleCreate}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const { parsedProfile, getSingleProfile, isFetching, isLoading } =
    useGetProfilesAtom();
  const [isOpen, setIsOpen] = useState(false);
  const [initialValue, setInitialValue] = useState<UserProfile>(EmptyForm);

  const handleCreate = () => {
    setIsOpen(true);
    setInitialValue(EmptyForm);
  };
  const handleCloseModal = () => {
    return new Promise(() => {
      setIsOpen(false);
    }).then(() => {
      setInitialValue(EmptyForm);
    });
  };

  const handleEditClick = (id: GridRowId) => () => {
    setInitialValue(getSingleProfile(Number(id)) || EmptyForm);
    setIsOpen(true);
  };

  const columns: GridColDef[] = [
    {
      field: "studentId",
      headerName: "Student Id",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "username",
      headerName: "User Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "First Name",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "middleName",
      headerName: "Middle Name",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      minWidth: 180,
      editable: true,
      flex: 1,
    },
    {
      field: "birthDate",
      headerName: "Birth Date",
      type: "date",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "college",
      headerName: "College",
      minWidth: 150,
      flex: 1,
      type: "singleSelect",
      valueOptions: colleges,
    },
    {
      field: "course",
      headerName: "Course",
      minWidth: 150,
      flex: 1,
      type: "singleSelect",
      valueOptions: courses,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      minWidth: 100,
      flex: 1,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div className="flex justify-center items-center">
      <Box
        sx={{
          height: "100%",
          minWidth: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={parsedProfile}
          columns={columns}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { handleCreate },
          }}
        />
        <FormModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          initialValue={initialValue}
        />
      </Box>
    </div>
  );
}
