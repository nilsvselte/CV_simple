import katex from "katex";

const colors = {
  ink: "#1c1a16",
  muted: "#5c564d",
  line: "#d8d0c2",
  paper: "#fffdf8",
  paperMuted: "#f4efe2",
  dots: "#eadfbc",
  orange: "#c89429",
};

const contextSwitchSweepCounts = [0, 1, 2, 3, 4, 6, 8, 10, 12, 14, 16, 18, 20];
const examplePairWidth = 72;
const examplePairHeight = 34;

export function PromptSwitchFigure() {
  return <ReferenceInferenceFigure />;
}

function ReferenceInferenceFigure() {
  return (
    <div className="px-2 sm:px-4 md:px-6">
      <div className="hidden md:block">
        <svg
          viewBox="0 0 1280 600"
          className="h-auto w-full"
          role="img"
          aria-labelledby="reference-inference-title reference-inference-desc"
        >
          <title id="reference-inference-title">
            Inference setup for context stickiness
          </title>
          <desc id="reference-inference-desc">
            Linear examples are shown before a task switch, quadratic examples
            are shown after the switch, and query error is measured over a sweep
            of context lengths and training curricula.
          </desc>
          <defs>
            <marker
              id="reference-arrowhead"
              markerWidth="12"
              markerHeight="11"
              markerUnits="userSpaceOnUse"
              refX="3.2"
              refY="5.5"
              orient="auto"
            >
              <path d="M0 0 L9.5 5.5 L0 11 Z" fill={colors.orange} />
            </marker>
            <marker
              id="reference-axis-arrow"
              markerWidth="8"
              markerHeight="8"
              markerUnits="userSpaceOnUse"
              refX="4"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L7 4 L0 8 Z" fill={colors.ink} />
            </marker>
          </defs>

          <text
            x="26"
            y="40"
            fontSize="12"
            fill="#b8a877"
            letterSpacing="0.2em"
          >
            INFERENCE SETUP
          </text>

          <ReferenceStageHeader
            x={38}
            y={86}
            index="1"
            kicker="CONTEXT A"
            title="Linear examples"
          />
          <ReferenceStageHeader
            x={420}
            y={86}
            index="2"
            kicker="SWITCH"
            title="Task switch"
          />
          <ReferenceStageHeader
            x={610}
            y={86}
            index="3"
            kicker="CONTEXT B"
            title="Quadratic examples"
          />
          <ReferenceStageHeader
            x={990}
            y={86}
            index="4"
            kicker="EVALUATE"
            title="Query and error"
          />

          <ReferenceLinearPanel x={38} y={132} />
          <ReferenceSwitchRail x={498} y={136} />
          <ReferenceQuadraticPanel x={610} y={132} />
          <ReferenceQueryPanel x={990} y={132} />
          <ReferenceCurriculumCompare x={816} y={468} />

          <path
            d="M 390 248 H 454"
            stroke={colors.orange}
            strokeWidth="4"
            strokeLinecap="butt"
            fill="none"
            markerEnd="url(#reference-arrowhead)"
          />
          <path
            d="M 530 248 H 584"
            stroke={colors.orange}
            strokeWidth="4"
            strokeLinecap="butt"
            fill="none"
            markerEnd="url(#reference-arrowhead)"
          />
          <path
            d="M 946 248 H 974"
            stroke={colors.orange}
            strokeWidth="4"
            strokeLinecap="butt"
            fill="none"
            markerEnd="url(#reference-arrowhead)"
          />
        </svg>
      </div>

      <div className="md:hidden">
        <svg
          viewBox="0 0 360 1235"
          className="h-auto w-full"
          role="img"
          aria-labelledby="reference-inference-mobile-title reference-inference-mobile-desc"
        >
          <title id="reference-inference-mobile-title">
            Inference setup for context stickiness
          </title>
          <desc id="reference-inference-mobile-desc">
            A mobile layout of the linear context, switch, quadratic recovery
            context, and query error measure.
          </desc>
          <defs>
            <marker
              id="reference-arrowhead-mobile"
              markerWidth="8"
              markerHeight="7"
              markerUnits="userSpaceOnUse"
              refX="2.2"
              refY="3.5"
              orient="auto"
            >
              <path d="M0 0 L6 3.5 L0 7 Z" fill={colors.orange} />
            </marker>
            <marker
              id="reference-axis-arrow-mobile"
              markerWidth="7"
              markerHeight="7"
              markerUnits="userSpaceOnUse"
              refX="3.5"
              refY="3.5"
              orient="auto"
            >
              <path d="M0 0 L6 3.5 L0 7 Z" fill={colors.ink} />
            </marker>
          </defs>

          <text
            x="50"
            y="30"
            fontSize="10"
            fill="#b8a877"
            letterSpacing="0.18em"
          >
            INFERENCE SETUP
          </text>
          <ReferenceMobileStageHeader
            x={50}
            y={64}
            index="1"
            kicker="CONTEXT A"
            title="Linear examples"
          />
          <ReferenceLinearPanel x={50} y={104} scale={0.84} mobile />
          <ReferenceMobileSwitchDivider x={180} y={378} />
          <ReferenceMobileStageHeader
            x={46}
            y={430}
            index="3"
            kicker="CONTEXT B"
            title="Quadratic examples"
          />
          <ReferenceQuadraticPanel x={46} y={470} scale={0.84} mobile />
          <ReferenceMobileStageHeader
            x={55}
            y={750}
            index="4"
            kicker="EVALUATE"
            title="Query and error"
          />
          <ReferenceQueryPanel x={55} y={788} mobile />
          <g transform="translate(25 1110) scale(0.72)">
            <ReferenceCurriculumCompare x={0} y={0} />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ReferenceStageHeader({
  x,
  y,
  index,
  kicker,
  title,
}: {
  x: number;
  y: number;
  index: string;
  kicker: string;
  title: string;
}) {
  return (
    <g>
      <text
        x={x}
        y={y}
        fontSize="13"
        fill={colors.muted}
        letterSpacing="0.16em"
        fontFamily="var(--font-geist-mono), monospace"
      >
        {index}. {kicker}
      </text>
      <text
        x={x}
        y={y + 31}
        fontSize="25"
        fill={colors.ink}
        fontFamily="var(--font-geist-sans), sans-serif"
        fontWeight="700"
      >
        {title}
      </text>
    </g>
  );
}

function ReferenceMobileStageHeader({
  x,
  y,
  index,
  kicker,
  title,
}: {
  x: number;
  y: number;
  index: string;
  kicker: string;
  title: string;
}) {
  return (
    <g>
      <text
        x={x}
        y={y}
        fontSize="10"
        fill={colors.muted}
        letterSpacing="0.14em"
        fontFamily="var(--font-geist-mono), monospace"
      >
        {index}. {kicker}
      </text>
      <text
        x={x}
        y={y + 24}
        fontSize="18"
        fill={colors.ink}
        fontFamily="var(--font-geist-sans), sans-serif"
        fontWeight="700"
      >
        {title}
      </text>
    </g>
  );
}

function ReferenceExamplePair({
  x,
  y,
  subscript,
  accent,
}: {
  x: number;
  y: number;
  subscript: string;
  accent: "green" | "gold";
}) {
  const fill = accent === "gold" ? "#fff4c5" : "#eef1dc";
  const stroke = accent === "gold" ? "#b88d21" : "#8d9b65";
  const centerY = y;
  const leftCenter = x + examplePairWidth * 0.25;
  const rightCenter = x + examplePairWidth * 0.75;
  const subscriptFontSize =
    subscript.length > 5 ? 5.5 : subscript.includes("+") || subscript.includes("_") ? 6.5 : 9;

  return (
    <g>
      <rect
        x={x}
        y={centerY - examplePairHeight / 2}
        width={examplePairWidth}
        height={examplePairHeight}
        fill={fill}
        stroke={stroke}
      />
      <path
        d={`M ${x + examplePairWidth / 2} ${centerY - examplePairHeight / 2} V ${centerY + examplePairHeight / 2}`}
        stroke={stroke}
      />
      <text
        x={leftCenter}
        y={centerY + 3}
        textAnchor="middle"
        fontSize="15"
        fill={colors.ink}
        fontFamily="KaTeX_Math, KaTeX_Main, Georgia, serif"
        fontStyle="italic"
      >
        <tspan>x</tspan>
        <tspan baselineShift="sub" fontSize={subscriptFontSize}>
          {subscript}
        </tspan>
      </text>
      <text
        x={rightCenter}
        y={centerY + 3}
        textAnchor="middle"
        fontSize="15"
        fill={colors.ink}
        fontFamily="KaTeX_Math, KaTeX_Main, Georgia, serif"
        fontStyle="italic"
      >
        <tspan>y</tspan>
        <tspan baselineShift="sub" fontSize={subscriptFontSize}>
          {subscript}
        </tspan>
      </text>
    </g>
  );
}

function ReferenceLinearFormula({ x, y }: { x: number; y: number }) {
  return (
    <text
      x={x}
      y={y}
      fontSize="18"
      fill="#657d3a"
      fontFamily="KaTeX_Math, KaTeX_Main, Georgia, serif"
      fontStyle="italic"
    >
      y = ax + b
    </text>
  );
}

function ReferenceQuadraticFormula({ x, y }: { x: number; y: number }) {
  return (
    <text
      x={x}
      y={y}
      fontSize="18"
      fill="#bf8e18"
      fontFamily="KaTeX_Math, KaTeX_Main, Georgia, serif"
      fontStyle="italic"
    >
      <tspan>y = ax</tspan>
      <tspan baselineShift="super" fontSize="11">
        2
      </tspan>
      <tspan> + bx + c</tspan>
    </text>
  );
}

function ReferenceLinearPanel({
  x,
  y,
  scale = 1,
  mobile = false,
}: {
  x: number;
  y: number;
  scale?: number;
  mobile?: boolean;
}) {
  const axisMarker = mobile
    ? "url(#reference-axis-arrow-mobile)"
    : "url(#reference-axis-arrow)";

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect
        width="310"
        height="255"
        fill="#fbfdf3"
        stroke="#8fa06c"
        strokeWidth="1.5"
      />
      <ReferenceExamplePair x={24} y={39} subscript="1" accent="green" />
      <ReferenceExamplePair x={104} y={39} subscript="2" accent="green" />
      <text x={201} y={44} textAnchor="middle" fontSize="22" fill={colors.ink}>
        ...
      </text>
      <ReferenceExamplePair x={226} y={39} subscript="n_l" accent="green" />
      <path
        d="M 32 219 H 284"
        stroke={colors.ink}
        strokeWidth="1.5"
        markerEnd={axisMarker}
      />
      <path
        d="M 32 219 V 86"
        stroke={colors.ink}
        strokeWidth="1.5"
        markerEnd={axisMarker}
      />
      <path
        d="M 54 198 L 210 116"
        stroke="#687d3e"
        strokeWidth="2"
        fill="none"
      />
      {[
        [52, 198],
        [72, 178],
        [106, 168],
        [132, 178],
        [148, 139],
        [178, 158],
        [204, 128],
        [232, 139],
      ].map(([cx, cy], index) => (
        <circle
          key={`linear-dot-${index}`}
          cx={cx}
          cy={cy}
          r="5"
          fill="#657d3a"
        />
      ))}
      <ReferenceLinearFormula x={206} y={176} />
      <text
        x={74}
        y={278}
        fontSize="13"
        fill={colors.muted}
        letterSpacing="0.08em"
      >
        misleading context
      </text>
    </g>
  );
}

function ReferenceQuadraticPanel({
  x,
  y,
  scale = 1,
  mobile = false,
}: {
  x: number;
  y: number;
  scale?: number;
  mobile?: boolean;
}) {
  const axisMarker = mobile
    ? "url(#reference-axis-arrow-mobile)"
    : "url(#reference-axis-arrow)";

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect
        width="318"
        height="255"
        fill="#fff9df"
        stroke="#c89429"
        strokeWidth="1.5"
      />
      <ReferenceExamplePair x={24} y={39} subscript="n_l+1" accent="gold" />
      <ReferenceExamplePair x={104} y={39} subscript="n_l+2" accent="gold" />
      <text x={201} y={44} textAnchor="middle" fontSize="22" fill={colors.ink}>
        ...
      </text>
      <ReferenceExamplePair x={226} y={39} subscript="n_l+n_q" accent="gold" />
      <path
        d="M 32 219 H 286"
        stroke={colors.ink}
        strokeWidth="1.5"
        markerEnd={axisMarker}
      />
      <path
        d="M 32 219 V 86"
        stroke={colors.ink}
        strokeWidth="1.5"
        markerEnd={axisMarker}
      />
      <path
        d="M 64 98 C 89 212, 158 214, 176 102"
        stroke="#bf8e18"
        strokeWidth="2"
        fill="none"
      />
      {[
        [60, 103],
        [68, 133],
        [88, 168],
        [118, 198],
        [156, 178],
        [172, 148],
        [184, 126],
      ].map(([cx, cy], index) => (
        <circle
          key={`quad-dot-${index}`}
          cx={cx}
          cy={cy}
          r="5"
          fill="#b88916"
        />
      ))}
      <ReferenceQuadraticFormula x={178} y={176} />
      <text
        x={90}
        y={278}
        fontSize="13"
        fill={colors.muted}
        letterSpacing="0.08em"
      >
        recovery context
      </text>
    </g>
  );
}

