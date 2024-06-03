// import { useTonConnect } from "../hooks/useTonConnect";

export const makeRequest = async ({ url, method = 'GET', body = {}, wallet }: { url: string, method?: string, body?: any, wallet: string | null }) => {
  console.log('request', wallet)
  if (!wallet) {
    return;
  }

  const headers = {
    'ngrok-skip-browser-warning': "any",
    'Content-Type': 'application/json',
    'tg-data': (window as any)?.Telegram?.WebApp?.initData || '',
    wallet: wallet || '',
  }
  body.tg_data = (window as any).Telegram.WebApp.initData;
  body = JSON.stringify(body);

  const response = await fetch(url, { method, body, headers });
  const data = await response.json();
  return data;
}