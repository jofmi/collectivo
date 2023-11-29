export const useTiles = () =>
  useState<DataWrapper<CollectivoTile[]>>("collectivo_tiles", initData);

export const getTiles = async () => {
  return await getDataFromDirectusItems(useTiles(), "collectivo_tiles");
};
