module.exports = {
  secret: 'devdacticIsAwesome',
  database:
    process.env.DATABASE ||
    'mongodb://sealion:sealion12345@ds115729.mlab.com:15729/paros',
};