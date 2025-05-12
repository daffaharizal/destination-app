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
import useCategoryPaged from "./hooks/use-category-paged";
import CategoryFormModal from "./components/category-form-modal";
import type { Option } from "@/components/molecules/multiple-selector";
import useMutationCategory from "./hooks/mutation-category";
import type { CategoryResponse } from "./lib/model";
import ModalDelete from "@/components/molecules/modal-delete";
import { SuspensePage } from "@/routes/content";

export default function CategoryPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryResponse | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isEdit, setIsEdit] = useState(false);
  const [filter, setFilter] = useState<Option[]>([]);

  const { dataCategory, totalCategory, isLoading, isError, refetchCategory } =
    useCategoryPaged(page, pageSize, filter);
  const { addCategory, updateCategory, deleteCategory, isPending } =
    useMutationCategory();

  useEffect(() => {
    refetchCategory();
  }, [page, pageSize]);

  const handleAdd = () => {
    setIsEdit(false);
    setSelectedCategory(null);
    setModalOpen(true);
  };

  const handleEdit = (category: CategoryResponse) => {
    setIsEdit(true);
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const handleSubmit = async (values: { name: string }) => {
    if (!selectedCategory) {
      await addCategory({
        data: {
          name: values.name,
        },
      });
    } else {
      await updateCategory({
        documentId: selectedCategory.documentId,
        data: { name: values.name },
      });
    }

    setModalOpen(false);
    refetchCategory();
  };

  const handleDelete = (category: CategoryResponse) => {};

  const getPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
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
    let endPage = Math.min(totalCategory! - 1, startPage + maxVisiblePages - 2);
    if (endPage === totalCategory! - 1) {
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
    if (endPage < totalCategory! - 1 && totalCategory! > 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    if (totalCategory! > 1) {
      items.push(
        <PaginationItem key={totalCategory!}>
          <PaginationLink
            href="#"
            isActive={page === totalCategory!}
            onClick={(e) => {
              e.preventDefault();
              setPage(totalCategory!);
            }}
          >
            {totalCategory!}
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
    if (page < totalCategory!) {
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
            <h2 className="font-bold text-xl">Category List</h2>
            <Button onClick={handleAdd}>
              <Plus />
              Add Category
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">ID</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Created</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataCategory.length > 0 ? (
                dataCategory.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell className="text-center">{cat.id}</TableCell>
                    <TableCell className="text-center">{cat.name}</TableCell><TableCell className="text-center">
                      {new Date(cat.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center flex gap-1.5 justify-center">
                      <Button
                        variant="warning"
                        className="p-2"
                        onClick={() => handleEdit(cat)}
                      >
                        <Pencil className="w-4 h-4 text-yellow-500" />
                      </Button>
                      <ModalDelete
                        title={`Delete category "${cat.name}"?`}
                        description="This action cannot be undone and the category will be permanently removed."
                        onConfirm={() =>
                          deleteCategory({
                            documentId: cat.documentId,
                          }).finally(() => {
                            refetchCategory();
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
            {/* Left: Select */}
            <div className="flex items-center gap-2 ml-6">
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

            {/* Right: Pagination */}
            {totalCategory! > 0 && (
              <Pagination className="w-1/2 m-0 !justify-end text-right">
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

      {/* Category Form Modal */}
      <CategoryFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        initialData={selectedCategory}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
