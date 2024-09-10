import type { DirectusUser } from "@directus/sdk";

declare global {
  interface CollectivoSchema {
    memberships: MembershipsMembership[];
  }

  interface CollectivoUser {
    memberships: MembershipsMembership[] | number[];
  }

  interface MembershipsMembership {
    id: number;
    name: string;
    memberships_user: DirectusUser | number;
    memberships_status: string;
    memberships_type: string;
    memberships_shares: number;
  }
}

export {};
