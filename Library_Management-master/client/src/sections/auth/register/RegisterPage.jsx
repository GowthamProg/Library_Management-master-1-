import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import axios from "axios";
import toast from "react-hot-toast";
import { Container, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import Logo from "../../../components/logo";
import { RegisterForm } from "./index"; // Assume you have a RegisterForm component

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex"
  }
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const { user } = useAuth();

  // Redirect if user is already logged in
  if (user) {
    return <Navigate to={"/dashboard"} replace />;
  }

  const registerUser = (name, email, password,photoUrl,isAdmin) => {
    if (name === "" || email === "" || password === "") {
      toast.error("Please fill in all fields");
    } else {
      axios
        .post(`http://localhost:8080/api/auth/register`, { name, email, password,photoUrl, isAdmin  }, { withCredentials: false })
        .then((response) => {
          // Handle success
          if (response.status === 201) {
            toast.success(`Registration successful! Welcome, ${response.data.user.name}`);
            // Optionally redirect to login page after successful registration
          }
        })
        .catch((error) => {
          // Handle error
          toast.error(error.response.data.message);
          console.log(error);
        });
    }
  };

  return (
    <>
      <Helmet>
        <title> Register | Library</title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 }
          }}
        />

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" sx={{ color: "#666666", fontWeight: "600" }} textAlign="center" gutterBottom paddingBottom={0}>
              Library System
            </Typography>
            <Typography variant="h3" textAlign="center" gutterBottom paddingBottom={3}>
              Sign Up
            </Typography>

            <RegisterForm registerUser={registerUser} /> {/* Assume you have a RegisterForm component */}

          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
