import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import useArticlePaged from "../dashboard/hooks/use-article-paged";

export default function ArticlesPage() {
  const [page, setPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("");

  const { dataArticle, isLoading, isError, isSuccess, refetchArticle } =
    useArticlePaged();

  return (
    <div className="rounded-xl border shadow-sm bg-white p-10 h-[95vh] overflow-auto">
      {/* <Table>
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
      </Table> */}
      {/* <PaginationControl /> */}
    </div>
  );
}
