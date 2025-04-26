import React from "react";

const jobs = [
  { title: "大工 / 木工", location: "埼玉県 川口市", rate: "¥18,000/日", tags: ["急募", "即日OK"] },
  { title: "解体作業員", location: "東京都 足立区", rate: "¥16,000/日", tags: ["交通費支給"] },
  { title: "足場施工", location: "千葉県 市川市", rate: "¥19,500/日", tags: ["未経験歓迎"] },
];

export default function JobSearchPage() {
  return (
    <div className="min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold text-center mb-6">希望に合った現場仕事を見つけよう！</h1>

      {/* 搜索条件区域 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <select className="border p-2 rounded">
          <option>職種を選択</option>
          <option>大工</option>
          <option>解体作業員</option>
        </select>
        <select className="border p-2 rounded">
          <option>地域を選択</option>
          <option>東京都</option>
          <option>埼玉県</option>
        </select>
        <input type="text" placeholder="最低日当 (¥)" className="border p-2 rounded" />
        <input type="date" className="border p-2 rounded" />
      </div>

      {/* 工作卡片列表 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map((job, i) => (
          <div key={i} className="border rounded-lg shadow p-4 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-blue-600 font-bold">{job.rate}</p>
            <div className="mt-2 space-x-2">
              {job.tags.map((tag, j) => (
                <span key={j} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              詳細を見る
            </button>
          </div>
        ))}
      </div>

      {/* 分页 / 其他 */}
      <div className="text-center mt-10">
        <button className="text-blue-600 underline">もっと見る</button>
      </div>
    </div>
  );
}
