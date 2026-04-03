import SearchIcon from '@mui/icons-material/Search';

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBar({ value, onChange }: Props) {
    return (
        <div className="flex items-center w-full max-w-xs border border-gray-200 rounded-md bg-white px-3">
            <SearchIcon sx={{ fontSize: 20 }} className="text-gray-500 mr-2" />

            <input
                type="text"
                placeholder="ค้นหา..."
                value={value}
                onChange={onChange}
                className="w-full py-2 outline-none"
            />
        </div>
    );
}