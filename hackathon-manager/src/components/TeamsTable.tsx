import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import Team from "../models/Team";

interface TeamsTableProps {
  data: Team[];
}

const TeamsTable: React.FC<TeamsTableProps> = ({ data }) => {
  const columns: ColumnDef<Team>[] = [
    {
      header: "ID",
      accessorKey: "id",
      cell: (info) => {
        const id = info.getValue<string>();
        return <Link to={`/edit/${id}`}>{id}</Link>;
      },
    },
    {
      header: "Team Name",
      accessorKey: "teamName",
    },
    {
      header: "Project Name",
      accessorKey: "projectName",
    },
    {
      header: "Members",
      accessorKey: "membersCount",
    },
    {
      header: "Track",
      accessorKey: "track",
    },
    {
      header: "Status",
      accessorKey: "status",
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
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Paper elevation={1}>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
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
