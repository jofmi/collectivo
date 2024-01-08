export default defineNuxtPlugin(() => {
  const menu = useCollectivoMenus();

  menu.value.main.push({
    label: "Shifts",
    icon: "i-system-uicons-calendar-days",
    to: "/shifts",
    order: 100,
  });
});
