import createClient from "openapi-fetch";

import type { paths } from "@pullup/contracts/api";

export const pullupApi = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
});
