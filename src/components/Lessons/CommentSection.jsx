"use client";

import { useEffect, useState } from "react";

export default function CommentSection({ lessonId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${lessonId}`)
      .then((res) => res.json())
      .then(setComments);
  }, [lessonId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Comments</h2>

      <div className="space-y-4">
        {comments.length === 0 && <p>No Comments Yet</p>}

        {comments.map((comment) => (
          <div key={comment._id} className="border rounded-lg p-4">
            <h3 className="font-semibold">{comment.user}</h3>

            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
