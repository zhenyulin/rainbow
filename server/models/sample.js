import mongoose from 'mongoose';

const Sample = new mongoose.Schema({
  item: {
    type: String,
    index: true,
  },
  price: {
    type: Number,
    index: true,
  },
  type: String,
  keyword: {
    type: String,
    index: true,
  },
});

export default mongoose.model('Sample', Sample);
