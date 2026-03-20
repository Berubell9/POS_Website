// เเก้เพิ่มหมวดหมูเเละโต๊ะ
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CategoriesItemTable from "../components/Setting/CategoryItemTable/CategoryItemTable";
import TableItemTable from "../components/Setting/TableItemTable/TableItemTable";

export default function Setting() {
    return (
        <div className="flex h-full text-gray-800 relative">
            <div className="flex-1 p-4 pb-6 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="mr-4 p-2 items-center bg-pink-400 rounded-md text-white shadow-sm">
                        <SettingsOutlinedIcon sx={{ fontSize: 30 }} />
                    </div>
                    <p className="text-3xl font-extrabold">ตั้งค่า</p>
                </div>

                {/* Content */}
                <CategoriesItemTable/>
                <TableItemTable/>
            </div>
        </div>
    )
}