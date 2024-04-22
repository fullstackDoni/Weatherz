require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { ApolloServer, gql } = require("apollo-server-express");

const app = express();
const port = process.env.PORT || 3000;

const typeDefs = gql`
  type Weather {
    city: String
    country: String
    temperature: Float
    humidity: Int
    windSpeed: Float
  }

  type Query {
    getWeatherByCityName(city: String!): Weather
  }
`;

const resolvers = {
    Query: {
        getWeatherByCityName: async (_, { city }) => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
                const { name, main, sys, wind } = response.data;
                return {
                    city: name,
                    country: sys.country,
                    temperature: main.temp,
                    humidity: main.humidity,
                    windSpeed: wind.speed,
                };
            } catch (error) {
                console.error('Произошла ошибка при получении данных о погоде.', error);
                throw new Error('Не удалось получить данные о погоде.');
            }
        },
    },
};


app.use(cors());
app.use(express.json());

module.exports = app;



