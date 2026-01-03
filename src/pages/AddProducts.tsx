import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AddProduct, GetBrend, GetCategory, GetColor } from "../api/api";
import type { AppDispatch, RootState } from "../store/store";

export default function AddProducts() {
    const { categories, brend, color, isLoading } = useSelector((state: RootState) => state.todo)
    const dispatch = useDispatch<AppDispatch>()
    const [productName, setProductName] = useState("");
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [quantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [discountPrice, setDiscountPrice] = useState<number>(0);
    const [hasDiscount, setHasDiscount] = useState(false);
    const [weight] = useState("");
    const [size] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
    const [selectedColor, setSelectedColor] = useState<number | null>(null);
    const [images, setImages] = useState<File[]>([]);
    const navigate = useNavigate()

    const colorMap: Record<string, string> = {
        pink: "#ec4899",
        red: "#ef4444",
        blue: "#3b82f6",
        green: "#22c55e",
        yellow: "#eab308",
        black: "#000000",
        white: "#ffffff",
        purple: "#a855f7",
    };

    const handleSave = async () => {
        if (!productName || !code || !selectedCategory || !selectedBrand || !selectedColor) {
            alert("Please fill all required fields");
            return;
        }

        try {
            await dispatch(
                AddProduct({
                    ProductName: productName,
                    Code: code,
                    Description: description,
                    Quantity: quantity,
                    Price: price,
                    HasDiscount: hasDiscount,
                    DiscountPrice: discountPrice,
                    Weight: weight,
                    Size: size,
                    SubCategoryId: selectedCategory,
                    BrandId: selectedBrand,
                    ColorId: selectedColor,
                    Images: images,
                })
            ).unwrap();
            navigate("/products");
        } catch (err) {
            alert("Ошибка при добавлении продукта: " + err);
        }
    };

    useEffect(() => {
        dispatch(GetCategory())
        dispatch(GetBrend())
        dispatch(GetColor())
    }, [])
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold">Products / Add new</h1>
                <div className="flex gap-2">
                    <Link to="/products">
                        <button className="px-4 py-2 border rounded-md text-sm cursor-pointer">
                            Cancel
                        </button>
                    </Link>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm cursor-pointer flex items-center justify-center gap-2"
                        onClick={handleSave}
                        disabled={isLoading}
                    >
                        {isLoading && <span className="loader-border animate-spin rounded-full w-4 h-4 border-2 border-white border-t-transparent"></span>}
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h2 className="font-medium mb-4">Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                placeholder="Product name"
                                className="border rounded-md px-3 py-2 w-full"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                            <input
                                placeholder="Code"
                                className="border rounded-md px-3 py-2 w-full"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                        <textarea
                            placeholder="Description"
                            className="border rounded-md px-3 py-2 w-full h-28 mb-4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select
                                className="border rounded-md px-3 py-2"
                                value={selectedCategory || ""}
                                onChange={(e) => setSelectedCategory(Number(e.target.value))}
                            >
                                <option value="">Select Category</option>
                                {categories.flatMap(cat =>
                                    cat.subCategories.map(sub => (
                                        <option key={sub.id} value={sub.id}>
                                            {sub.subCategoryName}
                                        </option>
                                    ))
                                )}
                            </select>

                            <select
                                className="border rounded-md px-3 py-2"
                                value={selectedBrand || ""}
                                onChange={(e) => setSelectedBrand(Number(e.target.value))}
                            >
                                <option value="">Select Brand</option>
                                {brend?.map(b => (
                                    <option key={b.id} value={b.id}>{b.brandName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h2 className="font-medium mb-4">Price</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <input
                                type="number"
                                placeholder="Product price"
                                className="border rounded-md px-3 py-2"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                            <input
                                type="number"
                                placeholder="Discount"
                                className="border rounded-md px-3 py-2"
                                value={discountPrice}
                                onChange={(e) => setDiscountPrice(Number(e.target.value))}
                            />
                            <label className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={hasDiscount}
                                    onChange={(e) => setHasDiscount(e.target.checked)}
                                />
                                Has Discount
                            </label>
                        </div>
                        <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" />
                            Add tax for this product
                        </label>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-medium">Different Options</h2>
                            <input type="checkbox" defaultChecked />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm mb-1">Size</p>
                                <div className="flex gap-2 flex-wrap">
                                    {["S", "M", "L", "XL"].map((s) => (
                                        <span
                                            key={s}
                                            className="px-3 py-1 border rounded-md text-sm cursor-pointer"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm mb-1">Weight</p>
                                <div className="flex gap-2 flex-wrap">
                                    {["10", "20", "30", "40"].map((w) => (
                                        <span
                                            key={w}
                                            className="px-3 py-1 border rounded-md text-sm cursor-pointer"
                                        >
                                            {w}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button className="text-blue-600 text-sm">
                                + Add more
                            </button>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="font-medium">Colour</h2>
                            <button className="text-blue-600 text-sm">+ Create new</button>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {color?.map((col) => (
                                <div
                                    key={col.id}
                                    title={col.colorName}
                                    className="w-6 h-6 rounded-full border cursor-pointer"
                                    style={{ backgroundColor: colorMap[col.colorName.toLowerCase()] || "#ccc" }}
                                    onClick={() => setSelectedColor(col.id)}
                                />
                            ))}{color?.map((col) => (
                                <div
                                    key={col.id}
                                    title={col.colorName}
                                    className="w-6 h-6 rounded-full border cursor-pointer"
                                    style={{ backgroundColor: colorMap[col.colorName.toLowerCase()] || "#ccc" }}
                                    onClick={() => setSelectedColor(col.id)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h2 className="font-medium mb-3">Tags</h2>
                        <input
                            placeholder="Tags name"
                            className="border rounded-md px-3 py-2 w-full mb-3"
                        />
                        <div className="flex gap-2 flex-wrap">
                            {["T-Shirt", "Men Clothes", "Summer Collection"].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-gray-100 rounded-md text-sm"
                                >
                                    {tag} ✕
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h2 className="font-medium mb-3">Images</h2>
                        <label
                            htmlFor="upload"
                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition text-center"
                        >
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 mb-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-gray-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9M8 12l4-4 4 4M16 6a4 4 0 00-8 0"
                                    />
                                </svg>
                            </div>

                            <p className="text-sm font-medium text-gray-700">
                                <span className="text-blue-600">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                SVG, PNG, JPG or GIF (max. 900×400)
                            </p>

                            <input
                                id="upload"
                                type="file"
                                className="hidden"
                                multiple
                                accept="image/png,image/jpeg,image/svg+xml,image/gif"
                                onChange={(e) => {
                                    if (e.target.files) {
                                        setImages(Array.from(e.target.files));
                                    }
                                }}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
