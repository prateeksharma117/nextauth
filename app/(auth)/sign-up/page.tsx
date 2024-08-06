"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import validator from "validator";
import { findUserByEmail, registerUser } from "../../api/actions/user.action";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUp = () => {
  const router = useRouter();
  const [btnEnable, setBtnEnable] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    try {
      if (!(name && email && password && repeatPassword)) {
        toast.error("All fields are necessary!");
        return;
      }
      if (password !== repeatPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      if (!validator.isEmail(email)) {
        toast.error("Invalid email!");
        return;
      }

      if (!validator.isStrongPassword(password)) {
        toast.error("Strong Password is Required!");
        return;
      }

      setBtnEnable(false);
      const data = {
        name: name,
        email: email,
        password: password,
      };
      const user = await findUserByEmail({ email });

      if (user?.user?._id) {
        toast.error("User already exists!");
        return;
      }
      await registerUser(data);
      toast.success("Your account is successfully created");
      router.push("/admin/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    }finally{
      setBtnEnable(true);
    }
  };

  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="logo"
              src="/icons/logo.png"
              sx={{ m: 1, bgcolor: "secondary.main" }}
            ></Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={onSubmitHandler}
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="full_name"
                autoFocus
              />

              <TextField
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <TextField
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                onChange={(e) => setRepeatPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="repeat_password"
                label="Repeat Password"
                type={showPassword ? "text" : "password"}
                id="repeat_password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
             {
              btnEnable? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled
                >
                  Sign Up
                </Button>
              )
             }
              <Grid container>
                <Grid item>
                  <Link href="/sign-in">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
