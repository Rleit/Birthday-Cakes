import { getCakery } from 'config'

export default {
    Query: {
        deliveriesToday: (parent, { city }) => {
            // Get call to the external API , with a URI parameter
            const response = getCakery(
                'deliveries-today',
                `city=${city}`,
                'uriparameter'
            ).then((res) => {
                return res
            })
            return response
        },
    },
}
