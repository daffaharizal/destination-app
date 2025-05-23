import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import useArticlePaged from "./hooks/use-article-paged";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
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
import type { Option } from "@/components/molecules/multiple-selector";
import MultipleSelector from "@/components/molecules/multiple-selector";
import ArticleFormModal from "./components/article-form-modal";
import ModalDelete from "@/components/molecules/modal-delete";
import useMutationArticle from "./hooks/mutation-article";
import { SuspensePage } from "@/routes/content";
import type { ArticleResponse } from "./lib/model";
import ArticleDetail from "./components/article-detail";
import { Input } from "@/components/ui/input";
import SearchInput from "@/components/molecules/search-input";

const FILTER_POPULATE: Option[] = [
  {
    label: "By Comment, User, & Category",
    value: "populate[comments][populate][user]",
  },
  {
    label: "By User",
    value: "populate[user]",
  },
  {
    label: "By Category",
    value: "populate[category]",
  },
  {
    label: "All",
    value: "populate",
  },
];

export default function DashboardPage() {
  // VIEW
  const [open, setOpen] = useState(false);

  // CRUD
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] =
    useState<Partial<ArticleResponse> | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState<Option[]>([]);
  const [inputSearch, setInputSearch] = useState("");
  const [inputSearchTitle, setInputSearchTitle] = useState("");

  const {
    dataArticle,
    totalArticle,
    pageArticle,
    pageSizeArticle,
    isLoading,
    refetchArticle,
  } = useArticlePaged(page, pageSize, filter, inputSearch, inputSearchTitle);

  const { addArticle, updateArticle, deleteArticle, isPending } =
    useMutationArticle();

  useEffect(() => {
    refetchArticle();
  }, [page, pageSize, filter, inputSearch, inputSearchTitle]);

  // Generate pagination links
  const getPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    // Always show page 1
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

    // Calculate range of pages to show
    let startPage = Math.max(2, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalArticle! - 1, startPage + maxVisiblePages - 2);

    // Adjust start if end is maxed out
    if (endPage === totalArticle! - 1) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 2));
    }

    // Add ellipsis after page 1 if needed
    if (startPage > 2) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Add middle pages
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

    // Add ellipsis before last page if needed
    if (endPage < totalArticle! - 1 && totalArticle! > 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if we have more than 1 page
    if (totalArticle! > 1) {
      items.push(
        <PaginationItem key={totalArticle!}>
          <PaginationLink
            href="#"
            isActive={page === totalArticle!}
            onClick={(e) => {
              e.preventDefault();
              setPage(totalArticle!);
            }}
          >
            {totalArticle!}
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
    if (page < totalArticle!) {
      setPage(page + 1);
    }
  };

  const handlePageSizeChange = (value: any) => {
    setPageSize(Number(value));
    setPage(1);
  };

  const handleChangeFilter = (value: Option[]) => {
    setFilter(value);
  };

  const handleView = (article: ArticleResponse) => {
    if (article.title && article.description) {
      setSelectedArticle({
        title: article.title,
        description: article.description,
        cover_image_url: article.cover_image_url ?? null,
      });
      setOpen(true);
    }
  };

  const handleAdd = () => {
    setSelectedArticle(null);
    setModalOpen(true);
  };

  const handleEdit = (data: ArticleResponse) => {
    setSelectedArticle(data);
    setModalOpen(true);
  };

  const handleSubmit = async (values: {
    title: string;
    description: string;
    cover_image_url: string;
    category: number;
  }) => {
    if (!selectedArticle) {
      await addArticle({ data: values }).catch(() => {
        setModalOpen(false);
      });
    } else {
      await updateArticle({
        documentId: selectedArticle.documentId!,
        data: values,
      }).catch(() => {
        setModalOpen(false);
      });
    }

    refetchArticle()
      .finally(() => setModalOpen(false))
      .catch(() => setModalOpen(false));
  };

  const handleSearchCategoryName = (value: string) => {
    setInputSearch(value);
  }

  const handleSearchTitle = (value: string) => {
    setInputSearchTitle(value);
  }

  return (
    <div className="rounded-xl border shadow-sm bg-white p-3 md:p-10 h-[95vh] overflow-auto">
      {isLoading || isPending ? (
        <SuspensePage />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-xl">Article List</h2>
            <Button onClick={handleAdd}>
              <Plus />
              Add Article
            </Button>
          </div>
          <div className="w-full flex gap-4 justify-between items-center">
            <MultipleSelector
              className="w-full"
              defaultOptions={FILTER_POPULATE}
              onChange={handleChangeFilter}
              placeholder="Select Filter Populate"
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
            />
            <SearchInput placeholder="Filter by Category & Name" onSearch={handleSearchCategoryName}/>
            <SearchInput placeholder="Filter by Title" onSearch={handleSearchTitle}/>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No.</TableHead>
                <TableHead className="text-center">Title</TableHead>
                <TableHead className="text-center">Description</TableHead>
                <TableHead className="text-center">Cover</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataArticle.length > 0 ? (
                dataArticle.map((doc, index) => {
                  const startNumber = (page - 1) * pageSize;

                  return (
                    <TableRow key={doc.id}>
                      <TableCell className="text-center">{startNumber + index + 1}</TableCell>
                      <TableCell className="font-medium text-center">
                        {doc.title}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-center truncate max-w-xs">
                        {doc.description}
                      </TableCell>
                      <TableCell className="text-center">
                        <img
                          src={doc.cover_image_url}
                          alt="cover"
                          className="w-16 h-10 mx-auto object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="text-center flex gap-1.5 justify-center mx-auto">
                        <Button
                          variant={"view"}
                          onClick={() => handleView(doc)}
                          className="p-2"
                        >
                          <Eye className="w-3 h-3 text-blue-500" />
                        </Button>
                        <Button
                          variant={"warning"}
                          onClick={() => handleEdit(doc)}
                          className="p-2"
                        >
                          <Pencil className="w-3 h-3 text-yellow-500" />
                        </Button>
                        <ModalDelete
                          title={`Delete Article "${doc.title}"?`}
                          description="This action cannot be undone and the article will be permanently removed."
                          onConfirm={() =>
                            deleteArticle({
                              documentId: doc.documentId,
                            }).finally(() => {
                              refetchArticle();
                            })
                          }
                          trigger={
                            <Button variant={"danger"} className="p-2">
                              <Trash2 className="w-3 h-3 text-red-500" />
                            </Button>
                          }
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row text-xs items-center justify-between mt-4 flex-wrap gap-4">
            {/* Left: Select */}
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
                <span>Data</span>
              </Select>
            </div>

            {/* Right: Pagination */}
            {totalArticle! > 0 && (
              <Pagination className="flex m-0 flex-wrap !justify-end w-auto md:w-1/2">
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
        </div>
      )}

      {/* Form Modal Article */}
      <ArticleFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        initialData={selectedArticle}
        onSubmit={handleSubmit}
      />

      {/* Article Detail */}
      <ArticleDetail
        open={open}
        onOpenChange={setOpen}
        article={selectedArticle as any}
      />
    </div>
  );
}
