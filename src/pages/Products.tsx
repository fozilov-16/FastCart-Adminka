import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { AppDispatch, RootState } from '../store/store';
import { api, DeleteProduct, GetProduct } from '../api/api';
import Skeleton from "@mui/material/Skeleton";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import EditProductDialog from '../component/EditProductDialog';



export default function Products() {
  const { products, isLoading } = useSelector((state: RootState) => state.todo)
  const dispatch = useDispatch<AppDispatch>()
  const [openDel, setOpenDel] = useState(false);
  const [idxDel, setIdxDel] = useState<number | null>(null)
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);



  const handleClickOpenDel = () => {
    setOpenDel(true);
  };

  const handleCloseDel = () => {
    setOpenDel(false);
  };

  const SkeletonRow = () => (
    <TableRow>
      <TableCell padding="checkbox">
        <Skeleton variant="rectangular" width={20} height={20} />
      </TableCell>

      <TableCell>
        <Skeleton variant="rectangular" width={48} height={48} />
      </TableCell>

      <TableCell>
        <Skeleton width={120} />
      </TableCell>

      <TableCell>
        <Skeleton width={80} />
      </TableCell>

      <TableCell>
        <Skeleton width={100} />
      </TableCell>

      <TableCell>
        <Skeleton width={60} />
      </TableCell>

      <TableCell>
        <Skeleton width={80} />
      </TableCell>
    </TableRow>
  );


  useEffect(() => {
    dispatch(GetProduct())
  }, [])

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Products</h2>

        <Link to="/addProducts">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm cursor-pointer">
            + Add order
          </button>
        </Link>
      </div>

      <TableContainer component={Paper} className="!shadow-none">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell className="font-semibold">Product</TableCell>
              <TableCell className="font-semibold">Name</TableCell>
              <TableCell className="font-semibold">Inventory</TableCell>
              <TableCell className="font-semibold">Category</TableCell>
              <TableCell className="font-semibold">Price</TableCell>
              <TableCell className="font-semibold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              : products.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <img
                      src={`${api}/images/${item.image}`}
                      alt={item.productName}
                      className="w-[48px] h-[48px] object-cover rounded-[4px]"
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#131523", fontWeight: "600" }}>
                    {item.productName}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.categoryName}</TableCell>
                  <TableCell>$ {item.price}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setSelectedProduct(item);
                        setOpenEdit(true);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="error" onClick={() => {
                      handleClickOpenDel()
                      setIdxDel(item.id)
                    }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openDel}
        onClose={handleCloseDel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete product"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDel} color='primary' variant='solid'>Cancel</Button>
          <Button onClick={() => {
            dispatch(DeleteProduct(idxDel))
            handleCloseDel()
          }} autoFocus variant='outlined' color='danger'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <EditProductDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        product={selectedProduct}
      />
    </div >
  )
}
