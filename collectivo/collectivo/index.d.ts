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
    click?: () => void;
    external?: boolean; // Defaults to false
    target?: string; // Default "_self"
    order?: number; // Default 100
    public?: boolean; // Default to false - public is ONLY shown to logged out users
    hideOnMobile?: boolean; // Default false
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

  // Forms

  interface CollectivoForm {
    key: string;
    title: string;
    description: string;
    fields: { [key: string]: FormField };
    submitMethod?: "triggerFlow" | (() => void); // TODO: Add createItem updateItem APIpost APIput APIpatch
    submitID?: string;
    public?: boolean;
    // TODO: Add conditions, e.g. user has or has not policy XY
  }

  type FormField = (FormFieldBase & FormFieldLayout) | FormInput;

  interface FormInputChoice {
    key: string;
    value: string | number | boolean;
  }

  interface FormFieldBase {
    width?: "full" | "half" | "third" | "quarter" | "fifth";
    visible?: Ref<boolean>;
    conditions?: FormCondition[];
  }

  interface FormCondition {
    key: string;
    value: string | number | boolean;
    // TODO: Add operator?: "==" | "!=" | ">" | "<" | ">=" | "<=";
  }

  interface FormValidator {
    type: "min" | "max" | "email" | "url" | "regex";
    value: string | number | RegExp;
  }

  type FormInput = {
    label: string;
    default?: boolean;
    required?: boolean;
    disabled?: boolean;
    validators?: FormValidator[];
    description?: string;
  } & FormFieldBase &
    FormInputType;

  type FormInputType =
    | {
        type: "select";
        choices?: FormInputChoice[];
      }
    | {
        type: "text" | "number" | "email" | "password" | "textarea" | "date";
        placeholder?: string;
      }
    | {
        type: "checkbox";
      };

  type FormFieldLayout =
    | {
        type: "section" | "description"; // TODO: "page" |
        content: string;
      }
    | {
        type: "clear";
      };

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
