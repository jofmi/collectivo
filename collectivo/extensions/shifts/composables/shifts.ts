import { readItems } from "@directus/sdk";
import { DateTime } from "luxon";
import { datetime, RRule } from "rrule";

export const getAllShiftOccurrences = async (
  from: DateTime,
  to: DateTime,
): Promise<ShiftOccurrence[]> => {
  const directus = useDirectus();

  const shifts: ShiftsShift[] = (await directus.request(
    readItems("shifts_shifts"),
  )) as ShiftsShift[];

  const occurrences = [];

  for (const shift of shifts) {
    occurrences.push(...getOccurrencesForShift(shift, from, to));
  }

  occurrences.sort((a, b) => {
    return a.start.toMillis() - b.start.toMillis();
  });

  return occurrences;
};

export const getNextOccurrences = (
  shift: ShiftsShift,
  maxOccurrences: number,
  after?: DateTime,
) => {
  const nextOccurrences = [];
  let nextOccurrence = getNextOccurrence(shift, after ?? DateTime.now());

  while (nextOccurrence !== null && nextOccurrences.length < maxOccurrences) {
    nextOccurrences.push(nextOccurrence);
    nextOccurrence = getNextOccurrence(shift, nextOccurrence.end);
  }

  return nextOccurrences;
};

export const getNextOccurrence = (shift: ShiftsShift, after?: DateTime) => {
  const date = shiftToRRule(shift).after(
    luxonDateTimeToRruleDatetime(after ?? DateTime.now()),
  );

  return date ? rruleDateToShiftOccurrence(shift, date) : null;
};

export const getOccurrencesForShift = (
  shift: ShiftsShift,
  from: DateTime,
  to: DateTime,
): ShiftOccurrence[] => {
  const dates: Date[] = shiftToRRule(shift).between(
    luxonDateTimeToRruleDatetime(from),
    luxonDateTimeToRruleDatetime(to),
    true,
  );

  const shiftOccurrences: ShiftOccurrence[] = [];

  for (const date of dates) {
    shiftOccurrences.push(rruleDateToShiftOccurrence(shift, date));
  }

  return shiftOccurrences;
};

const rruleDateToShiftOccurrence = (
  shift: ShiftsShift,
  date: Date,
): ShiftOccurrence => {
  const start = DateTime.fromJSDate(date);

  return {
    shift: shift,
    start: start,
    end: start.plus({ minute: shift.shifts_duration }),
  };
};

export const shiftToRRule = (shift: ShiftsShift): RRule => {
  return new RRule({
    freq: RRule.DAILY,
    interval: shift.shifts_repeats_every,
    dtstart: luxonDateTimeToRruleDatetime(DateTime.fromISO(shift.shifts_from)),
    until: shift.shifts_to
      ? luxonDateTimeToRruleDatetime(DateTime.fromISO(shift.shifts_to))
      : null,
  });
};

export const luxonDateTimeToRruleDatetime = (luxonDateTime: DateTime): Date => {
  return datetime(
    luxonDateTime.year,
    luxonDateTime.month,
    luxonDateTime.day,
    luxonDateTime.hour,
    luxonDateTime.minute,
  );
};

export const isShiftDurationModelActive = (
  duration_model: { shifts_from: string; shifts_to?: string },
  atDate?: DateTime,
): boolean => {
  return isFromToActive(
    DateTime.fromISO(duration_model.shifts_from),
    duration_model.shifts_to
      ? DateTime.fromISO(duration_model.shifts_to)
      : undefined,
    atDate,
  );
};

export const isFromToActive = (
  from: DateTime,
  to?: DateTime,
  atDate?: DateTime,
): boolean => {
  if (!atDate) {
    atDate = DateTime.now();
  }

  if (from > atDate) {
    return false;
  }

  return !(to && to < atDate);
};

export const isNextOccurrenceWithinAssignment = (
  assignment: ShiftsAssignment,
): boolean => {
  const nextOccurrence = getNextOccurrence(assignment.shifts_slot.shifts_shift);

  return (
    !!nextOccurrence &&
    isShiftDurationModelActive(assignment, nextOccurrence.start)
  );
};

export const getActiveAssignment = (
  assignments: ShiftsAssignment[],
  atDate?: DateTime,
): ShiftsAssignment | null => {
  for (const assignment of assignments) {
    if (isShiftDurationModelActive(assignment, atDate)) return assignment;
  }

  return null;
};

export const getAssigneeName = (
  assignments: ShiftsAssignment[],
  atDate?: DateTime,
) => {
  if (!atDate) {
    atDate = DateTime.now();
  }

  const assignment = getActiveAssignment(assignments, atDate);

  if (!assignment)
    return "No assignee on " + atDate.toLocaleString(DateTime.DATE_SHORT);

  return (
    assignment.shifts_user.first_name +
    " " +
    assignment.shifts_user.last_name[0] +
    "."
  );
};
