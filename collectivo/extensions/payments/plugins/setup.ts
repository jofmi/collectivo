import { electronicFormatIBAN, isValidIBAN } from "ibantools";

const europeanIBAN = [
  "AD",
  "AT",
  "BE",
  "BG",
  "CH",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GB",
  "GI",
  "GR",
  "HR",
  "HU",
  "IE",
  "IS",
  "IT",
  "LI",
  "LT",
  "LU",
  "LV",
  "MC",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
];

export default defineNuxtPlugin({
  name: "memberships-setup",
  async setup() {
    const menu = useCollectivoMenus();
    const user = useCollectivoUser();
    const tests = useCollectivoFormTests();
    const publicItems: CollectivoMenuItem[] = [];

    menu.value.public.push(...publicItems);

    tests.value.payments_iban_sepa = {
      message: "IBAN not valid for SEPA",
      test: (value: string) => {
        const iban = electronicFormatIBAN(value);

        if (iban && europeanIBAN.includes(iban.substring(0, 2))) {
          return isValidIBAN(iban || "");
        }

        return false;
      },
    };

    const profileInputs: CollectivoFormField[] = [
      {
        type: "section",
        order: 700,
        title: "Payment details",
      },
      {
        label: "Payment type",
        key: "payments_type",
        type: "select",
        order: 710,
        choices: [
          {
            value: "sepa",
            label: "SEPA Direct Debit",
          },
          {
            value: "transfer",
            label: "Transfer",
          },
        ],
      },
      {
        label: "Bank account IBAN",
        key: "payments_account_iban",
        type: "text",
        required: true,
        validators: [{ type: "test", value: "payments_iban_sepa" }],
        order: 720,
      },
      {
        label: "Bank account owner",
        key: "payments_account_owner",
        type: "text",
        order: 730,
      },
    ];

    user.value.fields.push(...profileInputs);
  },
});
