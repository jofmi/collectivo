import { readItems, readMe, readUser } from "@directus/sdk";

export const useMembersMe = () =>
  useState<DataWrapper<CollectivoMember>>("collectivo_members_me", () =>
    initData()
  );

export const getMembersMe = async () => {
  const { $directus } = useNuxtApp();
  const currentMember = useMembersMe();
  const currentUser = useCurrentUser();
  if (currentMember.value.data) return currentMember;
  currentMember.value.loading = true;
  console.log("getting members me");
  try {
    if (!currentUser.value.data) {
      currentUser.value.data = await $directus?.request(
        readMe({
          fields: ["id", "first_name", "last_name", "email"],
        })
      );
    }
    console.log("currentUser", currentUser.value.data);
    const member = await $directus?.request(
      readItems("collectivo_members", {
        fields: ["*"],
        filter: {
          user: {
            _eq: currentUser.value.data?.id,
          },
        },
      })
    );
    if (member) {
      if (member.length == 1) {
        currentMember.value.data = member[0];
      } else {
        currentMember.value.error = "Member not found";
      }
    }
  } catch (error) {
    currentMember.value.error = error;
  }
  currentMember.value.loading = false;
  return currentMember;
};
