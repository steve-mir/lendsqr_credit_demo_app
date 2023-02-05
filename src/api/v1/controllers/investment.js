/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const performInvestment = async (req, res) => {
    const {amount, start, end, interest, type} = req.body;

    res.json({message: "Investment successful"});
};

module.exports = {performInvestment};