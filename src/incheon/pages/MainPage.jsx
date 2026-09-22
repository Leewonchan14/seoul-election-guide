import { Link } from "react-router-dom";
import { Vote, MapPin, Calendar, CheckCircle2, Info, AlertCircle, Lightbulb } from "lucide-react";
import { candidates } from "../data/candidates";

const elections = [
  {
    id: 1,
    title: "인천광역시장",
    desc: "인천시 행정·예산 총괄하는 최고 책임자 · 예산 약 10조 원",
    color: "bg-blue-600",
    candidateSlugs: ["park-chan-dae", "yoo-jeong-bok", "lee-gi-bung"],
  },
  {
    id: 2,
    title: "인천시교육감",
    desc: "초·중·고 교육 총괄 · 예산 3~4조 원 · 정당 후보 아님",
    color: "bg-emerald-600",
    candidateSlugs: ["do-seong-hoon", "lee-dae-hyung", "im-byeong-gu"],
  },
  {
    id: 3,
    title: "제물포구청장",
    desc: "신흥동이 속한 구의 행정 수장 · 초대 제물포구청장",
    color: "bg-violet-600",
    candidateSlugs: ["namgung-hyung", "kim-chan-jin"],
  },
  {
    id: 4,
    title: "인천시의원 — 지역구",
    desc: "제1선거구: 신포·연안·신흥·도원·율목·동인천·개항동",
    color: "bg-amber-600",
    candidateSlugs: ["yoon-hee-jung", "im-gwan-man"],
  },
  {
    id: 5,
    title: "인천시의원 — 비례대표",
    desc: "정당에 투표합니다 · 8개 정당 참여",
    color: "bg-cyan-600",
    isProportional: true,
  },
  {
    id: 6,
    title: "제물포구의원 — 지역구",
    desc: "가선거구 · 5명 중 3명을 선출합니다",
    color: "bg-rose-600",
    note: "⚠️ 5명 중 3명에게만 찍으세요. 4명 이상이면 무효!",
    candidateSlugs: ["lee-seung-uk", "yoo-hyung-sook", "park-tae-eun", "jang-gwan-hoon", "lee-jong-ho"],
  },
  {
    id: 7,
    title: "구의회의원 — 비례대표",
    desc: "정당에 투표합니다 · 제물포구 5개 정당 참여",
    color: "bg-orange-600",
    isProportional: true,
  },
];

const partyColors = {
  democrat: { bg: "bg-[#004ea2]", text: "text-white" },
  "people-power": { bg: "bg-[#e61e2a]", text: "text-white" },
  reform: { bg: "bg-[#ff6b00]", text: "text-white" },
  independent: { bg: "bg-gray-500", text: "text-white" },
  "conservative-unity": { bg: "bg-red-600", text: "text-white" },
};

const partyKeyMap = {
  민주당: "democrat",
  더불어민주당: "democrat",
  국민의힘: "people-power",
  개혁신당: "reform",
  무소속: "independent",
  보수단일: "conservative-unity",
};

