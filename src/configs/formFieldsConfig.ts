import {
  FormFieldsConnection,
  FormFieldsSolution,
  FormFieldsInstanceSettleMatch,
  FormFieldsInstanceCostOfGoods,
  FieldConfig,
} from "../models/types";

const settleMatch = "6665ae0ee7a1177ea26e3580";
const reVouch = "668d364a1740a10825396852";
const costOfGoods = "668d36421740a10825396850";
const tripletex = "6665adb5e7a1177ea26e3572";
const vipps = "6665add7e7a1177ea26e3578";
const klarna = "6665addee7a1177ea26e357a";
const stripe = "6665ade9e7a1177ea26e357e";

const formFieldsConnection: FormFieldsConnection = {
  // SETUP CONNECTIONS SYSTEMS
  // Tripletex
  [tripletex]: [
    { label: "Name", type: "text", name: "name" },
    { label: "Client ID", type: "text", name: "clientID" },
    { label: "Tenant ID", type: "text", name: "tenantID" },
  ],
  //Vipps
  [vipps]: [
    { label: "Name", type: "text", name: "name" },
    { label: "Client ID", type: "text", name: "clientID" },
    { label: "Client Secret", type: "text", name: "clientSecret" },
    { label: "Subscription Key", type: "text", name: "subscriptionKey" },
  ],
  // Klarna
  [klarna]: [
    { label: "Name", type: "text", name: "name" },
    { label: "Client ID", type: "text", name: "clientID" },
    { label: "Client Secret", type: "text", name: "clientSecret" },
  ],
  // Stripe
  [stripe]: [{ label: "Client Secret", type: "text", name: "clientSecret" }],
};

// SETUP INSTANCE SOLUTIONS
const formFieldsInstance: FormFieldsSolution = {
  // SettleMatch
  [settleMatch]: [
    { label: "Name", type: "text", name: "name" },
    {
      label: "Accounting System Connection",
      type: "dropdown",
      name: "connection_accounting",
    },
    {
      label: "Payment System Connection",
      type: "dropdown",
      name: "connection_payment",
    },
  ],

  // ReVouch
  [reVouch]: [
    { label: "Name", type: "text", name: "name" },
    {
      label: "Accounting System Connection",
      type: "dropdown",
      name: "connection_accounting",
    },
  ],
  // CostOfGoods
  [costOfGoods]: [
    { label: "Name", type: "text", name: "name" },
    {
      label: "Accounting System Connection",
      type: "dropdown",
      name: "connection_accounting",
    },
  ],
};

const formFieldsInstanceSettleMatch: FormFieldsInstanceSettleMatch = {
  // Tripletex
  [tripletex]: [
    { label: "Bank Account Number", type: "number", name: "bankAccountNumber" },
    {
      label: "Settlement Account Number",
      type: "number",
      name: "settlementAccountNumber",
    },
    { label: "Fee Account Number", type: "number", name: "feeAccountNumber" },
    { label: "Subscription Key", type: "text", name: "subscriptionKey" },
    { label: "Tenant ID", type: "text", name: "tenantID" },
  ],
  // Vipps
  [vipps]: [
    { label: "Last Payout ID", type: "text", name: "lastPayoutId" },
    {
      label: "Last Payout Date YYYY-MM-DD",
      type: "text",
      name: "lastPayoutDate",
    },
    {
      label: "Ledger ID (Optional)",
      type: "text",
      name: "ledgerId",
    },
    { label: "Cursor Funds (Optional)", type: "text", name: "cursorFunds" },
    { label: "Cursor Fees (Optional)", type: "text", name: "cursorFees" },
  ],
  // Klarna
  [klarna]: [
    { label: "Last Payout ID", type: "text", name: "lastPayoutId" },
    {
      label: "Last Payout Date YYYY-MM-DD",
      type: "text",
      name: "lastPayoutDate",
    },
  ],
  // Stripe
  [stripe]: [
    { label: "Last Payout ID", type: "text", name: "lastPayoutId" },
    {
      label: "Last Payout Date YYYY-MM-DD",
      type: "text",
      name: "lastPayoutDate",
    },
    { label: "Ledger ID (Optional)", type: "text", name: "ledgerId" },
  ],
};

const matchingConfigFields: FieldConfig[] = [
  {
    label: "Settlement Field",
    type: "text",
    name: "config.matching_config.settlement_field",
  },
  {
    label: "Settlement Regex",
    type: "text",
    name: "config.matching_config.settlement_regex",
  },
  {
    label: "Invoice Field",
    type: "text",
    name: "config.matching_config.invoice_field",
  },
  {
    label: "Invoice Regex",
    type: "text",
    name: "config.matching_config.invoice_regex",
  },
  {
    label: "Open Settlement Field",
    type: "text",
    name: "config.matching_config.open_settlement_field",
  },
  {
    label: "Open Settlement Regex",
    type: "text",
    name: "config.matching_config.open_settlement_regex",
  },
];

const formFieldsInstanceCostOfGoods: FormFieldsInstanceCostOfGoods = {
  // Tripletex
  [tripletex]: [
    {
      label: "Inventory Account Number",
      type: "number",
      name: "inventoryAccountNumber",
    },
    {
      label: "Cost Of Goods Account Number",
      type: "number",
      name: "costOfGoodsAccountNumber",
    },
  ],
};

export {
  formFieldsConnection,
  formFieldsInstance,
  formFieldsInstanceSettleMatch,
  formFieldsInstanceCostOfGoods,
  matchingConfigFields,
};
