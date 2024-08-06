"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  ProductFilter,
  ProductSortOrder,
  ProductTableCell,
} from "../../../../components/Constants";
import { deleteProduct, getProduct } from "../../../api/actions/product.action";
import { createOrder } from "../../../api/actions/order.action";
import {
  Button,
  Card,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Delete, Edit, ShoppingCart } from "@mui/icons-material";

const AdminProducts = () => {
  const { data: session} = useSession();
  const route = useRouter();
  const [deletionTrigger, setDeletionTrigger] = useState(false);
  const [filter, setFilter] = useState<any>({});
  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const [productData, setProductData] = useState<any>();
  const [searchTerm, setSearchTerm] = useState("");
  const [sessionData, setSessionData] = useState<any>({});
  const [sortOrder, setSortOrder] = useState<any>("");
  
  const handlePageChange = (value:any) => {
    setPage(value);
  };
  
  const handleSearchChange = (event:any) => {
    setSearchTerm(event.target.value);
  };

  const onFilterChangeHandler = (value:any) => {
    setFilter(value);
  };

  const onSortOrderChangeHandler = (value:any) => {
    setSortOrder(value);
  };

  const removeFilter = () => {
    setSearchTerm("");
    setFilter({});
    setSortOrder("");
  };
  
  const deleteProductFun = async (id:any) => {
    try {
      await deleteProduct(id);
      toast.success("Successfully delete product");
      setDeletionTrigger(!deletionTrigger);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const createOrderFun = async (productId:any) => {
    try {
      const data = {
        productId: productId,
        userId: sessionData?.email,
        email: sessionData?.email,
        name: sessionData?.name,
        address: sessionData?.address,
        quantity: 1,
      };

      await createOrder(JSON.stringify(data));
      toast.success("Successfully create order");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };


  useEffect(() => {
    setSessionData(session?.user)
    const getData = async () => {
      try {
        const data = {
          search: searchTerm,
          sortField: filter?.value,
          sortOrder: sortOrder?.value,
          page: page,
          limit: limit,
        };
        const result = await getProduct(data);
        setProductData(JSON.parse(result));
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    getData();
  }, [session,searchTerm, filter, sortOrder, deletionTrigger,page]);

  return (
    <div className="bg-[#ddd] text-white rounded-md p-5">
      <Card sx={{ padding: "10px" }}>
        <div className=" flex justify-center items-center gap-3 flex-wrap md:flex-nowrap">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            size="small"
            label="Search"
            type="search"
            name="search"
            autoComplete="off"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <Select
            options={ProductFilter}
            value={filter}
            placeholder="filter"
            onChange={onFilterChangeHandler}
            className=" w-full"
          />

          <Select
            options={ProductSortOrder}
            value={sortOrder}
            placeholder="Sort"
            onChange={onSortOrderChangeHandler}
            className=" w-full"
          />
          <Button variant="contained" fullWidth onClick={removeFilter}>
            Clear filter
          </Button>
        </div>

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {ProductTableCell.map((cell, index) => (
                  <TableCell key={index} sx={{ fontWeight: "bold" }}>
                    {cell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {productData?.products?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row?.productName}</TableCell>
                  <TableCell align="left">{row?.productName}</TableCell>
                  <TableCell align="left">{row?.basePrice}</TableCell>
                  <TableCell align="left">{row?.discountPercentage}</TableCell>
                  <TableCell align="left">{row?.brand}</TableCell>
                  <TableCell align="left">{row?.category}</TableCell>
                  <TableCell align="left">{row?.subCategory}</TableCell>
                  <TableCell align="left">{row?.color}</TableCell>
                  <TableCell align="left">{row?.quantity}</TableCell>
                  <TableCell
                    onClick={() => route.push(`/admin/add_product/${row?._id}`)}
                    align="left"
                  >
                    <Edit sx={{ color: "#4a88dd", cursor: "pointer" }} />
                  </TableCell>
                  <TableCell
                    onClick={() => deleteProductFun(row?._id)}
                    align="right"
                  >
                    <Delete sx={{ color: "red", cursor: "pointer" }} />
                  </TableCell>
                  <TableCell
                    onClick={() => createOrderFun(row?._id)}
                    align="right"
                  >
                    <ShoppingCart sx={{ color: "green", cursor: "pointer" }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className=" flex justify-center items-center my-5">
            <Pagination count={productData?.totalPages} page={page} onChange={handlePageChange} />
          </div>
        </TableContainer>
      </Card>
    </div>
  );
};

export default AdminProducts;
