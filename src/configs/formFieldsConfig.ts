import { FormFieldsConfig } from "../models/types";

const formFieldsConfig: FormFieldsConfig = {
  // SYSTEMS
  // Tripletex
  "6665adb5e7a1177ea26e3572": [
    { label: "Name", type: "text", name: "name" },
    { label: "Client ID", type: "text", name: "clientID" },
    { label: "Client Secret", type: "text", name: "clientSecret" },
    { label: "Subscription Key", type: "text", name: "subscriptionKey" },
    { label: "Tenant ID", type: "text", name: "tenantID" },
  ],
  //Vipps
  "6665add7e7a1177ea26e3578": [
    { label: "Name", type: "text", name: "name" },
    { label: "Client ID", type: "text", name: "clientID" },
    { label: "Client Secret", type: "text", name: "clientSecret" },
    { label: "Subscription Key", type: "text", name: "subscriptionKey" },
    { label: "Tenant ID", type: "text", name: "tenantID" },
  ],
  // Klarna
  "6665addee7a1177ea26e357a": [
    { label: "Name", type: "text", name: "name" },
    { label: "Client ID", type: "text", name: "clientID" },
    { label: "Client Secret", type: "text", name: "clientSecret" },
  ],
  // Stripe
  "6665ade9e7a1177ea26e357e": [
    { label: "Name", type: "text", name: "name" },
    { label: "Client ID", type: "text", name: "clientID" },
    { label: "Client Secret", type: "text", name: "clientSecret" },
  ],

  // SOLUTIONS
  // SettleMatch
  "6665ae0ee7a1177ea26e3580": [
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
  "668d364a1740a10825396852": [
    { label: "Name", type: "text", name: "name" },
    {
      label: "Accounting System Connection",
      type: "dropdown",
      name: "connection_accounting",
    },
  ],
  // CostOfGoods
  "668d36421740a10825396850": [
    { label: "Name", type: "text", name: "name" },
    {
      label: "Accounting System Connection",
      type: "dropdown",
      name: "connection_accounting",
    },
  ],
};

export default formFieldsConfig;
