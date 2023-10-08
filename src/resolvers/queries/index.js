import path from 'path'
import { mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'

// Find all files with .query. in its name with the ending of
// js or ts and merge them into one for organisation
const queryResolversArray = loadFilesSync(
    path.join(__dirname, './**/*.query.*'),
    {
        extensions: ['js', 'ts'],
    }
)

export default mergeResolvers(queryResolversArray)
