import { IdentificationIcon } from "@heroicons/vue/24/solid";

export default defineAppConfig({
  mainMenuItems: {
    membership: {
      label: "Membership",
      link: "/membership",
      icon: IdentificationIcon,
      order: 10,
    },
  },
});
