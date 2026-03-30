export type RepairCategory =
  | "diagnostic"
  | "repair"
  | "maintenance"
  | "tearDown"
  | "towing";

export interface CustomerProfile {
  fullName: string;
  phone: string;
  email: string;
}

export interface VehicleProfile {
  year: string;
  make: string;
  model: string;
  vin: string;
  mileage: string;
  licensePlate: string;
}

export interface ThirdPartyPayor {
  name: string;
  amountKnown: boolean;
  approvedAmount?: number;
}

export interface LineItemInput {
  id: string;
  operation: string;
  category: RepairCategory;
  concern: string;
  technicalNotes: string;
  customerFriendlyDescription: string;
  laborHours: number;
  laborRate: number;
  partsCost: number;
  taxRate: number;
  requiresAuthorization: boolean;
}

export interface EstimateFormState {
  repairOrderNumber: string;
  dealershipName: string;
  advisorName: string;
  customer: CustomerProfile;
  vehicle: VehicleProfile;
  concernSummary: string;
  lineItems: LineItemInput[];
  includeThirdPartyPayor: boolean;
  thirdPartyPayor: ThirdPartyPayor;
  includeTearDownDisclosure: boolean;
  includeTowingDisclosure: boolean;
  towingCharge: number;
  tearDownCost: number;
  reassemblyCost: number;
  destroyedPartsEstimate: number;
  canRestoreToOriginalCondition: boolean;
  maxReassemblyHours: number;
}

export interface ComplianceCheck {
  label: string;
  passed: boolean;
  severity: "required" | "recommended";
  detail: string;
}

export interface Totals {
  labor: number;
  parts: number;
  subtotal: number;
  tax: number;
  grandTotal: number;
}

export const defaultEstimateState: EstimateFormState = {
  repairOrderNumber: "RO-10428",
  dealershipName: "FC Developments Auto Group",
  advisorName: "Jordan Reyes",
  customer: {
    fullName: "Alex Martinez",
    phone: "(555) 274-9912",
    email: "alex@example.com",
  },
  vehicle: {
    year: "2021",
    make: "Toyota",
    model: "Camry SE",
    vin: "4T1G11AK8MU123456",
    mileage: "48211",
    licensePlate: "9ABC123",
  },
  concernSummary:
    "Customer reports brake noise, overdue maintenance, and requests a full safety inspection before an upcoming road trip.",
  lineItems: [
    {
      id: "brake-inspection",
      operation: "Front brake inspection and pad replacement",
      category: "repair",
      concern: "Squealing noise while braking",
      technicalNotes:
        "Inspect front pad thickness, rotor condition, caliper slide movement, and brake fluid level.",
      customerFriendlyDescription:
        "Inspect the front brakes, replace worn brake pads, and confirm the braking system is safe for normal driving.",
      laborHours: 1.5,
      laborRate: 185,
      partsCost: 249.95,
      taxRate: 0.0875,
      requiresAuthorization: true,
    },
    {
      id: "maintenance-service",
      operation: "45,000-mile maintenance service",
      category: "maintenance",
      concern: "Vehicle due for scheduled maintenance",
      technicalNotes:
        "Engine oil and filter, tire rotation, fluid level inspection, battery health check, multi-point inspection.",
      customerFriendlyDescription:
        "Perform the recommended 45,000-mile service so the vehicle stays current on routine maintenance.",
      laborHours: 1.2,
      laborRate: 185,
      partsCost: 89.5,
      taxRate: 0.0875,
      requiresAuthorization: true,
    },
    {
      id: "diagnostic-scan",
      operation: "Brake system diagnostic confirmation",
      category: "diagnostic",
      concern: "Confirm exact cause of brake noise before final repair approval",
      technicalNotes:
        "Road test vehicle, inspect rotors, confirm pad wear pattern, and document findings.",
      customerFriendlyDescription:
        "Verify the cause of the brake noise before finalizing the recommended repair plan.",
      laborHours: 0.8,
      laborRate: 185,
      partsCost: 0,
      taxRate: 0,
      requiresAuthorization: true,
    },
  ],
  includeThirdPartyPayor: true,
  thirdPartyPayor: {
    name: "DriveSure Extended Warranty",
    amountKnown: false,
  },
  includeTearDownDisclosure: true,
  includeTowingDisclosure: true,
  towingCharge: 165,
  tearDownCost: 225,
  reassemblyCost: 185,
  destroyedPartsEstimate: 42,
  canRestoreToOriginalCondition: false,
  maxReassemblyHours: 2.5,
};

export function calculateLineItemTotal(item: LineItemInput) {
  const labor = item.laborHours * item.laborRate;
  const subtotal = labor + item.partsCost;
  const tax = item.partsCost * item.taxRate;
  const total = subtotal + tax;

  return { labor, subtotal, tax, total };
}

