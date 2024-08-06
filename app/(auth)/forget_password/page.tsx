"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";
import { resetPasswordMale } from "../../api/actions/user.action";
import { Box, Button, TextField } from "@mui/material";

const ForgetPassword = () => {
  const [btnEnable, setBtnEnable] = useState(true);
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(0);

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();

    if (!email) {
      toast.error("All fields are necessary!");
      return;
    }

    if (!validator.isEmail(email)) {
      toast.error("Invalid email!");
      return;
    }

    setBtnEnable(false);
    setTimer(60);
    try {
      resetPasswordMale(email);
      toast.success("Password reset link has been sent to your email");
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && !btnEnable) {
      setBtnEnable(true);
    }
    return () => clearInterval(interval);
  }, [timer, btnEnable]);

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
          To reset you password please enter you mail
        </p>
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
        {btnEnable ? (
          <Button
            variant="contained"
            sx={{ bgcolor: "green" }}
            type="submit"
            size="small"
          >
            Send Mail
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ bgcolor: "green" }}
            type="submit"
            disabled
            size="small"
          >
            {btnEnable ? "Send Mail" : `Wait for ${timer}s`}
          </Button>
        )}
      </Box>
    </div>
  );
};

export default ForgetPassword;
