'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

module.exports = {
  '*/10 * * * * *': async() => {
    console.log("I am running ");
    let completedOrders = await strapi.services.orders.find({finished: true, handled: false});

    completedOrders.forEach(async order => {
      console.log(order.customer);
      
      let orderTotal;

      order.foods.forEach(food => {
        orderTotal += parseInt(food.Price);
      })

      await strapi.plugins['email'].services.email.send({
        to: order.customer,
        from: 'no-reply@aerio.cloud',
        subject: 'Your order has been completed',
        text: `
          <h1>
          Dear ${order.customer.split('@')[0]},
          </h1>

          <br/>

          Your order has been completed.

          <br/>

          Ordered food:
          <br/>

          ${
            order.foods.map(food => (
              `${food.Name}: ${food.Price} € <br/>`
            ))
          }

          <br/>

          Total: ${orderTotal} €
        `
      })

      strapi.query('orders').update({ id : order.id }, { handled: true });
    });
  }
};
