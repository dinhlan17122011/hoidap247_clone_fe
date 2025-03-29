import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useAuth} from '../../context/AuthContext.jsx'
import { Box, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";
import axiosClient from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";

// Schema validation
const schema = yup.object().shape({
  email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  password: yup.string().min(6, "Mật khẩu ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu"),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });
  const { setUser } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
        const response = await axiosClient.post("/user/login", data);
        console.log(response.data);
        // Lưu token và user vào localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Cập nhật user trong context (để Header có thể nhận diện)
        setUser(response.data.user);

        // Hiển thị thông báo thành công
        setSuccessMessage("Đăng nhập thành công! Chuyển hướng...");

        setTimeout(() => navigate("/"), 2000);
    } catch (error) {
        setError("email", { type: "manual", message: error.response?.data?.message || "Đăng nhập thất bại" });
    }
};


  return (
    <Box width={400} mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Đăng nhập
      </Typography>

      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errors.email && <Alert severity="error">{errors.email.message}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Mật khẩu"
          type="password"
          fullWidth
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Đăng nhập"}
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
