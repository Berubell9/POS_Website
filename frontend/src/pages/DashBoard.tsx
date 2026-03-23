import { useState } from "react";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import StatusCard from "../components/Dashboard/StatusCard";

export default function DashBoard() {
    return (
        <div className="flex h-full text-gray-800 relative">
            <div className="flex-1 p-4 pb-6 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="mr-4 p-2 items-center bg-pink-400 rounded-md text-white shadow-sm">
                        <AssessmentOutlinedIcon sx={{ fontSize: 30 }} />
                    </div>
                    <p className="text-3xl font-extrabold">ยอดขาย</p>
                </div>
                
                {/* Content */}
                <StatusCard/>
                {/* ยอดขายรายวัน
                ยอกขายรายเดือน
                เมนูขายดี 
                
                */}
            </div>
        </div >
    )
}