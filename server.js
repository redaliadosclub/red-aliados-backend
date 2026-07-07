require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Preference } = require('mercadopago');

const app = express();

app.use(cors());
app.use(express.json());

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
});

app.get('/', (req, res) => {
    res.send('✅ Backend Red Aliados funcionando');
});

app.get('/create_preference', async (req, res) => {

    try {

        const preference = new Preference(client);

const result = await preference.create({

    body: {

        items: [
            {
                title: 'Participación Red Aliados',
                quantity: 1,
                unit_price: 100
            }
        ],

        back_urls: {
            success: "http://localhost:5173/payment/success",
            failure: "http://localhost:5173/payment/failure",
            pending: "http://localhost:5173/payment/pending"
        },

    }

});

        res.redirect(result.init_point);

    } catch (error) {

        console.log(error);

        res.status(500).json(error);

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`🚀 Servidor iniciado en puerto ${PORT}`);

})