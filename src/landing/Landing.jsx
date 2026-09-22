import { Vote, MapPin, ChevronRight, Leaf } from "lucide-react";

const regions = [
  {
    href: `${import.meta.env.BASE_URL}seoul/`,
    title: "미성동 선거안내",
    area: "서울 강남구 미성동",
    elections: ["서울시장 · 서울교육감", "강남구청장 · 시의원 · 구의원"],
    accent: "bg-blue-600",
  },
  {
    href: `${import.meta.env.BASE_URL}incheon/`,
    title: "신흥동 선거안내",
    area: "인천 중구 신흥동",
    elections: ["인천시장 · 인천교육감", "제물포구청장 · 시의원 · 구의원"],
    accent: "bg-emerald-600",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/60">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Vote className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">6·3 지방선거 선거안내</h1>
            <p className="text-xs text-gray-500">동네별 투표 안내 · 제9회 전국동시지방선거</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 space-y-8">
        <section className="text-center space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-200">
            <MapPin className="w-3.5 h-3.5" />
            지역을 선택하세요
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            어느 동네<br />선거안내를 보시겠어요?
          </h2>
          <p className="text-gray-500">총 7장의 선거지와 후보 정보를 동네 기준으로 정리했습니다</p>
        </section>

        <section className="grid sm:grid-cols-2 gap-4">
          {regions.map((region) => (
            <a
              key={region.href}
              href={region.href}
              className="group block bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-xl ${region.accent} flex items-center justify-center shadow-md mb-4`}>
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{region.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{region.area}</p>
              <ul className="mt-4 space-y-1.5">
                {region.elections.map((line) => (
                  <li key={line} className="text-sm text-gray-600">{line}</li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                안내 보기
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
          ))}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">그 외</h2>
          </div>
          <a
            href={`${import.meta.env.BASE_URL}travel/`}
            className="group flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-200"
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-orange-500 flex items-center justify-center shadow-md">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-gray-900">10 · 11 · 12월 여행지 가이드</h3>
              <p className="mt-1 text-sm text-gray-500">단풍 · 숲길 · 갈대 · 축제 · 설경 · 온천, 목적별 26곳</p>
            </div>
            <ChevronRight className="ml-auto w-4 h-4 shrink-0 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </section>

        <footer className="text-center pb-8">
          <p className="text-xs text-gray-400">사전투표 5.29(금)~30(토) 06–18시 · 본투표 6.3(수)</p>
          <p className="text-xs text-gray-400 mt-1">
            공개된 언론 보도와 자료를 바탕으로 제작 · 세부 후보 정보는 중앙선거관리위원회에서 확인
          </p>
        </footer>
      </main>
    </div>
  );
}
