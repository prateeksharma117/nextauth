import { useState } from "react";
import moment from "moment";
import OrdersDialogBox from "../../../../components/shared/OrdersDialogBox";
import { TableCell, TableRow } from "@mui/material";

const OrderRow = ({ row }: any) => {
  const [IsorderDialogOpen, setOrderDialogOpen] = useState(false);

  return (
    <>
      {IsorderDialogOpen && (
        <OrdersDialogBox
          setOnFocus={setOrderDialogOpen}
          data={row?.productId}
        />
      )}
      <TableRow
        onClick={() => setOrderDialogOpen(true)}
        sx={{
          "&:last-child td, &:last-child th": {
            border: 0,
            cursor: "pointer",
          },
        }}
      >
        <TableCell align="left">{row?.name}</TableCell>
        <TableCell align="left">{row?.email}</TableCell>
        <TableCell align="left">{row?.address}</TableCell>
        <TableCell align="left">{row?.productId?._id}</TableCell>
        <TableCell align="left">{row?.quantity}</TableCell>
        <TableCell align="left">
          {moment(row?.createdAt).format("DD-MM-YYYY")}
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderRow;
