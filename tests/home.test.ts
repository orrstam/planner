import * as request from 'supertest';
import {} from 'jest';
import { expect, should } from 'chai';
import app from '../app';

describe('GET /', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/api/v1')
      .expect(200)
      .then(res => {
        expect(res.body).have.property('message');
      });
  });
  it('should return 404 Not Found', () => {
    return request(app)
      .get('/api/v1/beer')
      .expect(404)
  });
});
