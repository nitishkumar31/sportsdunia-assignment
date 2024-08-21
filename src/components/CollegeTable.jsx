import { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  InputBase,
  Button,
} from "@mui/material";
import { collegeData } from "../assets/data";

const CollegeTable = () => {
  const [rowsToShow, setRowsToShow] = useState(10);
  const [filteredData, setFilteredData] = useState(collegeData);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleLoadMore = useCallback(() => {
    setRowsToShow((prevRowsToShow) => prevRowsToShow + 10);
  }, []);

  const handleSort = (field) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...filteredData].sort((a, b) => {
      if (order === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    setSortField(field);
    setSortOrder(order);
    setFilteredData(sortedData);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const data = collegeData.filter((college) =>
      college.name.toLowerCase().includes(searchTerm)
    );
    setFilteredData(data);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight;
      const scrolledHeight = window.innerHeight + window.scrollY;
      if (
        scrollableHeight <= scrolledHeight + 1 &&
        rowsToShow < filteredData.length
      ) {
        handleLoadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleLoadMore, filteredData.length, rowsToShow]);

  return (
    <Paper
      sx={{
        padding: "20px",
        margin: "20px auto",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" gutterBottom>
        College Rankings
      </Typography>
      <InputBase
        placeholder="Search by College Name"
        onChange={handleSearch}
        sx={{
          margin: "10px",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          width: "100%",
        }}
      />
      <TableContainer
        sx={{ overflow: "auto", maxHeight: "calc(100vh - 200px)" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#65ffd4" }}>
            <TableRow>
              <TableCell
                onClick={() => handleSort("id")}
                sx={{
                  cursor: "pointer",
                  borderRight: "1px solid white",
                  fontWeight: "600",
                }}
              >
                CD Rank
              </TableCell>
              <TableCell
                onClick={() => handleSort("name")}
                sx={{
                  cursor: "pointer",
                  borderRight: "1px solid white",
                  fontWeight: "600",
                }}
              >
                College
              </TableCell>
              <TableCell
                onClick={() => handleSort("courseFees")}
                sx={{
                  cursor: "pointer",
                  borderRight: "1px solid white",
                  fontWeight: "600",
                }}
              >
                Course Fees
              </TableCell>
              <TableCell
                onClick={() => handleSort("placement")}
                sx={{
                  cursor: "pointer",
                  borderRight: "1px solid white",
                  fontWeight: "600",
                }}
              >
                Placement
              </TableCell>
              <TableCell
                onClick={() => handleSort("userReviews")}
                sx={{
                  cursor: "pointer",
                  borderRight: "1px solid white",
                  fontWeight: "600",
                }}
              >
                User Reviews
              </TableCell>
              <TableCell
                onClick={() => handleSort("ranking")}
                sx={{ cursor: "pointer", borderRight: "none" }}
              >
                Ranking
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(0, rowsToShow).map((college) => (
              <TableRow key={college.id}>
                <TableCell>#{college.id}</TableCell>
                <TableCell>
                  {college.featured && (
                    <Typography
                      variant="subtitle1"
                      color="secondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      Featured
                    </Typography>
                  )}
                  {college.name}
                </TableCell>
                <TableCell>{college.courseFees}</TableCell>
                <TableCell>{college.placement}</TableCell>
                <TableCell>{college.userReviews}/10</TableCell>
                <TableCell>{college.ranking}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {rowsToShow < filteredData.length && (
        <Button
          onClick={handleLoadMore}
          sx={{ marginTop: "20px", float: "right" }}
        >
          Load More
        </Button>
      )}
    </Paper>
  );
};

export default CollegeTable;
