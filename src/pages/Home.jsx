import { Link } from "react-router-dom";
import { Vote, MapPin, Calendar, CheckCircle2, Info, AlertCircle, Lightbulb } from "lucide-react";
import { elections } from "../data/elections";
import { candidateDetails } from "../data/candidates";

const partyColors = {
  democrat: { bg: "bg-[#004ea2]", text: "text-white" },
  "people-power": { bg: "bg-[#e61e2a]", text: "text-white" },
  reform: { bg: "bg-[#ff6b00]", text: "text-white" },
  justice: { bg: "bg-[#ffcc00]", text: "text-black" },
  independent: { bg: "bg-gray-500", text: "text-white" },
  "conservative-unity": { bg: "bg-red-600", text: "text-white" },
};

function PartyBadge({ party, className = "" }) {
  const keyMap = {
    민주당: "democrat", 국민의힘: "people-power", 개혁신당: "reform",
    정의당: "justice", 무소속: "independent", 보수단일: "conservative-unity",
    보수진영: "conservative-unity", 진보진영: "independent",
    진보: "independent", 보수: "conservative-unity", 중도: "independent",
  };
  const colors = partyColors[keyMap[party]] || partyColors.independent;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${colors.bg} ${colors.text} ${className}`}>
      {party}
    </span>
  );
}

function CandidateCard({ candidate }) {
  const hasDetail = candidateDetails[candidate.name];
  const detail = candidateDetails[candidate.name];
  const CardContent = (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-100 overflow-hidden">
        {detail?.img ? (
          <img src={detail.img} alt={candidate.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm">
            {candidate.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-lg font-bold text-gray-900">{candidate.name}</h4>
          {candidate.age && candidate.age !== "" && (
            <span className="text-sm text-gray-400">{candidate.age}세</span>
          )}
          <PartyBadge party={candidate.party} />
          {candidate.tag && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-800 border border-yellow-200">
              {candidate.tag}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm text-gray-600">{candidate.desc}</p>
      </div>
      {hasDetail && (
        <div className="flex-shrink-0 text-blue-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );

  if (hasDetail) {
    return (
      <Link
        to={`/candidate/${encodeURIComponent(candidate.name)}`}
        className="group block bg-white rounded-xl border border-gray-100 p-4 hover:shadow-lg hover:border-gray-200 transition-all duration-200"
      >
        {CardContent}
      </Link>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 transition-all duration-200">
      {CardContent}
    </div>
  );
}

function ElectionSection({ election }) {
  return (
    <section className="scroll-mt-20" id={`election-${election.id}`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${election.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
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
        <div className={`mt-3 ml-14 p-3 rounded-lg border ${
          election.noteType === "warning" ? "bg-amber-50 border-amber-200" : "bg-blue-50 border-blue-200"
        }`}>
          <div className="flex items-start gap-2">
            <AlertCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${election.noteType === "warning" ? "text-amber-600" : "text-blue-600"}`} />
            <p className={`text-sm ${election.noteType === "warning" ? "text-amber-800" : "text-blue-800"}`}>{election.note}</p>
          </div>
        </div>
      )}

      {election.candidates && (
        <div className="mt-3 ml-14 grid gap-2.5">
          {election.candidates.map((c, i) => (
            <CandidateCard key={i} candidate={c} />
          ))}
        </div>
      )}

      {election.isProportional && (
        <div className="mt-3 ml-14">
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center">
            <Vote className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">지지하는 정당에 투표해 주세요</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/60">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Vote className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">미성동 선거안내</h1>
              <p className="text-xs text-gray-500">서울 · 6·3 지방선거</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">사전투표 마감</span>
            <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">본투표 6.3 D-1</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-10">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-200">
            <MapPin className="w-3.5 h-3.5" />
            서울 강남구 미성동
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            오늘은 누구를<br />뽑으러 가시나요?
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-sm border border-amber-200">
            <Calendar className="w-3.5 h-3.5" />
            오늘 <strong>6월 2일(화)</strong> · 사전투표 마감 · 본투표 <strong>내일(6.3 수)</strong>
          </div>
          <p className="text-gray-500 max-w-md mx-auto">
            총 <strong className="text-blue-600">7장</strong>의 선거지를 한눈에 확인하세요
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
            <div key={item.label} className={`rounded-xl p-4 text-center border transition-all ${
              item.highlight ? item.status === "마감" ? "bg-white text-gray-400 border-gray-200" : "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-200" : "bg-white text-gray-900 border-gray-100 hover:shadow-md"
            }`}>
              <div className={`text-xs font-medium mb-1 ${item.highlight && item.status !== "마감" ? "text-blue-100" : "text-gray-400"}`}>{item.label}</div>
              <div className={`font-bold ${item.highlight && item.status !== "마감" ? "text-white" : "text-gray-900"}`}>{item.value}</div>
              {item.status && <div className={`mt-1 text-xs font-medium ${item.status === "마감" ? "text-gray-300" : "text-blue-200"}`}>{item.status}</div>}
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
            {["① 서울시장", "② 서울교육감", "③ 강남구청장", "④ 시의원(지역구)", "⑤ 시의원(비례)", "⑥ 구의원(지역구)", "⑦ 구의원(비례)"].map((item) => (
              <div key={item} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Glossary */}
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
              <span className="font-bold text-gray-900">미성동</span>
              <span className="text-gray-500"> · <strong>강남구</strong> 소재 · 법정동 역삼동</span>
            </div>
          </div>
        </section>

        {/* Election Cards */}
        <div className="space-y-8">
          {elections.map((election) => (
            <ElectionSection key={election.id} election={election} />
          ))}
        </div>

        {/* Data Note */}
        <section className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-bold mb-1">📌 참고사항</p>
              <p>이 안내는 공개된 언론 보도와 자료를 바탕으로 제작되었습니다. 일부 선거구의 세부 후보 정보는 중앙선거관리위원회 후보자정보시스템(policy.nec.go.kr)에서 최종 확인하시기 바랍니다. 후보자 이름을 클릭하면 상세 페이지를 확인할 수 있습니다.</p>
            </div>
          </div>
        </section>

        {/* Tips */}
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
              <span>구의원은 선거구마다 선출 인원이 다릅니다. <strong>투표용지 설명을 꼭 확인</strong>하세요!</span>
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
          <p className="text-xs text-gray-400">서울 강남구 미성동 기준 · 제9회 전국동시지방선거</p>
          <p className="text-xs text-gray-400 mt-1">사전투표 5.29(금)~30(토) 06–18시 · 본투표 6.3(수)</p>
        </footer>
      </main>
    </div>
  );
}
