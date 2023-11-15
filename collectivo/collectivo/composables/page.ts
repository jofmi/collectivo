export const usePageTitle = () => useState<string>("pageTitle", () => "");

export const setPageTitle = (title: string) => {
  usePageTitle().value = title;
};

export const useSidebarMenu = () =>
  useState<CollectivoMenuItem[]>("sideBarMenu", () => []);