function PartyBadge({ party, className = "" }) {
  const partyKey = partyKeyMap[party] || "independent";
  const colors = partyColors[partyKey] || partyColors.independent;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${colors.bg} ${colors.text} ${className}`}
    >
      {party}
    </span>
  );
}

function CandidateCard({ candidate }) {
  const CardContent = (
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-lg font-bold text-gray-900">{candidate.name}</h4>
          {candidate.age && (
            <span className="text-sm text-gray-400">{candidate.age}세</span>
          )}
          <PartyBadge party={candidate.party} />
          {candidate.tag && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-800 border border-yellow-200">
              {candidate.tag}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm text-gray-600">{candidate.desc || candidate.bio?.[0]}</p>
      </div>
      {candidate.rating && (
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="text-lg font-bold text-gray-900">{candidate.rating}</div>
          <div className="text-xs text-gray-400">지지율</div>
        </div>
      )}
    </div>
  );

  return (
    <Link
      to={`/candidate/${candidate.slug}`}
      className="group block bg-white rounded-xl border border-gray-100 p-4 hover:shadow-lg hover:border-gray-200 transition-all duration-200"
    >
      {CardContent}
    </Link>
  );
}

function ElectionSection({ election }) {
  return (
    <section className="scroll-mt-20" id={`election-${election.id}`}>
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-xl ${election.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}
        >
          {election.id}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-bold text-gray-900">{election.title}</h2>
            {election.isProportional && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                <CheckCircle2 className="w-3 h-3" />
                정당 투표
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500">{election.desc}</p>
        </div>
      </div>

      {election.note && (
        <div className="mt-3 ml-14 p-3 rounded-lg bg-amber-50 border border-amber-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-800">{election.note}</p>
          </div>
        </div>
      )}

      {election.candidateSlugs && (
        <div className="mt-3 ml-14 grid gap-2.5">
          {election.candidateSlugs.map((slug) => {
            const c = candidates[slug];
            if (!c) return null;
            return <CandidateCard key={slug} candidate={c} />;
          })}
        </div>
      )}

      {election.isProportional && (
        <div className="mt-3 ml-14">
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center">
            <Vote className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">
              지지하는 정당에 투표해 주세요
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default function MainPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/60">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href={import.meta.env.BASE_URL} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Vote className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">
                신흥동 선거안내
              </h1>
              <p className="text-xs text-gray-500">인천 · 6·3 지방선거</p>
            </div>
          </a>
          <div className="flex items-center gap-2 text-sm">
            <a
              href={`${import.meta.env.BASE_URL}seoul/`}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-gray-200 text-xs font-medium text-gray-600 hover:border-blue-300 hover:text-blue-700 transition-colors"
            >
              <MapPin className="w-3 h-3" />
              서울 미성동
            </a>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
              사전투표 마감
            </span>
            <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              본투표 6.3 D-1
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-10">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-200">
            <MapPin className="w-3.5 h-3.5" />
            인천 중구 신흥동 · 인중로109번길
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            오늘은 누구를
            <br />
            뽑으러 가시나요?
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-sm border border-amber-200">
            <Calendar className="w-3.5 h-3.5" />
            오늘 <strong>6월 2일(화)</strong> · 사전투표 마감 · 본투표 <strong>내일(6.3 수)</strong>
          </div>
          <p className="text-gray-500 max-w-md mx-auto">
            총 <strong className="text-blue-600">7장</strong>의 선거지를
            한눈에 확인하세요
          </p>
        </section>

        {/* Voting Info Cards */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "사전투표", value: "5.29(금)~30(토)", highlight: true, status: "마감" },
            { label: "본투표", value: "6.3(수)", highlight: true, status: "D-1" },
            { label: "투표 시간", value: "06:00~18:00", highlight: false },
            { label: "재보궐", value: "해당없음", highlight: false },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-xl p-4 text-center border transition-all ${
                item.highlight
                  ? item.status === "마감"
                    ? "bg-white text-gray-400 border-gray-200"
                    : "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-200"
                  : "bg-white text-gray-900 border-gray-100 hover:shadow-md"
              }`}
            >
              <div className={`text-xs font-medium mb-1 ${
                item.highlight && item.status !== "마감" ? "text-blue-100" : "text-gray-400"
              }`}>
                {item.label}
              </div>
              <div className={`font-bold ${
                item.highlight && item.status !== "마감" ? "text-white" : "text-gray-900"
              }`}>
                {item.value}
              </div>
              {item.status && (
                <div className={`mt-1 text-xs font-medium ${
                  item.status === "마감" ? "text-gray-300" : "text-blue-200"
                }`}>
                  {item.status}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* 7장 Overview */}
        <section className="bg-gray-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-bold">총 7장 — 이렇게 투표하세요</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {[
              "① 인천시장",
              "② 인천교육감",
              "③ 제물포구청장",
              "④ 시의원(지역구)",
              "⑤ 시의원(비례)",
              "⑥ 구의원(지역구)",
              "⑦ 구의원(비례)",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Glossary */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-gray-900">용어 설명</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 rounded-xl bg-gray-50">
              <span className="font-bold text-gray-900">재보궐</span>
              <span className="text-gray-500"> · 다시 치르는(再) + 빈자리 채우는(補闕) 선거</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50">
              <span className="font-bold text-gray-900">지역구</span>
              <span className="text-gray-500"> · 사람 찍기 (후보자 개인에게 투표)</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50">
              <span className="font-bold text-gray-900">비례</span>
              <span className="text-gray-500"> · 정당 찍기 (정당에 투표)</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50">
              <span className="font-bold text-gray-900">7월부터</span>
              <span className="text-gray-500"> · <strong>제물포구</strong> (중구 내륙 + 동구 통합)</span>
            </div>
          </div>
        </section>

        {/* Election Cards */}
        <div className="space-y-8">
          {elections.map((election) => (
            <ElectionSection key={election.id} election={election} />
          ))}
        </div>

        {/* Tips Section */}
        <section className="bg-green-50 rounded-2xl border border-green-200 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-bold text-green-900">💡 투표 팁</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-green-800">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>도장이 반만 찍혀도 <strong>유효</strong>합니다. 안심하세요!</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-red-700 font-medium">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <span><strong>⑥번 구의원</strong>은 <strong>5명 중 3명에게만</strong> 찍으세요. 4명 이상이면 무효입니다!</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-green-800">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>사전투표</strong>는 전국 어디서나 가능합니다.</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-green-800">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>신분증</strong>을 꼭 지참하세요!</span>
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="text-center pb-8">
          <p className="text-xs text-gray-400">
            인천 중구 신흥동(인중로109번길) 기준 · 제9회 전국동시지방선거
          </p>
          <p className="text-xs text-gray-400 mt-1">
            사전투표 5.29(금)~30(토) 06–18시 · 본투표 6.3(수)
          </p>
        </footer>
      </main>
    </div>
  );
}
