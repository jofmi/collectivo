export default defineNuxtPlugin(() => {
  const menu = useCollectivoMenus();

  menu.value.main.push({
    label: "My shifts",
    icon: "i-system-uicons-calendar-days",
    to: "/shifts/my_shifts",
    order: 100,
  });
});
