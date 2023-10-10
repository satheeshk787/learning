const jwt = require('jsonwebtoken');
const ListSchema = require('../models/ListSchema');
const { default: mongoose } = require('mongoose');
const List = mongoose.model('List',ListSchema);


class listController {

    static async create (req, res) {
        try{
            const lst = await  List.create({...req.body, user_id: req.user._id });
            return res.json({
                success: true ,
                lst
            });
            
        }catch(err){
            res.status(500).json({ error: true });
        }
    }

    static async edit(req, res) {
        try {
            // Extract the _id from the request body
            const { _id, ...updateData } = req.body;
    
            // Update the document in the "List" collection
            const lst = await List.updateOne({ _id, user_id: req.user._id }, updateData);
    
            // Respond with a JSON object indicating success and the updated document
            return res.json({
                success: true,
                lst
            });
    
        } catch (err) {
            // Handle errors and respond with a 500 status code
            res.status(500).json({ error: true });
        }
    }

    static async delete (req, res) {
        try{
            const lst = await  List.deleteOne({...req.body, user_id: req.user._id });
            return res.json({
                success: true ,
                lst
            });
            
        }catch(err){
            res.status(500).json({ error: true });
        }
    }

    static async list (req, res) {
        try{

            const list = await List.find({ user_id: req.user._id });
            return res.json({
                success: true,
                list
            });

        }catch(err){
            res.status(500).json({ error: true, err });
        }
    }
}

module.exports = listController;