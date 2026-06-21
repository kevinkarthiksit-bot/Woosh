import { describe, expect, it } from "vitest";
import { buildOrderPayload } from "@/lib/api/mappers";
import { createOrder, listOrders } from "@/lib/api/orders";
import { getSlotTimes } from "@/lib/api/slots";
import { loginTestUser } from "../helpers/auth";
import { CI_TEST_ADDRESS_PREFIX, hasIntegrationSecrets } from "../helpers/env";
import { pickTestService } from "../helpers/services";
import { retryOnColdStart } from "../helpers/retry";

describe.runIf(hasIntegrationSecrets())("orders integration", () => {
  it("creates a one-time car wash order and lists it", async () => {
    const { token, user } = await loginTestUser();
    const service = await pickTestService("car-wash-and-care");
    const slots = await retryOnColdStart(() => getSlotTimes());
    const slot = slots[0]?.time;
    if (!slot) throw new Error("No slot times available");

    const tomorrow = new Date();
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    const scheduledDate = tomorrow.toISOString().slice(0, 10);

    const payload = buildOrderPayload({
      slug: "car-wash-and-care",
      serviceId: service._id,
      address: `${CI_TEST_ADDRESS_PREFIX} integration order`,
      vehicleModel: "Swift",
      phone: user.phone,
      name: user.name,
      scheduledDate,
      scheduledTimeSlot: slot,
    });

    const order = await retryOnColdStart(() => createOrder(payload, token));
    expect(order._id || order.orderNumber).toBeTruthy();

    const orders = await listOrders(token);
    const found = orders.some(
      (o) =>
        o._id === order._id ||
        o.orderNumber === order.orderNumber ||
        o.customer?.address?.includes(CI_TEST_ADDRESS_PREFIX),
    );
    expect(found).toBe(true);
  });
});
