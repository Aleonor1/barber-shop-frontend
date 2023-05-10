import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import { useContext } from "react";
import AuthContext from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../Assets/za-barbershop-background-image2-logo.png";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const { state, logout } = useContext(AuthContext);
  const { isAuthenticated, user } = state;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleHomeButton = () => {
    navigate("/");
  };
  const handleTestimonialsButton = () => {
    navigate("/");
  };
  const handleAboutButton = () => {
    navigate("/");
  };
  const handleAppointmentButton = () => {
    navigate("/appointment");
  };
  const handleLogInButton = () => {
    navigate("/login");
  };
  const handleLogOutOnClick = () => {
    logout();
  };
  const handleProfileOnClick = () => {
    navigate("/profile");
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#FE9E0E" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className="home-bannerImage-container">
            <img src={Logo} alt="" />
          </div>

          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Barbershop
          </Typography>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Barbershop
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="home"
              onClick={handleHomeButton}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              key="about"
              onClick={handleAboutButton}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About
            </Button>
            <Button
              key="appointment"
              onClick={handleAppointmentButton}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Appointment
            </Button>
            <Button
              key="testimonials"
              onClick={handleTestimonialsButton}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Testimonial
            </Button>
            <Button
              key="testimonials"
              onClick={handleTestimonialsButton}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Services
            </Button>
            {!isAuthenticated && (
              <Button
                key="appointment"
                onClick={handleLogInButton}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Log in
              </Button>
            )}
          </Box>

          {isAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.userName}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="profile" onClick={handleProfileOnClick}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>

                <MenuItem key="logout" onClick={handleLogOutOnClick}>
                  <Typography textAlign="center">Log out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
