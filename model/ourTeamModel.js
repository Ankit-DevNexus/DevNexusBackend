import mongoose from "mongoose";

const ourTeamSchema = new mongoose.Schema({
    avatar : {
        type: String,
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    technology: {
        type: [String],
        required: true
    },
});

const OurTeamModel = mongoose.model('OurTeam', ourTeamSchema);
export default OurTeamModel;
