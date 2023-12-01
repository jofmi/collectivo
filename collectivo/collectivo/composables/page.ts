export const usePageTitle = () => useState<string>("pageTitle", () => "");

export const useSidebarMenu = () =>
  useState<CollectivoMenuItem[]>("sideBarMenu", () => []);
