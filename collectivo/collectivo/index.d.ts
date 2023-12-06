import { FunctionalComponent } from "vue";
import { DirectusUser } from "@directus/sdk";

declare global {
  // Server side migration types
  interface CollectivoMigrationDependency {
    name: string;
    id: number;
  }

  interface CollectivoMigration {
    up: () => Promise<void>;
    down: () => Promise<void>;
    dependencies?: CollectivoMigrationDependency[];
  }

  // Directus schema types
  interface CollectivoMenuItem {
    label: string;
    icon?: string;
    to?: string;
    external?: boolean; // Defaults to false
    target?: string; // Defaults to "_self"
    mobile?: boolean; // Defaults to true
    order?: number; // Defaults to 100
    public?: boolean; // Defaults to false
    filter?: (item: CollectivoMenuItem) => boolean;
  }

  // Profile section
  interface CollectivoProfile {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    [key: string]: string | undefined;
  }

  interface CollectivoProfileInput {
    label: string;
    key: string;
    disabled?: boolean;
    order?: number;
  }

  interface CollectivoExtension {
    id: number;
    name: string;
    version: string;
    migration_state: number;
  }

  interface CollectivoSettings {
    id: number;
    collectivo_project_name: string;
    collectivo_project_description: string;
    collectivo_members_role: string;
    collectivo_admin_role: string;
  }

  interface CollectivoMember {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    user: DirectusUser | number;
    status: number;
    collectivo_tags: CollectivoTag[] | number[];
    notes: string;
    files_visible: any;
    files_hidden: any;
  }

  interface CollectivoTag {
    id: number;
    name: string;
    collectivo_members: CollectivoMember[] | number[];
  }

  interface CollectivoTile {
    id: number;
    name: string;
    content: string;
  }

  interface CollectivoSchema {
    collectivo_extensions: CollectivoExtension[];
    collectivo_tiles: CollectivoTile[];
    collectivo_tags: CollectivoTag[];
    directus_users: CollectivoUser[];
  }

  // Wrappers
  interface DataWrapper<T> {
    data: T | null | undefined;
    error: Error | null | undefined | unknown;
    loading: boolean;
    saving: boolean;
  }
}

// Types for input of app.config.ts
declare module "nuxt/schema" {
  interface AppConfigInput {}
}

export {};
