export const usePageTitle = () => useState<string>("pageTitle", () => "");

export const setPageTitle = (title: string) => {
  usePageTitle().value = title;
  useHead({
    title: title + " - " + useAppConfig().projectName,
  });
};

export const useSidebarMenu = () =>
  useState<CollectivoMenuItem[]>("sideBarMenu", () => []);
