import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import { Box } from "@mui/material";
import { ReactionCount } from "../types/post";
import Image from "next/image";

type PostCardProps = {
  name: string;
  date: string;
  title: string;
  body: string;
  reactionCount: ReactionCount;
};
export const PostCard = ({
  name,
  body,
  date,
  title,
  reactionCount,
}: PostCardProps) => {
  const { angry, dislike, funny, happy, laugh, like, love, sad, surprised } =
    reactionCount;

  const counts = [
    laugh,
    surprised,
    sad,
    happy,
    angry,
    funny,
    love,
    like,
    dislike,
  ];

  return (
    <Card
      sx={{
        maxWidth: 1000,
        minWidth: 400,
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
        {counts.map((count, index) => (
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
            <Image
              src={require(`../assets/emojicons/${index + 1}.png`)}
              alt={count}
              width={24}
              height={24}
            />
            <Typography variant="subtitle1" color="text.secondary">
              {count}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
};
