import { apiFetch } from './client';

type CreateOrderResponse = {
  id?: string | number;
  status?: string;
  redirect_url?: string;
};

export const createOrder = async (gateway: string, couponCode = ''): Promise<CreateOrderResponse> => {
  return apiFetch('/api/v1/payments/create-order', {
    method: 'POST',
    body: { gateway, coupon_code: couponCode },
  });
};

export const getPayment = async (paymentId: string) => {
  return apiFetch(`/api/v1/payments/${paymentId}`);
};

export const getMyPayments = async () => {
  return apiFetch('/api/v1/payments/my');
};

export const validateCoupon = async (couponCode: string, totalBefore: number) => {
  return apiFetch('/api/v1/payments/validate-coupon', {
    method: 'POST',
    body: { coupon_code: couponCode, total_before: totalBefore },
  });
};

export const getPaymentInvoice = async (paymentId: string) => {
  return apiFetch(`/api/v1/payments/${paymentId}/invoice`);
};

export const requestRefund = async (paymentId: string | number, reason: string) => {
  return apiFetch('/api/v1/payments/refund-request', {
    method: 'POST',
    body: { payment_id: paymentId, reason },
  });
};
