//
// const member = await $directus?.request(
//     readItems("collectivo_members", {
//       fields: ["*"],
//       filter: {
//         user: {
//           _eq: currentUser.value.data?.id,
//         },
//       },
//     })
//   );

//   if (member) {
//     if (member.length == 1) {
//       currentMember.value.data = member[0];
//     } else {
//       currentMember.value.error = "Member not found";
//     }
//   }
// } catch (error) {
//   currentMember.value.error = error;
// }
