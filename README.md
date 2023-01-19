# LendsQR API
Welcome to the LendsQR API, the live API is hosted in [cyclic](https://odd-ruby-foal-tux.cyclic.app/).

The API home is /, which when visited you get the messgae below
```json
{
    "Welcome to lendsqr API see docs on how to use"
}
```

All tests are written in the `/tests` directory.

# REST API

The REST API to the *lendsqr app* is described below.
The base URL is

    http://localhost/
The base URL for the live version is

    https://odd-ruby-foal-tux.cyclic.app/

## Register a User

### Request

`POST /users/register`

```json
{
    "name": "John Doe",
    "email": "johndoe@gmail.com",
    "password": "John$12345678"
}
```

### Response

```json
{
    "msg": "User created successfully",
    "email": "johndoe@gmail.com",
    "name": "John Doe"
}
```

## Login a user

### Request

`POST /users/login/`

```json
{
    "email": "johndoe@gmail.com",
    "password": "John$12345678"
}
```

### Response

```json
{
    "msg": "User logged in"
}
```


## Logout a user

### Request

`GET /user/logout`

```json
{}
```

### Response

```json
{
    "msg": "Logged out successfully"
}
```

## Get the current user

### Request

`GET users/profile`

```json
{}
```

### Response

```json
{
    "user": {
        "id": 11,
        "name": "John Doe",
        "email": "johndoe@gmail.com",
        "created_at": "2023-01-17T13:23:13.578Z",
        "updated_at": "2023-01-18T11:05:49.194Z",
        "password": "$2b$10$6RYxQ/BlrhuJWgsw9v/NcOGEFTFiEK6ajKp69w2iVjhOp02N56.8m",
        "username": "Jhonny",
        "uid": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
        "phone": 9123456789
    }
}
```

## Create a new wallet
- type is the type or wallet **savings** or **current**
- currency can be **USD** or **NGN** or **CAD** or **AUD**

### Request

`POST /wallets/create`

```json
{
    "type": "Savings",
    "currency": "USD",
}
```

### Response

```json
{
    "msg": "Wallet created successfully",
    "type": "Savings",
    "currency": "USD",
    "balance": 0,
    "uid": "05b96184-edb9-4957-89c1-e5a9ce2fbe03"
}
```

## Get wallets
- returns an array of all wallets belong to the user

### Request

`GET /wallets/`

```json
{}
```

### Response

```json
{
    "wallets": [
        {
            "id": "e7ec69d7-18e4-4d5f-8d43-610220aa412a",
            "type": "Savings",
            "currency": "NGN",
            "balance": 1300,
            "loanBalance": 0,
            "owner": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "created_at": "2023-01-17T22:04:06.036Z"
        },
        {
            "id": "05d2c2ce-0e3f-430e-9ccf-300f599bc9c9",
            "type": "Savings",
            "currency": "USD",
            "balance": 20,
            "loanBalance": 0,
            "owner": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "created_at": "2023-01-17T22:05:53.500Z"
        }
    ]
}
```

## Fund an account

### Request

`POST /deposit?walletId=e7ec69d7-18e4-4d5f-8d43-610220aa412a
- the wallet id is sent as a param to the url
- the minimum deposit is 1000


```json
{
    "amount": 50000,
    "currency": "NGN",
    "desc": "Adding to savings"
}
```

### Response

```json
{
    "msg": "Deposit successfully"
}
```

## Get a user's deposit history
- returns an array of all deposits by the user

### Request

`GET /deposit/`

```json
{}
```

### Response

```json
{
    "deposits": [
        {
            "id": "2dc88757-8da0-464f-92b7-cadd57ccf4d3",
            "userId": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "amount": 10,
            "walletId": "e7ec69d7-18e4-4d5f-8d43-610220aa412a",
            "date": "2023-01-17T22:50:59.622Z",
            "currency": "NGN"
        },
        {
            "id": "f5950b10-8a3f-4079-af20-7f40fc2ff077",
            "userId": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "amount": 100,
            "walletId": "e7ec69d7-18e4-4d5f-8d43-610220aa412a",
            "date": "2023-01-17T23:05:54.095Z",
            "currency": "NGN"
        }
    ]
}
```

## Transfer fund (Internal withdrawal)
- the wallet from which the transfer will be made is passed to the url as a param
This is internal transfer from one user to another user, the user is identified by username of email

### Request

`POST /withdraw?walletId=e7ec69d7-18e4-4d5f-8d43-610220aa412a`

```json
{
    "identifier": "Jhonny",
    "currency": "NGN",
    "desc": "Happy new year",
    "amount": 1000
}
```

### Response

```json
{
    "msg": "Withdrawal successfully, funds will soon arrive at destination wallet"
}
```

## Withdraw fund
- funds are sent to a users bank account

### Request

`POST /withdraw/bank?walletId=e7ec69d7-18e4-4d5f-8d43-610220aa412a`

```json
{
    "bankNo": "1234578900",
    "bankName": "Access",
    "currency": "NGN",
    "desc": "Happy new year",
    "amount": 1000
}
```

### Response

```json
{
    "msg": "Withdrawal successfully, funds will soon arrive at destination wallet"
}
```

## Withdraw history
- returns an array of all the withdrawals made by the user

### Request

`GET /withdraw/`

```json
{}
```

### Response

```json
{
    "withdraws": [
        {
            "id": "3cf72a8b-49b1-4008-8ff9-b011ac5b4b54",
            "from_wallet": "e7ec69d7-18e4-4d5f-8d43-610220aa412a",
            "to_wallet": "123456789",
            "currency": "NGN",
            "amount": 10,
            "date": "2023-01-18T00:06:03.092Z",
            "note": "Second externa withdrawal",
            "sender_id": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "receiver_id": "Access",
            "received": 0
        },
        {
            "id": "fd164901-86e9-4d94-a57a-dd5d5fc0a817",
            "from_wallet": "e7ec69d7-18e4-4d5f-8d43-610220aa412a",
            "to_wallet": "e7ec69d7-18e4-4d5f-8d43-610220aa412a",
            "currency": "NGN",
            "amount": 10,
            "date": "2023-01-18T00:57:15.562Z",
            "note": "Second externa withdrawal",
            "sender_id": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "receiver_id": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "received": 0
        },
        {
            "id": "46677219-521b-4930-bc05-f2d07932246d",
            "from_wallet": "e7ec69d7-18e4-4d5f-8d43-610220aa412a",
            "to_wallet": "05d2c2ce-0e3f-430e-9ccf-300f599bc9c9",
            "currency": "USD",
            "amount": 10,
            "date": "2023-01-18T00:58:18.882Z",
            "note": "Second externa withdrawal",
            "sender_id": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "receiver_id": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "received": 0
        },
        {
            "id": "09cf9089-c6d8-4dd8-be6b-d698c0e7ebb4",
            "from_wallet": "e7ec69d7-18e4-4d5f-8d43-610220aa412a",
            "to_wallet": "05d2c2ce-0e3f-430e-9ccf-300f599bc9c9",
            "currency": "USD",
            "amount": 10,
            "date": "2023-01-18T00:58:52.132Z",
            "note": "Second externa withdrawal",
            "sender_id": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "receiver_id": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "received": 0
        }
    ]
}
```

## Transaction history
- returns an array of all the transactions made by the user

### Request

`GET /transactions/`

```json
{}
```

### Response

```json
{
    "transactions": [
        {
            "id": "a212e9ba-7cc6-41c2-b0ed-587b8a11b6ed",
            "date": "2023-01-17T23:05:54.113Z",
            "amount": 100,
            "desc": null,
            "creditor_id": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "debtor_id": "Self",
            "creditor_wallet": "e7ec69d7-18e4-4d5f-8d43-610220aa412a",
            "debtor_wallet": "Self",
            "currency": "NGN",
            "type": "deposit",
            "typeRef": "f5950b10-8a3f-4079-af20-7f40fc2ff077"
        },
        {
            "id": "5a614f79-4bb6-4958-82a4-770328b31c94",
            "date": "2023-01-18T00:03:15.130Z",
            "amount": 10,
            "desc": null,
            "creditor_id": "Access",
            "debtor_id": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "creditor_wallet": "123456789",
            "debtor_wallet": "e7ec69d7-18e4-4d5f-8d43-610220aa412a",
            "currency": "NGN",
            "type": "external-withdrawal",
            "typeRef": "e7ec69d7-18e4-4d5f-8d43-610220aa412a"
        },
        {
            "id": "5fb0888c-4841-4bfd-a094-d0236160d706",
            "date": "2023-01-18T00:04:26.493Z",
            "amount": 10,
            "desc": "Second externa withdrawal",
            "creditor_id": "Access",
            "debtor_id": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "creditor_wallet": "123456789",
            "debtor_wallet": "e7ec69d7-18e4-4d5f-8d43-610220aa412a",
            "currency": "NGN",
            "type": "external-withdrawal",
            "typeRef": "e7ec69d7-18e4-4d5f-8d43-610220aa412a"
        },
        {
            "id": "8729e0ed-3641-4b72-b879-65fb9a3340ec",
            "date": "2023-01-18T00:06:03.108Z",
            "amount": 10,
            "desc": "Second externa withdrawal",
            "creditor_id": "Access",
            "debtor_id": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "creditor_wallet": "123456789",
            "debtor_wallet": "e7ec69d7-18e4-4d5f-8d43-610220aa412a",
            "currency": "NGN",
            "type": "external-withdrawal",
            "typeRef": "e7ec69d7-18e4-4d5f-8d43-610220aa412a"
        },
        {
            "id": "2c505e11-4861-4cbe-8d98-832e3d2e35ab",
            "date": "2023-01-18T00:57:15.577Z",
            "amount": 10,
            "desc": "Second externa withdrawal",
            "creditor_id": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "debtor_id": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "creditor_wallet": "e7ec69d7-18e4-4d5f-8d43-610220aa412a",
            "debtor_wallet": "e7ec69d7-18e4-4d5f-8d43-610220aa412a",
            "currency": "NGN",
            "type": "internal-withdrawal",
            "typeRef": "e7ec69d7-18e4-4d5f-8d43-610220aa412a"
        },
        {
            "id": "f5488c45-5316-4988-bf5c-68e45cad365d",
            "date": "2023-01-18T00:58:18.897Z",
            "amount": 10,
            "desc": "Second externa withdrawal",
            "creditor_id": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "debtor_id": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "creditor_wallet": "05d2c2ce-0e3f-430e-9ccf-300f599bc9c9",
            "debtor_wallet": "e7ec69d7-18e4-4d5f-8d43-610220aa412a",
            "currency": "USD",
            "type": "internal-withdrawal",
            "typeRef": "e7ec69d7-18e4-4d5f-8d43-610220aa412a"
        },
        {
            "id": "f28c1d7d-957f-468b-9e12-7a96e301e6ea",
            "date": "2023-01-18T00:58:52.144Z",
            "amount": 10,
            "desc": "Second externa withdrawal",
            "creditor_id": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "debtor_id": "05b96184-edb9-4957-89c1-e5a9ce2fbe03",
            "creditor_wallet": "05d2c2ce-0e3f-430e-9ccf-300f599bc9c9",
            "debtor_wallet": "e7ec69d7-18e4-4d5f-8d43-610220aa412a",
            "currency": "USD",
            "type": "internal-withdrawal",
            "typeRef": "e7ec69d7-18e4-4d5f-8d43-610220aa412a"
        }
    ]
}
```


