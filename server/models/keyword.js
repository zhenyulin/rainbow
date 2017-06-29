import mongoose from 'mongoose';

export default mongoose.model('Keyword', {
  keyword: {
    type: String,
    index: { unique: true },
  },
  scraped: {
    type: Boolean,
    index: true,
  },
});
