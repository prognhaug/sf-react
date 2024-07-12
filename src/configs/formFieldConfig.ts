import {
  FormFieldsConnection,
  FormFieldsInstanceSolution,
  FormFieldsInstance,
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
const formFieldsInstanceSolution: FormFieldsInstanceSolution = {
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

const formFieldsInstance: FormFieldsInstance = {
  // Tripletex
  [settleMatch]: {
    accountingSystem: {
      [tripletex]: [
        {
          label: "Bank Account Number",
          type: "text",
          name: "bankAccountNumber",
        },
        {
          label: "Settlement Account Number",
          type: "text",
          name: "settlementAccountNumber",
        },
        {
          label: "Fee Account Number",
          type: "text",
          name: "feeAccountNumber",
        },
        { label: "Tenant ID", type: "text", name: "tenantID" },
      ],
    },
    paymentSystem: {
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
    },
    matchingConfig: [
      {
        label: "Settlement Field",
        type: "text",
        name: "settlementField",
      },
      {
        label: "Settlement Regex",
        type: "text",
        name: "settlementRegex",
      },
      {
        label: "Invoice Field",
        type: "text",
        name: "invoiceField",
      },
      {
        label: "Invoice Regex",
        type: "text",
        name: "invoiceRegex",
      },
      {
        label: "Open Settlement Field",
        type: "text",
        name: "openSettlementField",
      },
      {
        label: "Open Settlement Regex",
        type: "text",
        name: "openSettlementRegex",
      },
    ],
  },
  [costOfGoods]: {
    // Tripletex
    [tripletex]: [
      {
        label: "Inventory Account Number",
        type: "text",
        name: "inventoryAccountNumber",
      },
      {
        label: "Cost Of Goods Account Number",
        type: "text",
        name: "costOfGoodsAccountNumber",
      },
    ],
  },
};

interface FormObject {
  name?: string;
  selectedSolution?: string;
  selectedConnections?: string[];
  config?: {
    bankAccountNumber?: string;
    feeAccountNumber?: string;
    tenantID?: string;
    settlementAccountNumber?: string;
    inventoryAccountNumber?: string;
    costOfGoodsAccountNumber?: string;
    lastPayoutId?: string;
    ledgerId?: string;
    cursorFees?: string;
    lastPayoutDate?: string;
    cursorFunds?: string;
    settlementField?: string;
    invoiceField?: string;
    openSettlementField?: string;
    settlementRegex?: string;
    invoiceRegex?: string;
    openSettlementRegex?: string;
  };
}

interface APIObject {
  name?: string;
  solutionID?: string;
  connections?: string[];
  config?: {
    accounting_system?: {
      bankAccountNumber?: string;
      feeAccountNumber?: string;
      tenantID?: string;
      settlementAccountNumber?: string;
      inventoryAccountNumber?: string;
      costOfGoodsAccountNumber?: string;
    };
    payment_system?: {
      lastPayoutId?: string;
      ledgerId?: string;
      cursorFees?: string;
      lastPayoutDate?: string;
      cursorFunds?: string;
    };
    matching_config?: {
      settlementField?: string;
      invoiceField?: string;
      openSettlementField?: string;
      settlementRegex?: string;
      invoiceRegex?: string;
      openSettlementRegex?: string;
    };
  };
}

function mapInstanceData(simplified: FormObject): APIObject {
  return {
    name: simplified.name,
    solutionID: simplified.selectedSolution,
    connections: simplified.selectedConnections,
    config: {
      accounting_system: {
        bankAccountNumber: simplified.config?.bankAccountNumber,
        feeAccountNumber: simplified.config?.feeAccountNumber,
        tenantID: simplified.config?.tenantID,
        settlementAccountNumber: simplified.config?.settlementAccountNumber,
        inventoryAccountNumber: simplified.config?.inventoryAccountNumber,
        costOfGoodsAccountNumber: simplified.config?.costOfGoodsAccountNumber,
      },
      payment_system: {
        lastPayoutId: simplified.config?.lastPayoutId,
        ledgerId: simplified.config?.ledgerId,
        cursorFees: simplified.config?.cursorFees,
        lastPayoutDate: simplified.config?.lastPayoutDate,
        cursorFunds: simplified.config?.cursorFunds,
      },
      matching_config: {
        settlementField: simplified.config?.settlementField,
        invoiceField: simplified.config?.invoiceField,
        openSettlementField: simplified.config?.openSettlementField,
        settlementRegex: simplified.config?.settlementRegex,
        invoiceRegex: simplified.config?.invoiceRegex,
        openSettlementRegex: simplified.config?.openSettlementRegex,
      },
    },
  };
}

export {
  formFieldsConnection,
  formFieldsInstanceSolution,
  formFieldsInstance,
  mapInstanceData,
};
