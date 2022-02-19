import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Dev. Website',
          type: 'deposit',
          category: 'DEV',
          amount: 5280,
          createdAt: new Date('2021-07-12 00:00:00'),

        },
        {
          id: 2,
          title: 'Alguel',
          type: 'withdraw',
          amount: 1100,
          category: 'Contas',
          createdAt: new Date('2021-07-13 00:00:00'),
        },
      ],
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => this.schema.all('transaction'));

    this.post('/transactions', (schema, request) => {
      const body = request.requestBody ? JSON.parse(request.requestBody) : {};

      return schema.create('transaction', {id:Math.random() * 10, ...body, createdAt:new Date()});
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
