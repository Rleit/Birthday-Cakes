import path from 'path'
import { mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'

// Find all files with .mutation. in its name with the ending of
// js or ts and merge them into one for organisation
const mutationsResolversArray = loadFilesSync(
    path.join(__dirname, './**/*.mutation.*'),
    {
        extensions: ['js', 'ts'],
    }
)

export default mergeResolvers(mutationsResolversArray)
