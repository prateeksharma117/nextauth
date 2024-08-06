"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import validator from "validator";
import { resetPassword } from "../../../api/actions/user.action";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ResetPassword = () => {
  const { id: token } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();

    if (!(repeatPassword && password)) {
      toast.error("All fields are necessary!");
      return;
    }

    if (password !== repeatPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!validator.isStrongPassword(password)) {
      toast.error("Strong Password is Required!");
      return;
    }

    try {
      resetPassword({ token, password });
      toast.success("Your password is successfully changed");
      router.replace("/sign-in");
    } catch (error: any) {
      toast.error("Unusual error occur!");
    }
  };

  return (
    <div className=" h-screen flex justify-center items-center p-2">
      <Box
        component="form"
        noValidate
        onSubmit={onSubmitHandler}
        sx={{ mt: 1, display: "flex", flexDirection: "column" }}
      >
        <h1 className=" text-3xl font-bold my-5 text-center">Reset Password</h1>
        <p className=" text-gray-400 my-2 text-center">
          reset you password please enter strong password
        </p>
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
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
        <Button
          variant="contained"
          type="submit"
          sx={{ bgcolor: "green" }}
          size="small"
        >
          Change Password
        </Button>
      </Box>
    </div>
  );
};

export default ResetPassword;
