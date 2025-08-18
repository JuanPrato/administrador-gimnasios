import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import { Request, Response } from "express";
import config from "../config/config";

export const createClient = (req: Request, res: Response) => {
  return createServerClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        const cs = parseCookieHeader(req.headers.cookie ?? "") as {
          name: string;
          value: string;
        }[];
        console.log(cs);
        return cs;
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          res.appendHeader(
            "Set-Cookie",
            serializeCookieHeader(name, value, options)
          )
        );
      },
    },
  });
};
