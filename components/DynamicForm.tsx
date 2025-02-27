"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import Submissions from "./Submissions";

interface Field {
  name: string;
  label: string;
  type: string;
  required: boolean;
  minLength?: number;
  options?: string[];
}

interface FormSchema {
  title: string;
  fields: Field[];
}

const schemaBuilder = (fields: Field[]) => {
  const shape: { [key: string]: any } = {};
  fields.forEach((field) => {
    let validator = field.type === "email" ? yup.string().email() : yup.string();
    if (field.required) validator = validator.required(`${field.label} is required`);
    if (field.minLength) validator = validator.min(field.minLength, `${field.label} must be at least ${field.minLength} characters`);
    shape[field.name] = validator;
  });
  return yup.object().shape(shape);
};

const DynamicForm = ({ schema }: { schema: FormSchema }) => {
  const [success, setSuccess] = useState(false);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaBuilder(schema.fields)),
  });

  // Fetch submissions on mount
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("/api/submissions");
        setSubmissions(response.data);
      } catch (error) {
        setError("Failed to fetch submissions. Please try again later.");
      }
    };
    fetchSubmissions();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/submit", { data });
      setSuccess(true);
      setSubmissions((prev) => [response.data, ...prev]);
      reset();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError("Failed to submit the form. Please try again.");
    }
  };

  const renderField = (field: Field) => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue=""
            render={({ field: formField }) => (
              <TextField
                {...formField}
                label={field.label}
                type={field.type}
                fullWidth
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message as string}
                margin="normal"
              />
            )}
          />
        );
      case "date":
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue=""
            render={({ field: formField }) => (
              <TextField
                {...formField}
                label={field.label}
                type="date"
                fullWidth
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message as string}
                margin="normal"
                InputLabelProps={{ shrink: true }} // Ensures label doesn't overlap
              />
            )}
          />
        );
      case "select":
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue=""
            render={({ field: formField }) => (
              <Select
                {...formField}
                fullWidth
                displayEmpty
                error={!!errors[field.name]}
              >
                <MenuItem value="" disabled>
                  {field.label}
                </MenuItem>
                {field.options?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", p: 4 }}>
      <Grid container spacing={4}>
        {/* Form on the Left */}
        <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom align="center">
                {schema.title}
              </Typography>
          <Card sx={{ maxWidth: 600, mx: "auto" }}>
            <CardContent>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                {schema.fields.map((field) => (
                  <div key={field.name}>{renderField(field)}</div>
                ))}
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => reset()}>
                    Reset
                  </Button>
                </Box>
                {success && (
                  <Typography color="success.main" align="center" sx={{ mt: 2 }}>
                    Form submitted successfully!
                  </Typography>
                )}
                {error && (
                  <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError(null)}>
                    {error}
                  </Alert>
                )}
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Submissions on the Right */}
        <Grid item xs={12} md={6}>
          <Submissions submissions={submissions} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DynamicForm;