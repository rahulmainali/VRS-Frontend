import { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
export const GlobalFilter = ({
  globalFilter,
  setGlobalFilter,
  placeholder
}: any) => {
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce((value: any) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span className="flex justify-between  pt-10 pb-10 ">
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        className="w-1/4 rounded-xl border p-2 ml-4 text-gray-500 cursor-pointer"
        type="search"
        placeholder="Search..."
      />
    </span>
  )
}
