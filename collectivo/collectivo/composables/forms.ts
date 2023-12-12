export const useCollectivoForms = () =>
  useState<{ [key: string]: CollectivoForm }>("collectivo_forms", () => ({}));
