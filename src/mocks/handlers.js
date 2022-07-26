import { rest } from 'msw';
import { photos } from "../data";

export const handlers = [
    // This REST API will set the data in localStorage
    rest.get('/getData', (req, res, ctx) => {
        return res(
          // Respond with a 200 status code
          ctx.status(200),
          localStorage.setItem('data', JSON.stringify(photos)),
          ctx.json(photos),
        )
    }),

    // This REST API will update the data in localStorage
    rest.post('/setData', (req, res, ctx) => {
      localStorage.setItem('data', JSON.stringify(req.body))
      return res(
        // Respond with a 200 status code
        ctx.status(200),
        ctx.json({status:"Success"})
      )
  })
]