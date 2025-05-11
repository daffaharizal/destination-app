import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import useArticlePaged from './hooks/use-article-paged'
import { Eye, Pencil, Trash2 } from "lucide-react"

export default function DashboardPage() {
  const [page, setPage] = useState(1)
  const [filterCategory, setFilterCategory] = useState('')

  const { dataArticle, isLoading, isError, isSuccess, refetchArticle } = useArticlePaged();
  
  return (
    <div className="rounded-xl border shadow-sm bg-white p-10 h-[95vh] overflow-auto">
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>ID</TableHead>
            <TableHead className='text-center'>Title</TableHead>
            <TableHead className='text-center'>Description</TableHead>
            <TableHead className='text-center'>Cover</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataArticle!.map((doc, index) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.id}</TableCell>
              <TableCell className="font-medium">{doc.title}</TableCell>
              <TableCell className="text-muted-foreground truncate max-w-xs">{doc.description}</TableCell>
              <TableCell>
                <img
                  src={doc.cover_image_url}
                  alt="cover"
                  className="w-16 h-10 object-cover rounded"
                />
              </TableCell>
              <TableCell className="text-right">
                <button className="text-muted-foreground hover:text-primary" title="View">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-muted-foreground hover:text-primary" title="Edit">
                  <Pencil className="w-3 h-3" />
                </button>
                <button className="text-destructive hover:text-red-700" title="Delete">
                  <Trash2 className="w-3 h-3" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