export function calculateTotals(state: EstimateFormState): Totals {
  // Keep the total calculation in one place so UI, exports, and API handlers
  // can all rely on the same math when this project grows into a full SaaS.
  const lineItemTotals = state.lineItems.map(calculateLineItemTotal);

  const labor = lineItemTotals.reduce((sum, item) => sum + item.labor, 0);
  const parts = state.lineItems.reduce((sum, item) => sum + item.partsCost, 0);
  const subtotal = lineItemTotals.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = lineItemTotals.reduce((sum, item) => sum + item.tax, 0);

  const towing = state.includeTowingDisclosure ? state.towingCharge : 0;
  const tearDown = state.includeTearDownDisclosure ? state.tearDownCost : 0;

  return {
    labor,
    parts,
    subtotal: subtotal + towing + tearDown,
    tax,
    grandTotal: subtotal + towing + tearDown + tax,
  };
}

export function generateComplianceChecks(state: EstimateFormState): ComplianceCheck[] {
  const checks: ComplianceCheck[] = [
    {
      label: "Plain-language estimate descriptions",
      passed: state.lineItems.every((item) => item.customerFriendlyDescription.trim().length > 25),
      severity: "required",
      detail:
        "California BAR requires repair descriptions to be understandable to a consumer without technical training.",
    },
    {
      label: "Customer authorization required before work begins",
      passed: state.lineItems.every((item) => item.requiresAuthorization),
      severity: "required",
      detail:
        "Each operation in this estimate should require explicit customer approval before the dealership starts work.",
    },
    {
      label: "Towing listed separately",
      passed: !state.includeTowingDisclosure || state.towingCharge > 0,
      severity: "required",
      detail:
        "As of California BAR's July 2025 changes, towing should be separately estimated and invoiced when billed to the customer.",
    },
    {
      label: "Tear-down disclosure complete",
      passed:
        !state.includeTearDownDisclosure ||
        (state.tearDownCost > 0 &&
          state.reassemblyCost > 0 &&
          state.destroyedPartsEstimate >= 0 &&
          state.maxReassemblyHours > 0),
      severity: "required",
      detail:
        "When disassembly is needed for diagnosis, the estimate should disclose tear-down cost, reassembly cost, destroyed parts, and reassembly timing.",
    },
    {
      label: "Third-party payor disclosure recorded",
      passed:
        !state.includeThirdPartyPayor || state.thirdPartyPayor.name.trim().length > 2,
      severity: "required",
      detail:
        "If an insurer, warranty company, or other payor is involved, the estimate should clearly identify them and explain approval responsibility.",
    },
    {
      label: "VIN and mileage captured",
      passed:
        state.vehicle.vin.trim().length === 17 && Number(state.vehicle.mileage) > 0,
      severity: "recommended",
      detail:
        "Repair orders are easier to defend and audit when VIN and mileage are captured up front.",
    },
  ];

  return checks;
}

export function buildDisclosureNotes(state: EstimateFormState): string[] {
  const notes: string[] = [];

  if (state.includeThirdPartyPayor) {
    if (state.thirdPartyPayor.amountKnown && state.thirdPartyPayor.approvedAmount) {
      notes.push(
        `${state.thirdPartyPayor.name} has an approved contribution of $${state.thirdPartyPayor.approvedAmount.toFixed(
          2,
        )}. Any remaining balance is the customer's responsibility unless additional approval is obtained.`,
      );
    } else {
      notes.push(
        `This estimate is written to manufacturer and industry repair standards. ${state.thirdPartyPayor.name} approval is still pending, and the customer is responsible for contacting the third-party payor for coverage confirmation.`,
      );
    }
  }

  if (state.includeTearDownDisclosure) {
    notes.push(
      `Diagnostic disassembly is estimated at $${state.tearDownCost.toFixed(
        2,
      )}. If the customer declines the repair after tear-down, reassembly is estimated at $${state.reassemblyCost.toFixed(
        2,
      )}, replacement parts consumed during disassembly are estimated at $${state.destroyedPartsEstimate.toFixed(
        2,
      )}, and reassembly may take up to ${state.maxReassemblyHours.toFixed(1)} labor hours.`,
    );

    if (!state.canRestoreToOriginalCondition) {
      notes.push(
        "Because of the required disassembly, the vehicle or component may not be fully restorable to its exact original condition if repairs are declined.",
      );
    }
  }

  if (state.includeTowingDisclosure) {
    notes.push(
      `Towing is estimated separately at $${state.towingCharge.toFixed(
        2,
      )} and should be authorized independently from any repair work.`,
    );
  }

  notes.push(
    "No work should begin until the customer authorizes the estimate and any later supplements in writing, by text, by email, or through the dealership's approved digital workflow.",
  );

  return notes;
}
