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
      access: 'public',
      npmAuthenticationLine: fs.readFileSync(path.join(process.env.HOME, '.npmrc'), 'utf-8').split('\n')
        .find(l => l.includes('authToken')),
      gitAuthenticationKey: fs.readFileSync(path.join(process.env.HOME, '.ssh/id_rsa_github')),
      gitUserEmail: 'gil@tayar.org',
      gitUserName: 'Gil Tayar',
    }}
  },
  publish: true
}