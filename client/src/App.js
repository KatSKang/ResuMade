import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Navbar from "./components/Navbar";
import Homepage from "../src/pages/Homepage";
import Dashboard from "../src/pages/Dashboard";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import "./index.css";

import { FormController, Payment } from "./pages";

//import Footer from "./components/Footer";
// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/form" element={<FormController/>} />
          <Route path="/success" element={<Payment />} />
        </Routes>
      </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
