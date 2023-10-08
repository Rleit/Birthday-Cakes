import { getCakery } from 'config'

export default {
    Query: {
        cakeStock: (parent) => {
            // Get call to the external API
            const response = getCakery('cake-stock').then((res) => {
                const cakes = res.cakes

                // Translating spaces and japanese to a more logical key names
                const translated = {
                    chocolate: {
                        type: 'chocolate',
                        amount: cakes['chocolate'],
                    },
                    redvelvet: {
                        type: 'red velvet',
                        amount: cakes['red velvet'],
                    },
                    cheesecake: {
                        type: 'チーズケーキ',
                        amount: cakes['チーズケーキ'],
                    },
                }

                return translated
            })

            // console.log(translated)

            return response
        },
    },
}
