import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import {
    EditProduct,
    GetBrend,
    GetCategory,
    GetColor,
    GetProduct,
} from "../api/api";

interface Props {
    open: boolean;
    onClose: () => void;
    product: any;
}

export default function EditProductDialog({ open, onClose, product }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, brend, color } = useSelector(
        (state: RootState) => state.todo
    );

    const [form, setForm] = useState({
        ProductName: "",
        Description: "",
        Quantity: 0,
        Code: "",
        Price: 0,
        HasDiscount: false,
        DiscountPrice: 0,
        Weight: "",
        Size: "",
    });

    const [selectedCategory, setSelectedCategory] = useState<number | "">("");
    const [selectedBrand, setSelectedBrand] = useState<number | "">("");
    const [selectedColor, setSelectedColor] = useState<number | "">("");
    useEffect(() => {
        if (open) {
            if (!categories.length) dispatch(GetCategory());
            if (!brend.length) dispatch(GetBrend());
            if (!color.length) dispatch(GetColor());
        }
    }, [open]);
    useEffect(() => {
        if (product) {
            setForm({
                ProductName: product.productName,
                Description: product.description,
                Quantity: product.quantity,
                Code: product.code,
                Price: product.price,
                HasDiscount: product.hasDiscount,
                DiscountPrice: product.discountPrice ?? 0,
                Weight: product.weight ?? "",
                Size: product.size ?? "",
            });

            setSelectedCategory(product.subCategoryId);
            setSelectedBrand(product.brandId);
            setSelectedColor(product.colorId);
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!product || !selectedCategory || !selectedBrand || !selectedColor) return;

        dispatch(
            EditProduct({
                Id: product.id,
                ProductName: form.ProductName,
                Description: form.Description,
                Quantity: Number(form.Quantity),
                Code: form.Code,
                Price: Number(form.Price),
                BrandId: selectedBrand,
                ColorId: selectedColor,
                SubCategoryId: selectedCategory,
                HasDiscount: form.HasDiscount,
                DiscountPrice: Number(form.DiscountPrice),
                Weight: form.Weight,
                Size: form.Size,
            })
        ).then(() => {
            dispatch(GetProduct());
            onClose();
        });
    };

    if (!product) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: 4,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                    textAlign: "center",
                },
            }}
        >
            <DialogTitle sx={{ fontWeight: 600, fontSize: 20, pb: 1 }}>
                Edit product
            </DialogTitle>

            <DialogContent dividers sx={{ px: 4, py: 3 }}>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                >
                    <TextField
                        label="Product name"
                        name="ProductName"
                        value={form.ProductName}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Code"
                        name="Code"
                        value={form.Code}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Description"
                        name="Description"
                        value={form.Description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                    />

                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            label="Category"
                            disabled={!categories.length}
                            onChange={(e) => setSelectedCategory(Number(e.target.value))}
                        >
                            {categories.flatMap((cat) =>
                                cat.subCategories.map((sub: any) => (
                                    <MenuItem key={sub.id} value={sub.id}>
                                        {sub.subCategoryName}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Brand</InputLabel>
                        <Select
                            value={selectedBrand}
                            label="Brand"
                            disabled={!brend.length}
                            onChange={(e) => setSelectedBrand(Number(e.target.value))}
                        >
                            {brend.map((b: any) => (
                                <MenuItem key={b.id} value={b.id}>
                                    {b.brandName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Color</InputLabel>
                        <Select
                            value={selectedColor}
                            label="Color"
                            disabled={!color.length}
                            onChange={(e) => setSelectedColor(Number(e.target.value))}
                        >
                            {color.map((c: any) => (
                                <MenuItem key={c.id} value={c.id}>
                                    {c.colorName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Quantity"
                        type="number"
                        name="Quantity"
                        value={form.Quantity}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Price"
                        type="number"
                        name="Price"
                        value={form.Price}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Discount price"
                        type="number"
                        name="DiscountPrice"
                        value={form.DiscountPrice}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Weight"
                        name="Weight"
                        value={form.Weight}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        label="Size"
                        name="Size"
                        value={form.Size}
                        onChange={handleChange}
                        fullWidth
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 4, py: 2, justifyContent: "center" }}>
                <Button onClick={onClose} color="inherit" sx={{ textTransform: "none" }}>
                    Cancel
                </Button>

                <Button
                    onClick={handleSave}
                    variant="contained"
                    sx={{ textTransform: "none", px: 4, borderRadius: 2 }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
