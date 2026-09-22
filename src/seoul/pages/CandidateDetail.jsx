import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Vote, MapPin, BookOpen, Briefcase, Target, Award, ChevronRight, DollarSign, Shield, Users } from "lucide-react";
import { candidateDetails } from "../data/candidates";

const partyColors = {
  democrat: { bg: "bg-[#004ea2]" },
  "people-power": { bg: "bg-[#e61e2a]" },
  justice: { bg: "bg-[#ffcc00]" },
  independent: { bg: "bg-gray-500" },
  "conservative-unity": { bg: "bg-red-600" },
};

const partyTextColors = {
  democrat: "text-white",
  "people-power": "text-white",
  justice: "text-black",
  independent: "text-white",
  "conservative-unity": "text-white",
};

function PartyBadge({ party, colorKey }) {
  const colors = partyColors[colorKey] || partyColors.independent;
  const textColor = partyTextColors[colorKey] || "text-white";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${colors.bg} ${textColor}`}>
      {party}
    </span>
  );
}

function InfoRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
      <div className="w-5 h-5 flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs text-gray-400 block">{label}</span>
        <span className="text-sm text-gray-800">{children || "정보 없음"}</span>
      </div>
    </div>
  );
}

export default function CandidateDetail() {
  const { name } = useParams();
  const candidate = candidateDetails[name];

  if (!candidate) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">후보 정보를 찾을 수 없습니다</h1>
          <Link to="/" className="text-blue-600 hover:underline">← 메인으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/60">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>돌아가기</span>
          </Link>
          <span className="text-xs text-gray-400">미성동 선거안내</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Candidate Header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden shadow-md">
              {candidate.img ? (
                <img src={candidate.img} alt={candidate.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-2xl">
                  {candidate.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-extrabold text-gray-900">{candidate.name}</h1>
                {candidate.age && <span className="text-base text-gray-400">{candidate.age}세</span>}
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <PartyBadge party={candidate.party} colorKey={candidate.partyColor} />
                <span className="text-sm text-blue-600 font-medium">{candidate.election} 후보</span>
              </div>
              {candidate.tag && (
                <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-800 border border-yellow-200">
                  {candidate.tag}
                </span>
              )}
              {candidate.status && (
                <p className="mt-2 text-sm text-gray-500">{candidate.status}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Summary */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              한줄 요약
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{candidate.summary}</p>
          </section>

          {/* Full Description */}
          {candidate.fullDesc && (
            <section className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                상세 정보
              </h2>
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {candidate.fullDesc}
              </div>
            </section>
          )}

          {/* Profile Info */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              인적 사항
            </h2>
            <div className="divide-y divide-gray-50">
              <InfoRow icon={MapPin} label="출생">
                {candidate.birth || "정보 확인 필요"}
              </InfoRow>
              <InfoRow icon={Users} label="가족">
                {candidate.profile.family || "정보 확인 필요"}
              </InfoRow>
              <InfoRow icon={Shield} label="병역">
                {candidate.profile.military || "정보 확인 필요"}
              </InfoRow>
              <InfoRow icon={DollarSign} label="재산">
                {candidate.profile.property}
              </InfoRow>
              <InfoRow icon={BookOpen} label="종교">
                {candidate.profile.religion || "정보 없음"}
              </InfoRow>
            </div>
          </section>

          {/* 학력 */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              학력
            </h2>
            <ul className="space-y-2">
              {candidate.profile.education.map((edu, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                  {edu}
                </li>
              ))}
            </ul>
          </section>

          {/* 경력 */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              경력
            </h2>
            <ul className="space-y-2">
              {candidate.profile.career.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 주요 공약 */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              주요 공약
            </h2>
            <ul className="space-y-2">
              {candidate.pledges.map((pledge, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                    {i + 1}
                  </div>
                  {pledge}
                </li>
              ))}
            </ul>
          </section>

          {/* 선거 이력 */}
          {candidate.elections && (
            <section className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Vote className="w-5 h-5 text-blue-600" />
                선거 이력
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 pr-4 text-gray-400 font-medium">연도</th>
                      <th className="text-left py-2 pr-4 text-gray-400 font-medium">선거</th>
                      <th className="text-left py-2 text-gray-400 font-medium">결과</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidate.elections.map((e, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0">
                        <td className="py-2 pr-4 text-gray-800">{e.year}</td>
                        <td className="py-2 pr-4 text-gray-800">{e.type}</td>
                        <td className="py-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            e.result.includes("당선") ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"
                          }`}>
                            {e.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Keywords */}
          {candidate.keywords && (
            <section className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">키워드</h2>
              <div className="flex flex-wrap gap-2">
                {candidate.keywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    #{kw}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Bottom Nav */}
        <div className="mt-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
            <ArrowLeft className="w-4 h-4" />
            메인 선거안내로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}
