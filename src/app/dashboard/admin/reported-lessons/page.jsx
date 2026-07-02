"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function ReportedLessonsPage() {
  const [reports, setReports] = useState([]);

  const loadReports = () => {
    fetch("http://localhost:5000/api/admin/reports")
      .then((res) => res.json())
      .then((data) => setReports(data));
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleDelete = async (lessonId) => {
    const confirm = await Swal.fire({
      title: "Delete Lesson?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(
      `http://localhost:5000/api/admin/report/delete/${lessonId}`,
      {
        method: "DELETE",
      },
    );

    const data = await res.json();

    if (data.deletedCount) {
      toast.success("Lesson Deleted");
      loadReports();
    }
  };

  const handleIgnore = async (id) => {
    const res = await fetch(
      `http://localhost:5000/api/admin/report/ignore/${id}`,
      {
        method: "DELETE",
      },
    );

    const data = await res.json();

    if (data.deletedCount) {
      toast.success("Reports Cleared");
      loadReports();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Reported Lessons</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Lesson</th>

              <th>Reported By</th>

              <th>Reason</th>

              <th>Count</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>{report.lessonTitle}</td>

                <td>{report.reporterEmail}</td>

                <td>{report.reason}</td>

                <td>
                  <span className="badge badge-error">{report.count || 1}</span>
                </td>

                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(report.lessonId)}
                      className="btn btn-error btn-sm"
                    >
                      Delete Lesson
                    </button>

                    <button
                      onClick={() => handleIgnore(report._id)}
                      className="btn btn-success btn-sm"
                    >
                      Ignore
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
