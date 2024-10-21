import mongoose from 'mongoose';

const newsItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  source: {
    name: String,
  },
});

export const NewsItem = mongoose.model('NewsItem', newsItemSchema);