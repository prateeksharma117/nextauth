import { useState } from "react";
import moment from "moment";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
} from "@mui/material";

const OrdersDialogBox = ({ setOnFocus, data }: any) => {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("sm");
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setOnFocus(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <div className=" w-full h-full">
            <Box onSubmit={handleSubmit} component="form" noValidate>
              <h1 className=" text-4xl font-bold">Product Information</h1>
              <p>This section is designed to see your Order Information.</p>

              <div className=" my-5 space-y-3">
                <div className=" flex items-center gap-3">
                  <h1 className=" font-semibold text-sm md:text-lg">Name: </h1>
                  <p className=" text-gray-400 text-sm md:text-lg">
                    {data?.productName}
                  </p>
                </div>

                <div className=" flex items-center gap-3">
                  <h1 className=" font-semibold text-sm md:text-lg">
                    Description:{" "}
                  </h1>
                  <p className=" text-gray-400 text-sm md:text-lg">
                    {data?.productDescription}
                  </p>
                </div>

                <div className=" flex items-center gap-3">
                  <h1 className=" font-semibold text-sm md:text-lg">Price: </h1>
                  <p className=" text-gray-400 text-sm md:text-lg">
                    {data?.basePrice}
                  </p>
                </div>

                <div className=" flex items-center gap-3">
                  <h1 className=" font-semibold text-sm md:text-lg">Brand: </h1>
                  <p className=" text-gray-400 text-sm md:text-lg">
                    {data?.brand}
                  </p>
                </div>

                <div className=" flex items-center gap-3">
                  <h1 className=" font-semibold text-sm md:text-lg">
                    Category:{" "}
                  </h1>
                  <p className=" text-gray-400 text-sm md:text-lg">
                    {data?.category}
                  </p>
                </div>

                <div className=" flex items-center gap-3">
                  <h1 className=" font-semibold text-sm md:text-lg">Color: </h1>
                  <p className=" text-gray-400 text-sm md:text-lg">
                    {data?.color}
                  </p>
                </div>

                <div className=" flex items-center gap-3">
                  <h1 className=" font-semibold text-sm md:text-lg">
                    Discount:{" "}
                  </h1>
                  <p className=" text-gray-400 text-sm md:text-lg">
                    {data?.discountPercentage}
                  </p>
                </div>

                <div className=" flex items-center gap-3">
                  <h1 className=" font-semibold text-sm md:text-lg">
                    Quantity:{" "}
                  </h1>
                  <p className=" text-gray-400 text-sm md:text-lg">
                    {data?.quantity}
                  </p>
                </div>

                <div className=" flex items-center gap-3">
                  <h1 className=" font-semibold text-sm md:text-lg">Size: </h1>
                  <p className=" text-gray-400 text-sm md:text-lg">
                    {data?.size}
                  </p>
                </div>

                <div className=" flex items-center gap-3">
                  <h1 className=" font-semibold text-sm md:text-lg">
                    SubCategory:{" "}
                  </h1>
                  <p className=" text-gray-400 text-sm md:text-lg">
                    {data?.subCategory}
                  </p>
                </div>

                <div className=" flex items-center gap-3">
                  <h1 className=" font-semibold text-sm md:text-lg">Tag: </h1>
                  <p className=" text-gray-400 text-sm md:text-lg">
                    {data?.tags}
                  </p>
                </div>

                <div className="gap-3">
                  <h1 className="font-semibold text-sm md:text-lg">
                    Detail:
                  </h1>
                  {data?.details?.map((detail: { text: any; }, index: any) => (
                    <p key={index} className=" text-gray-400 text-sm md:text-lg mt-2">
                      {`${index+1}. ${detail?.text}`}
                    </p>
                  ))}
                </div>

                <div className=" flex items-center gap-3">
                  <h1 className=" font-semibold text-sm md:text-lg">CreatedAt: </h1>
                  <p className=" text-gray-400 text-sm md:text-lg">
                    {moment(data?.createdAt).format("DD-MM-YYYY")}
                  </p>
                </div>

                <div className=" flex items-center gap-3">
                  <h1 className=" font-semibold text-sm md:text-lg">UpdatedAt: </h1>
                  <p className=" text-gray-400 text-sm md:text-lg">
                    {moment(data?.updatedAt).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrdersDialogBox;
