export const useCurrentUser = () =>
  useState<DataWrapper<CollectivoCurrentUser>>("collectivo_current_user", () =>
    initData(),
  );
