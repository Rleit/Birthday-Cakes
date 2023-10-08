// import messageResolvers from "../resolvers/message";
import mutationResolvers from './mutations/index.js'
import queryResolvers from './queries/index.js'

import { mergeResolvers } from '@graphql-tools/merge'

// All previously merged files will be merged by this parent file
// creating a readable output for the server.

const resolversMerge = [mutationResolvers, queryResolvers]

const merged = mergeResolvers(resolversMerge)

export default merged
