import { useState, useEffect, useMemo } from 'react'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination
} from 'react-table'
import { DOTS, useCustomPagination } from './useCustomPagination'
import { classNames } from './utils'
import { Button, PageButton } from './Button'
import { GrFormSearch } from 'react-icons/gr'
import { ColumnFilter } from './ColumnFilter'
import { GlobalFilter } from './GlobalFilter'

// Define a UI for filtering

function Table({ column, mockData }: any) {
  // useTable hook creates a instance of react-table
  // Use the state and functions returned from useTable to build your UI
  const columns = useMemo(() => [...column], []) // memoize before adding to useTable hook
  const data = useMemo(() => [...mockData], [mockData])

  // default column component
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter
    }
  }, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,

    // pagination , instead of rows we use page here
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state: { pageIndex, pageSize, globalFilter }
    // Get the state from the instance
  } = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    usePagination
  )

  const paginationRange = useCustomPagination({
    totalPageCount: pageCount,
    currentPage: pageIndex,
    defaultColumn
  })

  useEffect(() => {
    setPageSize(5)
  }, [setPageSize])

  // Render the UI for your table and the styles
  return (
    <div className="mt-2 flex flex-col">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className=" relative overflow-x-auto shadow-md sm:rounded-lg ">
            <GlobalFilter
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />

            <table
              {...getTableProps()}
              className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                {headerGroups.map((headerGroup: any) => (
                  <tr {...headerGroup.getHeaderGroupProps()} className="">
                    {headerGroup.headers.map((column: any) => (
                      <th {...column.getHeaderProps()} className="px-6 py-3 ">
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody {...getTableBodyProps()}>
                {page.map((row: any, i: number) => {
                  prepareRow(row)
                  return (
                    <tr
                      {...row.getRowProps()}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      {row.cells.map((cell: any) => {
                        return (
                          <td {...cell.getCellProps()} className="px-6 py-4">
                            {cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="py-3 flex items-center text-center justify-center pt-10">
        <div className="flex-1 flex justify-between md:hidden">
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </div>
        <div
          className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
          aria-label="Pagination"
        >
          <div
            className="relative z-0 inline-flex items-center ml-auto mr-auto rounded-md shadow-sm space-x-10"
            aria-label="Pagination"
          >
            {paginationRange?.map((pageNumber, index) => {
              if (pageNumber === DOTS) {
                return <PageButton key={index}>...</PageButton>
              }

              if (pageNumber - 1 === pageIndex) {
                return (
                  <PageButton
                    key={index}
                    className=" active:bg-gray-500 active:border-gray-300"
                    onClick={() => gotoPage(pageNumber - 1)}
                  >
                    {pageNumber}
                  </PageButton>
                )
              }

              return (
                <PageButton
                  key={index}
                  className="active:bg-gray-500 active:border-gray-300"
                  onClick={() => gotoPage(pageNumber - 1)}
                >
                  {pageNumber}
                </PageButton>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
