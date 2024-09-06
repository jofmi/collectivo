import { readItems } from "@directus/sdk";
import type { UseFetchOptions } from "nuxt/app";

export function initData(): DataWrapper<any> {
  return {
    data: null,
    error: null,
    loading: false,
    saving: false,
  };
}

export async function useCollectivoFetch(
  request: string,
  opts?: UseFetchOptions<unknown, unknown, any, null, string, "get">,
) {
  const directus = useDirectus();
  const token = await directus.getToken();
  return await useFetch(request, {
    ...(opts || {}),
    headers: {
      Authorization: `Bearer ${token}`,
      ...(opts?.headers || {}),
    },
  });
}

export async function getDataFromDirectusItems(
  wrapper: Ref<DataWrapper<unknown>>,
  name: keyof CollectivoSchema,
  reload?: boolean,
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
