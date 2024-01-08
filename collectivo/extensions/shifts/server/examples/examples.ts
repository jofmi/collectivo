// This function can be used to create shifts data for your extension
import { createItem, createItems, deleteItems, readItems } from "@directus/sdk";

import { DateTime } from "luxon";

const times_of_day = [10, 13, 16, 19];

export default async function examples() {
  console.info("Creating example data for shifts");

  await cleanShiftsData();
  await createShifts();
  await createSlots();
  await createSkills();

  console.info("Example data for shifts created");
}

async function cleanShiftsData() {
  const directus = await useDirectusAdmin();

  const schemas = [
    "shifts_shifts",
    "shifts_slots",
    "shifts_skills",
    "shifts_assignments",
  ];

  // Clean up old data
  for (const schema of schemas) {
    await directus.request(deleteItems(schema, { limit: 1000 }));
  }
}

async function createShifts() {
  const directus = await useDirectusAdmin();

  const today = DateTime.now().startOf("day");
  const shiftsRequests = [];

  // Create some membership types
  for (let delta_days = -10; delta_days < 10; delta_days++) {
    const day = today.plus({ days: delta_days });

    for (const time_of_day of times_of_day) {
      const start_time = day.set({ hour: time_of_day });

      shiftsRequests.push({
        shifts_name: "Shop",
        shifts_start_datetime: start_time.toString(),
        shifts_end_datetime: start_time.plus({ hours: 3 }).toString(),
      });
    }
  }

  await directus.request(createItems("shifts_shifts", shiftsRequests));
}

async function createSlots() {
  const directus = await useDirectusAdmin();

  const shifts = await directus.request(readItems("shifts_shifts"));
  const slotsRequests = [];

  for (const shift of shifts) {
    const hour = DateTime.fromISO(shift["shifts_start_datetime"], {
      zone: "UTC",
    }).toLocal().hour;

    if (hour == times_of_day[times_of_day.length - 1]) {
      for (let i = 0; i < 2; i++) {
        slotsRequests.push({
          shifts_name: "Cleaning",
          shifts_shift: shift["id"],
        });
      }
    } else {
      slotsRequests.push({
        shifts_name: "Cashier",
        shifts_shift: shift["id"],
      });

      for (let i = 0; i < 2; i++) {
        slotsRequests.push({
          shifts_name: "Shelves",
          shifts_shift: shift["id"],
        });
      }
    }
  }

  await directus.request(createItems("shifts_slots", slotsRequests));
}

async function createSkills() {
  const directus = await useDirectusAdmin();

  const skill = await directus.request(
    createItem("shifts_skills", {
      shifts_name: "Cashier",
    }),
  );

  const slots = await directus.request(
    readItems("shifts_slots", {
      fields: ["id"],
      filter: { shifts_name: { _eq: "Cashier" } },
    }),
  );

  const requests = [];

  for (const slot of slots) {
    requests.push({
      shifts_skills_id: skill["id"],
      shifts_slots_id: slot["id"],
    });
  }

  await directus.request(createItems("shifts_skills_shifts_slots", requests));
}
