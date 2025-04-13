import { ActionError, defineAction } from "astro:actions";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
} from "astro:env/server";
import type { SpotifyCurrentlyPlayingResponse } from "../types";
import { z } from "astro:schema";

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
}