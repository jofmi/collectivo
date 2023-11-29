import {
  HomeIcon,
  Square3Stack3DIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/outline";

export default defineNuxtPlugin(() => {
  const menu = useSidebarMenu();
  const runtimeConfig = useRuntimeConfig();

  const items = <CollectivoMenuItem[]>[
    {
      icon: HomeIcon,
      label: "Home",
      link: "/",
      order: 0,
    },
    {
      icon: UserCircleIcon,
      label: "Profile",
      link: "/profile",
      order: 0,
    },
    {
      label: "Admin App",
      external: true,
      icon: Square3Stack3DIcon,
      link: runtimeConfig.public.directusUrl,
      order: 99,
      filter: (_item) => {
        return true;
      },
    },
  ];

  menu.value = { ...items };
});
