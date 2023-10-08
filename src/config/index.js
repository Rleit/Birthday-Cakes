import { cleanEnv, url, str, port, bool } from 'envalid'
import dotenv from 'dotenv'

dotenv.config()

// str() - Passes string values through, will ensure a value is present unless a default value is given. Note that an empty string is considered a valid value - if this is undesirable you can easily create your own validator (see below)
// bool() - Parses env var strings "1", "0", "true", "false", "t", "f" into booleans
// num() - Parses an env var (eg. "42", "0.23", "1e5") into a Number
// email() - Ensures an env var is an email address
// host() - Ensures an env var is either a domain name or an ip address (v4 or v6)
// port() - Ensures an env var is a TCP port (1-65535)
// url() - Ensures an env var is a URL with a protocol and hostname
// json() - Parses an env var with JSON.parse

// OTHER OPTIONS
// email({ default: 'admin@example.com' }),
// choices - An Array that lists the admissible parsed values for the env var.
// default - A fallback value, which will be present in the output if the env var wasn't specified. Providing a default effectively makes the env var optional. Note that default values are not passed through validation logic, they are default output values.
// devDefault - A fallback value to use only when NODE_ENV is explicitly set and not 'production'. This is handy for env vars that are required for production environments, but optional for development and testing.
// desc - A string that describes the env var.
// example - An example value for the env var.
// docs - A URL that leads to more detailed documentation about the env var.

/**
 * Validates that environment variables are in place and have correct form
 */
const env = cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    MOCKSERVER: bool(),
    MOCKCAKERY_URL: url(),
    MOCKCAKERY_KEY: str({ default: 'AAAAAAAA' }),
})

// Get env
export function get() {
    const envObj = {
        mock: {
            active: env.MOCKSERVER,
            url: env.MOCKCAKERY_URL,
            key: env.MOCKCAKERY_KEY,
        },
        port: env.PORT,
        env: env.NODE_ENV,
    }

    return envObj
}

// Check if env is in test mode
export function getIsTestMode() {
    return env.isTest
}

// Check if env is in dev mode
export function getIsDev() {
    return env.isDev
}

/**
 * Gets api url
 *
 */
export function getApiUrl() {
    return env.MOCKCAKERY_URL
}

export function getApi(input, query, type) {
    switch (type) {
        case 'uriparamter':
            return env.MOCKCAKERY_URL + input + '?' + query
            break
        default:
            return env.MOCKCAKERY_URL + input
    }
}

/**
 * This process would have been cleaner with classing like in typescript
 * but compilers are a headache with graphql and es6/next
 */
export async function getCakery(get, query, type) {
    const response = await fetch(getApi(get, query, type), { method: 'GET' })
    const data = await response.json()

    return data
}

export async function postCakery(post, input, type) {
    const response = await fetch(getApi(post, !type ? input : '', type), {
        method: 'POST',
        body: input,
    })
    const data = await response.json()

    return data
}
