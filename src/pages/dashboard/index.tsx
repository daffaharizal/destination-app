import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useArticlePaged from "./hooks/use-article-paged";
import { Eye, Pencil, Trash2 } from "lucide-react";
import PaginationControl from "@/components/molecules/pagination-control";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterCategory, setFilterCategory] = useState("");


  const { dataArticle, totalArticle, pageArticle, pageSizeArticle, isLoading, isError, isSuccess, refetchArticle } =
    useArticlePaged(page, pageSize);

  return (
    <div className="rounded-xl border shadow-sm bg-white p-10 h-[95vh] overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Description</TableHead>
            <TableHead className="text-center">Cover</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataArticle!.map((doc, index) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.id}</TableCell>
              <TableCell className="font-medium text-center">
                {doc.title}
              </TableCell>
              <TableCell className="text-muted-foreground text-center truncate max-w-xs">
                {doc.description}
              </TableCell>
              <TableCell>
                <img
                  src={doc.cover_image_url}
                  alt="cover"
                  className="w-16 h-10 object-cover rounded"
                />
              </TableCell>
              <TableCell className="text-right flex gap-1.5">
                <button>Delete</button>
                <Button variant={"view"} className="p-2">
                  <Eye className="w-3 h-3 text-blue-500" />
                </Button>
                <Button variant={"warning"} className="p-2">
                  <Pencil className="w-3 h-3 text-yellow-500" />
                </Button>
                <Button variant={"danger"} className="p-2">
                  <Trash2 className="w-3 h-3 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
        {/* Left: Select */}
        <div className="flex items-center gap-2 ml-6">
          <span>Show</span>
          <Select defaultValue="10">
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span>entries</span>
        </div>

        {/* Right: Pagination */}
        <Pagination className="w-1/2 m-0 text-right">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">100</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
