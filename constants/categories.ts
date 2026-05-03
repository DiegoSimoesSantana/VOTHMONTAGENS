export const PROJECT_CATEGORIES = [
  "montagem",
  "manutencao",
  "inspecao",
  "teste-hidrostatico",
  "spda",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  montagem: "Montagem",
  manutencao: "Manutenção",
  inspecao: "Inspeção",
  "teste-hidrostatico": "Teste Hidrostático",
  spda: "SPDA",
};

export const PROJECT_CATEGORY_FILTERS: ReadonlyArray<{ label: string; value: "" | ProjectCategory }> = [
  { label: "Todos", value: "" },
  { label: "Teste Hidrostático", value: "teste-hidrostatico" },
  { label: "Montagem", value: "montagem" },
  { label: "Manutenção", value: "manutencao" },
  { label: "Inspeção", value: "inspecao" },
  { label: "SPDA", value: "spda" },
];

export function isProjectCategory(value?: string | null): value is ProjectCategory {
  if (!value) return false;
  return (PROJECT_CATEGORIES as readonly string[]).includes(value);
}
