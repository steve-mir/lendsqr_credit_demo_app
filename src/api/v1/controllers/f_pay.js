/**
 * This funds the users wallet.
 * no payment gateway was implemented
 * @param {*} req 
 * @param {*} res 
 */
const generatePaymentLink = async (req, res) => {
    try {
        // Extract data from the request body
        const { tx_ref, amount, currency, redirect_url, uid, user_email, user_phone, user_name, sub_id, title, logo } = req.body;

        // Make the request to Flutterwave API
        const got = await import("got"); // Dynamic import
        const response = await got.default.post("https://api.flutterwave.com/v3/payments", {
            headers: {
                Authorization: `Bearer FLWSECK_TEST-168ee8a126d0cc352047cf751f812ea7-X`
            },
            json: {
                tx_ref: tx_ref,
                amount: amount,
                currency: currency, // "NGN",
                redirect_url: redirect_url, // "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
                meta: {
                    user_id: uid,
                    subscription_id: sub_id,
                },
                customer: {
                    email: user_email,
                    phonenumber: user_phone,
                    name: user_name
                },
                customizations: {
                    title: title, // "Pied Piper Payments",
                    logo: logo, // "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
                }
            }
        }).json();

        console.log(response);
        // Send the response back to the client
        res.status(200).json(response);
    } catch (err) {
        console.log(err.code);
        console.log(err.response.body);
    }
};


const generatePaymentLink2 = async (req, res) => {
    try {
        const response = await got.post("https://api.flutterwave.com/v3/payments", {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
            },
            json: {
                tx_ref: "hooli-tx-1920bbtytty_test3",
                amount: "100",
                currency: "NGN",
                redirect_url: "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
                meta: {
                    consumer_id: 23,
                    consumer_mac: "92a3-912ba-1192a"
                },
                customer: {
                    email: "user@gmail.com",
                    phonenumber: "080123498751",
                    name: "Yemi Desola"
                },
                customizations: {
                    title: "Pied Piper Payments",
                    logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
                }
            }
        }).json();
        console.log(response);
    } catch (err) {
        console.log(err.code);
        console.log(err.response.body);
    }
    // try {
    //     const secretKey = "FLWSECK_TEST-97a338a20e3ac27071a30e390b7055f2-X"; //'FLWSECK_TEST-168ee8a126d0cc352047cf751f812ea7-X';
    //     const response = await fetch('https://api.flutterwave.com/v3/payments', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${secretKey}`
    //       },
    //     //   body: JSON.stringify(req.body)
    //     body: {
    //         tx_ref: "kdhooli-tx-1920bbtytty",
    //         amount: "100",
    //         currency: "NGN",
    //         redirect_url: "http://localhost:4200",
    //         meta: {
    //             consumer_id: 23,
    //             consumer_mac: "92a3-912ba-1192a",
    //             subscription_id: req.id
    //         },
    //         customer: {
    //             email: "user@gmail.com",
    //             phonenumber: "080123456789",
    //             name: "Yemi Desola"
    //         },
    //         customizations: {
    //             title: "Pied Piper Payments",
    //             logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
    //         }
    //       }
    //     });
    //     const data = await response.json();
    //     console.log(data);
    //     res.json(data);
    //   } catch (error) {
    //     console.error('Error:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    //   }

};


module.exports = {generatePaymentLink};
