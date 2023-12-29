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

  // Forms
  interface CollectivoForm {
    title: string;
    fields: CollectivoFormFields;
    public?: boolean;
    submitMode?: "postNuxt" | (() => void);
    submitPath?: string;
    successTitle?: string;
    successText?: string;
    successIcon?: string;
    // successButtons?: {
    //   label: string;
    //   to?: string;
    //   icon?: string;
    // }[];
    // TODO: Add conditions, e.g. user has or has not policy XY
  }
  // TODO: How can an extension add a form input type?

  interface CollectivoFormFields {
    [key: string]: CollectivoFormField;
  }

  type CollectivoFormField =
    | (CollectivoFormFieldBase & CollectivoFormFieldLayout)
    | CollectivoFormInput;

  interface CollectivoFormFieldBase {
    order: number;
    width?: "full" | "xl" | "lg" | "md" | "sm" | "xs";
    conditions?: FormCondition[];
    _visible?: Ref<boolean>;
  }

  type CollectivoFormFieldLayout =
    | {
        type: "description";
        label?: string;
        description: string;
      }
    | {
        type: "section";
        title?: string;
        icon?: string;
        description?: string;
      }
    | {
        type: "clear";
      }
    | {
        type: "custom-layout";
        component: any;
      };

  interface CollectivoFormInputChoice {
    value: string;
    label: string;
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

  type CollectivoFormInput = {
    type: string;
    label?: string;
    default?: any;
    required?: boolean;
    disabled?: boolean;
    validators?: FormValidator[];
    description?: string;
  } & CollectivoFormFieldBase &
    CollectivoFormInputType;

  type CollectivoFormInputType =
    | {
        type: "select" | "select-radio" | "multiselect-checkbox";
        choices?: CollectivoFormInputChoice[];
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
}

// Types for input of app.config.ts
declare module "nuxt/schema" {
  interface AppConfigInput {}
}

export {};
