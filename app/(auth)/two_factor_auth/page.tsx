"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { twoFactorKey, verifyTwoFactor } from "../../api/actions/user.twoFactorAuth";
import { Box, Button, TextField } from "@mui/material";

const TwoFactorAuth = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [btnEnable, setBtnEnable] = useState(true);
  const [verifyKey, setVerifyKey] = useState("");
  
  const sendVerificationCode = async () => {
    try {
      const data = {
        email: session?.user?.email,
      };
      await twoFactorKey(data);
      toast.success("Check your email for verification code");
    } catch (error) {
      toast.error("unable to send verification code");
    }
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();

    try {
      const data = {
        email: session?.user?.email,
        token: verifyKey,
      };

      const isVerify = await verifyTwoFactor(data);
      if (isVerify.status) {
        router.replace("/admin/dashboard");
      } else {
        toast.error("Wrong verification code");
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <div className=" h-screen flex justify-center items-center p-2">
      <Box
        component="form"
        noValidate
        onSubmit={onSubmitHandler}
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className=" text-3xl font-bold my-5 text-center">
          Email Verification
        </h1>
        <p className=" text-gray-400 my-2 text-center">
          Click the link to get your{" "}
          <span
            onClick={() => sendVerificationCode()}
            className=" text-blue-600 cursor-pointer"
          >
            verification code
          </span>
        </p>
        <TextField
          onChange={(e) => setVerifyKey(e.target.value)}
          margin="normal"
          required
          type="number"
          fullWidth
          id="verification_key"
          label="Verification Key"
          name="verification key"
          autoFocus
        />

        {btnEnable ? (
          <Button
            variant="contained"
            fullWidth
            sx={{ bgcolor: "green" }}
            type="submit"
            size="small"
          >
            verify
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ bgcolor: "green" }}
            type="submit"
            fullWidth
            disabled
            size="small"
          >
            verify
          </Button>
        )}
      </Box>
    </div>
  );
};
export default TwoFactorAuth;
