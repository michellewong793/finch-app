This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run, download dependencies with yarn, then run the development server with yarn dev. 

```bash
yarn
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About the app 

This app was built with Finch Sandbox to fetch company data, directory, and individual results from the user selected provider. 
When the field returned by the provider is null, the application provides a message to the user: "No custom fields available". 
When the provider does not return a specific endpoint, or a 501 response is returned, we show to the user that the endpoint has not been implemented through a custom message. 
The access token is stored in a cookie. 
Given more time, I would improve the UI to have a better design and be more responsive to when a user clicks around, like clearing information from another sandbox when a user clicks on a new provider. 
