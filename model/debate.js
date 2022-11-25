import mongoose from "mongoose";

const debateSchema = new mongoose.Schema(
    {
        topic: {
            type: String,
            required: true
        },
        starting_date: {
            type: String,
            required: true
        },
        ending_date: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        information: {
            type: String,
            required: false
        },
        published_date: {
            type: String,
            required: true
        },
        participants: {
            type: Number,
            required: false
        },
        winner: {
            type: String,
            required: false
        }
    }, { collection: 'Debate' }
);

export const Debate = mongoose.model('Debate', debateSchema);