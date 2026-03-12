import { useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

export default function EditMenuButton() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            {/* ปุ่มเปิด modal */}
            <button
                onClick={() => setOpen(true)}
                className="flex items-center px-3 py-2 rounded-md bg-yellow-400 text-white shadow-sm text-shadow-sm hover:bg-yellow-500 transition">
                <EditOutlinedIcon sx={{ fontSize: 18 }}/>
                <p className="ml-1 hidden sm:inline">แก้ไข</p>
            </button>

            {/* modal */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
                    onClick={() => setOpen(false)}>
                    <div
                        className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Hearder */}
                        <div className="flex items-center">
                            <EditNoteOutlinedIcon sx={{ fontSize: 24 }}/>
                            <p className="ml-1 text-xl font-extrabold">แก้ไขเมนู</p>
                        </div>

                        {/* Form */}
                        <div className="space-y-4 mt-5">
                            <label>รูปภาพ</label>
                            <input
                                type="file"
                                className="mt-1 text-gray-400 w-full border border-gray-200 rounded-md p-2"
                            />

                            <label>ชื่อเมนู</label>
                            <input
                                type="text"
                                placeholder="ระบุชื่อเมนู"
                                className="mt-1 w-full border border-gray-200 rounded-md p-2 outline-none"
                            />

                            <label>หมวดหมู่</label>
                            <select className="mt-1 text-gray-400 w-full border border-gray-200 rounded-md p-2 h-11 outline-none">
                                <option>เลือกหมวดหมู่</option>
                                <option>แป้งเครป</option>
                                <option>ท็อปปิ้ง</option>
                                <option>ซอส</option>
                            </select>

                            <label>ราคา</label>
                            <input
                                type="text"
                                placeholder="ระบุราคา"
                                className="mt-1 w-full border border-gray-200 rounded-md p-2 outline-none"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setOpen(false)}
                                className="shadow-sm px-4 py-2 rounded-md text-red-500 bg-red-50 border border-red-300 hover:bg-red-100 transition"
                            >
                                ยกเลิก
                            </button>
                            <button className="shadow-sm px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition">
                                บันทึก
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}