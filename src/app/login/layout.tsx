import { AppBar, Typography } from "@mui/material";
import Layout from "../components/layout";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AppBar
        position="fixed"
        component={"nav"}
        sx={{
          width: "100%",
          bgcolor: "#FFFFFF",
          color: "#2F2F2F",
        }}
      >
        <div className="flex justify-center w-full">
          <Typography variant="h5" noWrap component="div" sx={{ padding: 2 }}>
            SENSE: Web-Based Application
          </Typography>
        </div>
      </AppBar>
      <body className="bg-sense-background">{children}</body>
    </html>
  );
}
