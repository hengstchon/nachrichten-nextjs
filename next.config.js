const { feeds } = require('./config/feeds')
const cat = feeds[0].cat

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: `/${cat}`,
        permanent: true,
      },
    ]
  },
}
