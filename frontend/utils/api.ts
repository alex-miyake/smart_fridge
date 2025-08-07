import { callApi } from '../api/apiClient';

const TEST_USER_ID = 1;

export const getFridgeItems = async () => {
    const allItems = await callApi('/fridge', {
        method: 'GET',
    });

    // filter for test user
    return (allItems as any[]).filter((item: any) => item.userId === TEST_USER_ID);
};

export const addFridgeItem = async (item: { name: string; quantity: number }) => {
  // POST /fridge with item + userId
  return await callApi('/fridge', {
    method: 'POST',
    headers: {}, // optional; handled by callApi
    requiresAuth: false,
    body: JSON.stringify({
      ...item,
      userId: TEST_USER_ID,
    }),
  });
};