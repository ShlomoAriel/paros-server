module.exports = {
  secret: 'devdacticIsAwesome',
  database:
    process.env.DATABASE ||
    'mongodb+srv://sealion:sealion12345@paros.unfxg.mongodb.net/paros?retryWrites=true&w=majority',
    // 'mongodb://sealion:sealion12345@ds115729.mlab.com:15729/paros',
};