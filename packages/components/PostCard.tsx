import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import { Box } from "@mui/material";

export const PostCard = () => {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader title="Mike Barquilla" subheader="September 14, 2016" />

      <CardContent>
        <Typography variant="body1" color="text.primary">
          Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <Box
        sx={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-around",
          borderTop: 1,
          borderColor: "grey.500",
        }}
      >
        <Box
          sx={{
            padding: 1,
            flexDirection: "row",
            display: "flex",
            gap: 1,
            justifyContent: "center",
            borderRight: 1,
            borderColor: "grey.500",
            width: "100%",
          }}
        >
          <ThumbUp />
          <Typography variant="subtitle1" color="text.secondary">
            100
          </Typography>
        </Box>
        <Box
          sx={{
            padding: 1,
            flexDirection: "row",
            display: "flex",
            gap: 1,
            justifyContent: "center",
            width: "100%",
          }}
        >
          <ThumbDown />
          <Typography variant="subtitle1" color="text.secondary">
            100
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