function ReferenceSwitchRail({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path
        d={`M ${x} ${y + 44} V ${y + 250}`}
        stroke={colors.ink}
        strokeWidth="1.5"
      />
      <circle cx={x} cy={y + 146} r="8" fill={colors.ink} />
    </g>
  );
}

function ReferenceMobileSwitchDivider({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path
        d={`M ${x - 80} ${y} H ${x - 58}`}
        stroke={colors.line}
        strokeWidth="1.2"
      />
      <path
        d={`M ${x + 58} ${y} H ${x + 80}`}
        stroke={colors.line}
        strokeWidth="1.2"
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize="11"
        fill={colors.muted}
        letterSpacing="0.14em"
        fontFamily="var(--font-geist-mono), monospace"
      >
        2. SWITCH
      </text>
    </g>
  );
}

function ReferenceQueryPanel({
  x,
  y,
  mobile = false,
}: {
  x: number;
  y: number;
  mobile?: boolean;
}) {
  const arrowMarker = mobile
    ? "url(#reference-arrowhead-mobile)"
    : "url(#reference-arrowhead)";

  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width="250"
        height="255"
        fill="#fffdf8"
        stroke={colors.ink}
        strokeWidth="1.5"
      />
      <rect
        x="30"
        y="20"
        width="190"
        height="39"
        fill="#fffdf8"
        stroke="#bdb6a8"
      />
      <text
        x="64"
        y="45"
        textAnchor="middle"
        fontSize="17"
        fill={colors.ink}
        fontFamily="KaTeX_Math, KaTeX_Main, Georgia, serif"
        fontStyle="italic"
      >
        <tspan>x</tspan>
        <tspan baselineShift="super" fontSize="10">
          *
        </tspan>
      </text>
      <path
        d="M 86 39 H 120"
        stroke={colors.ink}
        strokeWidth="1.4"
        markerEnd={arrowMarker}
      />
      <text
        x="134"
        y="45"
        fontSize="16"
        fill={colors.ink}
        fontFamily="KaTeX_Main, Georgia, serif"
      >
        predict{" "}
        <tspan
          fontFamily="KaTeX_Math, KaTeX_Main, Georgia, serif"
          fontStyle="italic"
        >
          y
        </tspan>
        <tspan baselineShift="super" fontSize="10">
          *
        </tspan>
      </text>
      <path d="M 20 72 H 230" stroke="#d8d0c2" />
      <text
        x="54"
        y="102"
        fontSize="12"
        fill={colors.muted}
        letterSpacing="0.08em"
      >
        <tspan>sweep over n</tspan>
        <tspan baselineShift="sub" fontSize="8">
          l
        </tspan>
        <tspan> and n</tspan>
        <tspan baselineShift="sub" fontSize="8">
          q
        </tspan>
      </text>
      <ReferenceHeatmapGrid x={51} y={112} cellHeight={6.4} cellWidth={9.5} />
      <ReferenceHeatmapLegend x={184} y={112} height={83.2} />
      <text x="208" y="122" fontSize="11" fill={colors.muted}>
        high
      </text>
      <text x="208" y="194" fontSize="11" fill={colors.muted}>
        low
      </text>
      <text
        x="125"
        y="230"
        textAnchor="middle"
        fontSize="13"
        fill={colors.muted}
        letterSpacing="0.08em"
      >
        measure prediction error
      </text>
      <text
        x="125"
        y="244"
        textAnchor="middle"
        fontSize="13"
        fill={colors.muted}
        letterSpacing="0.08em"
      >
        after the switch
      </text>
    </g>
  );
}

