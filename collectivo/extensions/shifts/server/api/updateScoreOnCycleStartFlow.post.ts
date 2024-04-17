import { createItems, readItems } from "@directus/sdk";
import { DateTime } from "luxon";

export default defineEventHandler(async (event) => {
  verifyCollectivoApiToken(event);
  console.log("THE EVENT");
  console.log(new Date());

  const directus = await useDirectusAdmin();

  const assignments = await directus.request(
    readItems("shifts_assignments", {
      fields: ["*"],
    }),
  );

  const requests = [];

  for (const assignment of assignments) {
    const nbLogs = 1;

    for (let i = 0; i < nbLogs; i++) {
      const types = [
        ShiftLogType.ATTENDED,
        ShiftLogType.ATTENDED,
        ShiftLogType.MISSED,
        ShiftLogType.CANCELLED,
      ];

      requests.push({
        shifts_type: types[getRandomInt(0, types.length)],
        shifts_datetime: DateTime.now(),
        shifts_assignment: assignment.id,
      });
    }

    break;
  }

  const answer = await directus.request(createItems("shifts_logs", requests));
  console.log(answer);
});
