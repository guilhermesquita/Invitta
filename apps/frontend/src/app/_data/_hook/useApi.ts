import { useCallback } from "react";

const urlBase = process.env.NEXT_PUBLIC_API_URL;

export default function useAPI() {
  const httpGet = useCallback(async function (url: string) {
    const uri = url.startsWith("/") ? url : `/${url}`;
    const urlCompleta = `${urlBase}${uri}`;

    const response = await fetch(urlCompleta);
    return extractData(response);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const httpPost = useCallback(async function (url: string, body?: any) {
    const uri = url.startsWith("/") ? url : `/${url}`;
    const urlCompleta = `${urlBase}${uri}`;

    const response = await fetch(urlCompleta, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });
    return extractData(response);
  }, []);

  async function extractData(res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let content: any;

    try {
      content = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      if (!res.ok) {
        throw new Error(`Ocorreu um erro inesperado com status ${res.status}.`);
      }
      return null;
    }
    if (!res.ok) throw content;
    return content;
  }

  return { httpGet, httpPost };
}
