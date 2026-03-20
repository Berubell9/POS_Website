import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
    return (
        <div className="flex w-full border border-gray-200 rounded-md bg-white items-center shadow-sm">
            {/* ค้นหาออเดอร์ */}
            <SearchIcon sx={{ fontSize: 20 }} className='ml-3 text-gray-500' />
            <input
                type="text"
                placeholder="ค้นหาออเดอร์"
                className="pl-2 p-3 text-md w-full h-full outline-none focus:outline-none focus:ring-0"
            />        
        </div>
    )
}