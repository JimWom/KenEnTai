import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Annotation } from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';

const geoUrl = "/custom.geo.json";

const countryNameMap = {
  Japan: "日本",
  Philippines: "フィリピン",
  China: "中国",
  SouthKorea: "韓国",
  NorthKorea: "北朝鮮",
  Thailand: "タイ",
  Vietnam: "ベトナム",
  India: "インド",
  Indonesia: "インドネシア",
  Malaysia: "マレーシア",
  Myanmar: "ミャンマー",
 Bangladesh: "バングラデシュ",
 Nepal: "ネパール",
 Bhutan: "ブータン",
 Cambodia: "カンボジア",
 Laos: "ラオス",
 SriLanka: "スリランカ",
};

const countryFlagMap = {
  Japan: "/flags/jp.png",
  China: "/flags/cn.png",
  SouthKorea: "/flags/kr.png",
  NorthKorea: "/flags/kp.png",
  Philippines: "/flags/ph.png",
  Vietnam: "/flags/vn.png",
  Thailand: "/flags/th.png",
  India: "/flags/in.png",
  Indonesia: "/flags/id.png",
  Malaysia: "/flags/my.png",
  Myanmar: "",
  Bangladesh: "/flags/bd.png",
};


export default function JobSeekerPage() {
  const [showAssistant, setShowAssistant] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { role: 'AI', content: '我是建援隊AI助手，请问需要什么帮助？' },
  ]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const toggleAssistant = () => setShowAssistant(!showAssistant);
  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMessage = { role: '你', content: inputValue };
    const aiEcho = { role: 'AI', content: '我收到你的话了：' + inputValue };
    setMessages([...messages, userMessage, aiEcho]);
    setInputValue('');
  };

  const startVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'ja-JP';
    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      const userMessage = { role: '你', content: transcript };
      const echoMessage = { role: 'AI', content: '你刚刚说了：' + transcript };
      setMessages((prev) => [...prev, userMessage, echoMessage]);
    };
    recognition.start();
  };

  const workers = [
    { role: '木工 · 大阪', desc: '5年经验，可立即上岗', country: 'Japan' },
    { role: '电工 · 名古屋', desc: '接受长期项目', country: 'Japan' },
    { role: '焊工 · 横滨', desc: '配合度高，有执照', country: 'Japan' },
    { role: '电焊工 · 马尼拉', desc: '英语熟练，菲律宾技术学校毕业', country: 'Philippines' },
  ];

  const agencies = [
    { name: '东京 XX中介公司', desc: '专营装潢、电气，评价4.9⭐️', country: 'Japan' },
    { name: '大阪 YY人力资源', desc: '可介绍团队，响应迅速', country: 'Japan' },
    { name: '马尼拉 ABC中介', desc: '丰富海外派遣经验', country: 'Philippines' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-950 text-white p-4">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">建援隊 · 求人者平台</h1>
        <nav className="space-x-4">
          <button className="hover:underline">工人信息</button>
          <button className="hover:underline">中介信息</button>
          <button className="hover:underline">我的发布</button>
        </nav>
      </header>

      {/* 亚洲地图区域 */}
      <section className="mt-4 bg-white bg-opacity-5 rounded-xl p-2">
        <h2 className="text-lg font-semibold mb-2">地図から探す</h2>
        <div className="w-full overflow-auto">
          <ComposableMap
            width={800}
            height={500}
            projection="geoMercator"
            projectionConfig={{ center: [100, 35], scale: 500 }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) => (
                <>
                  {geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => setSelectedCountry(geo.properties.name)}
                      style={{
                        default: { fill: "#999", outline: "none" },
                        hover: { fill: "#00bfff", outline: "none" },
                        pressed: { fill: "#00aaff", outline: "none" },
                      }}
                    />
                  ))}
                  {geographies.map((geo, i) => (
                    countryNameMap[geo.properties.name] ? (
                      <Annotation
                        key={"label-" + i}
                        subject={geoCentroid(geo)}
                        dx={0}
                        dy={0}
                        connectorProps={{ stroke: "none" }}
                      >
                        <text x={0} y={0} textAnchor="middle" fontSize={10} fill="#fff">
                          {countryNameMap[geo.properties.name]}
                        </text>
                      </Annotation>
                    ) : null
                  ))}{/* country name */}
                  {geographies.map((geo, i) =>
  countryFlagMap[geo.properties.name] ? (
    <Annotation
      key={"flag-" + i}
      subject={geoCentroid(geo)}
      dx={0}
      dy={5}
      connectorProps={{ stroke: "none" }}
    >
      <image
        href={countryFlagMap[geo.properties.name]}
        width={16}
        height={12}
        x={-8}
        y={-6}
      />
    </Annotation>
  ) : null
)}{/* country flag */}

                </>
              )}
            </Geographies>
          </ComposableMap>
        </div>
        {selectedCountry && (
          <p className="mt-2 text-sm text-center text-blue-300">当前选择：{selectedCountry}</p>
        )}
      </section>

      {/* 以下内容恢复：推荐工人 */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-2">👷 推荐工人</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {workers
            .filter(w => !selectedCountry || w.country === selectedCountry)
            .map((w, i) => (
              <div key={i} className="bg-white bg-opacity-10 p-4 rounded-2xl shadow-md">
                <p className="font-bold">{w.role}</p>
                <p>{w.desc}</p>
              </div>
            ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">🧑‍💼 推荐中介</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agencies
            .filter(a => !selectedCountry || a.country === selectedCountry)
            .map((a, i) => (
              <div key={i} className="bg-white bg-opacity-10 p-4 rounded-2xl shadow-md">
                <p className="font-bold">{a.name}</p>
                <p>{a.desc}</p>
              </div>
            ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">📣 发布用工需求</h2>
        <form className="bg-white bg-opacity-10 p-4 rounded-2xl shadow-md grid gap-4">
          <input className="bg-transparent border border-white p-2 rounded" placeholder="工种类型" />
          <input className="bg-transparent border border-white p-2 rounded" placeholder="地区" />
          <input className="bg-transparent border border-white p-2 rounded" placeholder="起始时间" />
          <input className="bg-transparent border border-white p-2 rounded" placeholder="日薪预算 (日元)" />
          <div className="flex gap-2">
            <button type="button" className="bg-blue-600 px-4 py-2 rounded">AI助手帮我填写</button>
            <button type="submit" className="bg-green-600 px-4 py-2 rounded">手动发布</button>
          </div>
        </form>
      </section>

      {/* AI助手按钮与对话区域保持不变 */}
      <button 
        onClick={toggleAssistant} 
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-2xl shadow-lg flex items-center justify-center transition">
        🤖
      </button>

      {showAssistant && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
          onClick={toggleAssistant}
        ></div>
      )}

      {showAssistant && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            w-[360px] flex flex-col items-center space-y-3"
        >
          <div className="w-16 h-16 rounded-full bg-purple-600 animate-pulse flex items-center justify-center text-white text-xl shadow-lg">
            🤖
          </div>
          <div className="w-full max-h-60 overflow-y-auto text-sm bg-transparent rounded-xl p-3 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === '你' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`px-3 py-2 rounded-2xl max-w-[90%] md:max-w-[70%] text-black ${
                  msg.role === '你' ? 'bg-blue-500 text-white ml-20' : 'bg-gray-200 mr-20'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="flex-1 border p-1 rounded text-sm text-black"
              placeholder="请输入..."
            />
            <button onClick={handleSend} className="bg-blue-600 text-white px-2 rounded">发送</button>
            <button onClick={startVoiceInput} title="语音输入🎙️">🎙️</button>
          </div>
        </div>
      )}
    </div>
  );
}
