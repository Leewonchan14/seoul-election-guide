import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Newspaper, Target, User, BarChart3, ChevronRight } from "lucide-react";
import { candidates, partyColors, partyKeyMap } from "../data/candidates";

function PartyBadge({ party, className = "" }) {
  const key = partyKeyMap[party] || "independent";
  const colors = partyColors[key] || partyColors.independent;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${colors.bg} ${colors.text} ${className}`}>
      {party}
    </span>
  );
}

const electionColors = {
  "인천광역시장": "bg-blue-600",
  "인천시교육감": "bg-emerald-600",
  "제물포구청장": "bg-violet-600",
  "인천시의원 (지역구)": "bg-amber-600",
  "제물포구의원 (지역구)": "bg-rose-600",
};

export default function CandidatePage() {
  const { slug } = useParams();
  const candidate = candidates[slug];

  if (!candidate) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">후보 정보를 찾을 수 없습니다</h1>
          <Link to="/" className="text-blue-600 hover:underline">메인으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const color = electionColors[candidate.election] || "bg-gray-600";
  const hasDetail = candidate.pledges.length > 0 || candidate.bio.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">돌아가기</span>
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-700 font-medium truncate">{candidate.name}</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className={`h-2 ${color}`} />
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Photo */}
              {candidate.image ? (
                <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-300">${candidate.name[0]}</div>`;
                    }}
                  />
                </div>
              ) : (
                <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-300">{candidate.name[0]}</span>
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {candidate.name}
                  </h1>
                  {candidate.age && (
                    <span className="text-base text-gray-400">{candidate.age}세</span>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <PartyBadge party={candidate.party} className="text-sm px-3 py-1" />
                  {candidate.tag && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-800 border border-yellow-200">
                      {candidate.tag}
                    </span>
                  )}
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${color} text-white`}>
                    {candidate.election}
                  </span>
                </div>

                {candidate.slogan && (
                  <p className="mt-3 text-lg text-gray-700 font-medium">
                    {candidate.slogan}
                  </p>
                )}

                {candidate.rating && (
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">지지율</span>
                      <span className={`text-xl font-bold ${
                        candidate.status === "선두" ? "text-blue-600" : "text-gray-800"
                      }`}>
                        {candidate.rating}
                      </span>
                    </div>
                    {candidate.status && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        candidate.status === "선두" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {candidate.status}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {hasDetail ? (
          <>
            {/* Bio */}
            {candidate.bio.length > 0 && (
              <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-4 h-4 text-gray-700" />
                  <h2 className="text-lg font-bold text-gray-900">약력</h2>
                </div>
                <ul className="space-y-2">
                  {candidate.bio.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Pledges */}
            {candidate.pledges.length > 0 && (
              <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-4 h-4 text-gray-700" />
                  <h2 className="text-lg font-bold text-gray-900">
                    {candidate.electionType === "시장" && candidate.pledges.length >= 5
                      ? "5대 공약"
                      : candidate.pledges.length >= 3
                      ? "핵심 공약"
                      : "공약"}
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {candidate.pledges.map((pledge, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`flex-shrink-0 w-6 h-6 rounded-lg ${color} text-white text-xs font-bold flex items-center justify-center`}>
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">{pledge.title}</h3>
                          {pledge.desc && (
                            <p className="mt-0.5 text-sm text-gray-500">{pledge.desc}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {candidate.strategy && (
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
                    <h3 className="font-bold text-gray-900 text-sm mb-2">{candidate.strategy.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {candidate.strategy.items.map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm"
                        >
                          {item.key && (
                            <span className={`w-5 h-5 rounded-md ${color} text-white text-xs font-bold flex items-center justify-center`}>
                              {item.key}
                            </span>
                          )}
                          {item.label}
                        </span>
                      ))}
                    </div>
                    {candidate.strategy.extra && (
                      <ul className="mt-3 space-y-1">
                        {candidate.strategy.extra.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <ChevronRight className="w-3 h-3 text-gray-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </section>
            )}

            {/* Matchup History */}
            {candidate.matchup && (
              <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-4 h-4 text-gray-700" />
                  <h2 className="text-lg font-bold text-gray-900">전과 기록</h2>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-gray-900">{candidate.name}</span>
                      <span className="text-gray-500 mx-2">vs</span>
                      <span className="font-bold text-gray-900">{candidate.matchup.opponent}</span>
                    </div>
                    <span className="text-sm text-gray-500">{candidate.matchup.prevResult}</span>
                  </div>
                  {candidate.matchup.note && (
                    <p className="mt-2 text-sm text-gray-500">{candidate.matchup.note}</p>
                  )}
                </div>
              </section>
            )}

            {/* Articles */}
            {candidate.articles.length > 0 && (
              <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Newspaper className="w-4 h-4 text-gray-700" />
                  <h2 className="text-lg font-bold text-gray-900">관련 기사</h2>
                </div>
                <div className="space-y-2">
                  {candidate.articles.map((article, i) => (
                    <a
                      key={i}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                          {article.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {article.source}
                          {article.date && <span> · {article.date}</span>}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-500 flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          /* Minimal detail for candidates without rich info */
          <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-gray-700" />
              <h2 className="text-lg font-bold text-gray-900">후보 정보</h2>
            </div>
            <ul className="space-y-2">
              {candidate.bio.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            {candidate.desc && (
              <p className="mt-3 text-sm text-gray-500">{candidate.desc}</p>
            )}
          </section>
        )}

        {/* Related Candidates (same election) */}
        {(() => {
          const related = Object.values(candidates).filter(
            (c) => c.election === candidate.election && c.slug !== candidate.slug
          );
          if (related.length === 0) return null;
          return (
            <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                같은 선거 다른 후보
              </h2>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {related.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/candidate/${c.slug}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-gray-400">{c.name[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-900">{c.name}</div>
                      <PartyBadge party={c.party} />
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}

        {/* Nav Footer */}
        <div className="flex items-center justify-between py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            메인 페이지로
          </Link>
        </div>
      </main>
    </div>
  );
}
