"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import validator from "validator";
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

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [btnEnable, setBtnEnable] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();

    if (!(email && password)) {
      toast.error("All fields are necessary!");
      return;
    }

    if (!validator.isEmail(email)) {
      toast.error("Invalid email!");
      return;
    }

    setBtnEnable(false);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid credentials");
        return;
      }
      router.push("/two_factor_auth");
      toast.success("Account successfully login");
    } catch (error) {
      toast.error("Unusual error occur!");
    } finally {
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
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={onSubmitHandler}
              sx={{ mt: 1 }}
            >
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

              <div className=" flex justify-between items-center flex-wrap">
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Link href={"/forget_password"}>
                  <p className=" text-blue-700 cursor-pointer">
                    Forgot Password?
                  </p>
                </Link>
              </div>
              {btnEnable ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  disabled
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              )}
              <Grid container>
                <Grid item>
                  <Link className=" mt-[50px]" href="/sign-up">
                    {"Don't have an account? Sign Up"}
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

export default SignIn;
