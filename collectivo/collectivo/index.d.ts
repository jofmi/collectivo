import { DirectusUser } from "@directus/sdk";

declare global {
  // Database schema
  interface CollectivoSchema {
    collectivo_extensions: CollectivoExtension[];
    collectivo_tiles: CollectivoTile[];
    collectivo_tags: CollectivoTag[];
    directus_users: CollectivoUser[];
  }

  interface DataWrapper<T> {
    data: T | null | undefined;
    error: Error | null | undefined | unknown;
    loading: boolean;
    saving: boolean;
  }

  interface CollectivoUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    [key: string]: string | undefined;
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

  interface CollectivoExtension {
    id: number;
    name: string;
    version: string;
    schema_version: number;
    schema_is_latest: boolean;
  }

  interface CollectivoSettings {
    id: number;
    collectivo_project_name: string;
    collectivo_project_description: string;
    collectivo_members_role: string;
    collectivo_admin_role: string;
  }

  // Layout
  interface CollectivoMenus {
    main: CollectivoMenuItem[];
    public: CollectivoMenuItem[];
  }

  interface CollectivoMenuItem {
    label: string;
    icon?: string;
    to?: string;
    click?: () => void;
    external?: boolean; // Defaults to false
    target?: string; // Default "_self"
    order?: number; // Default 100
    hideOnMobile?: boolean; // Default false
    filter?: (item: CollectivoMenuItem) => boolean;
  }

  // Profile section
  interface CollectivoUserInput {
    label: string;
    key: string;
    disabled?: boolean;
    order?: number;
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
    value: string;
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
    value?: string | number | RegExp;
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
        type: "select" | "select-radio" | "multiselect-checkbox";
        choices?: FormInputChoice[];
      }
    | {
        type: "text" | "number" | "email" | "password" | "textarea" | "date";
        placeholder?: string;
        icon?: string;
      }
    | {
        type: "checkbox" | "toggle";
      }
    | {
        type: "custom-input";
        component: any;
      };

  type FormFieldLayout =
    | {
        type: "section" | "description"; // TODO: "page" |
        content: string;
      }
    | {
        type: "clear";
      }
    | {
        type: "custom";
        component: any;
      };
}

// Types for input of app.config.ts
declare module "nuxt/schema" {
  interface AppConfigInput {}
}

export {};
