import Link from "next/link";
import type { Metadata } from "next";

import { ScoreProgressChart } from "@/components/norgesgruppen/charts";
import { scoreProgression, validationStats } from "@/lib/norgesgruppen-writeup";

export const metadata: Metadata = {
  title: "Retail Shelf Detection And Classification | Nils Valseth Selte",
  description:
    "A paper-style write-up of the retail shelf detection and classification pipeline built for the NorgesGruppen Data challenge.",
};

const buttonBaseClasses =
  "group inline-flex items-center gap-2 border border-black/70 bg-[var(--background)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--foreground)] shadow-[3px_3px_0_rgba(0,0,0,0.7)] transition-transform duration-200 hover:-translate-y-0.5 hover:translate-x-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const resultBadgeClasses =
  "inline-flex items-center gap-3 border border-black/70 bg-[#f4dc8d] px-3 py-2 text-[11px] font-semibold uppercase leading-none text-[var(--foreground)] shadow-[3px_3px_0_rgba(0,0,0,0.7)]";

const challengePlacement = 22;
const challengeFieldSize = 361;
const challengePercentile = (
  ((challengeFieldSize - challengePlacement) / challengeFieldSize) *
  100
).toFixed(1);

const figureDotsStyle = {
  backgroundImage: "radial-gradient(circle, #eadfbc 1.2px, transparent 1.2px)",
  backgroundSize: "18px 18px",
} as const;

const dottedFigureNoteOffsetClasses = "px-2 sm:px-4 md:px-0 md:pl-[2.65625%]";
const dottedFigureNoteClasses =
  "mr-auto w-full max-w-2xl border border-black/10 bg-[#fbf8ef] p-5 text-left text-[12px] leading-relaxed text-foreground";
const dottedFigureCaptionClasses =
  "mt-2 px-7 text-left sm:px-9 md:mt-5 md:px-0 md:pl-[calc(2.65625%+1.25rem)]";

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 fill-current"
    >
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.22.7-3.9-1.4-3.9-1.4a3.08 3.08 0 0 0-1.32-1.7c-1.07-.73.08-.72.08-.72a2.44 2.44 0 0 1 1.78 1.2 2.48 2.48 0 0 0 3.39 1 2.47 2.47 0 0 1 .74-1.56c-2.57-.29-5.28-1.29-5.28-5.73a4.49 4.49 0 0 1 1.2-3.12 4.18 4.18 0 0 1 .12-3.08s.97-.31 3.18 1.2a10.96 10.96 0 0 1 5.8 0c2.2-1.51 3.17-1.2 3.17-1.2a4.18 4.18 0 0 1 .12 3.08 4.5 4.5 0 0 1 1.2 3.12c0 4.46-2.72 5.43-5.31 5.72a2.74 2.74 0 0 1 .78 2.13v3.16c0 .31.2.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function PaperIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 stroke-current"
      fill="none"
    >
      <path
        d="M7 3h10l4 4v14H7V3Z"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7 3v18H3V7l4-4Z"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 11h6M12 15h6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RankingBadge() {
  return (
    <div
      className={resultBadgeClasses}
      aria-label={`Placement ${challengePlacement} of ${challengeFieldSize}, percentile ${challengePercentile}`}
    >
      <span className="whitespace-nowrap tracking-[0.18em]">
        Placement #{challengePlacement}
      </span>
      <span aria-hidden="true" className="h-4 w-px bg-black/20" />
      <span className="whitespace-nowrap tracking-[0.18em]">
        Top {challengePercentile}%
      </span>
    </div>
  );
}

