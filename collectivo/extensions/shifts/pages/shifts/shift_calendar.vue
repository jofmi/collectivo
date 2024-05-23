<script setup lang="ts">
import { datetime, RRule, RRuleSet } from "rrule";

setCollectivoTitle("Shifts");

const rruleSet = new RRuleSet();

const slotRuleFreq = RRule.MONTHLY;

const slotRule = new RRule({
  freq: slotRuleFreq,
  count: 5,
  dtstart: datetime(2012, 2, 1, 10, 30),
});

rruleSet.rrule(slotRule);

const assignment_from = datetime(2012, 3, 2, 10, 30);
const assignment_to = datetime(2012, 4, 2, 10, 30);

rruleSet.exrule(
  new RRule({
    freq: slotRuleFreq,
    dtstart: slotRule.after(assignment_from),
    until: slotRule.before(assignment_to),
  }),
);
</script>

<template>
  {{ rruleSet.all() }}
  <CollectivoContainer>
    <ShiftsCalendar />
  </CollectivoContainer>
</template>
