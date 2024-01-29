export const useCollectivoTitle = () =>
  useState<string>("collectivoTitle", () => "");

export const setCollectivoTitle = (title: string) => {
  useCollectivoTitle().value = title;

  useHead({
    title: title + " - " + useAppConfig().projectName,
  });
};

export const useCollectivoMenus = () =>
  useState<CollectivoMenus>("collectivoMenus", () => {
    return {
      main: [],
      public: [],
    };
  });

interface CollectivoFormTest {
  message: string;
  test: (() => boolean) | (() => Promise<boolean>);
}

interface CollectivoFormTests {
  [index: string]: CollectivoFormTest;
}

export const useCollectivoFormTests = () =>
  useState<CollectivoFormTests>("collectivoFormTests", () => {
    return {};
  });
