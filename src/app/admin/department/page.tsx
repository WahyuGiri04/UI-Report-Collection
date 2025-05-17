"use client";

import { AppSidebar } from "@/components/menu/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
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
  RotateCcwIcon,
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
import { FormDepartment } from "./form/form";
import { GetDepartmentsPage } from "@/lib/service/department-service";
import { Department } from "@/lib/model/entity/Departement";

export default function Page() {
  const [data, setData] = useState<Department[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [row, setRow] = useState(10);
  const [page, setPage] = useState(1);
  const [searchDepartmentName, setSearchDepartmentName] = useState("");

  useEffect(() => {
    fetchPageData(searchDepartmentName, page, row);
  }, []);

  const fetchPageData = async (
    departmentName: string,
    pageNumber: number,
    rowPerPage: number
  ) => {
    const response = await GetDepartmentsPage(
      departmentName,
      pageNumber,
      rowPerPage
    );
    if (response.data !== undefined) {
      setTotalData(response.data?.totalData);
      setData(response.data?.content || []);
      setPage(pageNumber);
      setTotalPage(response.data?.totalPages);
    }
  };

  const onChangeRow = async (value: number) => {
    setRow(value);
    fetchPageData(searchDepartmentName, 1, value);
  };

  const goToFirstPage = () => {
    if (page !== 1) fetchPageData(searchDepartmentName, 1, row);
  };

  const goToPrevPage = () => {
    if (page > 1) fetchPageData(searchDepartmentName, page - 1, row);
  };

  const goToNextPage = () => {
    if (page < totalPage) fetchPageData(searchDepartmentName, page + 1, row);
  };

  const goToLastPage = () => {
    if (page !== totalPage) fetchPageData(searchDepartmentName, totalPage, row);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchPageData(searchDepartmentName, page, row);
  };

  const handleReset = () => {
    setSearchDepartmentName("");
    fetchPageData("", page, row);
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="floating" />
      <SidebarInset>
        <Header />
        <div className="rounded-md w-full h-full p-4">
          <div className="flex items-center py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0"
              >
                <Input
                  placeholder="Filter Department Name..."
                  className="max-w-sm w-lg"
                  id="searchDepartmentName"
                  value={searchDepartmentName}
                  onChange={(e) => setSearchDepartmentName(e.target.value)}
                />
                <Button type="submit" variant="secondary" className="px-8">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </form>
              <Button
                variant="outline"
                className="flex items-center space-x-2 px-8"
                onClick={handleReset}
              >
                <RotateCcwIcon />
                Reset Filter
              </Button>
              <FormDepartment
                title="Add Department"
                id={0}
                onSuccess={() => fetchPageData(searchDepartmentName, page, row)}
              />
            </div>
          </div>
          <DataTable
            columns={columns(fetchPageData, searchDepartmentName, page, row)}
            data={data}
          />
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
