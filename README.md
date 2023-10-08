# Summary

Since I wanted to save time instead of learning something new with this task, I went back to what felt most comfortable, which is GraphQL API server with Apollo Server + Express.

This API is aimed at the [Doorstep Birthday Cakes API documentation](https://doorstepbirthdaycakes.docs.apiary.io/), and its mock servers at [https://api.cakery.dev/api-docs/](https://api.cakery.dev/api-docs/) were missing reservations and deliveries to the same spec as on the original documentation.

To not spend hours on this, I focused on file structure organization and not the utilities to make the "getCakery" and "postCakery" dynamic.

# Installation

Install all packages with:

npm i 

Move example environment file to `.env`:

mv .env.example .env


Launch dev:

npm run dev


# Ready-made playground links

### Cake stock
[Link to local playground](http://localhost:8000/api?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMICGA1ggMorQVHAA6SRRUlNdUDzrb7ABYIEAZwQcqjFgIEoCABwQzZRMnAgxUKtgF8dQ6BAA2ZFAmn9Z6zdqtzFy%2B-vt4EYAG4JjXlJdVqGlooBmzySgYueiwuIAA0IB5keACWZABGxmIYIPEgolCpCmiYILpAA)

```
Operation : 
query CakeStock {
  cakeStock {
    cheesecake {
      type
      amount
    }
    chocolate {
      amount
      type
    }
    redvelvet {
      amount
      type
    }
  }
}

Response :
{
  "data": {
    "cakeStock": {
      "cheesecake": {
        "type": "チーズケーキ",
        "amount": "0"
      },
      "chocolate": {
        "amount": "1",
        "type": "chocolate"
      },
      "redvelvet": {
        "amount": "5",
        "type": "red velvet"
      }
    }
  }
}
```


### DeliveriesToday
[Link to local playground](http://localhost:8000/api?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACIIA2AlgG76UIDOAKhGAIYEAUAJFJSgXREAyijyUkAcwCURYAB088pESJgKNOoxbsufAUN78CshUpWqiUNgGsEi5ZaJI2iBxdVswYPIwbunRAYGNkl7c1UAX3dIkAAaEGo2cTYAI3JGDBAzRyJ5EH0CfKF8gAkKBgkbSnyY%2BJAGKHEABzRMEEigA)

```
Operation : 
query DeliveriesToday($city: String) {
  deliveriesToday(city: $city) {
    cake
    name
    address
    message
  }
}

Variables : 
{
  "city": "Helsinki"
}

Response:
{
  "data": {
    "deliveriesToday": [
      {
        "cake": "chocolate",
        "name": "Henri Nordström",
        "address": "Vuorikatu 16 A 8",
        "message": "<p>Rich <strong>text</strong> message</p>"
      }
    ]
  }
}
```

### Reserve
[Link to local playground](http://localhost:8000/api?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4RxighigSwiQAIAlBAZwQCcA3BACgBICkAHHdcq2hgSQ44AlCWAAdGuNIkavekzacU3VkJSiJUmSRJRcAawSTpugL4mkZkABoQdXDQK4ARgBsqGEFtMlxIJRx-bh8dPxBcMDA5Skpg8JQqFH8bS11dfxcCGhQACzBcAE94-wBGAFoKgCYABhqAThS09P99IxKQOTASBjcGZNtmjJAoAhRijHCACQQ3SjYDAibtdPDEWNwAc2NJ-wAedgA%2BEgBlGAM3XENDAxgAQhI9gHoj5d9huVH2AmQB7n8AHIENgESgoABv-maFm01jslCgTnYaEwIDMQA)


```
Operation:
mutation Reserve($input: ReserveInput) {
  reserve(input: $input) {
    cake
  }
}

Variables:
{
  "input": {
    "address": "test",
    "birthday": "1-1-2009",
    "cake": "red velvet",
    "city": "Helsinki",
    "message": "<p> Suklaakakku! </p>",
    "recipient": "Niinistö"
  }
}

Response:
{
  "data": {
    "reserve": {
      "cake": "chocolate"
    }
  }
}
```