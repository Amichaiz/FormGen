"use client";

import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

interface SubmissionsProps {
    submissions: any[];
}

const Submissions = ({ submissions }: SubmissionsProps) => {
    // Extract unique keys from all submissions' data for dynamic headers
    const getDynamicHeaders = () => {
        const allKeys = submissions
            .map((sub) => Object.keys(JSON.parse(sub.data)))
            .flat();
        return [...new Set(allKeys)]; // Remove duplicates
    };

    const headers = getDynamicHeaders();

    return (
        <Box sx={{ pb: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Past Submissions
            </Typography>
            {submissions.length > 0 ? (
                <TableContainer component={Paper} sx={{ maxWidth: 900, mx: "auto", boxShadow: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                {headers.map((header) => (
                                    <TableCell key={header} sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
                                        {header}
                                    </TableCell>
                                ))}
                                <TableCell sx={{ fontWeight: "bold" }}>Submitted At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {submissions.map((sub, index) => {
                                const parsedData = JSON.parse(sub.data);
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                                            "&:hover": { backgroundColor: "#f0f0f0" },
                                        }}
                                    >
                                        {headers.map((header) => (
                                            <TableCell key={header}>
                                                {parsedData[header] || "-"} {/* Show "-" if field is missing */}
                                            </TableCell>
                                        ))}
                                        <TableCell>{new Date(sub.createdAt).toLocaleString()}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography align="center">No submissions yet.</Typography>
            )}
        </Box>
    );
};

export default Submissions;