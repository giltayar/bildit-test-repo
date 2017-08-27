const fs = require('fs')
const path = require('path')

module.exports = {
  plugins: {
    "agent:npm": {
      "@bildit/local-docker-agent": {
        image: "giltayar/node-alpine-git",
        user: "node",
        workdir: "/home/node/builddir"
      }
    },
    "agent:repository": {
      "@bildit/local-docker-agent": {
        image: "alpine"
      }
    },
    "builder:npm": "@bildit/npm-build-job",
    "publisher:npm": {"@bildit/npm-publisher-with-git": {
      access: 'public'
    }}
  },
  publish: true
}