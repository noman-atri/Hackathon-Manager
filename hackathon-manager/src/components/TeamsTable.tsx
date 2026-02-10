import { Link } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  Box,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

import type Team from "../models/Team";

interface TeamsTableProps {
  data: Team[];
}

const TeamsTable: React.FC<TeamsTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<Team>[] = [
    {
      header: "ID",
      accessorKey: "id",
      enableSorting: true,
      cell: (info) => {
        const id = info.getValue<string>();
        return <Link to={`/edit/${id}`}>{id}</Link>;
      },
    },
    {
      header: "Team Name",
      accessorKey: "teamName",
      enableSorting: true,
    },
    {
      header: "Project Name",
      accessorKey: "projectName",
      enableSorting: true,
    },
    {
      header: "Members",
      accessorKey: "membersCount",
      enableSorting: true,
    },
    {
      header: "Track",
      accessorKey: "track",
      enableSorting: true,
    },
    {
      header: "Status",
      accessorKey: "status",
      enableSorting: true,
      cell: (info) => {
        const status = info.getValue<string>();
        const color =
          status === "Completed"
            ? "success"
            : status === "In-Progress"
              ? "warning"
              : "default";

        return <Chip label={status} color={color} size="small" />;
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        {/* Global Search */}
        <TextField
          label="Search"
          size="small"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />

        {/* Status Filter */}
        <TextField
          label="Status"
          size="small"
          select
          value={table.getColumn("status")?.getFilterValue() ?? ""}
          onChange={(e) =>
            table
              .getColumn("status")
              ?.setFilterValue(e.target.value || undefined)
          }
          sx={{ width: 160 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Not Started">Not Started</MenuItem>
          <MenuItem value="In-Progress">In-Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>

        {/* Track Filter */}
        <TextField
          label="Track"
          size="small"
          select
          value={table.getColumn("track")?.getFilterValue() ?? ""}
          onChange={(e) =>
            table
              .getColumn("track")
              ?.setFilterValue(e.target.value || undefined)
          }
          sx={{ width: 160 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="AI">AI</MenuItem>
          <MenuItem value="Web">Web</MenuItem>
          <MenuItem value="Mobile">Mobile</MenuItem>
        </TextField>
      </Box>

      {/* Table */}
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSorted = header.column.getIsSorted();
                return (
                  <TableCell
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    sx={{ cursor: "pointer" }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {isSorted === "asc" && " 🔼"}
                    {isSorted === "desc" && " 🔽"}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TeamsTable;
