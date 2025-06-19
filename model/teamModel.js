import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    image: {
        type: String
    }
});

const TeamModel = mongoose.model("Team", teamSchema);
export default TeamModel;