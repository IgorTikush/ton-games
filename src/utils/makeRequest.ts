import { useTonConnect } from "../hooks/useTonConnect";

export const makeRequest = async ({ url, method, body, wallet }: { url: string, method: string, body: any, wallet: string | null }) => {
  // if (!wallet) {
  //   return;
  // }
  console.log('request', wallet)
  console.log((window as any).Telegram.WebApp.initData);
  const headers = {
    'Content-Type': 'application/json',
    'tg-data': (window as any).Telegram.WebApp.initData,
    wallet: wallet || '',
  }
  body.tg_data = (window as any).Telegram.WebApp.initData;
  body = JSON.stringify(body);

  const response = await fetch(url, { method, body, headers });
  const data = await response.json();
  return data;
}