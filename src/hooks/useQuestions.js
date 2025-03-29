import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosClient.get("/question"); // Endpoint API lấy danh sách câu hỏi
        setQuestions(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { questions, loading, error };
};

export default useQuestions;
