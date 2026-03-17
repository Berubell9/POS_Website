import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import supabase from "../../utils/supabase";

type Product = {
    id: number;
    name: string;
    image: string;
};

type DeleteMenuButtonProps = {
    product: Product;
    onDeleted?: () => void | Promise<void>;
};

export default function DeleteMenuButton({
    product,
    onDeleted,
}: DeleteMenuButtonProps) {
    const handleDelete = async () => {
        // เเจ้งเตือนถามก่อนลบ
        const confirmed = window.confirm(`ต้องการลบเมนู "${product.name}" ใช่หรือไม่`);
        if (!confirmed) return;
        
        try {
            // ดึงข้อมูลจาก Products
            const { error } = await supabase
                .from("Products")
                .delete()
                .eq("id", product.id);

            if (error) {
                console.error("Delete product error:", error);
                alert("ลบเมนูไม่สำเร็จ");
                return;
            }

            if (product.image) {
                const marker = "/storage/v1/object/public/product-images/";
                const index = product.image.indexOf(marker);

                if (index !== -1) {
                    const filePath = product.image.substring(index + marker.length);

                    const { error: storageError } = await supabase.storage
                        .from("product-images")
                        .remove([filePath]);

                    if (storageError) {
                        console.error("Delete image error:", storageError);
                    }
                }
            }

            alert("ลบเมนูสำเร็จ");
            onDeleted?.();
        } catch (error) {
            console.error("Unexpected delete error:", error);
            alert("เกิดข้อผิดพลาด");
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="flex items-center rounded-md bg-red-500 px-3 py-2 text-white shadow-sm transition hover:bg-red-600"
        >
            <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
            <p className="ml-1 hidden sm:inline">ลบ</p>
        </button>
    );
}