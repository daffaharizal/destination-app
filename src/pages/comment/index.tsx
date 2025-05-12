import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCommentPaged from "./hooks/use-comment-paged";
import CommentFormModal from "./components/comment-form-modal";
import type { Option } from "@/components/molecules/multiple-selector";
import useMutationComment from "./hooks/mutation-comment";
import type { CommentResponse } from "./lib/model";
import ModalDelete from "@/components/molecules/modal-delete";
import { SuspensePage } from "@/routes/content";

export default function CommentPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] =
    useState<CommentResponse | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isEdit, setIsEdit] = useState(false);
  const [filter, setFilter] = useState<Option[]>([]);

  const { dataComment, totalComment, isLoading, isError, refetchComment } =
    useCommentPaged(page, pageSize, filter);
  const { addComment, updateComment, deleteComment, isPending } =
    useMutationComment();

  useEffect(() => {
    refetchComment();
  }, [page, pageSize]);

  const handleAdd = () => {
    setIsEdit(false);
    setSelectedComment(null);
    setModalOpen(true);
  };

  const handleEdit = (comment: CommentResponse) => {
    setIsEdit(true);
    setSelectedComment(comment);
    setModalOpen(true);
  };

  const handleSubmit = async (values: {
    content: string;
    article?: number;
  }) => {
    if (!selectedComment) {
      await addComment({
        data: {
          content: values.content,
          article: values.article!,
        },
      }).catch(() => {
        setModalOpen(false);
      });
    } else {
      await updateComment({
        documentId: selectedComment.documentId,
        data: { content: values.content },
      }).catch(() => {
        setModalOpen(false);
      });
    }

    refetchComment()
      .finally(() => {
        setModalOpen(false);
      })
      .catch(() => {
        setModalOpen(false);
      });
  };

  const getPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 3;
    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          isActive={page === 1}
          onClick={(e) => {
            e.preventDefault();
            setPage(1);
          }}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    let startPage = Math.max(2, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalComment! - 1, startPage + maxVisiblePages - 2);
    if (endPage === totalComment! - 1) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 2));
    }
    if (startPage > 2) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={page === i}
            onClick={(e) => {
              e.preventDefault();
              setPage(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    if (endPage < totalComment! - 1 && totalComment! > 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    if (totalComment! > 1) {
      items.push(
        <PaginationItem key={totalComment!}>
          <PaginationLink
            href="#"
            isActive={page === totalComment!}
            onClick={(e) => {
              e.preventDefault();
              setPage(totalComment!);
            }}
          >
            {totalComment!}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  const handlePrevious = (e: any) => {
    e.preventDefault();
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = (e: any) => {
    e.preventDefault();
    if (page < totalComment!) {
      setPage(page + 1);
    }
  };

  const handlePageSizeChange = (value: any) => {
    setPageSize(Number(value));
    setPage(1);
  };

  return (
    <div className="rounded-xl border shadow-sm bg-white p-10 h-[95vh] overflow-auto">
      {isLoading || isPending ? (
        <SuspensePage />
      ) : isError ? (
        <div className="text-red-500 text-center h-64 flex items-center justify-center">
          Error loading data. Please try again.
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl">Comment List</h2>
            <Button onClick={handleAdd}>
              <Plus />
              Add Comment
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No.</TableHead>
                <TableHead className="text-center">Content</TableHead>
                <TableHead className="text-center">Created At</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataComment.length > 0 ? (
                dataComment.map((cmt, index) => {
                  const startNumber = (page - 1) * pageSize;

                  return (
                    <TableRow key={cmt.id}>
                      <TableCell className="text-center">
                        {startNumber + index + 1}
                      </TableCell>
                      <TableCell className="text-center">
                        {cmt.content}
                      </TableCell>
                      <TableCell className="text-center">
                        {new Date(cmt.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center flex gap-1.5 justify-center">
                        <Button
                          variant="warning"
                          className="p-2"
                          onClick={() => handleEdit(cmt)}
                        >
                          <Pencil className="w-4 h-4 text-yellow-500" />
                        </Button>
                        <ModalDelete
                          title={`Delete comment "${cmt.content.slice(
                            0,
                            20
                          )}..."?`}
                          description="This action cannot be undone and the comment will be permanently removed."
                          onConfirm={() =>
                            deleteComment({
                              documentId: cmt.documentId,
                            }).finally(() => {
                              refetchComment();
                            })
                          }
                          trigger={
                            <Button variant="danger" className="p-2">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          }
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <Select
                value={String(pageSize)}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="Per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span>entries</span>
            </div>

            {totalComment! > 0 && (
              <Pagination className="w-1/2 m-0 text-right !justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={handlePrevious} />
                  </PaginationItem>
                  {getPaginationItems()}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={handleNext} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </>
      )}

      <CommentFormModal
        open={modalOpen}
        isEdit={isEdit}
        onOpenChange={setModalOpen}
        initialData={selectedComment}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
