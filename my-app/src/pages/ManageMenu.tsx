import AddMenuButton from "../components/ManageMenu/AddMenuButton";
import ProductItemTable from "../components/ManageMenu/ProductItemTable";
import SearchBar from "../components/ManageMenu/SearchBar";
import Tabs from "../components/ManageMenu/Tabs";

export default function ManageMenu() {
    return (
        <div className="h-full p-6 pb-6 text-gray-800">
            {/* Header */}
            <div className="flex justify-between">
                <p className="text-3xl font-extrabold mb-5">จัดการเมนู</p>
                <AddMenuButton/>
            </div>

            {/* Content */}
            <SearchBar/>
            <Tabs/>
            <ProductItemTable/>

        </div>
    )
}