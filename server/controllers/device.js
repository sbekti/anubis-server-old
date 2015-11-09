import express from 'express';
import request from 'superagent';

const router = express.Router();

router.get('/', (req, res, next) => {
  request.get('http://localhost:3000/posts.json', (err, response) => {
     res.locals.data = {
       'DeviceStore': {
         'devices': JSON.parse(response.text)
       }
     }

     next();
  });
});

export default router;
