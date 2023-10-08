import { postCakery } from 'config'

export default {
    Mutation: {
        reserve: (parent, { input }) => {
            // Get call to the external API , with a json body data
            const response = postCakery('reserve', input).then((res) => {
                return res
            })
            return response
        },
    },
}