function FigureCaption({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const hasCustomTopMargin = /\b(?:[\w-]+:)?mt-/.test(className);

  return (
    <p
      className={[
        hasCustomTopMargin ? "" : "mt-5",
        "font-mono text-[12px] italic text-(--muted)",
        className || "text-center",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}

function FigureSummary({ children }: { children: React.ReactNode }) {
  return (
    <aside className="mx-auto max-w-2xl border border-black/10 bg-white/75 p-5 text-sm leading-relaxed text-foreground shadow-[4px_4px_0_rgba(0,0,0,0.08)]">
      {children}
    </aside>
  );
}

function BreakoutFigure({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative left-1/2 w-[min(100vw-2rem,78rem)] -translate-x-1/2 ${className}`.trim()}
    >
      {children}
    </div>
  );
}

function wrapFigureText(value: string, maxLength: number) {
  const words = value.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function SystemFigure({ showDots = true }: { showDots?: boolean }) {
  return (
    <div>
      <div className="hidden md:block">
        <svg viewBox="0 0 1280 600" className="h-auto w-full">
          <defs>
            <pattern
              id="runtime-dots"
              width="18"
              height="18"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.5" cy="1.5" r="1.2" fill="#eadfbc" />
            </pattern>
            <marker
              id="runtime-arrowhead"
              markerWidth="12"
              markerHeight="11"
              markerUnits="userSpaceOnUse"
              refX="3.2"
              refY="5.5"
              orient="auto"
            >
              <path d="M0 0 L9.5 5.5 L0 11 Z" fill="#c89429" />
            </marker>
          </defs>

          {showDots ? <rect width="1280" height="600" fill="url(#runtime-dots)" /> : null}

          <text x="34" y="44" fontSize="12" fill="#b8a877" letterSpacing="0.18em">
            RUNTIME STAGES
          </text>

          <text x="74" y="94" fontSize="12" fill="#5c564d" letterSpacing="0.14em">
            1. INPUT
          </text>
          <text
            x="74"
            y="122"
            fontSize="24"
            fill="#1c1a16"
            fontFamily="var(--font-geist-sans), sans-serif"
            fontWeight="700"
          >
            Full shelf
          </text>
          <rect x="80" y="154" width="156" height="176" fill="#1c1a16" />
          <rect x="74" y="148" width="156" height="176" fill="#f4efe2" stroke="#ddd5c7" />
          <rect
            x="106"
            y="178"
            width="92"
            height="112"
            fill="#9dbd6b"
            stroke="#1c1a16"
            strokeWidth="1.5"
          />
          <rect
            x="120"
            y="200"
            width="36"
            height="50"
            fill="none"
            stroke="#fffdf8"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <rect
            x="158"
            y="252"
            width="24"
            height="30"
            fill="none"
            stroke="#fffdf8"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <text x="152" y="308" textAnchor="middle" fontSize="12" fill="#5c564d">
            image
          </text>

          <path
            d="M 242 236 H 284"
            stroke="#c89429"
            strokeWidth="4"
            strokeLinecap="butt"
            fill="none"
            markerEnd="url(#runtime-arrowhead)"
          />

          <text x="302" y="94" fontSize="12" fill="#5c564d" letterSpacing="0.14em">
            2. DETECTOR
          </text>
          <text
            x="302"
            y="122"
            fontSize="24"
            fill="#1c1a16"
            fontFamily="var(--font-geist-sans), sans-serif"
            fontWeight="700"
          >
            RF-DETR 2XL
          </text>
          <rect x="308" y="154" width="196" height="176" fill="#1c1a16" />
          <rect x="302" y="148" width="196" height="176" fill="#f4efe2" stroke="#ddd5c7" />
          <rect
            x="338"
            y="178"
            width="124"
            height="112"
            fill="#9dbd6b"
            stroke="#1c1a16"
            strokeWidth="1.5"
          />
          <rect
            x="357"
            y="198"
            width="38"
            height="54"
            fill="none"
            stroke="#fffdf8"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <text x="400" y="308" textAnchor="middle" fontSize="12" fill="#5c564d">
            boxes
          </text>

          <path
            d="M 510 236 H 552"
            stroke="#c89429"
            strokeWidth="4"
            strokeLinecap="butt"
            fill="none"
            markerEnd="url(#runtime-arrowhead)"
          />

          <text x="570" y="94" fontSize="12" fill="#5c564d" letterSpacing="0.14em">
            3. CROP
          </text>
          <text
            x="570"
            y="122"
            fontSize="24"
            fill="#1c1a16"
            fontFamily="var(--font-geist-sans), sans-serif"
            fontWeight="700"
          >
            Patch
          </text>
          <rect x="576" y="154" width="118" height="176" fill="#1c1a16" />
          <rect x="570" y="148" width="118" height="176" fill="#f4efe2" stroke="#ddd5c7" />
          <rect
            x="605"
            y="176"
            width="48"
            height="116"
            fill="#9dbd6b"
            stroke="#1c1a16"
            strokeWidth="1.5"
          />
          <rect
            x="612"
            y="190"
            width="34"
            height="88"
            fill="none"
            stroke="#fffdf8"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <text x="629" y="308" textAnchor="middle" fontSize="12" fill="#5c564d">
            crop
          </text>

          <path
            d="M 700 236 H 734"
            stroke="#c89429"
            strokeWidth="4"
            strokeLinecap="butt"
            fill="none"
            markerEnd="url(#runtime-arrowhead)"
          />

          <text x="752" y="94" fontSize="12" fill="#5c564d" letterSpacing="0.14em">
            4. CLASSIFIER
          </text>
          <text
            x="752"
            y="122"
            fontSize="24"
            fill="#1c1a16"
            fontFamily="var(--font-geist-sans), sans-serif"
            fontWeight="700"
          >
            EfficientNet-V2-M
          </text>
          <rect x="758" y="154" width="430" height="176" fill="#1c1a16" />
          <rect
            x="752"
            y="148"
            width="430"
            height="176"
            fill="#f4dc8d"
            stroke="#1c1a16"
            strokeWidth="1.5"
          />
          <text x="776" y="190" fontSize="13" fill="#5c564d" letterSpacing="0.08em">
            TOP CANDIDATES
          </text>
          <rect x="776" y="216" width="236" height="14" fill="#1c1a16" opacity="0.9" />
          <rect x="776" y="244" width="168" height="14" fill="#1c1a16" opacity="0.5" />
          <rect x="776" y="272" width="104" height="14" fill="#1c1a16" opacity="0.24" />
          <text x="776" y="350" fontSize="13" fill="#5c564d">
            Top-k SKU scores
          </text>

          <rect x="1018" y="372" width="164" height="28" fill="#fffdf8" stroke="#ddd5c7" />
          <text
            x="1100"
            y="390"
            textAnchor="middle"
            fontSize="12"
            fill="#5c564d"
            letterSpacing="0.05em"
          >
            LOW MARGIN ONLY
          </text>

          <path
            d="M 1100 336 V 354"
            stroke="#c89429"
            strokeWidth="4"
            strokeLinecap="butt"
            fill="none"
            markerEnd="url(#runtime-arrowhead)"
          />

          <text x="752" y="422" fontSize="12" fill="#5c564d" letterSpacing="0.14em">
            5. LOW-MARGIN RERANK
          </text>
          <text
            x="752"
            y="450"
            fontSize="24"
            fill="#1c1a16"
            fontFamily="var(--font-geist-sans), sans-serif"
            fontWeight="700"
          >
            DINOv3 ConvNeXt
          </text>

          <path
            d="M 1100 412 V 454"
            stroke="#c89429"
            strokeWidth="4"
            strokeLinecap="butt"
            fill="none"
            markerEnd="url(#runtime-arrowhead)"
          />

          <rect x="758" y="478" width="430" height="108" fill="#1c1a16" />
          <rect x="752" y="472" width="430" height="108" fill="#f4efe2" stroke="#ddd5c7" />

          <rect x="776" y="498" width="48" height="34" fill="#9dbd6b" stroke="#1c1a16" strokeWidth="1.4" />
          <path
            d="M 836 515 H 850"
            stroke="#c89429"
            strokeWidth="3.4"
            strokeLinecap="butt"
            fill="none"
            markerEnd="url(#runtime-arrowhead)"
          />
          <rect x="868" y="496" width="58" height="38" fill="#efe7d2" stroke="#1c1a16" strokeWidth="1.3" />
          <path
            d="M 938 515 H 952"
            stroke="#c89429"
            strokeWidth="3.4"
            strokeLinecap="butt"
            fill="none"
            markerEnd="url(#runtime-arrowhead)"
          />
          <rect x="970" y="486" width="126" height="50" fill="#f7f1e2" stroke="#d8d0c2" />
          <text x="1033" y="502" textAnchor="middle" fontSize="11" fill="#5c564d" letterSpacing="0.08em">
            MAX COS
          </text>
          <circle cx="1002" cy="518" r="5.2" fill="#9dbd6b" stroke="#1c1a16" strokeWidth="1" />
          <circle cx="1040" cy="504" r="4" fill="#d8d0c2" />
          <circle cx="1072" cy="520" r="4" fill="#f0cd74" stroke="#1c1a16" strokeWidth="0.9" />
          <line x1="1002" y1="518" x2="1040" y2="504" stroke="#c89429" strokeWidth="1.3" />
          <line x1="1002" y1="518" x2="1072" y2="520" stroke="#c89429" strokeWidth="1.3" />
          <path
            d="M 1108 515 H 1122"
            stroke="#c89429"
            strokeWidth="3.4"
            strokeLinecap="butt"
            fill="none"
            markerEnd="url(#runtime-arrowhead)"
          />
          <rect x="1140" y="494" width="24" height="42" fill="#f7f1e2" stroke="#d8d0c2" />
          <rect x="1145" y="501" width="10" height="6" fill="#1c1a16" opacity="0.92" />
          <rect x="1145" y="513" width="8" height="6" fill="#1c1a16" opacity="0.45" />
          <rect x="1145" y="525" width="5" height="6" fill="#1c1a16" opacity="0.24" />

          <text x="800" y="562" textAnchor="middle" fontSize="11.5" fill="#5c564d">
            crop
          </text>
          <text x="897" y="562" textAnchor="middle" fontSize="11.5" fill="#5c564d">
            embed
          </text>
          <text x="1033" y="562" textAnchor="middle" fontSize="11.5" fill="#5c564d">
            ref bank
          </text>
          <text x="1152" y="562" textAnchor="middle" fontSize="11.5" fill="#5c564d">
            rerank
          </text>
        </svg>
      </div>

      <div className="md:hidden">
        <div className="px-2 pt-5 pb-1 sm:px-4" style={showDots ? figureDotsStyle : undefined}>
          <svg
            viewBox="0 0 340 533"
            className="mx-auto h-auto w-full max-w-[22rem] overflow-visible"
          >
            <defs>
              <marker
                id="runtime-arrowhead-mobile"
                markerWidth="8"
                markerHeight="7"
                markerUnits="userSpaceOnUse"
                refX="2.8"
                refY="3.5"
                orient="auto"
              >
                <path d="M0 0 L6 3.5 L0 7 Z" fill="#c89429" />
              </marker>
            </defs>

            <text x="10" y="22" fontSize="10" fill="#b8a877" letterSpacing="0.18em">
              RUNTIME STAGES
            </text>

            <text x="18" y="44" fontSize="9" fill="#5c564d" letterSpacing="0.12em">
              1. INPUT
            </text>
            <text
              x="18"
              y="60"
              fontSize="14"
              fill="#1c1a16"
              fontFamily="var(--font-geist-sans), sans-serif"
              fontWeight="700"
            >
              Full shelf
            </text>
            <rect x="22" y="78" width="80" height="104" fill="#1c1a16" />
            <rect x="18" y="74" width="80" height="104" fill="#f4efe2" stroke="#ddd5c7" />
            <rect x="36" y="95" width="44" height="62" fill="#9dbd6b" stroke="#1c1a16" strokeWidth="1.2" />
            <rect x="45" y="113" width="24" height="36" fill="none" stroke="#fffdf8" strokeWidth="1.6" strokeDasharray="4 3" />
            <rect x="65" y="137" width="12" height="16" fill="none" stroke="#fffdf8" strokeWidth="1.6" strokeDasharray="4 3" />
            <text x="58" y="169" textAnchor="middle" fontSize="9.5" fill="#5c564d">
              image
            </text>

            <path
              d="M 104 126 H 119"
              stroke="#c89429"
              strokeWidth="2.6"
              strokeLinecap="butt"
              fill="none"
              markerEnd="url(#runtime-arrowhead-mobile)"
            />

            <text x="128" y="44" fontSize="9" fill="#5c564d" letterSpacing="0.12em">
              2. DETECTOR
            </text>
            <text
              x="128"
              y="60"
              fontSize="14"
              fill="#1c1a16"
              fontFamily="var(--font-geist-sans), sans-serif"
              fontWeight="700"
            >
              RF-DETR 2XL
            </text>
            <rect x="132" y="78" width="98" height="104" fill="#1c1a16" />
            <rect x="128" y="74" width="98" height="104" fill="#f4efe2" stroke="#ddd5c7" />
            <rect x="147" y="95" width="60" height="62" fill="#9dbd6b" stroke="#1c1a16" strokeWidth="1.2" />
            <rect x="157" y="111" width="20" height="34" fill="none" stroke="#fffdf8" strokeWidth="1.6" strokeDasharray="4 3" />
            <text x="177" y="169" textAnchor="middle" fontSize="9.5" fill="#5c564d">
              boxes
            </text>

            <path
              d="M 232 126 H 241"
              stroke="#c89429"
              strokeWidth="2.6"
              strokeLinecap="butt"
              fill="none"
              markerEnd="url(#runtime-arrowhead-mobile)"
            />

            <text x="250" y="44" fontSize="9" fill="#5c564d" letterSpacing="0.12em">
              3. CROP
            </text>
            <text
              x="250"
              y="60"
              fontSize="14"
              fill="#1c1a16"
              fontFamily="var(--font-geist-sans), sans-serif"
              fontWeight="700"
            >
              Patch
            </text>
            <rect x="254" y="78" width="62" height="104" fill="#1c1a16" />
            <rect x="250" y="74" width="62" height="104" fill="#f4efe2" stroke="#ddd5c7" />
            <rect x="267" y="95" width="28" height="62" fill="#9dbd6b" stroke="#1c1a16" strokeWidth="1.2" />
            <rect x="272" y="103" width="18" height="46" fill="none" stroke="#fffdf8" strokeWidth="1.6" strokeDasharray="4 3" />
            <text x="281" y="169" textAnchor="middle" fontSize="9.5" fill="#5c564d">
              crop
            </text>

            <path
              d="M 281 184 V 224"
              stroke="#c89429"
              strokeWidth="2.6"
              strokeLinecap="butt"
              fill="none"
              markerEnd="url(#runtime-arrowhead-mobile)"
            />

            <text x="18" y="203" fontSize="9" fill="#5c564d" letterSpacing="0.12em">
              4. CLASSIFIER
            </text>
            <text
              x="18"
              y="219"
              fontSize="14"
              fill="#1c1a16"
              fontFamily="var(--font-geist-sans), sans-serif"
              fontWeight="700"
            >
              EfficientNet-V2-M
            </text>
            <rect x="24" y="239" width="294" height="92" fill="#1c1a16" />
            <rect x="18" y="233" width="294" height="92" fill="#f4dc8d" stroke="#1c1a16" strokeWidth="1.3" />
            <text x="30" y="255" fontSize="10.5" fill="#5c564d" letterSpacing="0.08em">
              TOP CANDIDATES
            </text>
            <rect x="30" y="271" width="170" height="8" fill="#1c1a16" opacity="0.9" />
            <rect x="30" y="287" width="116" height="8" fill="#1c1a16" opacity="0.5" />
            <rect x="30" y="303" width="72" height="8" fill="#1c1a16" opacity="0.24" />
            <text x="30" y="343" fontSize="10.5" fill="#5c564d">
              Top-k SKU scores
            </text>

            <rect x="200" y="359" width="112" height="24" fill="#fffdf8" stroke="#ddd5c7" />
            <text
              x="256"
              y="375"
              textAnchor="middle"
              fontSize="10"
              fill="#5c564d"
              letterSpacing="0.05em"
            >
              LOW MARGIN ONLY
            </text>
            <path
              d="M 256 337 V 350"
              stroke="#c89429"
              strokeWidth="2.6"
              strokeLinecap="butt"
              fill="none"
              markerEnd="url(#runtime-arrowhead-mobile)"
            />
            <path
              d="M 256 389 V 420"
              stroke="#c89429"
              strokeWidth="2.6"
              strokeLinecap="butt"
              fill="none"
              markerEnd="url(#runtime-arrowhead-mobile)"
            />

            <text x="18" y="397" fontSize="9" fill="#5c564d" letterSpacing="0.12em">
              5. LOW-MARGIN RERANK
            </text>
            <text
              x="18"
              y="413"
              fontSize="14"
              fill="#1c1a16"
              fontFamily="var(--font-geist-sans), sans-serif"
              fontWeight="700"
            >
              DINOv3 ConvNeXt
            </text>
            <rect x="24" y="435" width="294" height="74" fill="#1c1a16" />
            <rect x="18" y="429" width="294" height="74" fill="#f4efe2" stroke="#ddd5c7" />

            <rect x="30" y="451" width="34" height="26" fill="#9dbd6b" stroke="#1c1a16" strokeWidth="1.1" />
            <path d="M 70 464 H 81" stroke="#c89429" strokeWidth="2.6" strokeLinecap="butt" fill="none" markerEnd="url(#runtime-arrowhead-mobile)" />
            <rect x="90" y="449" width="42" height="30" fill="#efe7d2" stroke="#1c1a16" strokeWidth="1.1" />
            <path d="M 138 464 H 149" stroke="#c89429" strokeWidth="2.6" strokeLinecap="butt" fill="none" markerEnd="url(#runtime-arrowhead-mobile)" />
            <rect x="158" y="439" width="70" height="42" fill="#f7f1e2" stroke="#d8d0c2" />
            <text x="193" y="453" textAnchor="middle" fontSize="9" fill="#5c564d" letterSpacing="0.08em">
              MAX COS
            </text>
            <circle cx="172" cy="467" r="4.2" fill="#9dbd6b" stroke="#1c1a16" strokeWidth="0.9" />
            <circle cx="194" cy="453" r="3.2" fill="#d8d0c2" />
            <circle cx="216" cy="471" r="3.2" fill="#f0cd74" stroke="#1c1a16" strokeWidth="0.8" />
            <line x1="172" y1="467" x2="216" y2="471" stroke="#c89429" strokeWidth="1.1" />
            <line x1="172" y1="467" x2="194" y2="453" stroke="#c89429" strokeWidth="1.1" />
            <path d="M 234 464 H 245" stroke="#c89429" strokeWidth="2.6" strokeLinecap="butt" fill="none" markerEnd="url(#runtime-arrowhead-mobile)" />
            <rect x="254" y="447" width="18" height="32" fill="#f7f1e2" stroke="#d8d0c2" />
            <rect x="258" y="453" width="8" height="5" fill="#1c1a16" opacity="0.92" />
            <rect x="258" y="463" width="6" height="5" fill="#1c1a16" opacity="0.45" />
            <rect x="258" y="473" width="4" height="5" fill="#1c1a16" opacity="0.24" />

            <text x="47" y="493" textAnchor="middle" fontSize="9.5" fill="#5c564d">
              crop
            </text>
            <text x="111" y="493" textAnchor="middle" fontSize="9.5" fill="#5c564d">
              embed
            </text>
            <text x="193" y="493" textAnchor="middle" fontSize="9.5" fill="#5c564d">
              ref bank
            </text>
            <text x="263" y="493" textAnchor="middle" fontSize="9.5" fill="#5c564d">
              rerank
            </text>
          </svg>
        </div>
      </div>

      <FigureCaption className={dottedFigureCaptionClasses}>
        RF-DETR proposes the boxes, one selected box becomes a crop, EfficientNet
        scores the SKU candidates, and only the close calls are embedded, scored
        by max cosine against class references, and reranked with a margin gate.
      </FigureCaption>
    </div>
  );
}

const trainingLanes = [
  {
    title: "DETECTOR",
    summary: "100 epochs, stepping LR down as box quality settled.",
    segments: [
      { label: ["WARMUP"], weight: 360, fill: "#f0d27f" },
      { label: ["STABILIZE"], weight: 288, fill: "#f3df9e" },
      { label: ["POLISH"], weight: 272, fill: "#f4efe2" },
    ],
  },
  {
    title: "CLASSIFIER",
    summary: "Single RF-DETR path, then stronger crop fine-tuning.",
    segments: [
      { label: ["FINE-TUNE"], weight: 486, fill: "#eee6d0" },
      { label: ["REFINE"], weight: 272, fill: "#e5dcc4" },
      { label: ["TUNE"], weight: 162, fill: "#d9cfb5" },
    ],
  },
  {
    title: "RERANKER",
    summary: "Embedder, bank, and selective runtime tuned separately.",
    segments: [
      { label: ["EMBEDDER"], weight: 470, fill: "#efe5cf" },
      { label: ["BANK"], weight: 160, fill: "#eadcbe" },
      { label: ["SELECTIVE", "RUNTIME"], weight: 290, fill: "#e5d1b0" },
    ],
  },
] as const;

function getLaneSegmentWidths(weights: number[], totalWidth: number, minWidth: number) {
  if (weights.length === 0) {
    return [];
  }

  if (totalWidth <= minWidth * weights.length) {
    const evenWidth = totalWidth / weights.length;

    return weights.map((_, index) =>
      index === weights.length - 1
        ? totalWidth - evenWidth * (weights.length - 1)
        : evenWidth
    );
  }

  const totalWeight = weights.reduce((sum, value) => sum + value, 0);
  const widths = new Array(weights.length).fill(0);
  let remainingWidth = totalWidth;
  let remainingWeight = totalWeight;
  let flexible = weights.map((_, index) => index);

  while (flexible.length > 0) {
    const locked = flexible.filter(
      (index) => (weights[index] / remainingWeight) * remainingWidth < minWidth
    );

    if (locked.length === 0) {
      break;
    }

    for (const index of locked) {
      widths[index] = minWidth;
      remainingWidth -= minWidth;
      remainingWeight -= weights[index];
    }

    flexible = flexible.filter((index) => !locked.includes(index));

    if (remainingWidth <= 0 || remainingWeight <= 0) {
      break;
    }
  }

  if (flexible.length > 0 && remainingWidth > 0 && remainingWeight > 0) {
    const lastFlexible = flexible[flexible.length - 1];
    let usedWidth = 0;

    for (const index of flexible) {
      const width = (weights[index] / remainingWeight) * remainingWidth;
      widths[index] = width;
      usedWidth += width;
    }

    widths[lastFlexible] += remainingWidth - usedWidth;
  }

  return widths;
}

function TrainingFigure({ showDots = true }: { showDots?: boolean }) {
  const desktopWidth = 1280;
  const desktopHeight = 520;
  const desktopCardX = 86;
  const desktopCardWidth = 1108;
  const desktopCardHeight = 112;
  const desktopCardGap = 24;
  const desktopBarX = desktopCardX + 28;
  const desktopBarWidth = desktopCardWidth - 56;
  const desktopBarHeight = 34;
  const desktopCardTop = 68;
  const desktopCardShadowOffset = 6;
  const mobileWidth = 340;
  const mobileHeight = 436;
  const mobileCardX = 18;
  const mobileCardWidth = 304;
  const mobileCardHeight = 108;
  const mobileCardGap = 16;
  const mobileBarX = 34;
  const mobileBarWidth = 272;
  const mobileBarHeight = 32;
  const mobileCardTop = 38;
  const mobileCardShadowOffset = 4;

  return (
    <div>
      <div className="hidden md:block">
        <svg viewBox={`0 0 ${desktopWidth} ${desktopHeight}`} className="h-auto w-full">
          <defs>
            <pattern
              id="training-dots-desktop"
              width="18"
              height="18"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.5" cy="1.5" r="1.2" fill="#eadfbc" />
            </pattern>
          </defs>
          {showDots ? (
            <rect width={desktopWidth} height={desktopHeight} fill="url(#training-dots-desktop)" />
          ) : null}

          <text x={desktopCardX} y="42" fontSize="12" fill="#b8a877" letterSpacing="0.18em">
            TRAINING LANES
          </text>

          {trainingLanes.map((lane, laneIndex) => {
            const cardY = desktopCardTop + laneIndex * (desktopCardHeight + desktopCardGap);
            const barY = cardY + 38;
            const summaryY = barY + 56;
            const widths = getLaneSegmentWidths(
              lane.segments.map((segment) => segment.weight),
              desktopBarWidth,
              160
            );
            const summaryLines = wrapFigureText(lane.summary, 92);
            let cursorX = desktopBarX;

            return (
              <g key={`desktop-${lane.title}`}>
                <rect
                  x={desktopCardX + desktopCardShadowOffset}
                  y={cardY + desktopCardShadowOffset}
                  width={desktopCardWidth}
                  height={desktopCardHeight}
                  fill="#1c1a16"
                  opacity="0.14"
                />
                <rect
                  x={desktopCardX}
                  y={cardY}
                  width={desktopCardWidth}
                  height={desktopCardHeight}
                  fill="#fffdf8"
                  stroke="#ddd5c7"
                />
                <text
                  x={desktopBarX}
                  y={cardY + 22}
                  fontSize="12"
                  fill="#5c564d"
                  letterSpacing="0.16em"
                >
                  {lane.title}
                </text>
                <rect
                  x={desktopBarX}
                  y={barY}
                  width={desktopBarWidth}
                  height={desktopBarHeight}
                  fill="#f4efe2"
                  stroke="#ddd5c7"
                />

                {lane.segments.map((segment, segmentIndex) => {
                  const segmentX = cursorX;
                  const segmentWidth = widths[segmentIndex];
                  const segmentCenter = segmentX + segmentWidth / 2;
                  const labelY = barY + (segment.label.length > 1 ? 13 : 21);
                  const labelSize = segment.label.length > 1 ? "10.5" : "11";
                  cursorX += segmentWidth;

                  return (
                    <g key={`desktop-${lane.title}-${segment.label.join("-")}`}>
                      <rect
                        x={segmentX}
                        y={barY}
                        width={segmentWidth}
                        height={desktopBarHeight}
                        fill={segment.fill}
                        stroke="#ddd5c7"
                      />
                      <text
                        x={segmentCenter}
                        y={labelY}
                        textAnchor="middle"
                        fontSize={labelSize}
                        fill="#1c1a16"
                        letterSpacing="0.08em"
                      >
                        {segment.label.map((line, lineIndex) => (
                          <tspan
                            key={`desktop-${lane.title}-${line}-${lineIndex}`}
                            x={segmentCenter}
                            dy={lineIndex === 0 ? 0 : 11}
                          >
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  );
                })}

                <text x={desktopBarX} y={summaryY} fontSize="15" fill="#5c564d">
                  {summaryLines.map((line, lineIndex) => (
                    <tspan
                      key={`desktop-${lane.title}-summary-${lineIndex}`}
                      x={desktopBarX}
                      dy={lineIndex === 0 ? 0 : 16}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="md:hidden">
        <svg viewBox={`0 0 ${mobileWidth} ${mobileHeight}`} className="h-auto w-full">
          <defs>
            <pattern
              id="training-dots-mobile"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.5" cy="1.5" r="1.1" fill="#eadfbc" />
            </pattern>
          </defs>
          {showDots ? (
            <rect width={mobileWidth} height={mobileHeight} fill="url(#training-dots-mobile)" />
          ) : null}

          <text x="18" y="24" fontSize="10" fill="#b8a877" letterSpacing="0.18em">
            TRAINING LANES
          </text>

          {trainingLanes.map((lane, laneIndex) => {
            const cardY = mobileCardTop + laneIndex * (mobileCardHeight + mobileCardGap);
            const barY = cardY + 34;
            const summaryY = cardY + 84;
            const widths = getLaneSegmentWidths(
              lane.segments.map((segment) => segment.weight),
              mobileBarWidth,
              50
            );
            const summaryLines = wrapFigureText(lane.summary, 44);
            let cursorX = mobileBarX;

            return (
              <g key={lane.title}>
                <rect
                  x={mobileCardX + mobileCardShadowOffset}
                  y={cardY + mobileCardShadowOffset}
                  width={mobileCardWidth}
                  height={mobileCardHeight}
                  fill="#1c1a16"
                />
                <rect
                  x={mobileCardX}
                  y={cardY}
                  width={mobileCardWidth}
                  height={mobileCardHeight}
                  fill="#fffdf8"
                  stroke="#ddd5c7"
                />
                <text
                  x={mobileBarX}
                  y={cardY + 20}
                  fontSize="10"
                  fill="#5c564d"
                  letterSpacing="0.16em"
                >
                  {lane.title}
                </text>
                <rect
                  x={mobileBarX}
                  y={barY}
                  width={mobileBarWidth}
                  height={mobileBarHeight}
                  fill="#f4efe2"
                  stroke="#ddd5c7"
                />

                {lane.segments.map((segment, segmentIndex) => {
                  const segmentX = cursorX;
                  const segmentWidth = widths[segmentIndex];
                  const segmentCenter = segmentX + segmentWidth / 2;
                  const labelY = barY + (segment.label.length > 1 ? 12 : 20);
                  const labelSize = segment.label.length > 1 ? "8" : "8.6";
                  cursorX += segmentWidth;

                  return (
                    <g key={`${lane.title}-${segment.label.join("-")}`}>
                      <rect
                        x={segmentX}
                        y={barY}
                        width={segmentWidth}
                        height={mobileBarHeight}
                        fill={segment.fill}
                        stroke="#ddd5c7"
                      />
                      <text
                        x={segmentCenter}
                        y={labelY}
                        textAnchor="middle"
                        fontSize={labelSize}
                        fill="#1c1a16"
                        letterSpacing="0.08em"
                      >
                        {segment.label.map((line, lineIndex) => (
                          <tspan
                            key={`${lane.title}-${line}-${lineIndex}`}
                            x={segmentCenter}
                            dy={lineIndex === 0 ? 0 : 9}
                          >
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  );
                })}

                <text x={mobileBarX} y={summaryY} fontSize="10.5" fill="#5c564d">
                  {summaryLines.map((line, lineIndex) => (
                    <tspan
                      key={`${lane.title}-summary-${lineIndex}`}
                      x={mobileBarX}
                      dy={lineIndex === 0 ? 0 : 12}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <FigureCaption className={dottedFigureCaptionClasses}>
        The detector, classifier, and reranker were trained in separate lanes, then
        stitched into one compact runtime with extra compute reserved for the
        ambiguous cases.
      </FigureCaption>
    </div>
  );
}

export default function NorgesgruppenShelfSystemPage() {
  const [imagesStat, annotationsStat, medianStat, maxStat] = validationStats;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto w-full max-w-4xl px-4 py-10 text-base leading-relaxed text-foreground sm:px-6 md:px-8">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.25em] text-(--muted) underline-offset-4 hover:text-foreground hover:underline"
        >
          ← Back to updates
        </Link>

        <header className="mt-6 space-y-4 border-b border-black/10 pb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-(--muted)">
            Project Write-up / Competition
          </p>
          <h1 className="text-3xl font-serif leading-tight tracking-tight text-foreground sm:text-4xl">
            Retail shelf detection and classification for the NorgesGruppen Data challenge
          </h1>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-(--muted)">
            <span>March 2026</span>
            <span>5 minute read</span>
          </div>
          <div className="space-y-3 pt-4">
            <div className="flex flex-wrap items-start gap-3">
              <a
                href="https://github.com/nilsvselte/nmiai2"
                target="_blank"
                rel="noreferrer noopener"
                className={buttonBaseClasses}
              >
                <GitHubIcon />
                <span>GitHub Repo</span>
              </a>
              <a
                href="https://github.com/nilsvselte/nmiai2/blob/main/SUBMISSION.md"
                target="_blank"
                rel="noreferrer noopener"
                className={buttonBaseClasses}
              >
                <PaperIcon />
                <span>Submission Notes</span>
              </a>
            </div>
            <div className="flex flex-wrap items-start gap-3">
              <RankingBadge />
            </div>
          </div>
        </header>

        <section className="mt-8 space-y-4 text-[15px] leading-relaxed text-foreground sm:text-base">
          <p>
            This project was built for the NorgesGruppen Data challenge, a retail
            computer vision benchmark built around crowded grocery shelves. Each
            image contains many products, often with visually similar packaging, and
            the task is to both draw the product boxes and identify the exact SKU.
          </p>
          <p>
            The local validation split had <strong>{imagesStat.value}</strong> images
            and <strong>{annotationsStat.value}</strong> annotated products, with a
            median of <strong>{medianStat.value}</strong> boxes per image and a
            maximum of <strong>{maxStat.value}</strong>. Detection mattered first,
            because the competition score weighted box quality more heavily than the
            classification term.
          </p>
          <p>
            The runtime also had to remain compact. The submission ran in an offline
            sandbox and had to stay under <strong>420 MB unzipped</strong>, so the
            final design could not rely on an oversized ensemble or a long chain of
            expensive models.
          </p>
        </section>

        <div className="mt-10 space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-serif leading-snug">The system</h2>
            <p>
              The final runtime is easiest to understand as a staged pipeline. A
              detector sees the full shelf and proposes boxes, those proposals are
              cropped and passed to a classifier, and only the low-margin cases are
              sent through a reference-based recheck step.
            </p>
            <p>
              That structure was mainly about precision under constraint. Most crops
              do not need a second opinion. The extra computation only becomes
              useful when the packaging is close enough that the classifier is
              uncertain.
            </p>
            <BreakoutFigure className="mt-10">
              <div className="space-y-8 pt-7 pb-2" style={figureDotsStyle}>
                <div className={dottedFigureNoteOffsetClasses}>
                  <aside className={dottedFigureNoteClasses}>
                    RF-DETR works on the full shelf and only produces box
                    coordinates. One selected box is then cropped and passed to
                    EfficientNet for the SKU decision. If the classifier margin
                    stays small, that crop is embedded, each candidate class
                    takes its best cosine match from the reference bank, and
                    that score is added back to the classifier before a
                    margin-gated relabel.
                  </aside>
                </div>
                <div className="-mt-11 md:-mt-12">
                  <SystemFigure showDots={false} />
                </div>
              </div>
            </BreakoutFigure>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif leading-snug">What moved the score</h2>
            <p>
              The early improvements came from making the detector stack stronger and
              more stable. The larger jump came later, when the pipeline moved away
              from the ensemble and into a single RF-DETR 2XL path with a stronger
              crop classifier and, at the end, a selective reranker.
            </p>
            <p>
              The progression below is the clearest summary. Detector-centric
              baselines raised the floor, but the decisive movement came from
              improving crop-level decisions and only adding the embedder where it
              actually changed the answer.
            </p>
            <BreakoutFigure className="mt-10">
              <div className="pt-7 pb-2" style={figureDotsStyle}>
                <div className={dottedFigureNoteOffsetClasses}>
                  <aside className={dottedFigureNoteClasses}>
                    Detector changes improved the floor. The biggest jump came when
                    the stack moved away from the ensemble, kept a single RF-DETR
                    2XL path, strengthened crop classification, and later added
                    selective reranking for the ambiguous cases only.
                  </aside>
                </div>
                <div className="mt-8">
                  <ScoreProgressChart points={scoreProgression} showDots={false} />
                </div>
                <FigureCaption className={dottedFigureCaptionClasses}>
                  The main shift was not another detector family. It was the move
                  to a cleaner single-detector path with stronger crop
                  classification and a targeted reranker.
                </FigureCaption>
              </div>
            </BreakoutFigure>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif leading-snug">Training setup</h2>
            <p>
              The final submission was not trained as one monolithic system. The
              detector, classifier, and reranker each had a separate lane, which
              made it possible to improve the crop stage without destabilizing the
              full-image detector, and to attach the reranker only after the rest of
              the runtime was already working.
            </p>
            <p>
              In practice, this is also what made the compact runtime possible. The
              pipeline could keep the main path small and predictable while still
              gaining a more careful reference-based decision stage for the hardest
              cases.
            </p>
            <BreakoutFigure>
              <div className="pt-5 pb-2" style={figureDotsStyle}>
                <TrainingFigure showDots={false} />
              </div>
            </BreakoutFigure>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-serif leading-snug">Results</h2>
            <p>
              The remaining errors were mostly near-neighbor packaging confusions:
              products that already look close to a human observer, especially when
              they are partially occluded or visually compressed on a shelf. That is
              exactly the failure mode where a reference-based recheck makes sense.
            </p>
            <p>
              The final result was therefore less about one dramatic architectural
              choice and more about making each stage do a narrower job well:
              detect, crop, classify, and only then recheck the ambiguous cases.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
