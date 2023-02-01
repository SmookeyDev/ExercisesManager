const NextConfig = {
    experimental: {
        newNextLinkBehaviour: true
    },
    webpack: config => {
        config.resolve.preferRelative = true
        return config
    }
}

module.exports = NextConfig