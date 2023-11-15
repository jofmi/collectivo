import { readItems } from "@directus/sdk";

export function initData() {
  return {
    data: null,
    error: null,
    loading: false,
  };
}

export async function getDataFromDirectusItems(
  wrapper: Ref<DataWrapper<any>>,
  name: keyof CollectivoSchema,
  reload?: boolean
) {
  if (!reload && wrapper.value.data) return wrapper;
  const { $directus } = useNuxtApp();
  wrapper.value.loading = true;
  try {
    wrapper.value.data = (await $directus?.request(readItems(name))) || null;
  } catch (error) {
    wrapper.value.error = error;
  }
  wrapper.value.loading = false;
  return wrapper;
}
