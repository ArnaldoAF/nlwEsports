import express, { response } from "express";
import cors from 'cors';

import { PrismaClient } from "@prisma/client";
import { convertHourToMinute } from "./utils/convertHourToMinute";
import { convertMinuteToHour } from "./utils/convertMinuteToHour";

const app = express();
// permite o express entender requisições feitas em Json
app.use(express.json());

// permite que os front-ends acessem a api
// para permitir um front especifico, adicione {origin : 'http'}
app.use(cors());

const prisma = new PrismaClient({
  log: ["query"],
});

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          Ad: true,
        },
      },
    },
  });
  return response.json(games);
});

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      creatAt: "desc",
    },
  });
  return response.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinuteToHour(ad.hourStart),
        hourEnd: convertMinuteToHour(ad.hourEnd),
      };
    })
  );
});

app.post("/game/:id/ads", async (request, response) => {
    console.log("/game/:id/ads")
  const gameId = request.params.id;
  const body = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourToMinute(body.hourStart),
      hourEnd: convertHourToMinute(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return response.json(ad);
});

app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return response.json({
    discord: ad.discord,
  });
});

app.listen(3333);
