const fakeReviews = [
    {
        name: "John Doe",
        rating: 5,
        comment: "Amazing quality, fast shipping! Will definitely buy again.",
    },
    {
        name: "Sarah Smith",
        rating: 4,
        comment: "Very comfortable and stylish. Just wish there were more colors!",
    },
    {
        name: "Ali Khan",
        rating: 5,
        comment: "Exceeded my expectations. Worth every penny!",
    },
    {
        name: "Jessica Taylor",
        rating: 4,
        comment: "Nice fabric, great fit. Definitely recommend it.",
    },
];

export default function ReviewsSection() {
    return (
        <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>
            <div className="space-y-6">
                {fakeReviews.map((review, index) => (
                    <div key={index} className="border p-4 rounded-md shadow-md">
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-yellow-500">⭐ {review.rating}/5</p>
                        <p className="text-gray-600 mt-2">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}  