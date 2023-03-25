# Kesko assignment

## Demo links

[Server app](https://northwind-server.onrender.com)

[Client app](https://northwind-client-app.netlify.app/)

## Demo app and how it works

- The home page shows all the orders that has been fetched from the server app. 
- Type in the search bar will filter all the orders that have input characters in product names. 
- Check in the checkbox will filter all the orders that have been shipped.
- Click the button `View details` to move to the Order Details page.

https://user-images.githubusercontent.com/31731738/227722147-9139f2a3-2899-4697-bef9-db23b8c5b856.mov


## How to run project in local

1. Clone the project

```
git clone https://github.com/GiangNguyen1207/kesko-assignment.git
```

2. Run server:

```
cd server
npm install
npm run dev
```

The server is running on port 8080.

3. Run client: 

```
cd client
npm install
npm start
```

## How to run test in local

2. Server tests:

```
cd server
npm run test
```

3. Server tests:

```
cd client
npm run test
```

## Potential plans

- Pagination for server and client. It would be much better to have it when there are, for example, thousand of orders. 
- Maybe different design for tablet. For now, tablet and phone share the same design. 

## Learning points

- Using sqlite 3 and practicing sql script.
- Writing unit tests for backend and frontend. Finding way to test hooks successfully 🥳
- Deployment: debugging to figure out the function name has been changed in production. Webpack is configured to optimize the bundle in production environment without affecting how the application works. It includes some changes in function names, variables, comments, and so on.
