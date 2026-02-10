import { useState } from "react";
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
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";

import type Project from "../models/Project";
import type Team from "../models/Team";

interface ProjectsTableProps {
  projects: Project[];
  teams: Team[];
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects, teams }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const getTeamName = (teamId: string) =>
    teams.find((t) => t.id === teamId)?.teamName ?? "Unknown";

  const columns: ColumnDef<Project>[] = [
    {
      header: "Project Name",
      accessorKey: "name",
      cell: (info) => {
        const projectId = info.row.original.id;
        return (
          <Link
            to={`/projects/${projectId}`}
            style={{ color: "#4f46e5", textDecoration: "none" }}
          >
            {info.getValue<string>()}
          </Link>
        );
      },
    },
    {
      header: "Team",
      accessorFn: (row) => getTeamName(row.teamId),
      id: "teamName",
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
    data: projects,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Paper sx={{ p: 2 }}>
      {/* Filters */}
      <Box sx={{ mb: 2, width: 200 }}>
        <TextField
          label="Status"
          select
          size="small"
          value={table.getColumn("status")?.getFilterValue() ?? ""}
          onChange={(e) =>
            table
              .getColumn("status")
              ?.setFilterValue(e.target.value || undefined)
          }
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Not Started">Not Started</MenuItem>
          <MenuItem value="In-Progress">In-Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
      </Box>

      {/* Table */}
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableCell
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  sx={{ cursor: "pointer" }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} hover>
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

export default ProjectsTable;
