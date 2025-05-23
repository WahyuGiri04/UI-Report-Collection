"use client";

import { AppSidebar } from "@/components/menu/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState, useRef } from "react";
import { Header } from "@/components/header/header";
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
import { GetSubMenuPage } from "@/lib/service/sub-menu-service";
import { SubMenu } from "@/lib/model/entity/SubMenu";
import { ComboboxMainMenu } from "../../../components/util/combo-box-main-menu";
import { DataTable } from "@/components/util/data-table";

export default function Page() {
  const [data, setData] = useState<SubMenu[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [row, setRow] = useState(10);
  const [page, setPage] = useState(1);
  const [searchSubMenuName, setSearchSubMenuName] = useState("");
  const [searchMainMenuId, setSearchMainMenuId] = useState("");
  const [editId, setEditId] = useState(0);
  const [activeTab, setActiveTab] = useState("data-table");
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPageData(searchSubMenuName, searchMainMenuId, page, row);
  }, [searchSubMenuName, searchMainMenuId, page, row]);

  const fetchPageData = async (
    subMenuName: string,
    mainMenuId: string,
    pageNumber: number,
    rowPerPage: number
  ) => {
    setIsLoading(true);
    const response = await GetSubMenuPage(
      subMenuName,
      Number(mainMenuId),
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
    fetchPageData(searchSubMenuName, searchMainMenuId, 1, value);
  };

  const goToFirstPage = () => {
    if (page !== 1) fetchPageData(searchSubMenuName, searchMainMenuId, 1, row);
  };

  const goToPrevPage = () => {
    if (page > 1)
      fetchPageData(searchSubMenuName, searchMainMenuId, page - 1, row);
  };

  const goToNextPage = () => {
    if (page < totalPage)
      fetchPageData(searchSubMenuName, searchMainMenuId, page + 1, row);
  };

  const goToLastPage = () => {
    if (page !== totalPage)
      fetchPageData(searchSubMenuName, searchMainMenuId, totalPage, row);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchPageData(searchSubMenuName, searchMainMenuId, page, row);
  };

  const handleReset = () => {
    setSearchSubMenuName("");
    setSearchMainMenuId("");
    fetchPageData("", "", page, row);
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
    fetchPageData(searchSubMenuName, searchMainMenuId, page, row);
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
                {editId === 0 ? "Add Sub Menu" : "Edit Sub Menu"}
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
                          <div className="grid grid-cols-1 sm:grid-cols-2 sm:w-[400px] gap-4 w-full">
                            <Input
                              placeholder="Filter Main Menu Name..."
                              className="sm:w-full col-span-2"
                              id="searchSubMenuName"
                              value={searchSubMenuName}
                              onChange={(e) =>
                                setSearchSubMenuName(e.target.value)
                              }
                            />
                            <ComboboxMainMenu
                              value={searchMainMenuId}
                              onChange={setSearchMainMenuId}
                            />
                            <Button
                              type="submit"
                              variant="secondary"
                              className="px-8"
                            >
                              <Search className="mr-2 w-full" />
                              Search
                            </Button>
                            <Button
                              variant="outline"
                              className="px-8"
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
                        searchSubMenuName,
                        searchMainMenuId,
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