function ReferenceHeatmapGrid({
  x,
  y,
  cellSize = 6.4,
  cellHeight = cellSize,
  cellWidth = cellSize,
  showAxisLabels = true,
}: {
  x: number;
  y: number;
  cellSize?: number;
  cellHeight?: number;
  cellWidth?: number;
  showAxisLabels?: boolean;
}) {
  const palette = [
    "#fffdf8",
    "#fbf3da",
    "#f7e7b7",
    "#f2d77f",
    "#ecc65a",
    "#dca936",
    "#c89429",
  ];
  const cols = contextSwitchSweepCounts.length;
  const rows = contextSwitchSweepCounts.length;
  const gridHeight = rows * cellHeight;
  const gridWidth = cols * cellWidth;
  const tickValues = [0, 4, 10, 20];

  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: cols * rows }).map((_, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const preSwitchShare = col / (cols - 1);
        const postSwitchShare = (rows - row - 1) / (rows - 1);
        const shade = Math.min(
          palette.length - 1,
          Math.max(
            0,
            Math.round(
              (preSwitchShare * 0.85 + (1 - postSwitchShare) * 0.65) * 4.3 -
                0.6,
            ),
          ),
        );

        return (
          <rect
            key={`heat-${index}`}
            x={col * cellWidth}
            y={row * cellHeight}
            width={cellWidth}
            height={cellHeight}
            fill={palette[shade]}
            stroke="#9d968a"
            strokeWidth={showAxisLabels ? 0.35 : 0.2}
          />
        );
      })}
      <rect
        width={gridWidth}
        height={gridHeight}
        fill="none"
        stroke="#7e776d"
        strokeWidth={showAxisLabels ? 0.8 : 0.45}
      />
      {showAxisLabels ? (
        <>
          {tickValues.map((tick) => {
            const tickIndex = contextSwitchSweepCounts.indexOf(tick);
            const tickX = tickIndex * cellWidth + cellWidth / 2;
            const tickY = (rows - tickIndex - 1) * cellHeight + cellHeight / 2;

            return (
              <g key={`sweep-tick-${tick}`}>
                <text
                  x={tickX}
                  y={gridHeight + 9}
                  textAnchor="middle"
                  fontSize="7"
                  fill={colors.muted}
                >
                  {tick}
                </text>
                <text
                  x="-5"
                  y={tickY + 2.5}
                  textAnchor="end"
                  fontSize="7"
                  fill={colors.muted}
                >
                  {tick}
                </text>
              </g>
            );
          })}
          <text
            x={gridWidth / 2}
            y={gridHeight + 21}
            textAnchor="middle"
            fontSize="8"
            fill={colors.muted}
            letterSpacing="0.06em"
          >
            <tspan>n</tspan>
            <tspan baselineShift="sub" fontSize="6">
              l
            </tspan>
          </text>
          <text
            transform={`translate(-25 ${gridHeight / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize="8"
            fill={colors.muted}
            letterSpacing="0.06em"
          >
            <tspan>n</tspan>
            <tspan baselineShift="sub" fontSize="6">
              q
            </tspan>
          </text>
        </>
      ) : null}
    </g>
  );
}

function ReferenceHeatmapLegend({
  x,
  y,
  height = 72,
}: {
  x: number;
  y: number;
  height?: number;
}) {
  const fills = [
    "#c89429",
    "#dca936",
    "#ecc65a",
    "#f2d77f",
    "#f7e7b7",
    "#fbf3da",
  ];
  const bandHeight = height / fills.length;

  return (
    <g transform={`translate(${x} ${y})`}>
      {fills.map((fill, index) => (
        <rect
          key={`legend-${fill}`}
          x="0"
          y={index * bandHeight}
          width="14"
          height={bandHeight}
          fill={fill}
        />
      ))}
      <rect width="14" height={height} fill="none" stroke="#c89429" />
    </g>
  );
}

function ReferenceCurriculumCompare({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <text
        x="0"
        y="-32"
        fontSize="13"
        fill={colors.muted}
        letterSpacing="0.16em"
      >
        5. TRAINING CURRICULUMS
      </text>
      <text
        x="0"
        y="-4"
        fontSize="20"
        fill={colors.ink}
        fontFamily="var(--font-geist-sans), sans-serif"
        fontWeight="700"
      >
        Compare different training curricula
      </text>
      <rect y="14" width="430" height="112" fill="#fbf8ef" stroke="#d8d0c2" />
      <ReferenceCurriculumTile
        x={18}
        y={32}
        label="sequential"
        variant="sequential"
      />
      <ReferenceCurriculumTile x={158} y={32} label="mixed" variant="mixed" />
      <ReferenceCurriculumTile x={298} y={32} label="random" variant="random" />
      <text
        x="26"
        y="104"
        fontSize="12"
        fill={colors.muted}
        letterSpacing="0.08em"
      >
        <tspan x="26">Repeat the experiment across different training</tspan>
        <tspan x="26" dy="14">
          curricula.
        </tspan>
      </text>
    </g>
  );
}

function ReferenceCurriculumTile({
  x,
  y,
  label,
  variant,
}: {
  x: number;
  y: number;
  label: string;
  variant: "sequential" | "mixed" | "random";
}) {
  const points =
    variant === "random"
      ? [
          { cx: 26, cy: 22, fill: "#c89429" },
          { cx: 54, cy: 28, fill: "#9dbd6b" },
          { cx: 78, cy: 20, fill: "#c89429" },
          { cx: 100, cy: 26, fill: "#9dbd6b" },
        ]
      : [
          { cx: 28, cy: 24, fill: "#9dbd6b" },
          { cx: 62, cy: 24, fill: variant === "mixed" ? "#c89429" : "#9dbd6b" },
          { cx: 96, cy: 24, fill: variant === "mixed" ? "#c89429" : "#9dbd6b" },
        ];

  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="120" height="58" fill="#fffdf8" stroke="#d8d0c2" />
      {variant !== "random" ? (
        <path
          d="M 28 24 H 96"
          stroke={colors.ink}
          strokeWidth="1.2"
          opacity="0.6"
        />
      ) : null}
      {points.map((point, index) => (
        <circle
          key={`${variant}-${index}`}
          cx={point.cx}
          cy={point.cy}
          r="5"
          fill={point.fill}
          stroke={colors.ink}
          strokeWidth="1"
          opacity="0.85"
        />
      ))}
      <text
        x="60"
        y="47"
        textAnchor="middle"
        fontSize="12"
        fill={colors.muted}
        fontFamily="var(--font-geist-mono), monospace"
      >
        {label}
      </text>
    </g>
  );
}

export function CurriculumEquations() {
  const ruleTextClasses = "text-[15px] leading-relaxed text-[#5c564d]";
  const ruleSectionClasses = "space-y-2";

  return (
    <div className="mr-auto my-7 max-w-4xl space-y-2">
      <section className={ruleSectionClasses}>
        <h3 className="font-serif text-lg leading-snug text-[#1c1a16]">
          Sequential curriculum
        </h3>
        <p className={ruleTextClasses}>
          The model sees only the linear family in the first half of training,
          then only the quadratic family in the second half.
        </p>
        <NumberedEquation latex={sequentialCurriculumLatex} number={1} />
      </section>

      <section className={ruleSectionClasses}>
        <h3 className="font-serif text-lg leading-snug text-[#1c1a16]">
          Mixed curriculum
        </h3>
        <p className={ruleTextClasses}>
          The first half is still linear-only. In the second half, each batch is
          sampled from a uniform mixture of the two task families, with ξ ~ Unif
          {"{"}1, 2{"}"}.
        </p>
        <NumberedEquation latex={mixedCurriculumLatex} number={2} />
      </section>

      <section className={ruleSectionClasses}>
        <h3 className="font-serif text-lg leading-snug text-[#1c1a16]">
          Random curriculum
        </h3>
        <p className={ruleTextClasses}>
          There is no ordering pressure: at every training step the task family
          is sampled uniformly, with ζ ~ Unif{"{"}1, 2{"}"} independently across
          steps.
        </p>
        <NumberedEquation latex={randomCurriculumLatex} number={3} />
      </section>
    </div>
  );
}

function NumberedEquation({
  latex,
  number,
}: {
  latex: string;
  number: number;
}) {
  const equationHtml = katex
    .renderToString(latex, {
      displayMode: true,
      output: "html",
      strict: false,
      throwOnError: false,
    })
    .replace(
      'class="katex-display"',
      'class="katex-display" style="margin:0;text-align:left;"',
    );

  return (
    <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2 sm:gap-6">
      <div
        className="context-sticks-equation min-w-0 max-w-full text-left"
        dangerouslySetInnerHTML={{ __html: equationHtml }}
      />
      <span className="justify-self-end text-[0.72em] not-italic text-black/35">
        ({number})
      </span>
    </div>
  );
}

const sequentialCurriculumLatex = String.raw`
f_t \sim
\begin{cases}
  \mathcal{F}_1, & 1 \le t < \frac{T}{2}, \\
  \mathcal{F}_2, & \frac{T}{2} \le t \le T.
\end{cases}
`;

const mixedCurriculumLatex = String.raw`
f_t \sim
\begin{cases}
  \mathcal{F}_1, & 1 \le t < \frac{T}{2}, \\
  \displaystyle \sum_{s=1}^{2} \mathbf{1}\{\xi = s\}\mathcal{F}_s,
    & \frac{T}{2} \le t \le T.
\end{cases}
`;

const randomCurriculumLatex = String.raw`
f_t \sim
\sum_{s=1}^{2} \mathbf{1}\{\zeta = s\}\mathcal{F}_s,
\qquad 1 \le t \le T.
`;

export function CurriculumFigure() {
  const desktopLanes = [
    {
      label: "SEQUENTIAL",
      note: "first one task, then the other",
      segments: [
        { label: "linear", width: 420, fill: colors.paperMuted },
        { label: "quadratic", width: 420, fill: "#f4dc8d" },
      ],
    },
    {
      label: "MIXED",
      note: "one task first, both later",
      segments: [
        { label: "linear", width: 420, fill: colors.paperMuted },
        { label: "linear + quadratic", width: 420, fill: "#eadcbe" },
      ],
    },
    {
      label: "RANDOM",
      note: "task family sampled each step",
      segments: [
        { label: "l", width: 84, fill: colors.paperMuted },
        { label: "q", width: 84, fill: "#f4dc8d" },
        { label: "q", width: 84, fill: "#f4dc8d" },
        { label: "l", width: 84, fill: colors.paperMuted },
        { label: "q", width: 84, fill: "#f4dc8d" },
        { label: "l", width: 84, fill: colors.paperMuted },
        { label: "l", width: 84, fill: colors.paperMuted },
        { label: "q", width: 84, fill: "#f4dc8d" },
        { label: "l", width: 84, fill: colors.paperMuted },
        { label: "q", width: 84, fill: "#f4dc8d" },
      ],
    },
  ];

  return (
    <div>
      <div className="hidden md:block">
        <svg viewBox="0 0 1280 430" className="h-auto w-full">
          <text
            x="34"
            y="42"
            fontSize="12"
            fill="#b8a877"
            letterSpacing="0.18em"
          >
            TRAINING CURRICULA
          </text>
          <text
            x="34"
            y="78"
            fontSize="25"
            fill={colors.ink}
            fontWeight="700"
            fontFamily="var(--font-geist-sans), sans-serif"
          >
            Three ways to teach the same two tasks
          </text>

          {desktopLanes.map((lane, laneIndex) => {
            const y = 132 + laneIndex * 92;
            let cursorX = 330;

            return (
              <g key={lane.label}>
                <text
                  x="76"
                  y={y + 23}
                  fontSize="12"
                  fill={colors.muted}
                  letterSpacing="0.16em"
                >
                  {lane.label}
                </text>
                <text x="76" y={y + 50} fontSize="13" fill={colors.muted}>
                  {lane.note}
                </text>
                <rect
                  x="330"
                  y={y}
                  width="840"
                  height="52"
                  fill={colors.paper}
                  stroke={colors.line}
                />
                {lane.segments.map((segment, segmentIndex) => {
                  const x = cursorX;
                  cursorX += segment.width;

                  return (
                    <g key={`${lane.label}-${segmentIndex}-${segment.label}`}>
                      <rect
                        x={x}
                        y={y}
                        width={segment.width}
                        height="52"
                        fill={segment.fill}
                        stroke={colors.line}
                      />
                      <text
                        x={x + segment.width / 2}
                        y={y + 33}
                        textAnchor="middle"
                        fontSize={segment.label.length > 8 ? 11 : 12}
                        fill={colors.ink}
                        letterSpacing="0.08em"
                      >
                        {segment.label.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="md:hidden">
        <svg viewBox="0 0 360 520" className="h-auto w-full">
          <text
            x="18"
            y="28"
            fontSize="10"
            fill="#b8a877"
            letterSpacing="0.18em"
          >
            TRAINING CURRICULA
          </text>
          <text
            x="18"
            y="56"
            fontSize="17"
            fill={colors.ink}
            fontWeight="700"
            fontFamily="var(--font-geist-sans), sans-serif"
          >
            Same tasks, different order
          </text>

          {desktopLanes.map((lane, laneIndex) => {
            const y = 94 + laneIndex * 132;
            const totalWidth = lane.segments.reduce(
              (total, segment) => total + segment.width,
              0,
            );
            let cursorX = 28;

            return (
              <g key={`mobile-${lane.label}`}>
                <text
                  x="28"
                  y={y}
                  fontSize="10"
                  fill={colors.muted}
                  letterSpacing="0.16em"
                >
                  {lane.label}
                </text>
                <text x="28" y={y + 21} fontSize="11" fill={colors.muted}>
                  {lane.note}
                </text>
                <rect
                  x="28"
                  y={y + 38}
                  width="304"
                  height="52"
                  fill={colors.paper}
                  stroke={colors.line}
                />
                {lane.segments.map((segment, segmentIndex) => {
                  const width = (segment.width / totalWidth) * 304;
                  const x = cursorX;
                  cursorX += width;

                  return (
                    <g
                      key={`mobile-${lane.label}-${segmentIndex}-${segment.label}`}
                    >
                      <rect
                        x={x}
                        y={y + 38}
                        width={width}
                        height="52"
                        fill={segment.fill}
                        stroke={colors.line}
                      />
                      <text
                        x={x + width / 2}
                        y={y + 70}
                        textAnchor="middle"
                        fontSize={width < 35 ? 8 : 9}
                        fill={colors.ink}
                        letterSpacing="0.06em"
                      >
                        {segment.label.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
