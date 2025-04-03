import React from "react";
import { useAuth } from "../../context/AuthContext"; // Điều chỉnh đường dẫn cho phù hợp

const RightPanel = () => {
  const { user } = useAuth();

  return (
    <aside className="w-64 p-4 bg-gray-100">
      <div className="p-4 mb-4 bg-white shadow rounded">
        <h3 className="mb-2 text-lg font-bold">Bảng tin</h3>
        <ul className="space-y-2 text-red-600">
          <li>📢 Discord Hoidap247</li>
          <li>📚 Đại sứ Văn Hóa Đọc</li>
          <li>✉️ Gửi đề về Hoidap247</li>
        </ul>
      </div>
      {user && (
        <button className="w-full p-4 text-white bg-yellow-500 rounded-full hover:bg-yellow-600" >
          <a href="/addQuestion">Đặt câu hỏi +</a>
        </button>
      )}
    </aside>
  );
};

export default RightPanel;