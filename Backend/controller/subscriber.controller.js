const Subscriber = require("../models/Subscribe.model.js")

const newsletterSubscribe = async (req, res) => {
    const {email} = req.body
    
    if (!email) {
        return res.status(400).json({message:"Email is required"})
    }

    try {
        // Check if the email is already subscibed
        let subscribe = await Subscriber.findOne({email});
        if(subscribe){
            return res.status(400).json({message:"email is already subscibed"})
        }

        // create a new subscriber
        subscribe = new Subscriber({email});
        await subscribe.save()

        res.status(201).json({message:"Successfully Subscribed to the newsletter!"});

    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

module.exports = {newsletterSubscribe}