import { Fragment } from "react";

/**
 * 데이터에 섞여 있는 <b>…</b> 만 굵게 렌더링한다.
 * (원문은 정적 페이지에서 이관한 신뢰된 문자열이며, 나머지 태그는 텍스트로 남긴다)
 */
export function RichText({ text, boldClassName = "font-semibold text-[var(--t-ink)]" }) {
  const parts = String(text).split(/(<b>.*?<\/b>)/g);
  return parts.map((part, index) => {
    const match = part.match(/^<b>(.*?)<\/b>$/s);
    if (match) {
      return (
        <b key={index} className={boldClassName}>
          {match[1]}
        </b>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}
