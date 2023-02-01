module.exports = (api) => {
    api.cache.using(() => process.env.NODE_ENV === "development");
    
    return {
      presets: [
        "next/babel",
      ],
      plugins: [
        [
          "relay",
          {
            "schema": "../server/graphql/schema.graphql",
          },
        ],
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-class-properties",
      ],
    };
  };
  