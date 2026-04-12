import scoreboardRaw from "@/content/data/norgesgruppen/experiment_scoreboard.json";
import validationRaw from "@/content/data/norgesgruppen/validation_stats.json";

type ScoreRecord = {
  name: string;
  family: string;
  weighted_score: number;
};

const scoreboard = scoreboardRaw as { records: ScoreRecord[] };
const validation = validationRaw as {
  image_count: number;
  annotation_count: number;
  boxes_per_image_median: number;
  boxes_per_image_max: number;
};

const round = (value: number, digits = 4) =>
  Number.parseFloat(value.toFixed(digits));

export const scoreProgression = scoreboard.records
  .filter((record) =>
    [
      "RF-DETR baseline",
      "YOLOv8L detector",
      "RF-DETR + YOLO ensemble",
      "Tuned ensemble package",
      "Stage A classifier",
      "Stage B e4 classifier",
      "Final submission candidate",
    ].includes(record.name)
  )
  .map((record) => ({
    name: record.name,
    shortLabel:
      {
        "RF-DETR baseline": "RF-DETR",
        "YOLOv8L detector": "YOLO",
        "RF-DETR + YOLO ensemble": "Ensemble",
        "Tuned ensemble package": "Tuned",
        "Stage A classifier": "Fine-tune",
        "Stage B e4 classifier": "Refine",
        "Final submission candidate": "+ reranker",
      }[record.name] ?? record.name,
    family: record.family,
    weightedScore: round(record.weighted_score),
    detail:
      {
        "RF-DETR baseline":
          "Single-detector baseline using RF-DETR before classifier-heavy changes.",
        "YOLOv8L detector":
          "Alternative single-detector baseline used to test whether a different detector family lifted the floor.",
        "RF-DETR + YOLO ensemble":
          "Combined RF-DETR and YOLO proposals to recover more boxes on dense shelves.",
        "Tuned ensemble package":
          "Sandbox-tuned ensemble runtime before the project pivoted away from multi-detector inference.",
        "Stage A classifier":
          "Moved away from the ensemble and into a single RF-DETR 2XL path with a stronger crop classifier fine-tune.",
        "Stage B e4 classifier":
          "Refined the classifier on harder crop decisions and more targeted shelf mistakes.",
        "Final submission candidate":
          "Embedded the ambiguous crop, took the best cosine match for each candidate class from the reference bank, and blended that with the classifier log-score under a relabel margin.",
      }[record.name] ?? "",
  }));

export const validationStats = [
  {
    label: "Validation images",
    value: `${validation.image_count}`,
  },
  {
    label: "Annotated products",
    value: `${validation.annotation_count.toLocaleString()}`,
  },
  {
    label: "Median boxes / image",
    value: `${validation.boxes_per_image_median}`,
  },
  {
    label: "Max boxes / image",
    value: `${validation.boxes_per_image_max}`,
  },
];
