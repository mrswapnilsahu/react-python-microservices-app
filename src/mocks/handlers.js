import { rest } from 'msw';
import { photos } from "../data";

export const handlers = [
    rest.get('/userData', (req, res, ctx) => {
        return res(
          // Respond with a 200 status code
          ctx.status(200),
          ctx.json(photos),
        )
    }),
]