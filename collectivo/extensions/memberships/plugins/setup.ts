export default defineNuxtPlugin({
  name: "memberships-setup",
  async setup() {
    const menu = useCollectivoMenus();
    const user = useCollectivoUser();

    const publicItems: CollectivoMenuItem[] = [
      {
        label: "Register",
        icon: "i-system-uicons-document-stack",
        to: "/memberships/register",
        order: 200,
        filter: (_item) => {
          return true;
        },
      },
    ];

    menu.value.public.push(...publicItems);

    const profileInputs: CollectivoFormFields = {
      another: {
        label: "Another profile field",
        type: "text",
        order: 4,
        disabled: true,
      },
    };

    user.value.fields = Object.assign(profileInputs, user.value.fields);
  },
});
