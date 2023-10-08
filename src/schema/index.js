const path = require('path')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs } = require('@graphql-tools/merge')

// Merge all schemas into one
// BUG: Since last time I used this method, there might be issues with global schema types not being readily available.

const typesArray = loadFilesSync(path.join(__dirname, '.'), {
    recursive: true,
    extensions: ['graphql'],
})

export default mergeTypeDefs(typesArray)
