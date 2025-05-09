"use client";

import { AppSidebar } from "@/components/menu/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { GetRolesPage } from "@/lib/service/roles-service";
import { useEffect, useState } from "react";
import { Roles } from "@/lib/model/Roles";
import { Header } from "@/components/header/header";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  CirclePlus,
  Search,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormRoles } from "./form/form";

export default function Page() {
  const [data, setData] = useState<Roles[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [row, setRow] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPageData(page, row);
  }, []);

  const fetchPageData = async (pageNumber: number, rowPerPage: number) => {
    const response = await GetRolesPage(pageNumber, rowPerPage);
    if (response.data !== undefined) {
      setTotalData(response.data?.totalData);
      setData(response.data?.content || []);
      setPage(pageNumber);
      setTotalPage(response.data?.totalPages);
    }
  };

  const onChangeRow = async (value: number) => {
    setRow(value);
    fetchPageData(1, value);
  };

  const goToFirstPage = () => {
    if (page !== 1) fetchPageData(1, row);
  };

  const goToPrevPage = () => {
    if (page > 1) fetchPageData(page - 1, row);
  };

  const goToNextPage = () => {
    if (page < totalPage) fetchPageData(page + 1, row);
  };

  const goToLastPage = () => {
    if (page !== totalPage) fetchPageData(totalPage, row);
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="floating" />
      <SidebarInset>
        <Header />
        <div className="rounded-md w-full h-full p-4">
          <div className="flex items-center py-4">
            <Input placeholder="Filter Role Name..." className="max-w-sm" />
            <Button className="ml-4 px-8" variant="secondary">
              <Search />
              Search
            </Button>
            <FormRoles title="Add Role" id={0} onSuccess={() => fetchPageData(page, row)} />
          </div>
          <DataTable columns={columns(fetchPageData, page, row)} data={data} />
          <div className="flex items-center justify-between px-4 py-4">
            <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
              Total Data {totalData}
            </div>
            <div className="flex w-full items-center gap-8 lg:w-fit">
              <div className="hidden items-center gap-2 lg:flex">
                <Label htmlFor="rows-per-page" className="text-sm font-medium">
                  Rows per page
                </Label>
                <Select
                  onValueChange={(value) => {
                    onChangeRow(Number(value));
                  }}
                >
                  <SelectTrigger className="w-20" id="rows-per-page">
                    <SelectValue placeholder="Row" />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[5, 10, 20, 35, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-fit items-center justify-center text-sm font-medium">
                Page {totalPage === 0 ? 0 : page} of {totalPage}
              </div>
              <div className="ml-auto flex items-center gap-2 lg:ml-0">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={goToFirstPage}
                  disabled={page === 1}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeftIcon />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={goToPrevPage}
                  disabled={page == 1}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={goToNextPage}
                  disabled={page >= Math.ceil(totalPage)}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon />
                </Button>
                <Button
                  variant="outline"
                  className="hidden size-8 lg:flex"
                  size="icon"
                  onClick={goToLastPage}
                  disabled={page >= Math.ceil(totalPage)}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRightIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}