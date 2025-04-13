import { ActionError, defineAction } from "astro:actions";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
  RESEND_API_KEY
} from "astro:env/server";
import type { SpotifyCurrentlyPlayingResponse } from "../types";
import { Resend } from "resend";
import { z } from "astro:schema";

const resend = new Resend(RESEND_API_KEY);

export const server = {
  spotify: {
    playing: defineAction({
      accept: "json",
      handler: async (_) => {
        const credentials = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`;
        const authorization = `Basic ${btoa(credentials)}`;

        try {
          const accessTokenResponse = await fetch(
            "https://accounts.spotify.com/api/token",
            {
              method: "POST",
              headers: {
                Authorization: authorization,
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: SPOTIFY_REFRESH_TOKEN,
              }),
            }
          );

          const token = (await accessTokenResponse.json()) as {
            access_token: string;
          };

          const response = await fetch(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
              headers: {
                Authorization: `Bearer ${token.access_token}`,
              },
            }
          );

          if (response.status === 204) {
            return {
              message: "I'm not currently playing anything on Spotify",
            };
          }

          const data: SpotifyCurrentlyPlayingResponse = await response.json();

          return {
            spotify: data,
          };
        } catch {
          throw new ActionError({
            code: "BAD_REQUEST",
            message: "Error fetching data from Spotify",
          });
        }
      },
    }),
  },
  send: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(3),
      email: z.string().email(),
      message: z.string().min(10)
    }),
    handler: async ({ name, email, message }) => {
      const { data, error } = await resend.emails.send({
        from: "contact.message.com",
        to: "radriann21@gmail.com",
        subject: "Test email",
        html: `${name} <${email}> <br> ${message}`
      });

      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
        })
      }

      return data;
    }
  })
}