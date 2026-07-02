"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Link from "next/link";

export default function MyFavoritesPage() {
  const { data } = authClient.useSession();

  const user = data?.user;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/api/lessons/favorites/${user.email}`)
      .then((res) => res.json())
      .then((data) => setFavorites(data));
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Remove Favorite?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(
      `http://localhost:5000/api/lessons/favorite/${id}`,
      {
        method: "DELETE",
      },
    );

    const data = await res.json();

    if (data.deletedCount) {
      toast.success("Removed");

      setFavorites(favorites.filter((item) => item._id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>

              <th>Category</th>

              <th>Access</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {favorites.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>

                <td>{item.category}</td>

                <td>{item.access}</td>

                <td>
                  <div className="flex gap-2">
                    <Link
                      href={`/lesson/${item.lessonId}`}
                      className="btn btn-sm"
                    >
                      Details
                    </Link>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm btn-error"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
