export const useCollectivoPageTitle = () =>
  useState<string>("pageTitle", () => "");

export const setCollectivoPageTitle = (title: string) => {
  useCollectivoPageTitle().value = title;

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
