// next.config.js



module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {

//require('./socket-server.js').initialize(3300);

    }

    return config
  }
}