import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import { Box } from "@mui/material";

type PostCardProps = {
  name: string;
  date: string;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
};
export const PostCard = ({
  name,
  body,
  date,
  dislikes,
  likes,
  title,
}: PostCardProps) => {
  return (
    <Card
      sx={{
        maxWidth: 500,
        display: "flex",
        flexDirection: "column",
        border: 1,
        borderColor: "grey.500",
      }}
    >
      <CardHeader
        sx={{ borderBottom: 1, borderColor: "grey.500" }}
        title={name}
        subheader={date}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body1" color="text.primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
      <Box
        sx={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-around",
          borderTop: 1,
          borderColor: "grey.500",
          flexShrink: 0,
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
            {likes}
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
            {dislikes}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
