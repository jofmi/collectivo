import { IdentificationIcon } from "@heroicons/vue/24/solid";

export default defineAppConfig({
  mainMenuItems: {
    membership: {
      label: "Shifts",
      link: "/shifts",
      icon: IdentificationIcon,
      order: 10,
    },
  },
});
