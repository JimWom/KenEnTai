import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Button = ({ children, className, onClick }) => (
  <button className={`px-6 py-3 rounded font-semibold transition-transform duration-300 hover:scale-105 ${className}`} onClick={onClick}>
    {children}
  </button>
);

const Card = ({ children, className }) => (
  <div className={`bg-white rounded shadow ${className}`}>{children}</div>
);
const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-4 md:p-8">
      {/* Logo */}
      <div className="absolute top-4 left-6 flex items-center space-x-2">
        <img src="/icons/kenentai_logo.png" alt="建援隊ロゴ" className="w-14 h-14 rounded-full shadow-lg object-cover" />
        <span className="text-xl font-bold tracking-wide">建援隊</span>
      </div>

      {/* Hero Section with CTA Buttons */}
      <div className="max-w-6xl mx-auto text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            建設現場の人手不足を、AIで支援する
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            <span className="text-white font-extrabold tracking-wider text-xl">建援隊</span> - あなたの現場を支えるスマートパートナー
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              className="text-lg text-white border-2 border-white hover:bg-white hover:text-black"
              onClick={() => navigate("/job-search")}
            >
              仕事を探す
            </Button>
            <Button className="text-lg text-white border-2 border-white hover:bg-white hover:text-black">
              人手を探す
            </Button>
            <Button className="text-lg text-white border-2 border-white hover:bg-white hover:text-black bg-white/10">
              AIに相談する
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Job Highlight Section */}
      <div className="max-w-6xl mx-auto py-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          最新の現場ニーズ（毎日更新）
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "大工 / 木工", location: "埼玉県 川口市", rate: "¥18,000/日" },
            { title: "解体作業員", location: "東京都 足立区", rate: "¥16,000/日" },
            { title: "足場施工", location: "千葉県 市川市", rate: "¥19,500/日" }
          ].map((job, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg overflow-hidden"
            >
              <Card className="bg-gray-200 text-black shadow-md transition-all duration-300 hover:shadow-xl hover:bg-white cursor-pointer">
                <CardContent className="p-4 space-y-2">
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="text-sm text-gray-700">{job.location}</p>
                  <p className="text-base font-semibold text-blue-600">{job.rate}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-6 space-y-4">
          <Button className="text-white border border-white hover:bg-white hover:text-black">
            もっと見る（すべての仕事を見る）
          </Button>
          <div>
            <p className="text-sm text-gray-400 mb-2">企業の方はこちら</p>
            <Button className="text-white border border-white bg-white/5 hover:bg-white hover:text-black">
              求人情報を掲載する（無料）
            </Button>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center mt-16">
        <p className="mb-4 text-gray-400">
          <span className="text-white font-bold">建援隊</span>に参加して、未来の現場を変えましょう。
        </p>
        <Button className="px-6 py-3 text-lg text-white border-2 border-white hover:bg-white hover:text-black">
          今すぐ登録する
        </Button>
      </div>
    </div>
  );
}
