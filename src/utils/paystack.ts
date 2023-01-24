const PayStack = require('paystack-node');

const APIKEY = process.env.PATSTACK_SECRET_KEY;
const environment = process.env.NODE_ENV;

const paystack = new PayStack(APIKEY, environment);
export default paystack;
