import React, { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight, ThumbsUp } from 'lucide-react'

const Review = () => {
  const [currentReview, setCurrentReview] = useState(0)

  const reviews = [
    {
      id: 1,
      name: "Chioma Adeleke",
      location: "Lagos, Nigeria",
      rating: 5,
      date: "2 weeks ago",
      image: "https://ui-avatars.com/api/?name=Chioma+Adeleke&background=3b82f6&color=fff&size=128",
  review: "Absolutely amazing experience! The room was spotless, the staff were incredibly friendly, and the location was perfect. I felt right at home from the moment I walked in. Will definitely be returning on my next trip to Abeokuta!",
      helpful: 24
    },
    {
      id: 2,
      name: "David Okonkwo",
      location: "Abuja, Nigeria",
      rating: 5,
      date: "1 month ago",
      image: "https://ui-avatars.com/api/?name=David+Okonkwo&background=8b5cf6&color=fff&size=128",
      review: "Book A Stay exceeded all my expectations. The amenities were top-notch, especially the complimentary breakfast and the pool area. The airport pickup service was punctual and professional. Great value for money!",
      helpful: 18
    },
    {
      id: 3,
      name: "Sarah Johnson",
      location: "United Kingdom",
      rating: 5,
      date: "3 weeks ago",
      image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=ec4899&color=fff&size=128",
      review: "As a first-time visitor to Nigeria, I was impressed by the hospitality and comfort at Book A Stay. The staff went above and beyond to ensure I had everything I needed. The room was luxurious and the Wi-Fi was excellent for remote work.",
      helpful: 31
    },
    {
      id: 4,
      name: "Emmanuel Nwosu",
  location: "Abeokuta, Nigeria",
      rating: 4,
      date: "1 week ago",
      image: "https://ui-avatars.com/api/?name=Emmanuel+Nwosu&background=10b981&color=fff&size=128",
      review: "Very good hotel with modern facilities. The restaurant serves delicious local and continental dishes. Only minor issue was the AC in my room took a while to cool, but maintenance fixed it promptly. Overall, highly recommend!",
      helpful: 12
    },
    {
      id: 5,
      name: "Amara Chukwu",
      location: "Enugu, Nigeria",
      rating: 5,
      date: "2 months ago",
      image: "https://ui-avatars.com/api/?name=Amara+Chukwu&background=f59e0b&color=fff&size=128",
  review: "I've stayed at many hotels in Abeokuta, but Book A Stay is by far my favorite. The attention to detail, cleanliness, and customer service are exceptional. The 24/7 front desk was always ready to help. Five stars all the way!",
      helpful: 27
    }
  ]

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        size={20}
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ))
  }

  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
  const totalReviews = reviews.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Guest Reviews
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            See what our guests are saying about their experience
          </p>
          
          {/* Rating Summary */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg px-8 py-4">
              <div className="flex items-center gap-2 mb-2">
                {renderStars(5)}
              </div>
              <p className="text-3xl font-bold text-gray-800">{averageRating}</p>
              <p className="text-sm text-gray-500">{totalReviews} Reviews</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg px-8 py-4">
              <div className="flex items-center gap-2">
                <ThumbsUp className="text-green-500" size={24} />
                <span className="text-2xl font-bold text-gray-800">98%</span>
              </div>
              <p className="text-sm text-gray-500">Recommend</p>
            </div>
          </div>
        </div>

        {/* Featured Review Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 opacity-10">
              <Quote size={80} className="text-purple-600" />
            </div>

            {/* Review Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={reviews[currentReview].image}
                  alt={reviews[currentReview].name}
                  className="w-16 h-16 rounded-full border-4 border-purple-200"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {reviews[currentReview].name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {reviews[currentReview].location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                {renderStars(reviews[currentReview].rating)}
                <span className="text-sm text-gray-500 ml-2">
                  {reviews[currentReview].date}
                </span>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                "{reviews[currentReview].review}"
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <ThumbsUp size={16} />
                <span>{reviews[currentReview].helpful} people found this helpful</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevReview}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextReview}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentReview
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 w-8'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Reviews Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            All Reviews
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  {renderStars(review.rating)}
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {review.review}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <ThumbsUp size={14} />
                  <span>{review.helpful} helpful</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience Book A Stay?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Join hundreds of satisfied guests who've made us their home away from home
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg">
              Book Your Stay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Review