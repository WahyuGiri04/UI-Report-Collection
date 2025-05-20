"use client";

import { AppSidebar } from "@/components/menu/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState, useRef } from "react";
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
  SearchIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "./form/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { GetEmployeePage } from "@/lib/service/employee-service";
import { EmployeeSearch } from "@/lib/model/view/EmployeeSearch";
import { Employee } from "@/lib/model/entity/Employee";
import { ComboboxGender } from "@/components/util/combo-box-gender";

export default function Page() {
  const [data, setData] = useState<Employee[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [row, setRow] = useState(10);
  const [page, setPage] = useState(1);
  const [searchEmployeeForm, setSearchEmployeeForm] = useState<EmployeeSearch>({
    nip: "",
    fullName: "",
    gender: "",
    email: "",
  });
  const [editId, setEditId] = useState(0);
  const [activeTab, setActiveTab] = useState("data-table");
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (searchEmployeeForm) {
      fetchPageData(searchEmployeeForm, page, row);
    }
  }, []);
  const fetchPageData = async (
    employeeSearchForm: EmployeeSearch,
    pageNumber: number,
    rowPerPage: number
  ) => {
    setIsLoading(true);
    const response = await GetEmployeePage(
      employeeSearchForm,
      pageNumber,
      rowPerPage
    );
    if (response.data !== undefined) {
      setTotalData(response.data?.totalData);
      setData(response.data?.content || []);
      setPage(pageNumber);
      setTotalPage(response.data?.totalPages);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const onChangeRow = async (value: number) => {
    setRow(value);
    fetchPageData(searchEmployeeForm, 1, value);
  };

  const goToFirstPage = () => {
    if (page !== 1) fetchPageData(searchEmployeeForm, 1, row);
  };

  const goToPrevPage = () => {
    if (page > 1) fetchPageData(searchEmployeeForm, page - 1, row);
  };

  const goToNextPage = () => {
    if (page < totalPage) fetchPageData(searchEmployeeForm, page + 1, row);
  };

  const goToLastPage = () => {
    if (page !== totalPage) fetchPageData(searchEmployeeForm, totalPage, row);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchEmployeeForm);
    fetchPageData(searchEmployeeForm, page, row);
  };

  const handleReset = () => {
    setSearchEmployeeForm({
      nip: "",
      fullName: "",
      gender: "",
      email: "",
    });
    fetchPageData(searchEmployeeForm, page, row);
  };

  const handleEditClick = (id: number) => {
    setEditId(id);
    setActiveTab("form-data");
    if (tabsRef.current) {
      const formTabTrigger = tabsRef.current.querySelector(
        '[value="form-data"]'
      ) as HTMLButtonElement;
      if (formTabTrigger) {
        formTabTrigger.click();
      }
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "data-table") {
      setEditId(0);
    }
  };

  const handleFormSuccess = () => {
    fetchPageData(searchEmployeeForm, page, row);
    setActiveTab("data-table");
    setEditId(0);
    if (tabsRef.current) {
      const dataTableTab = tabsRef.current.querySelector(
        '[value="data-table"]'
      ) as HTMLButtonElement;
      if (dataTableTab) {
        dataTableTab.click();
      }
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="floating" />
      <SidebarInset>
        <Header />
        <div className="rounded-md w-full h-full p-4">
          <Tabs value={activeTab} onValueChange={handleTabChange} ref={tabsRef}>
            <TabsList className="grid w-full sm:w-[400px] grid-cols-2">
              <TabsTrigger value="data-table">Data Table</TabsTrigger>
              <TabsTrigger value="form-data">
                {editId === 0 ? "Add Employee" : "Edit Employee"}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="data-table">
              <Card>
                <CardContent className="space-y-2">
                  <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="w-full space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <CollapsibleTrigger asChild>
                        <Button variant="default" size="sm">
                          <SearchIcon className="h-4 w-4" />
                          Search Data
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="">
                      <div className="w-full items-center justify-between rounded-md bg p-4">
                        <form onSubmit={handleSearch}>
                          <div className="grid grid-cols-2 sm:grid-cols-4 sm:w-[500px] gap-4 w-full">
                            <Label
                              htmlFor="sub-menu-name"
                              className="text-left sm:text-right"
                            >
                              NIP
                            </Label>
                            <Input
                              placeholder="Filter by NIP..."
                              className="sm:w-full col-span-3"
                              id="searchNIP"
                              value={searchEmployeeForm.nip}
                              onChange={(e) =>
                                setSearchEmployeeForm({
                                  ...searchEmployeeForm,
                                  nip: e.target.value,
                                })
                              }
                            />
                            <Label
                              htmlFor="sub-menu-name"
                              className="text-left sm:text-right"
                            >
                              Name
                            </Label>
                            <Input
                              placeholder="Filter by Name..."
                              className="sm:w-full col-span-3"
                              id="searchName"
                              value={searchEmployeeForm.fullName}
                              onChange={(e) =>
                                setSearchEmployeeForm({
                                  ...searchEmployeeForm,
                                  fullName: e.target.value,
                                })
                              }
                            />
                            <Label
                              htmlFor="sub-menu-name"
                              className="text-left sm:text-right"
                            >
                              Gender
                            </Label>
                            <div className="col-span-3">
                              <ComboboxGender
                                value={searchEmployeeForm.gender}
                                onChange={(value) =>
                                  setSearchEmployeeForm({
                                    ...searchEmployeeForm,
                                    gender: value || "",
                                  })
                                }
                              />
                            </div>
                            <Label
                              htmlFor="sub-menu-name"
                              className="text-left sm:text-right"
                            >
                              Email
                            </Label>
                            <Input
                              placeholder="Filter by Email..."
                              className="sm:w-full col-span-3"
                              id="searchEmail"
                              value={searchEmployeeForm.email}
                              onChange={(e) =>
                                setSearchEmployeeForm({
                                  ...searchEmployeeForm,
                                  email: e.target.value,
                                })
                              }
                            />
                            <Button
                              type="submit"
                              variant="secondary"
                              className="col-span-3 sm:col-span-2"
                            >
                              <Search className="mr-2 w-full" />
                              Search
                            </Button>
                            <Button
                              variant="outline"
                              className="col-span-3 sm:col-span-2"
                              onClick={handleReset}
                            >
                              <RotateCcwIcon />
                              Reset Filter
                            </Button>
                          </div>
                        </form>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  <div className="py-4">
                    <DataTable
                      columns={columns(
                        fetchPageData,
                        searchEmployeeForm,
                        page,
                        row,
                        handleEditClick
                      )}
                      data={data}
                      isLoading={isLoading}
                    />
                  </div>
                  <div className="flex items-center justify-between px-4 py-4">
                    <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
                      Total Data {totalData}
                    </div>
                    <div className="flex w-full items-center gap-8 lg:w-fit">
                      <div className="hidden items-center gap-2 lg:flex">
                        <Label
                          htmlFor="rows-per-page"
                          className="text-sm font-medium"
                        >
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
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="form-data">
              <Card>
                <Form
                  title={editId === 0 ? "Add Sub Menu" : "Edit Sub Menu"}
                  id={editId}
                  onSuccess={handleFormSuccess}
                />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
