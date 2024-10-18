import {
  getKeyValue,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { LucideSearch } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

import { Person } from "@/types";

type DataType = Person;
const url = "/people";
const title = "Kişiler";

const ItemsTable = () => {
  const navigate = useNavigate();

  const [filteredItems, setFilteredItems] = React.useState<DataType[]>([]);
  const { data: items } = useSWR<DataType[]>(url);

  React.useEffect(() => {
    if (items) {
      setFilteredItems(items);
    }
  }, [items]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!items) return;
    const value = e.target.value.toLowerCase();

    const fieldsToSearch: Array<keyof DataType> = [
      "firstName",
      "lastName",
      "aka",
    ];

    const filteredData = items.filter((item) =>
      fieldsToSearch.some(
        (field) =>
          item[field] && item[field].toString().toLowerCase().includes(value),
      ),
    );
    setFilteredItems(filteredData);
  };

  const handleRowAction = (key: React.Key) => {
    navigate(location.pathname + "/" + key);
  };

  const columns = [
    { key: "id", label: "#" },
    {
      key: "name",
      label: "İsim",
    },
    {
      key: "createdAt",
      label: "Oluşturulma Tarihi",
    },
  ];

  const rows = items
    ? filteredItems.map((item, i) => {
        return {
          createdAt: new Date(item.createdAt).toLocaleDateString(),
          id: i + 1,
          key: item.id,
          name: item.firstName,
        };
      })
    : [];

  return (
    <section className="grid gap-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="flex items-end justify-start gap-3">
          <h2 className="text-2xl font-bold">{title}</h2>
          <span className="text-sm text-gray-500">
            ({filteredItems.length}/{items ? items.length : 0})
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Input
            className="max-w-xs"
            endContent={<LucideSearch />}
            label="Ara"
            onChange={handleFilter}
            placeholder="Ara..."
            variant="faded"
          />
        </div>
      </div>

      <Table
        aria-label="Example table with dynamic content"
        isStriped
        onRowAction={handleRowAction}
        selectionMode="single"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={<>Veri bulunamadı.</>} items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default ItemsTable;
