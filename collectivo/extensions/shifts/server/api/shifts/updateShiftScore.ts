import { RRule } from "rrule";
import { createItems, readItems, readUsers } from "@directus/sdk";
import { ACTIVE_MEMBERSHIP_STATUSES } from "@collectivo/memberships/server/schemas/memberships_01";
import {
  SHIFT_CYCLE_DURATION_WEEKS,
  SHIFT_CYCLE_START,
} from "@collectivo/shifts/server/utils/constants";

import { luxonDateTimeToRruleDatetime } from "@collectivo/shifts/server/utils/luxonDateTimeToRruleDatetime";
import { DateTime } from "luxon";

interface ShiftUser {
  id: string;
  first_name: string;
  shifts_user_type: string;
}

export default defineEventHandler(async (event) => {
  // verifyCollectivoApiToken(event);
  const directus = await useDirectusAdmin();

  const users = (await directus.request(
    readUsers({
      fields: ["id", "first_name", "shifts_user_type"],
    }),
  )) as ShiftUser[];

  // We load logs for all users then filter the logs manually
  // before sending to removePointsForUser
  // in order to avoid doing one DB request per user.
  const cycleLogs = (await directus.request(
    readItems("shifts_logs", {
      fields: ["shifts_date", "shifts_user"],
      sort: "-shifts_date",
      filter: { shifts_type: { _eq: ShiftLogType.CYCLE } },
    }),
  )) as ShiftsLog[];

  const logsToCreate = [];

  for (const user of users) {
    const logsForUser = await createShiftScoreLogs(
      user,
      cycleLogs.filter((log) => log.shifts_user == user.id),
    );

    logsToCreate.push(...logsForUser);
  }

  if (!logsToCreate) return;

  await directus.request(createItems("shifts_logs", logsToCreate));
});

function getCurrentDate() {
  const now = new Date();

  const currentDateUTC = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0,
      0,
      0,
    ),
  );

  return currentDateUTC;
}

async function createShiftScoreLogs(user: ShiftUser, cycleLogs: ShiftsLog[]) {
  let nextCycleDate = undefined;

  if (cycleLogs.length > 0) {
    // Create the next cycle date based on the last cycle log
    nextCycleDate = new Date(cycleLogs[0].shifts_date);
    nextCycleDate.setDate(nextCycleDate.getDate() + 28);
    console.log(nextCycleDate);
  } else {
    // If no cycle logs exist, create the first cycle log at current date
    nextCycleDate = getCurrentDate();
  }

  // Create cycle logs until current date is exceeded
  const requests = [];
  const today = new Date();

  while (nextCycleDate <= today) {
    requests.push({
      shifts_type: ShiftLogType.CYCLE,
      shifts_date: nextCycleDate.toISOString(),
      shifts_user: user.id,
    });

    nextCycleDate.setDate(nextCycleDate.getDate() + 28);
  }

  return requests;
}
