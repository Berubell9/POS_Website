type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    
    if (totalPages < 1) return null;

    return (
        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-4">
            {/* ปุ่มก่อนหน้า */}
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-md border border-gray-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
            >
                ก่อนหน้า
            </button>

            {/* ปุ่มเลขหน้า */}
            <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`h-9 w-9 rounded-md text-sm font-medium transition ${currentPage === page
                                    ? "bg-pink-400 text-white"
                                    : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>
            
            {/* ปุ่มถัดไป */}
            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded-md border border-gray-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
            >
                ถัดไป
            </button>
        </div>
    );
}