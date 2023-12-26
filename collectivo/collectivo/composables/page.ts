export const useCollectivoTitle = () =>
  useState<string>("collectivoTitle", () => "");

export const setCollectivoTitle = (title: string) => {
  useCollectivoTitle().value = title;

  useHead({
    title: title + " - " + useAppConfig().projectName,
  });
};

interface CollectivoMenus {
  main: CollectivoMenuItem[];
  public: CollectivoMenuItem[];
}

export const useCollectivoMenus = () =>
  useState<CollectivoMenus>("collectivoMenus", () => {
    return {
      main: [],
      public: [],
    };
  });
