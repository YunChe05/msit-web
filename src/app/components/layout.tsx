"use client";
import { FC, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Collapse } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import logo from "./logo.gif";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PeopAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import RecommendIcon from "@mui/icons-material/Recommend";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useLogout } from "../../../packages/hooks/useAuth";

const drawerWidth = 240;

interface LayoutProps {
  window?: () => Window;
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ window, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapse, setIsCollapse] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { logout } = useLogout();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          MSIT
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {["Dashboard", "Analytics", "Users", "Profile"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            className={
              pathname.startsWith("/" + text.toLowerCase())
                ? "text-sky-600 bg-slate-100"
                : "text-slate-700"
            }
            onClick={() => {
              router.push("/" + text.toLowerCase());
            }}
          >
            <ListItemButton>
              <ListItemIcon
                className={
                  pathname.startsWith("/" + text.toLowerCase())
                    ? "text-sky-600 bg-slate-100"
                    : "text-slate-700"
                }
              >
                {index === 0 && <SpaceDashboardIcon />}
                {index === 1 && <QueryStatsIcon />}
                {index === 2 && <PeopAltIcon />}
                {index === 3 && <WorkIcon />}
                {index === 4 && <MailIcon />}
                {index === 5 && <SettingsIcon />}
                {index === 6 && <AccountCircleIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem
          disablePadding
          onClick={handleCollapse}
          className={
            pathname.startsWith("/help")
              ? "text-sky-600 bg-slate-100"
              : "text-slate-700"
          }
        >
          <ListItemButton>
            <ListItemIcon
              className={
                pathname.startsWith("/help")
                  ? "text-sky-600 bg-slate-100"
                  : "text-slate-700"
              }
            >
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help" />
            {isCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>
      </List>
      <Collapse in={isCollapse} timeout="auto" unmountOnExit>
        <List className="ml-4">
          {["Library", "Support", "FAQ"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              className={
                pathname.startsWith("/help")
                  ? "text-sky-600 bg-slate-100"
                  : "text-slate-700"
              }
            >
              <ListItemButton>
                <ListItemIcon
                  className={
                    pathname.startsWith("/help")
                      ? "text-sky-600 bg-slate-100"
                      : "text-slate-700"
                  }
                >
                  {index === 0 && <LibraryBooksIcon />}
                  {index === 1 && <RecommendIcon />}
                  {index === 2 && <LiveHelpIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#FFFFFF",
          color: "#2F2F2F",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <div className="flex flex-row justify-between w-full">
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
            <Button onClick={handleLogout} variant="outlined">
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <main>{children}</main>
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
  children: PropTypes.array,
};

export default Layout;
